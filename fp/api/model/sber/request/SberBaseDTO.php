<?php

/***
 * Базовая DTO для сбертранспорта
 */
abstract class SberBaseDTO
{

    /**
     * Получает список обязательных полей
     * @return array Обязательные поля
     */
    protected abstract function getRequiredArray();

    /**
     * Общий конструктор DTO сбертранспорта
     * @param $arr array Массив данных из запроса
     * @param $required bool Проверка заполнения
     * @throws Exception Ошибка валидации
     */
    public function __construct($arr, $required = true)
    {
        $this->setFields($arr, $required);

    }

    /**
     * Метод заполнения полей сущности
     * @param $arr array Массив данных из запроса
     * @param $required bool Проверка заполнения
     * @throws SberException Валидация элемента
     */
    private function setFields($arr, $required)
    {
        if (!$arr) {
            if ($required)
                throw new SberException("The array should not be empty");
            else
                return;
        }


        $req = $this->getRequiredArray();

        for ($i = 0; $i < count($req) ; $i++) {
            if(!array_key_exists($req[$i], $arr)) {
                throw new SberException("Field '$req[$i]' was not found in the array");
            }

        }

        foreach ($arr as $name => $value) {
            if (array_key_exists($name, $req) && is_null($value)) {
                throw new SberException("Field '$name' must be filled in");
            }

            try {
                $ref = new ReflectionClass($this);
                $prop = $ref->getProperty($name);
                $prop->setAccessible(true);
                $prop->setValue($this, $value);
                $prop->setAccessible(false);
            } catch (Exception $ex) {
                throw new SberException($ex->getMessage());
            }
        }
    }
}