<?php

/**
 * ������ "������"
 */
class RequestDTO extends SberBaseDTO
{

    /**
     * ��������-�������� ������������� ������ � �������������
     * @var string
     */
    public $humanReadableId;

    /**
     * ��� ����� (����/��������)
     * @var string
     */
    public $type;

    /**
     * ������ ������ (������ ��� ������ �����-����, ��� contacts->requests->type = LOAD)
     * @var array
     */
    public $cargo;

    /**
     * ���������� ���������
     * @var int
     */
    public $loaders;

    /**
     * �������������� ����������
     * @var string
     */
    public $comment = '';

    /**
     * ������ �������� (������ ��� ������ �����-����, ��� contacts->requests->type = LOAD)
     * @var array
     */
    public $package;

    /**
     * �������� ������ ������������ �����
     * @return array ������������ ����
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