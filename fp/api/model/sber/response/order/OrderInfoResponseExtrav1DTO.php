<?php

/**
 * ������ "���������� � ������"
 */
class OrderInfoResponseExtrav1DTO
{

    /**
     * ����� ������ � ������� �����������
     * @var string
     */
    public $orderParthnerId;

    /**
     * ��������-�������� ������������� �������� � �������������
     * @var string
     */
    public $orderSbertransportId;

    /**
     * ������������� ������ � ������� �����������
     * @var integer
     */
    public $tariff;

    /**
     * ���� �������� ������ c ������� ������
     * @var string
     */
    public $createOrderTime;

    /**
     * ���� ������ ��������
     * @var string
     */
    public $collectionTime;

    /**
     * ����� ��������
     * @var array
     */
    public $routePoints;

    /**
     * ��������� ������, ���
     * @var integer
     */
    public $price;

    /**
     * ����������� ���������, ��
     * @var float
     */
    public $distance;

    /**
     * ��� ������� ������
     * @var integer
     */
    public $statusCode;

    /**
     * ���� �������� ������
     * @var string
     */
    public $finishTime;

    /**
     * ��������������� ������ �� �������
     * @var PriceCalculationv1DTO
     */
    public $calculation;

    /**
     * ����� �������� ��������
     * @var string
     */
    public $performerArrivalTime;

    /**
     * ���������� � ��������
     * @var DriverInfoDTO
     */
    public $driver;

    /**
     * �����������
     * @var string
     */
    public $comment;

    /**
     * ������ �� ���-�������� ������
     * @var string
     */
    public $webViewLink;

    /**
     * ��������� ����� �� �������� ������ ��� �� ��������� �������, ���
     * @var integer
     */
    public $eta;

    /**
     * ������� ��������� ������
     * @var bool
     */
    public $isTest = false;

    /**
     * ����� ��������, ���
     * @var integer
     */
    public $waitTime;

    /**
     * ����� �������� � ����, ���
     * @var integer
     */
    public $waitTimeOW;
}