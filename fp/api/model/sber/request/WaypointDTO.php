<?php

/**
 * Объект "Точка на маршруте"
 */
class WaypointDTO extends SberBaseDTO
{

    /**
     * Порядковый номер точки
     * @var int
     */
    public $orderingIndex;

    /**
     * внутренний ID точки в Сбертранспорт
     * @var string
     */
    public $id;

    /**
     * Тип точки (сбор/доставка/сбор-доставка)
     * @var string
     */
    public $type;

    /**
     * Адрес
     * @var array
     */
    public $address;

    /**
     * Котакты
     * @var array
     */
    public $contacts;

    /**
     * Получает список обязательных полей
     * @return array Обязательные поля
     */
    protected function getRequiredArray()
    {
        return array(
            "orderingIndex",
            "id",
            "type",
            "address",
            "contacts"
        );
    }
}