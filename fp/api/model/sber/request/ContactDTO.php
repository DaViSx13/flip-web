<?php


/**
 * Объект "Контакт"
 */
class ContactDTO extends SberBaseDTO
{

    /**
     * ФИО
     * @var string
     */
    public $name;

    /**
     * Контакнтый телефон
     * @var string
     */
    public $phone;


    /**
     * Получает список обязательных полей
     * @return array Обязательные поля
     */
    protected function getRequiredArray()
    {
        return array(
            "name",
            "phone"
        );
    }
}