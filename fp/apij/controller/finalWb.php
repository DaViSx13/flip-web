<?php

class Response
{
    public $status = 'fail';
    public $msg = '';
    public $data = null;
}

class finalWb {

    public function finalizeWB() {
        $sql = '';
        try {
            $token = $_SERVER["HTTP_TOKEN"];
            Flight::checkToken($token);

            $wbNo = self::getField('wbNo', true);
            self::checkStringField($wbNo, '����� ���������', 50);

            $orderNo = self::getFieldWithDefault('orderNo', null);
            if(isset($orderNo)) {
                self::checkNumberValue($orderNo, '����� ������');
            }

            $user = self::getFieldWithDefault('user', 'pod');
            if(isset($user)) {
                self::checkStringField($user, '������������', 20);
            }

            $pscIn = self::getFieldWithDefault('pscIn', 0);
            if(isset($pscIn)) {
                self::checkNumberValue($pscIn, '����');
            }

        } catch (Exception $ex) {
            $error = new Response();
            $error -> msg = iconv('windows-1251', 'utf-8', $ex->getMessage());
            Flight::json($error);
            return;
        }

        $orderNo = isset($orderNo) ? $orderNo : 'null';

        $sql = "/*--apitest--*/ 
            exec wwwCourSetWB 
                @wb_no='{$wbNo}', 
                @orderno = {$orderNo}, 
                @user='{$user}', 
                @pcs_in = {$pscIn}";

        $response = new Response();
        $sql = Flight::utf8_to_win1251($sql);
        $sql = stripslashes($sql);
        $result = Flight::db()->query($sql);
        $response->data = $result;
        $response->status = 'success';
        echo Flight::json($response);

    }

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
                    "�������� ����� '$fieldName' �� �������� ������. ".
                           "��������� ���� ������� � ��������� �������");
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
                "�������� ����� '$fieldName' �� �������� ��������. ".
                       "��������� ���� ������� � ��������� �������");

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
}
