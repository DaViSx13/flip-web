<?php

/**
 * ������ "����� �� ��������"
 */
class WaypointDTO extends SberBaseDTO
{

    /**
     * ���������� ����� �����
     * @var int
     */
    public $orderingIndex;

    /**
     * ���������� ID ����� � �������������
     * @var string
     */
    public $id;

    /**
     * ��� ����� (����/��������/����-��������)
     * @var string
     */
    public $type;

    /**
     * �����
     * @var array
     */
    public $address;

    /**
     * �������
     * @var array
     */
    public $contacts;

    /**
     * �������� ������ ������������ �����
     * @return array ������������ ����
     */
    protected function getRequiredArray()
    {
        return array(
            "orderingIndex",
            "id",
            "type",
            "address",
            "contacts"
        );
    }
}