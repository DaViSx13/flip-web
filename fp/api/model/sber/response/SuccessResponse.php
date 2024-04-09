<?php

/**
 * Успешный ответ клиенту
 */
class SuccessResponse
{
    /**
     * Признак успеха
     * @var bool
     */
    public $isSuccess;

    /**
     * ID контрагента
     * @var string
     */
    public $orderParthnerId;

    /**
     * ИД Сбертранспорта
     * @var string
     */
    public $orderSbertransportId;
}