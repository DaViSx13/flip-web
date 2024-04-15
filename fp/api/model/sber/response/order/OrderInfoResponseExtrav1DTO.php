<?php

/**
 * Объект "Информация о заказе"
 */
class OrderInfoResponseExtrav1DTO
{

    /**
     * Номер заказа в системе Контрагента
     * @var string
     */
    public $orderParthnerId;

    /**
     * Человеко-читаемый идентификатор маршрута в Сбертранспорт
     * @var string
     */
    public $orderSbertransportId;

    /**
     * Идентификатор тарифа в системе Контрагента
     * @var integer
     */
    public $tariff;

    /**
     * Дата создания заказа c часовым поясом
     * @var string
     */
    public $createOrderTime;

    /**
     * Дата начала доставки
     * @var string
     */
    public $collectionTime;

    /**
     * Точки маршрута
     * @var array
     */
    public $routePoints;

    /**
     * стоимость заказа, коп
     * @var integer
     */
    public $price;

    /**
     * преодолённая дистанция, км
     * @var float
     */
    public $distance;

    /**
     * код статуса заказа
     * @var integer
     */
    public $statusCode;

    /**
     * дата закрытия заказа
     * @var string
     */
    public $finishTime;

    /**
     * Предварительный расчет по поездке
     * @var PriceCalculationv1DTO
     */
    public $calculation;

    /**
     * время прибытия водителя
     * @var string
     */
    public $performerArrivalTime;

    /**
     * Информация о водителе
     * @var DriverInfoDTO
     */
    public $driver;

    /**
     * комментарий
     * @var string
     */
    public $comment;

    /**
     * ссылка на веб-просмотр заказа
     * @var string
     */
    public $webViewLink;

    /**
     * примерное время до прибытия машины или до окончания поездки, мин
     * @var integer
     */
    public $eta;

    /**
     * признак тестового заказа
     * @var bool
     */
    public $isTest = false;

    /**
     * время ожидания, мин
     * @var integer
     */
    public $waitTime;

    /**
     * время ожидания в пути, мин
     * @var integer
     */
    public $waitTimeOW;

    /**
     * Кноструктор с обязательными полями
     * @param string $orderParthnerId Номер заказа Флиппост
     * @param string $orderSbertransportId Номер заказа Сбертранспорт
     * @param int $statusCode Код статуса
     */
    public function __construct($orderParthnerId, $orderSbertransportId, $statusCode)
    {
        $this->orderParthnerId = $orderParthnerId;
        $this->orderSbertransportId = $orderSbertransportId;
        $this->statusCode = $statusCode;
    }


}