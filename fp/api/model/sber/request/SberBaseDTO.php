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
        $res = $this->setFields($arr, $required);
        if($res != null)
            throw new Exception($res);
    }

    /**
     * Метод заполнения полей сущности
     * @param $arr array Массив данных из запроса
     * @param $required bool Проверка заполнения
     * @throws Exception Валидация элемента
     */
    private function setFields($arr, $required)
    {
        if(!$arr) {
            if($required)
                return "Массив данных из запроса пуст";
            else
                return null;
        }
        $req = $this -> getRequiredArray();
        foreach ($req as $key) {
            if (!array_key_exists($key, $arr)) {
                return 'Поле ('.$key.') должно быть в запросе';
            }
        }

        foreach ($arr as $name => $value) {
            if (array_key_exists($name, $this->getRequiredArray()) && $value === null) {
                return "Поле '$name' должно быть заполнено";
            }

            try {
                $ref = new ReflectionClass($this);
                $prop = $ref->getProperty($name);
                $prop->setAccessible(true);
                $prop->setValue($this, $value);
                $prop->setAccessible(false);
            } catch (Exception $ex) {
                return $ex -> getMessage();
            }

        }

        return null;
    }
}