<?php

require_once "ExcelExport.php";
require_once "../secureCheck.php";
use FlipPost\ExcelExport;


$excelHeaders = array(
    array('Wb_no', '№ Накладной'),//
    array('ord_no', '№ Заказа'), //
    array('date_in', 'Дата'),//

    array('org', 'ORG'),//
    array('s_co', 'Компания отправитель'),//
    array('s_name', 'ФИО отправителя'),//
    array("s_adr", "Адрес отправителя"),//
    array("s_tel", "Телефон отправителя"),//
    array("s_mail", "EMAIL отправителя"),//
    array("s_ref", "Примечание отправителя"),//

    array('dest', 'DEST'),//
    array('r_co', 'Компания получателя'),//
    array('r_name', 'ФИО получателя'),//
    array("r_adr", "Адрес получателя"),//
    array("r_tel", "Телефон получателя"),
    array("r_mail", "EMAIL получателя"),
    array("r_ref", "Примечание получателя"),//

    array("inssum", "Сумма страховки"),//
    array("metpaym_text", "Вид оплаты"),
    array("payr_text", "Платильщик"),

    array("pcs", "Число мест"),//
    array("Wt", "Вес"),//
    array("vol_wt", "Об.вес"),//


    array("Descr", "Описание"),

);

$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}

$query = "exec wwwClientGetWebWbs @from='$_REQUEST[from]', @to='$_REQUEST[to]', @clientID={$ag}";

$t = new ExcelExport($excelHeaders, $query);
$t->setFileName("Web Накладные.xls");
$t->export();




