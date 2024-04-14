<?php

/**
 * ������ "���������� � ��������"
 */
class DriverInfoDTO
{

    /**
     * ������������� ��������
     * @var integer
     */
    public $id;

    /**
     * ���
     * @var string
     */
    public $name;

    /**
     * ��������
     * @var string
     */
    public $patronimyc;

    /**
     * �������
     * @var string
     */
    public $secName;

    /**
     * ������������� ��������
     * @var integer
     */
    public $companyId;

    /**
     * ������� (+7XXXXXXXXXX)
     * @var integer
     */
    public $phone;

    /**
     * ������ �� ����
     * @var string
     */
    public $imageUrl;

    /**
     * �������
     * @var float
     */
    public $rating;

    /**
     * ���������� � ��������
     * @var DriverLicense
     */
    public $license;

    /**
     * �����
     * @var AddressDTO
     */
    public $location;

    /**
     * ���������� �� ����������
     * @var VehicleInfo
     */
    public $vehicle;
}