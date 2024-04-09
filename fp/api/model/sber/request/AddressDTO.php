<?php

/**
 * Объект "Адрес"
 */
class AddressDTO extends SberBaseDTO
{

    /**
     * Адрес в виде строки
     * @var string
     */
    public $addressStringRepresentation;

    /**
     * Координаты
     * @var CoordinatesDTO
     */
    public $coordinates;


    /**
     * Получает список обязательных полей
     * @return array Обязательные поля
     */
    protected function getRequiredArray()
    {
        return array(
            "addressStringRepresentation",
            "coordinates"
        );
    }
}