<?php

/**
 * Объект "Информация о водителе"
 */
class DriverInfoDTO
{

    /**
     * идентификатор водителя
     * @var integer
     */
    public $id;

    /**
     * имя
     * @var string
     */
    public $name;

    /**
     * отчество
     * @var string
     */
    public $patronimyc;

    /**
     * фамилия
     * @var string
     */
    public $secName;

    /**
     * идентификатор компании
     * @var integer
     */
    public $companyId;

    /**
     * телефон (+7XXXXXXXXXX)
     * @var integer
     */
    public $phone;

    /**
     * ссылка на фото
     * @var string
     */
    public $imageUrl;

    /**
     * рейтинг
     * @var float
     */
    public $rating;

    /**
     * информация о лицензии
     * @var DriverLicense
     */
    public $license;

    /**
     * Адрес
     * @var AddressDTO
     */
    public $location;

    /**
     * информация об автомобиле
     * @var VehicleInfo
     */
    public $vehicle;
}