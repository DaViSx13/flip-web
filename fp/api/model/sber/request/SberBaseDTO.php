<?php

/***
 * ������� DTO ��� ��������������
 */
abstract class SberBaseDTO
{

    /**
     * �������� ������ ������������ �����
     * @return array ������������ ����
     */
    protected abstract function getRequiredArray();

    /**
     * ����� ����������� DTO ��������������
     * @param $arr array ������ ������ �� �������
     * @param $required bool �������� ����������
     * @throws Exception ������ ���������
     */
    public function __construct($arr, $required = true)
    {
        $res = $this->setFields($arr, $required);
        if($res != null)
            throw new Exception($res);
    }

    /**
     * ����� ���������� ����� ��������
     * @param $arr array ������ ������ �� �������
     * @param $required bool �������� ����������
     * @throws Exception ��������� ��������
     */
    private function setFields($arr, $required)
    {
        if(!$arr) {
            if($required)
                return "������ ������ �� ������� ����";
            else
                return null;
        }
        $req = $this -> getRequiredArray();
        foreach ($req as $key) {
            if (!array_key_exists($key, $arr)) {
                return '���� ('.$key.') ������ ���� � �������';
            }
        }

        foreach ($arr as $name => $value) {
            if (array_key_exists($name, $this->getRequiredArray()) && $value === null) {
                return "���� '$name' ������ ���� ���������";
            }

            try {
                $ref = new ReflectionClass($this);
                $prop = $ref->getProperty($name);
                $prop->setAccessible(true);
                $prop->setValue($this, $value);
                $prop->setAccessible(false);
            } catch (Exception $ex) {
                return $ex -> getMessage();
            }

        }

        return null;
    }
}