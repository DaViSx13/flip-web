<?php

namespace api\model\sber\response\token;
/**
 * ����� ��� ��������������
 */
class TokenResponse
{
    /**
     * �����
     * @var string �����
     */
    public $token;

    public $refreshToken;

    public $transferPassword = true;

}