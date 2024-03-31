<?php

/**
 * Ответ с токеном пользователя
 */
class TokenResponse
{
    public $token;
}

class CreateOrderResponse
{
    public $isSuccess;
    public $orderParthnerId;

    public $orderSbertransportId;
}

/**
 * Контроллер API сбера
 */
class sberController
{
    /**
     * Получение токена пользователя
     * url - '/sber/auth'
     * @return void Токен
     */
    public static function getToken()
    {
        $resp = new  TokenResponse();
        $resp->token = "test";
        echo Flight::json($resp);
    }

    public static function createOrder()
    {
        $orders = Flight::request()->data->getData();
        $resp = null;
        foreach ($orders as $order) {
            $cost = $order['cost'];
            $resp = new CreateOrderResponse();
            $resp->cost = $cost;
        }
        echo Flight::json($resp);
    }

    /**
     * Создание заказа
     * @param $order Заказ
     * @return void Ответ клиенту
     */
    private static function saveOrder($order)
    {
        $humanReadableID = $order['humanReadableId'];                           // Индификатор Сбер транспорт

        $author = $order['author'];                                             // Автор завпроса
        $authorContactName = $author['name'];                                   // ФИО
        $authorPhone = $author['phone'];                                        // Телефон

        $desiredDate = $order['desiredDate'];                                   // Дата доставки в UTC

        $workgroup = explode('/',$order['workGroup']);                  // Рабочая группа
        $orgName = trim($workgroup[0]);                                          // Наименование организации
        $serviceType = trim($workgroup[1]);                                      // Вид услуги
        $region = trim($workgroup[2]);                                           // Регион
        $contractNum = trim($workgroup[3]);                                      // Номер договора

        $inn = $order['contragentInn'];                                          // ИНН контрагента
        $reestr = $order['reestr'];                                              // Код группы
        $comment = $order['comment'];                                            // Комментарий к маршруту
        $costRub = $order['cost'] / 100;                                         // Предварительная стоимость доставки, руб
        $costKop = $order['cost'] % 100;                                         // Предварительная стоимость доставки, коп
        $hourTariffRub = $order['hourTariff'] / 100;                             // Стоимость каждого последующего часа доставки (час/руб)
        $hourTariffKop = $order['hourTariff'] % 100;                             // Стоимость каждого последующего часа доставки (коп/руб)
        $distance = $order['distance'];                                          // Предварительная дальность доставки, км

        $waypoints = $order['waypoints'];                                        // Маршруты (каждый маршрут следует сохранять?)
        $waypoint = $waypoints[count($waypoints) - 1];                           // Маршрут
        $address = $waypoint['address'];                                         // Адрес
        $city = trim(explode(',', $address['name'])[0]);                // Город
        $way = $address['name'];                                                 // Полный адрес

        $waypointType = $waypoint['type'];                                       // Тип точки (сбор/доставка/сбор-доставка)
        $waypointContacts = $waypoint['contacts'];                               // Массив уникальных контактов с заявками
        $waypointContact =  $waypointContacts[count($waypointContacts) - 1];     // Контакт с заявкой (Может быть несколько?)


        $item = $waypointContact['requests'][0];                                  // Заявка
        $cargo = $item['cargo'][0];                                               // Груз (в заявке несколько грузов?)
        $cargoName = $cargo['cargoName'];                                         // Наименование груза
        $wt = $cargo['weight'];                                                   // Вес
        $vol = $cargo['volume'];                                                  // Объем
        $psc = $cargo['occupiedPlacesCount'];                                     // Мест
        $height = $cargo['height'];                                               // Высота, см
        $width = $cargo['width'];                                                 // Ширина, см
        $length = $cargo['length'];                                               // Длина, см
        $fragile = $cargo['fragile'];                                             // Признак бьющегося груза

        $orgCitySql = "exec wwwGetCity @pName = 'Москва'";
        $destCitySql = "exec wwwGetCity @pName = '$city'";

        $org = Flight::db()->query($orgCitySql)[0];
        $dest = Flight::db()->query($destCitySql)[0];
        $wolVt = ($height + $length + $wt) / 6000;
        $courDate = explode('T', $desiredDate)[0];
        $courTime = explode('+', explode('T', $desiredDate)[1])[0];

        $sql = "
            EXEC wwwLKsetOrder 
                @ORG = $org,
                @CName = 'Сбертранспорт',
                @Address = 'Москва'
                @ContName = 'Сбертранспорт',
                @ContPhone = '+1111',
                @ContMail = '',
                @OrgRems = '',
                @DName = '$authorContactName',
                @DAdr = '$way',
                @DContName = '$authorContactName',
                @DContPhone = '$authorPhone',
                @DContMail = '',
                @DESTRems = '$comment',
                @Type = 1,
                @Packs = $psc,
                @Wt = $vol,
                @VolWt = $wolVt,
                @Payr = 2,
                @UserIn = 'Сбертранспорт',
                @RordNum = 0,
                @CourDate = '$courDate',
                @CourTimeF = '$courTime'
                @CourTimeT = '$courTime',
                @webwb = 1             
        ";

        $res = Flight::db()->query($sql);
        $response = new CreateOrderResponse();
        $response -> isSuccess = true;
        $response -> orderParthnerId = $res;
        $response -> orderSbertransportId = $humanReadableID;
        echo Flight::json($response);
    }
}

