<?php

use api\model\sber\response\token\TokenResponse;

/**
 * Странспорт API
 */
class sberController
{
    /**
     * Отправка пользователю ошибки
     * @param $ex string|Exception
     * @param $techInfo string
     * @return ErrorResponse
     */
    public static function getErrorMessage($ex, $techInfo)
    {
        $info = (is_string($ex)) ? $techInfo : $ex->getTraceAsString();

        $message = $ex;

        $code = (is_string($ex)) ? -10 : $ex->getCode();


        $error = new ErrorResponse();
        $errorDesc = new ErrorDescription();
        $errorDesc->message = $message;
        $errorDesc->status = $code;
        $errorDesc->techInfo = $info;
        $error->error = $errorDesc;

        return $error;
    }

    /**
     * Получает токен для аутентификации
     * url - '/sber/auth'
     * @return void Токен
     */
    public static function getToken()
    {
        try {
            $resp = new  TokenResponse();
            $token = self::generateToken();
            $resp->token = $token;
            $resp->refreshToken = $token;
            echo Flight::json($resp);
        } catch (Exception $exception) {
            echo Flight::json(self::getErrorMessage($exception, null));
        }

    }

    /**
     * Генерация токена
     * @return string Токен
     */
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
        $payload = [
            //"exp" => 0,
        ];
        $payload = self::base64encode(json_encode($payload));
        $signature = self::base64encode(hash_hmac('sha512', "$header.$payload", $signing_key, true));
        return "$header.$payload.$signature";
    }

    /**
     * Кодирование в Base64
     * @param $text string Текст для кодирования
     * @return array|string|string[] Кодированная строка
     */
    private static function base64encode($text)
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($text));
    }

    /**
     * Проверка токена
     * @return bool
     */
    private static function checkToken()
    {
        $token = apache_request_headers()['Authorization'];
        if (strpos($token, self::generateToken()) == false) {
            echo Flight::json(
                self::getErrorMessage("Авторизация не пройдена", "Токен '$token' не валиден")
            );
            return false;
        }

        return true;

    }

    /**
     * Создает заказ
     * url - '/sber/cargo/orders'
     * @return void Ответ пользователю
     */
    public static function createOrder()
    {
        if (!self::checkToken())
            return;

        $orders = Flight::request()->data->getData();

        $id = self::addRequestToHistory($orders);

        $res = array();
        foreach ($orders as $order) {
            $resp = self::saveOrder($order, $id);
            array_push($res, $resp);
        }

        echo Flight::json($res);
    }

    /**
     * Добавление записи в историю запросов от сбертранспорта
     * @param $orders array Тело запроса
     * @return int ИД записи
     */
    private static function addRequestToHistory($orders)
    {
        $json = json_encode($orders, JSON_UNESCAPED_UNICODE);
        $json = iconv("UTF-8", "windows-1251", $json);

        //language=SQL
        $historySql = "
            EXECUTE wwwSberAddRequestToHistory @content = N'$json'
        ";
        $historySql = Flight::utf8_to_win1251($historySql);
        return Flight::db()->query($historySql)[0]['id'];
    }

    /**
     * Сохранение заказа
     * @param $order array Заказ
     * @param $fileID int Ид истории
     * @return ErrorResponse|SuccessResponse Ответ о сохранении
     */
    private static function saveOrder($order, $fileID)
    {
        try {
            $request = new NewRequestDTO($order);

            // --------------------------------Заполняем внутренними сущностми---------------------------------------//

            $cName = "Сбертранспорт";                                               // Компания отправителя
            $cAddress = "Москва";                                                   // Город отправителя
            $contPhone = "1234";                                                    // Контактный телефон отправителя
            $userIn = "Сбертранспорт";                                              // Имя человека, создавшего заказ
            $contName = "Сбертранспорт";                                            // Имя контактоного лица
            $clientID = 781;                                                        // ИД клиента
            $cCity = "Москва";                                                      // Город отправителя

            // ------------------------------------------------------------------------------------------------------//

            // --------------------------------Заполняем поля из запроса---------------------------------------------//

            $humanReadableID = $request->humanReadableId;                         // Человеко-читаемый идентификатор маршрута в Сбертранспорт
            $author = new ContactDTO($request->author, false);            // Контакт
            $authorContactName = $author->name;                                   // ФИО
            $authorPhone = $author->phone;                                        // Телефон
            $desiredDate = $request->desiredDate;                                 // Дата доставки в UTC

            $workgroup = explode('/', $request->workGroup);               // Рабочая группа в формате "Организация /вид услуги (транспорт)/Регион/Договор"
            $orgName = trim($workgroup[0]);                                          // Имя организации получателя
            $serviceType = trim($workgroup[1]);                                      // Вид услуги
            $region = trim($workgroup[2]);                                           // Регион
            $contractNum = trim($workgroup[3]);                                      // Номер договора

            $inn = $request->contragentInn;                                        // ИНН получателя
            $reestr = $request->reestr;                                            // Код группы
            $comment = $request->comment;                                          // Комментарий к маршруту
            $costRub = $request->cost / 100;                                       // Предварительная стоимость доставки, руб
            $costKop = $request->cost % 100;                                       // Предварительная стоимость доставки, коп
            $hourTariffRub = $request->hourTariff / 100;                           // Стоимость каждого последующего часа доставки, руб/час
            $hourTariffKop = $request->hourTariff % 100;                           // Стоимость каждого последующего часа доставки, коп/час
            $distance = $request->distance;                                        // Предварительная дальность доставки, км

            $waypoints = $request->waypoints;                                      // Точки на маршруте
            $waypoint = new WaypointDTO($waypoints[0]);                            // Точка на маршруте
            $address = new AddressDTO($waypoint->address);                         // Адрес получателя
            $way = $address->addressStringRepresentation;                          // Полный адрес

            $city = trim(
                str_replace(
                    'г.', '',
                    explode(',', $way)[2]));                                // Город получателя

            $waypointType = $waypoint->type;                                       // Тип точки (LOAD - сбор/UNLOAD - доставка/LOAD-UNLOAD - сбор-доставка)
            $waypointContacts = $waypoint->contacts;                               // Контакты с заявками
            $waypointContact =
                new ContactRequestDTO(
                    $waypointContacts[0]
                );                                                                   // Контакт с заявками
            $wayContactDTO = new ContactDTO($waypointContact->contact);            // Контакт отправителя
            $rContName = $wayContactDTO->name;                                     // Имя контакта отправителя
            $rPhone = $wayContactDTO->phone;                                       // Телефон контакта отправителя

            $reqDTO =
                new RequestDTO(
                    $waypointContact->requests[0]
                );                                                                  // Заказ
            $cargo = new CargoDTO($reqDTO->cargo[0]);                               // Груз
            $cargoName = $cargo->cargoName;                                         // Наименование груза
            $wt = $cargo->weight;                                                   // Вес
            $vol = $cargo->volume;                                                  // Объем, см3
            $psc = $cargo->occupiedPlacesCount;                                     // Мест
            $height = $cargo->height;                                               // Высота, см
            $width = $cargo->width;                                                 // Ширина, см
            $length = $cargo->length;                                               // Длина, см
            $fragile = ($cargo->fragile) ? 1 : 0;                                   // Признак бьющегося заказа

            $wolVt = ($height + $length + $wt) / 6000;                                 // Объемный вес
            $courDate = explode('T', $desiredDate)[0];                        // Дата доставки
            $courTime = explode('+', explode('T', $desiredDate)[1])[0]; // Время доставки
            // ------------------------------------------------------------------------------------------------------//

            // ----------------------------------------Запросы городов------------------------------------------------//

            $destCitySql = "exec wwwGetCity @pName = N'$city'";                        // Город получателя
            $destCitySql = Flight::utf8_to_win1251($destCitySql);
            $dest = Flight::db()->query($destCitySql)[0]['code'];                      // Код города получателя

            $orgCitySql = "exec wwwGetCity @pName = N'$cCity'";                        // Город отправителя;
            $orgCitySql = Flight::utf8_to_win1251($orgCitySql);
            $org = Flight::db()->query($orgCitySql)[0]['code'];                        // Код города отправителя

            // ------------------------------------------------------------------------------------------------------//


            // ----------------------------------------Запросы заказа------------------------------------------------//
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
                @DContName  = N'$rContName',
                @DContPhone = N'$rPhone',
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
            $ans = Flight::db()->query($sqlExtraFields);
            if (!isset($ans))
                throw new Exception("Не удалось сохранить доп. поля заказа");

            // ------------------------------------------------------------------------------------------------------//

            $response = new SuccessResponse();
            $response->isSuccess = true;
            $response->orderParthnerId = $crOrder;
            $response->orderSbertransportId = $humanReadableID;
            return $response;
        } catch (Exception $ex) {
            return self::getErrorMessage($ex, null);
        }
    }
}

