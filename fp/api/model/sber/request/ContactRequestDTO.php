<?php

/**
 * Объект "Контакт с заявками"
 */
class ContactRequestDTO extends SberBaseDTO
{

    /**
     * Адрес в виде строки
     * @var array
     */
    public $contact;

    /**
     * Координаты
     * @var array
     */
    public $requests;


    /**
     * Получает список обязательных полей
     * @return array Обязательные поля
     */
    protected function getRequiredArray()
    {
        return array(
            "contact",
            "requests"
        );
    }
}