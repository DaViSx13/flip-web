<?php


/**
 * ������ "�������"
 */
class ContactDTO extends SberBaseDTO
{

    /**
     * ���
     * @var string
     */
    public $name;

    /**
     * ���������� �������
     * @var string
     */
    public $phone;


    /**
     * �������� ������ ������������ �����
     * @return array ������������ ����
     */
    protected function getRequiredArray()
    {
        return array(
            "name",
            "phone"
        );
    }
}