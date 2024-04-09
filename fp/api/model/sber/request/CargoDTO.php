<?php

/**
 * ������ "����"
 */
class CargoDTO extends SberBaseDTO
{

    /**
     * ���������� ����� ����� (���������� � ������� ������)
     * @var int
     */
    public $orderingIndex;

    /**
     * ������������ ����� (������������ ��� LOAD)
     * @var string
     */
    public $cargoName = '';

    /**
     * �����, �� (������������ ��� LOAD)
     * @var float
     */
    public $weight = 0.0;

    /**
     * �����, ��3 (������������ ��� LOAD)
     * @var float
     */
    public $volume = 0.0;

    /**
     * ���������� ���� (������������ ��� LOAD)
     * @var int
     */
    public $occupiedPlacesCount = 0;

    /**
     * ������, �� (������ ��� LOAD)
     * @var float
     */
    public $height = 0.0;

    /**
     * �����, �� (������ ��� LOAD)
     * @var float
     */
    public $length = 0.0;

    /**
     * ������, �� (������ ��� LOAD)
     * @var float
     */
    public $width = 0.0;

    /**
     * �������� (������ ��� LOAD)
     * @var bool
     */
    public $fragile = false;

    /**
     * �������� ������ ������������ �����
     * @return array ������������ ����
     */
    protected function getRequiredArray()
    {
        return array(
            "orderingIndex"
        );
    }
}