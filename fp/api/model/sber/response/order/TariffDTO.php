<?php

/**
 * ������ "����� ������"
 */
class TariffDTO
{

    /**
     * ������������� ������
     * @var integer
     */
    public $id;

    /**
     * ����������� ������
     * @var string
     */
    public $name;

    /**
     * ��������� ���������, ���
     * @var integer
     */
    public $startPrice;

    /**
     * ��������� �� 1 ��, ���
     * @var integer
     */
    public $oneKmPrice;

    /**
     * ��������� �� 1 ���, ���
     * @var integer
     */
    public $oneMinPrice;

    /**
     * ����� ����������� ��������, ���
     * @var integer
     */
    public $freeWaitMinutes;

    /**
     * ��������� �������� �� 1 ���, ���
     * @var integer
     */
    public $waitTimePrice;

    /**
     * ��������� ������ ������, ���
     * @var integer
     */
    public $cancellationPrice;

    /**
     * ���. ��������
     * @var array
     */
    public $options;

    /**
     * ����������� � ������������� ������.
     * @param int $id �� ������
     */
    public function __construct($id)
    {
        $this->id = $id;
    }
}