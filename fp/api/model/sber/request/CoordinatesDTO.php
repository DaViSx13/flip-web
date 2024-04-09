<?php
/**
 * ������ "����������"
 */
class CoordinatesDTO extends SberBaseDTO
{

    /**
     * ������
     * @var double
     */
    public $latitude;

    /**
     * �������
     * @var double
     */
    public $longitude;

    /**
     * �������� ������ ������������ �����
     * @return array ������������ ����
     */
    protected function getRequiredArray()
    {
        return array(
            "latitude",
            "longitude"
        );
    }
}