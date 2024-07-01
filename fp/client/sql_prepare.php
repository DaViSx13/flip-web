<?php

/**
 * Класс подготовленных запросов
 */
class sql_prepare
{
    /**
     * Подготавливает запрос в БД.
     * @param $sql string псевдо SQL (select * from u where id=#{id})
     * @param $params array Параметры в виде ассоциативного массива (array('id'=>1))
     * @return string Подготовленный SQL (select * from u where id=1)
     * @throws Exception Возникает при проверки строки в параметре запроса
     */
    static function prepare($sql, $params)
    {

        $pattern = "/#{\w+}/m";
        if (preg_match_all($pattern, $sql, $mach)) {

            foreach ($mach[0] as $found) {
                $prepared = self::prepareParamValue(self::getParam($found, $params));
                $sql = str_replace($found, $prepared, $sql);
            }

        }
        return $sql;
    }

    /**
     * Получает значение параметра из списка
     * @param $foundParam string Параетр распознанный из псевдо SQL
     * @param $params array Параметры в виде ассоциативного массива
     * @return mixed Значение параметра
     */
    static function getParam($foundParam, $params)
    {
        $foundParam = str_replace("#{", '', $foundParam);
        $foundParam = str_replace("}", '', $foundParam);
        return $params[$foundParam];
    }

    /**
     * Подготавливает значение параметра
     * @param $value mixed Значение
     * @return mixed|string Подготовленное значение
     * @throws Exception Возникает при проверки строки в параметре запроса
     */
    static function prepareParamValue($value)
    {
        if (is_string($value)) {
            self::checkParamString($value);
            $value = str_replace("'", "''", $value);
            $value = "'" . $value . "'";
        }

        return $value;
    }

    /**
     * Проверка параметра-строки
     * @param $value string Значение
     * @return void Без возврата
     * @throws Exception Возникает при проверки строки в параметре запроса
     */
    static function checkParamString($value)
    {
        $lowValue = strtolower($value);
        $blackList = array(
            '--',
            'drop table',
            'alter table',
            'create table',
            '/***', '***/',
            'xp_',
            'execute',
            'exec');


        foreach ($blackList as $black) {
            if (strpos($lowValue, $black) !== false) {
                throw new Exception("Found illegal sequence: '$black'");
            }
        }

    }
}
