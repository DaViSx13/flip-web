<?php

/**
 * Объект "Общая информация о маршруте"
 */
class TrackInfoDTO
{

    /**
     * планируемая дистанция, км
     * @var double
     */
    public $distance;

    /**
     * планируемая продолжительность, мин
     * @var integer
     */
    public $duration;

    /**
     * Конструктор с обяхательными параметрами
     * @param float $distance планируемая дистанция, км
     */
    public function __construct($distance)
    {
        $this->distance = $distance;
    }
}