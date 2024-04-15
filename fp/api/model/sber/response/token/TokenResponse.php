<?php

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