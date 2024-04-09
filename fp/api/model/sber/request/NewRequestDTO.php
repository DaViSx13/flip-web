<?php

/**
 * ������ "����� �������"
 */
class NewRequestDTO extends SberBaseDTO
{

    /**
     * ID �������
     * @var string
     */
    public $routeId = '';

    /**
     * ��������-�������� ������������� �������� � �������������
     * @var string
     */
    public $humanReadableId;

    /**
     * �������
     * @var array
     */
    public $author;

    /**
     * ����
     * @var array
     */
    public $desiredAuto;

    /**
     * ���� �������� � UTC
     * @var string
     */
    public $desiredDate;

    /**
     * ������� ������ � ������� "����������� /��� ������ (���������)/������/�������"
     * @var string
     */
    public $workGroup = '';

    /**
     * ��� �����������
     * @var string
     */
    public $contragentInn = '';

    /**
     * ��� ������
     * @var string
     */
    public $reestr = '';

    /**
     * ����������� � ��������
     * @var string
     */
    public $comment = '';

    /**
     * ����� ��������
     * @var array
     */
    public $waypoints;

    /**
     * ��������������� ��������� ��������, ���
     * @var int
     */
    public $cost = 0.0;

    /**
     * ��������� ������� ������������ ���� ��������, ���/���
     * @var int
     */
    public $hourTariff = 0.0;

    /**
     * ��������������� ��������� ��������, ��
     * @var double
     */
    public $distance = 0.0;

    /**
     * �������� ������ ������������ �����
     * @return array
     */
    protected function getRequiredArray()
    {
        return array(
            "humanReadableId",
            "desiredDate",
            "desiredAuto",
            "waypoints"
        );
    }
}