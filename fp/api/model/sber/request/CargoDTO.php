<?php

/**
 * Объект "Груз"
 */
class CargoDTO extends SberBaseDTO
{

    /**
     * Порядковый номер груза (уникальный в разрезе заявки)
     * @var int
     */
    public $orderingIndex;

    /**
     * Наименование груза (обязательный для LOAD)
     * @var string
     */
    public $cargoName = '';

    /**
     * Масса, кг (обязательный для LOAD)
     * @var float
     */
    public $weight = 0.0;

    /**
     * Объем, см3 (обязательный для LOAD)
     * @var float
     */
    public $volume = 0.0;

    /**
     * Количество мест (обязательный для LOAD)
     * @var int
     */
    public $occupiedPlacesCount = 0;

    /**
     * Высота, см (только для LOAD)
     * @var float
     */
    public $height = 0.0;

    /**
     * Длина, см (только для LOAD)
     * @var float
     */
    public $length = 0.0;

    /**
     * Ширина, см (только для LOAD)
     * @var float
     */
    public $width = 0.0;

    /**
     * Бьющийся (только для LOAD)
     * @var bool
     */
    public $fragile = false;

    /**
     * Получает список обязательных полей
     * @return array Обязательные поля
     */
    protected function getRequiredArray()
    {
        return array(
            "orderingIndex"
        );
    }
}