<?php

class SberException extends Exception
{
    protected $message;

    public function __construct($message = "", $code = 0, $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    /**
     * Фрмирует сообщение об ошибке клиенту
     * @return ErrorResponse Сообщение клиенту
     */
    public function getResponse()
    {
        $responseError = new ErrorResponse();
        $errorDescription = new ErrorDescription();

        $errorDescription -> message = $this -> message;
        $errorDescription -> status = 5;
        $errorDescription -> techInfo = $this -> getTraceAsString();

        $responseError -> error = $errorDescription;

        return $responseError;
    }

    public function __toString()
    {
        return $this -> message;
    }

}