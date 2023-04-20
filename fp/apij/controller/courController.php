<?php

class Response
{
    public $status = 'fail';
    public $msg = '';
    public $data = null;
}

class courController {

    public function createPOD() {
        try {
            $token = $_SERVER["HTTP_TOKEN"];
            Flight::checkToken($token);

            // ����� ���������, ������������, 50 ��������
            $wbNo = self::getField('wbNo', true);
            self::checkStringField($wbNo, '����� ���������', 50);

            // ����������, ������������, 50 ��������
            $rcpn = self::getField('recirverName', true);
            self::checkStringField($rcpn,'����������', 50);

            // ���� �������������, ������������
            $pdIn = self::getField('dateIn', true);
            self::checkByPattern("/\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2})?/", $pdIn, "�� ������������ �������: 'yyyy-mm-dd' ��� 'yyyy-mm-dd hh:mm'");

            // ����� ��������
            $tdd = self::getField('timeIn', true);
            self::checkByPattern("/\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2})?/", $pdIn, "�� ������������ �������: 'yyyy-mm-dd' ��� 'yyyy-mm-dd hh:mm'");

            $user = self::getField('courierID', false);
            self::checkNumberValue($user, '������������');
        } catch (Exception $ex) {
            $error = new Response();
            $error -> msg = iconv('windows-1251', 'utf-8', $ex->getMessage());
            Flight::json($error);
            return;
        }


        $sql = "/*--apitest--*/ 
            exec wwwSetPOD
               @wb_no='{$wbNo}',
               @p_d_in='{$pdIn}',
               @tdd='{$tdd}',
               @rcpn='{$rcpn}',
               @user='{$user}'";

        $response = new Response();
        $sql = Flight::utf8_to_win1251($sql);
        $sql = stripslashes($sql);
        $result = Flight::db()->query($sql);
        $response->data = $result;
        $response->status = 'success';
        echo Flight::json($response);

    }

    public function createLog()
    {
        try {
            $token = $_SERVER["HTTP_TOKEN"];
            Flight::checkToken($token);

            $courID = self::getField('courierID', true);
            self::checkNumberValue($courID, '������������');

            $ano = self::getField('ano', true);
            self::checkStringField($ano, '�����', 50);

            // �������, ������������, �������: 'pod', 'ready', 'go'
            $event = self::getField('event', true);
            self::checkRange($event, '�������', array('pod', 'ready', 'go'));

            // ���� �������������, ������������
            $date = self::getField('date', true);

            $rem = self::getFieldWithDefault('rem', '');
            self::checkStringField($rem, '��������', 50);

        } catch (Exception $ex) {
            $error = new Response();
            $error->msg = iconv('windows-1251', 'utf-8', $ex->getMessage());
            Flight::json($error);
            return;
        }


        $sql = "/*--apitest--*/ 
            exec wwwSpCourLog
             @courId={$courID},
             @ano='{$ano}',
             @event='{$event}', 
             @eventtime='{$date}', 
             @rem='{$rem}'";

        $response = new Response();
        $sql = Flight::utf8_to_win1251($sql);
        $sql = stripslashes($sql);
        $result = Flight::db()->query($sql);
        $response->data = $result;
        $response->status = 'success';
        echo Flight::json($response);

    }

    /**

    /**
     * ��������� �������� �� �������.
     * @param $fieldName string ������������ �����
     * @param $isSet string �������� �������� �� ����
     * @return mixed �������� �� �������
     * @throws Exception ������ ��������
     */
    private static function getField($fieldName, $isSet) {
        $result = Flight::request() -> data -> $fieldName;
        if($isSet & !isset($result))
            throw new Exception("�� ������ ���� '$fieldName'. ������� �������� ���� � ��������� ������");

        return $result;
    }

    /**
     * ��������� �������� �� �������
     * �� ��������� �� ���������.
     * @param $fieldName string ������������ �����
     * @param $default mixed �������� �� ���������
     * @return mixed �������� �� �������
     */
    private static function getFieldWithDefault($fieldName, $default) {
        $result = Flight::request() -> data -> $fieldName;
        if(!isset($result))
            return $default;
        else
            return $result;
    }

    /**
     * �������� ��������� ��������.
     * @param $field double ��������
     * @param $fieldName string ������������ �����
     * @throws Exception ������ ��������
     */
    private function checkNumberValue($field, $fieldName) {
        if (strlen($field)==0 || (!is_int($field+0) || !is_numeric($field)))
            if (strlen($field)==0 || (!is_float($field+0) || !is_numeric($field)))
                throw new Exception(
                    "�������� ����� '$fieldName' �� �������� ������. ��������� ���� ������� � ��������� �������");
    }

    /**
     * ������� ��������� ��������.
     * @param $field string ��������
     * @param $fieldName string ������������ �����
     * @param $charCount integer ���������� ���������� ��������
     * @throws Exception ������ ��������
     */
    private static function checkStringField($field, $fieldName, $charCount) {
        $injectionSymbols = array(
            "--",
            "1=1",
            "0=0",
            "true",
            "script>"
        );

        if (gettype($field) != "string")
            throw new Exception(
                "�������� ����� '$fieldName' �� �������� ��������. ��������� ���� ������� � ��������� �������");

        if (strlen($field) > $charCount)
            throw new Exception(
                "��������� �������� �������� ����� '$fieldName' ".
                      "��������� ��������� ���������� - '$charCount'. ".
                      "��������� �������� � ��������� �������");

        foreach ($injectionSymbols as $item) {
            if(strpos($field, $item) == true)
                throw new Exception("� �������� ����� '$fieldName' ���������� ������������ �������� - '$item'");
        }
    }

    private static function  checkByPattern($pattern, $value, $friendly) {
        if(!preg_match($pattern, $value)) {
            throw new Exception("���� �� ������������ �������: '".$friendly."'");
        }
    }

    /**
     * �������� �������� ��������� �� � ������ ����������.
     * @param $field mixed ��������
     * @param $fieldName string ������������ �����
     * @param $range array ������� ��������
     * @throws Exception ������ ��������
     */
    private function checkRange($field, $fieldName, $range) {
        $found = false;
        foreach ($range as $item) {
            if ($field == $item)
                $found = true;
        }

        if (!$found)
            throw new Exception("��������($fieldName) �� ��������� � ������ ����������");
    }

}
