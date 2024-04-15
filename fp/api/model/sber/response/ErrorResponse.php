<?php

/**
 * Ответ об ошибке клиенту
 */
class ErrorResponse
{
    /**
     * Статус
     * @var bool
     */
    public $isSuccess = false;

    /**
     * Описание ошибки
     * @var ErrorDescription
     */
    public $error;

}