<?php
/**
 * Объект "Координаты"
 */
class CoordinatesDTO extends SberBaseDTO
{

    /**
     * Широта
     * @var double
     */
    public $latitude;

    /**
     * Долгота
     * @var double
     */
    public $longitude;

    /**
     * Получает список обязательных полей
     * @return array Обязательные поля
     */
    protected function getRequiredArray()
    {
        return array(
            "latitude",
            "longitude"
        );
    }
}