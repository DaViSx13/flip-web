<?php

class Response
{
    public $status = 'fail';
    public $msg = '';
    public $data = null;
}

class courLogController {

    public function createLog() {
        try {
            $token = $_SERVER["HTTP_TOKEN"];
            Flight::checkToken($token);

            $courID = self::getField('courID', true);
            self::checkNumberValue($courID, 'Пользователь');

            $ano = self::getField('ano', true);
            self::checkStringField($ano, 'Номер', 50);

            // Событие, обязательный, область: 'pod', 'ready', 'go'
            $event = self::getField('event', true);
            self::checkRange($event,'Событие', array('pod', 'ready', 'go'));

            // Дата подтверждения, обязательная
            $date = self::getField('date', true);

            $rem = self::getFieldWithDefault('rem', '');
            self::checkStringField($rem, 'Описание', 50);

        } catch (Exception $ex) {
            $error = new Response();
            $error -> msg = iconv('windows-1251', 'utf-8', $ex->getMessage());
            Flight::json($error);
            return;
        }

        $sql = "/*--apitest--*/ 
            exec wwwSpCourLog
             @courId={$courID},
             @ano='{$ano}',
             @event='{$event}', 
             @eventtime='{$date}', 
             @rem='{$rem}'";

        $response = new Response();
        $sql = Flight::utf8_to_win1251($sql);
        $sql = stripslashes($sql);
        $result = Flight::db()->query($sql);
        $response->data = $result;
        $response->status = 'success';
        echo Flight::json($response);

    }

    /**
     * Получение значения из запроса.
     * @param $fieldName string Наименование ключа
     * @param $isSet string Проверка заполнен ли ключ
     * @return mixed Значение из запроса
     * @throws Exception Ошибка проверки
     */
    private static function getField($fieldName, $isSet) {
        $result = Flight::request() -> data -> $fieldName;
        if($isSet & !isset($result))
            throw new Exception("Не задано поле '$fieldName'. Задайте значение поля и повторите запрос");

        return $result;
    }

    /**
     * Получение значения из запроса
     * со значением по умолчанию.
     * @param $fieldName string Наименование ключа
     * @param $default mixed Значение по умолчанию
     * @return mixed Значение из запроса
     */
    private static function getFieldWithDefault($fieldName, $default) {
        $result = Flight::request() -> data -> $fieldName;
        if(!isset($result))
            return $default;
        else
            return $result;
    }

    /**
     * Проверка числового значения.
     * @param $field double Значение
     * @param $fieldName string Наименование ключа
     * @throws Exception Ошибка проверки
     */
    private function checkNumberValue($field, $fieldName) {
        if (strlen($field)==0 || (!is_int($field+0) || !is_numeric($field)))
            if (strlen($field)==0 || (!is_float($field+0) || !is_numeric($field)))
                throw new Exception(
                    "Значения ключа '$fieldName' не является числом. Исправьте тело запроса и повторите попытку");
    }

    private static function checkByPattern($value, $pattern) {
        return preg_match($pattern, $value);
    }

    /**
     * Проерка строчного значения.
     * @param $field string Значение
     * @param $fieldName string Наименование ключа
     * @param $charCount integer Количество допустимых символов
     * @throws Exception Ошибка проверки
     */
    private static function checkStringField($field, $fieldName, $charCount) {
        $injectionSymbols = array(
            "--",
            "1=1",
            "0=0",
            "true",
            "script>"
        );

        if (gettype($field) != "string")
            throw new Exception(
                "Значения ключа '$fieldName' не является строчным. Исправьте тело запроса и повторите попытку");

        if (strlen($field) > $charCount)
            throw new Exception(
                "Количесво символов значения ключа '$fieldName' ".
                      "превышает доустимое количество - '$charCount'. ".
                      "Исправьте значение и повторите попытку");

        foreach ($injectionSymbols as $item) {
            if(strpos($field, $item) == true)
                throw new Exception("В значении ключа '$fieldName' обнаружено недопустимое значение - '$item'");
        }
    }

    /**
     * Проверка значения находится ли в списке допустимых.
     * @param $field mixed Значение
     * @param $fieldName string Наименование ключа
     * @param $range array Область значения
     * @throws Exception Ошибка проверки
     */
    private function checkRange($field, $fieldName, $range) {
        $found = false;
        foreach ($range as $item) {
            if ($field == $item)
                $found = true;
        }

        if (!$found)
            throw new Exception("Значение($fieldName) не находится в списке допустимых");
    }

}
