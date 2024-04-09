<?php

/**
 * ������ "�������� ��� ����������"
 */
class DesiredAutoDTO extends SberBaseDTO
{

    /**
     * ����������������, ��
     * @var float
     */
    public $weight;

    /**
     * �����, �3
     * @var float
     */
    public $volume;


    /**
     * �������� ������ ������������ �����
     * @return array ������������ ����
     */
    protected function getRequiredArray()
    {
        return array(
            "weight",
            "volume"
        );
    }
}