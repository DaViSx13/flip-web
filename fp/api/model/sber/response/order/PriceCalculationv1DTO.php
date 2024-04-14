<?php

/**
 * Объект "Предварительный расчет по поездке"
 */
class PriceCalculationv1DTO
{

    /**
     * Тариф
     * @var TariffDTO
     */
    public $tariff;

    /**
     * Трек
     * @var TrackInfoDTO
     */
    public $track;

    /**
     * предварительно рассчитанная цена, коп
     * @var integer
     */
    public $precalculatedPrice;

    /**
     * массив точек маршрута
     * @var array
     */
    public $route;

    /**
     * приблизительное время подачи машины, мин
     * @var integer
     */
    public $eta;

    /**
     * конечная цена заказа, коп
     * @var integer
     */
    public $totalPrice;
}