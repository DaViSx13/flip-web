<?php

/**
 * Объект "Желаемый вид автомобиля"
 */
class DesiredAutoDTO extends SberBaseDTO
{

    /**
     * Грузоподъемность, кг
     * @var float
     */
    public $weight;

    /**
     * Объем, м3
     * @var float
     */
    public $volume;


    /**
     * Получает список обязательных полей
     * @return array Обязательные поля
     */
    protected function getRequiredArray()
    {
        return array(
            "weight",
            "volume"
        );
    }
}