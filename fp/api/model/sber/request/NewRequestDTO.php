<?php

/**
 * Объект "Новый маршрут"
 */
class NewRequestDTO extends SberBaseDTO
{

    /**
     * ID запроса
     * @var string
     */
    public $routeId = '';

    /**
     * Человеко-читаемый идентификатор маршрута в Сбертранспорт
     * @var string
     */
    public $humanReadableId;

    /**
     * Контакт
     * @var array
     */
    public $author;

    /**
     * Авто
     * @var array
     */
    public $desiredAuto;

    /**
     * Дата доставки в UTC
     * @var string
     */
    public $desiredDate;

    /**
     * Рабочая группа в формате "Организация /вид услуги (транспорт)/Регион/Договор"
     * @var string
     */
    public $workGroup = '';

    /**
     * ИНН контрагента
     * @var string
     */
    public $contragentInn = '';

    /**
     * Код группы
     * @var string
     */
    public $reestr = '';

    /**
     * Комментарий к маршруту
     * @var string
     */
    public $comment = '';

    /**
     * Точки маршрута
     * @var array
     */
    public $waypoints;

    /**
     * Предварительная стоимость доставки, коп
     * @var int
     */
    public $cost = 0.0;

    /**
     * Стоимость каждого последующего часа доставки, коп/час
     * @var int
     */
    public $hourTariff = 0.0;

    /**
     * Предварительная дальность доставки, км
     * @var double
     */
    public $distance = 0.0;

    /**
     * Получает список обязательных полей
     * @return array
     */
    protected function getRequiredArray()
    {
        return array(
            "humanReadableId",
            "desiredDate",
            "desiredAuto",
            "waypoints"
        );
    }
}