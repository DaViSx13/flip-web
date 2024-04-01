<?php

/**
 * ����� � ������� ������������
 */
class TokenResponse
{
    public $token;
}

class ErrorResponse
{
    public $isSuccess = false;
    public $error;
}

class ErrorDescription
{
    public $message;
    public $status;
}

class CreateOrderResponse
{
    public $isSuccess;
    public $orderParthnerId;

    public $orderSbertransportId;
}

/**
 * ���������� API �����
 */
class sberController
{
    /**
     * ��������� ������ ������������
     * url - '/sber/auth'
     * @return void �����
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
        foreach ($orders as $order) {
            self::saveOrder($order);
        }
    }

    /**
     * �������� ������
     * @param $order ArrayObject �����
     * @return void ����� �������
     */
    private static function saveOrder($order)
    {
        try {

            $cName = "�������������";                                               // �������� �������������
            $cAddress = "������";                                                   // ����� �����������
            $contPhone = "1234";                                                    // ������� �����������
            $userIn = "�������������";                                              // ������������ ��������� ���������
            $contName = "�������������";                                            // ��� �������� �����������
            $clientID = 781;                                                        // �� ������


            $humanReadableID = $order['humanReadableId'];                           // ����������� ���� ���������

            $author = $order['author'];                                             // ����� ��������
            $authorContactName = $author['name'];                                   // ���
            $authorPhone = $author['phone'];                                        // �������

            $desiredDate = $order['desiredDate'];                                   // ���� �������� � UTC

            $workgroup = explode('/', $order['workGroup']);                  // ������� ������
            $orgName = trim($workgroup[0]);                                          // ������������ �����������
            $serviceType = trim($workgroup[1]);                                      // ��� ������
            $region = trim($workgroup[2]);                                           // ������
            $contractNum = trim($workgroup[3]);                                      // ����� ��������

            $inn = $order['contragentInn'];                                          // ��� �����������
            $reestr = $order['reestr'];                                              // ��� ������
            $comment = $order['comment'];                                            // ����������� � ��������
            $costRub = $order['cost'] / 100;                                         // ��������������� ��������� ��������, ���
            $costKop = $order['cost'] % 100;                                         // ��������������� ��������� ��������, ���
            $hourTariffRub = $order['hourTariff'] / 100;                             // ��������� ������� ������������ ���� �������� (���/���)
            $hourTariffKop = $order['hourTariff'] % 100;                             // ��������� ������� ������������ ���� �������� (���/���)
            $distance = $order['distance'];                                          // ��������������� ��������� ��������, ��

            $waypoints = $order['waypoints'];                                        // �������� (������ ������� ������� ���������?)
            $waypoint = $waypoints[count($waypoints) - 1];                           // �������
            $address = $waypoint['address'];                                         // �����
            $city = trim(explode(',', $address['name'])[0]);                // �����
            $way = $address['name'];                                                 // ������ �����

            $waypointType = $waypoint['type'];                                       // ��� ����� (����/��������/����-��������)
            $waypointContacts = $waypoint['contacts'];                               // ������ ���������� ��������� � ��������
            $waypointContact = $waypointContacts[count($waypointContacts) - 1];     // ������� � ������� (����� ���� ���������?)


            $item = $waypointContact['requests'][0];                                  // ������
            $cargo = $item['cargo'][0];                                               // ���� (� ������ ��������� ������?)
            $cargoName = $cargo['cargoName'];                                         // ������������ �����
            $wt = $cargo['weight'];                                                   // ���
            $vol = $cargo['volume'];                                                  // �����
            $psc = $cargo['occupiedPlacesCount'];                                     // ����
            $height = $cargo['height'];                                               // ������, ��
            $width = $cargo['width'];                                                 // ������, ��
            $length = $cargo['length'];                                               // �����, ��
            $fragile = ($cargo['fragile']) ? 1 : 0;                                   // ������� ��������� �����
            $destCitySql = "exec wwwGetCity @pName = '$city'";

            $orgCitySql = "exec wwwGetCity @pName = '������'";                        // ����� �������������
            $org = Flight::db()->query($orgCitySql)[0];
            $dest = Flight::db()->query($destCitySql)[0];
            $wolVt = ($height + $length + $wt) / 6000;
            $courDate = explode('T', $desiredDate)[0];
            $courTime = explode('+', explode('T', $desiredDate)[1])[0];

            $sql = "
            EXEC wwwLKsetOrder 
                @clientID   = $clientID,
                @ORG        = $org,
                @CName      = '$cName',
                @Address    = '$cAddress'
                @ContName   = '$contName',
                @ContPhone  = '$contPhone',
                @ContMail   = '',
                @OrgRems    = '',
                @DEST       = $dest,
                @DName      = '$orgName',
                @DAdr       = '$way',
                @DContName  = '$authorContactName',
                @DContPhone = '$authorPhone',
                @DContMail  = '',
                @DESTRems   = '$comment',
                @Type       = 1,
                @Packs      = $psc,
                @Wt         = $vol,
                @VolWt      = $wolVt,
                @Payr       = 2,
                @UserIn     = '$userIn',
                @RordNum    = 0,
                @CourDate   = '$courDate',
                @CourTimeF  = '$courTime'
                @CourTimeT  = '$courTime',
                @webwb      = 1             
        ";


            $crOrder = Flight::db()->query($sql);

            // language=SQL
            $sqlExtraFields = "
            EXEC wwwFillSberExtraFields
                 @order             = $crOrder,
                 @humanReadableID   = '$humanReadableID',
                 @serviceType       = '$serviceType',
                 @region            = '$region',
                 @contractNum       = '$contractNum'
                 @inn               = $inn,
                 @reestr            = '$reestr',
                 @costRub           = $costRub,
                 @costKop           = $costKop,
                 @hourTariffRub     = $hourTariffRub,
                 @hourTariffKop     = $hourTariffKop,
                 @distance          = $distance,
                 @waypointType      = $waypointType,
                 @cargoName         = $cargoName,
                 @height            = $height,
                 @width             = $width,
                 @length            = $length,
                 @fragile           = $fragile
        ";

            $response = new CreateOrderResponse();
            $response->isSuccess = true;
            $response->orderParthnerId = $crOrder;
            $response->orderSbertransportId = $humanReadableID;
            echo Flight::json($response);
        } catch (Exception $ex) {
            $error = new ErrorResponse();
            $errorDesc = new ErrorDescription();
            $errorDesc->message = $ex->getLine() . ". " . $ex->getMessage();
            $errorDesc->status = $ex->getCode();
            $error->error = $errorDesc;
            echo Flight::json($error);
        }
    }
}

