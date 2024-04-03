<?php

/**
 * Токен для аутентификации
 */
class TokenResponse
{
    /**
     * @var string Токен
     */
    public $token;

    public $refreshToken;

    public $transferPassword = true;
}

/**
 * Ответ об ошибке клиенту
 */
class ErrorResponse
{
    /**
     * @var bool Статус
     */
    public $isSuccess = false;

    /**
     * @var ErrorDescription Описание ошибки
     */
    public $error;
}

/**
 * Описание ошибки
 */
class ErrorDescription
{
    /**
     * @var string Ошибка
     */
    public $message;

    /**
     * @var string Статус ошибки
     */
    public $status;

    /**
     * @var string Техническая информация
     */
    public $techInfo;
}

/**
 * Успешный ответ клиенту
 */
class SuccessResponse
{
    public $isSuccess;
    public $orderParthnerId;

    public $orderSbertransportId;
}

/**
 * Странспорт API
 */
class sberController
{
    /**
     * Получает токен для аутентификации
     * url - '/sber/auth'
     * @return void Токен
     */
    public static function getToken()
    {
        $resp = new  TokenResponse();
        $token = self::generateToken();
        $resp-> token = $token;
        $resp-> refreshToken = $token;
        echo Flight::json($resp);
    }

    private static function generateToken()
    {
        $signing_key = "changeme";
        $header = [
            "alg" => "HS512",
            "typ" => "JWT",
            "user" => 781,
            "userName" => "Сбертранспорт"
        ];
        $header = self::base64encode(json_encode($header));
        $payload =  [
            "exp" => 0,
        ];
        $payload = self::base64encode(json_encode($payload));
        $signature = self::base64encode(hash_hmac('sha512', "$header.$payload", $signing_key, true));
        $jwt = "$header.$payload.$signature";
        return $jwt;
    }

    private static function base64encode($text)
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($text));
    }

    /**
     * Создает заказ
     * url - '/sber/cargo/orders'
     * @return void Ответ пользователю
     */
    public static function createOrder()
    {
        $token =  apache_request_headers()['Authorization'];
        if(strpos($token, 'test') == false) {
            $error = new ErrorResponse();
            $errorDesc = new ErrorDescription();
            $errorDesc->message = 'Авторизация не пройдена';
            $errorDesc->status = 0;
            $errorDesc->techInfo = "Токен '$token' не ваалиден";
            $error->error = $errorDesc;
            echo Flight::json($error);
            return;
        }

        $orders = Flight::request()->data->getData();
        $json = json_encode($orders, JSON_UNESCAPED_UNICODE);
        $json = iconv("UTF-8", "windows-1251", $json);
        //language=SQL
        $historySql = "
            EXECUTE wwwSberAddRequestToHistory @content = N'$json'
        ";
        $historySql = Flight::utf8_to_win1251($historySql);
        $id = Flight::db()->query($historySql)[0]['id'];

        $res = array();
        foreach ($orders as $order) {
            $resp = self::saveOrder($order, $id);
            if(!isset($resp))
                break;
            else
                array_push($res, $resp);
        }
        echo Flight::json($res);
    }

    /**
     * Сохранение заказа
     * @param $order object Заказ
     * @param $res array Список сохраненых заказов
     * @param $fileID int ID присланного файла
     * @return bool
     */
    private static function saveOrder($order, $fileID)
    {
        try {

            $cName = "Сбертранспорт";                                               // Компания отправителя
            $cAddress = "Москва";                                                   // Город отправителя
            $contPhone = "1234";                                                    // Контактный телефон отправителя
            $userIn = "Сбертранспорт";                                              // Имя человека, создавшего заказ
            $contName = "Сбертранспорт";                                            // Имя контактоного лица
            $clientID = 781;                                                        // ИД клиента


            $humanReadableID = $order['humanReadableId'];                           // Человеко-читаемый идентификатор маршрута в Сбертранспорт

            $author = $order['author'];                                             // Контакт получателя
            $authorContactName = $author['name'];                                   // ФИО
            $authorPhone = $author['phone'];                                        // Телефон

            $desiredDate = $order['desiredDate'];                                   // Дата доставки в UTC

            $workgroup = explode('/', $order['workGroup']);                 // Рабочая группа в формате "Организация /вид услуги (транспорт)/Регион/Договор"
            $orgName = trim($workgroup[0]);                                          // Имя организации получателя
            $serviceType = trim($workgroup[1]);                                      // Вид услуги
            $region = trim($workgroup[2]);                                           // Регион
            $contractNum = trim($workgroup[3]);                                      // Номер договора

            $inn = $order['contragentInn'];                                          // ИНН получателя
            $reestr = $order['reestr'];                                              // Код группы
            $comment = $order['comment'];                                            // Комментарий к маршруту
            $costRub = $order['cost'] / 100;                                         // Предварительная стоимость доставки, руб
            $costKop = $order['cost'] % 100;                                         // Предварительная стоимость доставки, коп
            $hourTariffRub = $order['hourTariff'] / 100;                             // Стоимость каждого последующего часа доставки, руб/час
            $hourTariffKop = $order['hourTariff'] % 100;                             // Стоимость каждого последующего часа доставки, коп/час
            $distance = $order['distance'];                                          // Предварительная дальность доставки, км

            $waypoints = $order['waypoints'];                                        // Точки на маршруте
            $waypoint = $waypoints[count($waypoints) - 1];                           // Точка на маршруте
            $address = $waypoint['address'];                                         // Адрес получателя
            $way = $address['name'];                                                 // Полный адрес
            $city = trim(
                str_replace(
                    'г.', '',
                    explode(',', $way)[0]));                                // Город получателя

            $waypointType = $waypoint['type'];                                       // Тип точки (LOAD - сбор/UNLOAD - доставка/LOAD-UNLOAD - сбор-доставка)
            $waypointContacts = $waypoint['contacts'];                               // Контакты с заявками
            $waypointContact = $waypointContacts[count($waypointContacts) - 1];      // Контакт с заявками


            $item = $waypointContact['requests'][0];                                  // Заказы
            $cargo = $item['cargo'][0];                                               // Заказ
            $cargoName = $cargo['cargoName'];                                         // Наименование груза
            $wt = $cargo['weight'];                                                   // Вес
            $vol = $cargo['volume'];                                                  // Объем, см3
            $psc = $cargo['occupiedPlacesCount'];                                     // Мест
            $height = $cargo['height'];                                               // Высота, см
            $width = $cargo['width'];                                                 // Ширина, см
            $length = $cargo['length'];                                               // Длина, см
            $fragile = ($cargo['fragile']) ? 1 : 0;                                   // Признак бьющегося заказа
            $destCitySql = "exec wwwGetCity @pName = N'$city'";

            $orgCitySql = "exec wwwGetCity @pName = 'Москва'";                        // Город отправителя;
            $destCitySql = Flight::utf8_to_win1251($destCitySql);
            $orgCitySql = Flight::utf8_to_win1251($orgCitySql);

            $org = Flight::db()->query($orgCitySql)[0]['code'];
            $dest = Flight::db()->query($destCitySql)[0]['code'];
            $wolVt = ($height + $length + $wt) / 6000;
            $courDate = explode('T', $desiredDate)[0];
            $courTime = explode('+', explode('T', $desiredDate)[1])[0];

            //language=SQL
            $sql = "
            EXECUTE wwwLKsetOrder 
                @clientID   = $clientID,
                @ORG        = $org,
                @CName      = N'$cName',
                @Address    = N'$cAddress',
                @ContName   = N'$contPhone',
                @ContPhone  = '$contPhone',
                @ContMail   = null,
                @OrgRems    = null,
                @DEST       = $dest,
                @DName      = N'$orgName',
                @DAdr       = N'$way',
                @DContName  = N'$authorContactName',
                @DContPhone = N'$authorPhone',
                @DContMail  = null,
                @DESTRems   = N'$comment',
                @Type       = 1,
                @Packs      = $psc,
                @Wt         = $vol,
                @VolWt      = $wolVt,
                @Payr       = 2,
                @UserIn     = N'$userIn',
                @RordNum    = 0,
                @CourDate   = N'$courDate',
                @CourTimeF  = N'$courTime',
                @CourTimeT  = N'$courTime',
                @webwb      = 1             
        ";
            $sql = Flight::utf8_to_win1251($sql);
            $crOrder = Flight::db()->query($sql)[0]['ord_no'];

            // language=SQL
            $sqlExtraFields = "
            EXEC wwwFillSberExtraFields
                 @order             = $crOrder,
                 @humanReadableID   = '$humanReadableID',
                 @serviceType       = '$serviceType',
                 @region            = '$region',
                 @contractNum       = '$contractNum',
                 @inn               = '$inn',
                 @reestr            = '$reestr',
                 @costRub           = $costRub,
                 @costKop           = $costKop,
                 @hourTariffRub     = $hourTariffRub,
                 @hourTariffKop     = $hourTariffKop,
                 @distance          = $distance,
                 @waypointType      = '$waypointType',
                 @cargoName         = '$cargoName',
                 @height            = $height,
                 @width             = $width,
                 @length            = $length,
                 @fragile           = $fragile,
                 @fileID            = $fileID 
        ";
            $sqlExtraFields = Flight::utf8_to_win1251($sqlExtraFields);
            $answ = Flight::db()->query($sqlExtraFields);

            $response = new SuccessResponse();
            $response->isSuccess = true;
            $response->orderParthnerId = $crOrder;
            $response->orderSbertransportId = $humanReadableID;
            return $response;
        } catch (Exception $ex) {
            $error = new ErrorResponse();
            $errorDesc = new ErrorDescription();
            $errorDesc->message = $ex->getLine() . ". " . $ex->getMessage();
            $errorDesc->status = $ex->getCode();
            $errorDesc->techInfo = $ex->getTraceAsString();
            $error->error = $errorDesc;
            echo Flight::json($error);
            return null;
        }
    }
}

