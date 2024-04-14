<?php

/**
 * ������ "��������������� ������ �� �������"
 */
class PriceCalculationv1DTO
{

    /**
     * �����
     * @var TariffDTO
     */
    public $tariff;

    /**
     * ����
     * @var TrackInfoDTO
     */
    public $track;

    /**
     * �������������� ������������ ����, ���
     * @var integer
     */
    public $precalculatedPrice;

    /**
     * ������ ����� ��������
     * @var array
     */
    public $route;

    /**
     * ��������������� ����� ������ ������, ���
     * @var integer
     */
    public $eta;

    /**
     * �������� ���� ������, ���
     * @var integer
     */
    public $totalPrice;
}