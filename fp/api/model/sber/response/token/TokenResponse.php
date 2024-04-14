<?php

namespace api\model\sber\response\token;
/**
 * Токен для аутентификации
 */
class TokenResponse
{
    /**
     * Токен
     * @var string Токен
     */
    public $token;

    public $refreshToken;

    public $transferPassword = true;

}