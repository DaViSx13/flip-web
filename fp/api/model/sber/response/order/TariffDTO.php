<?php

/**
 * Объект "Опции тарифа"
 */
class TariffDTO
{

    /**
     * идентификатор тарифа
     * @var integer
     */
    public $id;

    /**
     * Индификатор тарифа
     * @var string
     */
    public $name;

    /**
     * стартовая стоимость, коп
     * @var integer
     */
    public $startPrice;

    /**
     * стоимость за 1 км, коп
     * @var integer
     */
    public $oneKmPrice;

    /**
     * стоимость за 1 мин, коп
     * @var integer
     */
    public $oneMinPrice;

    /**
     * время бесплатного ожидания, мин
     * @var integer
     */
    public $freeWaitMinutes;

    /**
     * стоимость ожидания за 1 мин, коп
     * @var integer
     */
    public $waitTimePrice;

    /**
     * стоимость отмены заказа, коп
     * @var integer
     */
    public $cancellationPrice;

    /**
     * Доп. операция
     * @var array
     */
    public $options;

    /**
     * Конструктор с обязательными полями.
     * @param int $id ИД тарифа
     */
    public function __construct($id)
    {
        $this->id = $id;
    }
}