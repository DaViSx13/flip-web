<?php
//калькулятор тарифа для http://www.alpinabook.ru/

error_reporting(0);
header("Content-type: text/plain; charset=utf-8");

$errorMsg = 'SUCCESS||||||';

//проверка параметров
$city = $_REQUEST['loc'];
if(!$city) exit($errorMsg . 'no city');
//$city = iconv("UTF-8", "windows-1251", $city);

$weight = $_REQUEST['totalweight'];
if(!$weight) exit($errorMsg . 'no weight');

include "dbConnect.php";
//поиск кода города
$query = "exec wwwGetCityCodes @pName = '{$city}, Россия'";
$query = iconv("UTF-8", "windows-1251", $query);

$result = mssql_query($query);
if(!$result) exit($errorMsg . iconv("windows-1251", "UTF-8", mssql_get_last_message()) . '|||');
if(mssql_num_rows($result) != 1) exit($errorMsg . "Служба не имеет доставки в город {$city} ");

$row = mssql_fetch_array($result, MSSQL_ASSOC);
$code = $row['Code'];

//получаем тариф
$weight = $weight / 1000; //вес в кг

$query = "exec wwwGetTarif @code = '{$code}', @wt = {$weight}";
$query = iconv("UTF-8", "windows-1251", $query);
//exit($query);
$result = mssql_query($query);
if(!$result) exit($errorMsg . iconv("windows-1251", "UTF-8", mssql_get_last_message()));
if(mssql_num_rows($result) == 0) exit($errorMsg . 'tarif not found ');

$row = mssql_fetch_array($result, MSSQL_ASSOC);
$tarif = $row['price'];
$tarif = $tarif * 1.18; //НДС
$tarif = $tarif * 1.05; //топливная надбавка
$tarif = round($tarif, 2);
//exit($tarif);

//вот и все
exit("SUCCESS|||{$tarif}|||");
?>