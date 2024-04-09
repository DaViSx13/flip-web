<?php

/**
 * ������ "������� � ��������"
 */
class ContactRequestDTO extends SberBaseDTO
{

    /**
     * ����� � ���� ������
     * @var array
     */
    public $contact;

    /**
     * ����������
     * @var array
     */
    public $requests;


    /**
     * �������� ������ ������������ �����
     * @return array ������������ ����
     */
    protected function getRequiredArray()
    {
        return array(
            "contact",
            "requests"
        );
    }
}