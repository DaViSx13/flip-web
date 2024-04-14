<?php

/**
 * ������ "����� ���������� � ��������"
 */
class TrackInfoDTO
{

    /**
     * ����������� ���������, ��
     * @var double
     */
    public $distance;

    /**
     * ����������� �����������������, ���
     * @var integer
     */
    public $duration;

    /**
     * ����������� � ������������� �����������
     * @param float $distance ����������� ���������, ��
     */
    public function __construct($distance)
    {
        $this->distance = $distance;
    }
}