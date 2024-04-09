<?php

/**
 * ������ "�����"
 */
class AddressDTO extends SberBaseDTO
{

    /**
     * ����� � ���� ������
     * @var string
     */
    public $addressStringRepresentation;

    /**
     * ����������
     * @var CoordinatesDTO
     */
    public $coordinates;


    /**
     * �������� ������ ������������ �����
     * @return array ������������ ����
     */
    protected function getRequiredArray()
    {
        return array(
            "addressStringRepresentation",
            "coordinates"
        );
    }
}