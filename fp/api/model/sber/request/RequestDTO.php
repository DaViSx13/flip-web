<?php

/**
 * Объект "Заявка"
 */
class RequestDTO extends SberBaseDTO
{

    /**
     * Человеко-читаемый идентификатор заявки в Сбертранспорт
     * @var string
     */
    public $humanReadableId;

    /**
     * Тип точки (сбор/доставка)
     * @var string
     */
    public $type;

    /**
     * Массив грузов (только для заявок точка-точк, где contacts->requests->type = LOAD)
     * @var array
     */
    public $cargo;

    /**
     * Количество грузчиков
     * @var int
     */
    public $loaders;

    /**
     * Дополнительная информация
     * @var string
     */
    public $comment = '';

    /**
     * Массив упаковки (только для заявок точка-точк, где contacts->requests->type = LOAD)
     * @var array
     */
    public $package;

    /**
     * Получает список обязательных полей
     * @return array Обязательные поля
     */
    protected function getRequiredArray()
    {
        return array(
            "humanReadableId",
            "type",
            "cargo",
            "loaders"
        );
    }
}