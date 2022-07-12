<?php

require_once "ExcelExport.php";
require_once "../secureCheck.php";
use FlipPost\ExcelExport;


$excelHeaders = array(
    array('wb_no', '№ Накладной'),
    array('d_acc_txt', 'Принято'),
    array('dod_txt', 'Доставлено'),
    array('rcpn', 'Получил'),
    array('p_d_in_txt', 'Подтв.'),
    array('p_d_in_txt', 'Подтв.'),

    array('org', 'ORG'),
    array('s_co', 'Компания отправитель'),
    array('s_name', 'ФИО отправителя'),
    array("s_adr", "Адрес отправителя"),
    array("s_city", "Город отправителя"),

    array('dest', 'DEST'),
    array('r_co', 'Компания получателя'),
    array('r_name', 'ФИО получателя'),
    array("r_adr", "Адрес получателя"),
    array("r_city", "Город получателя"),

    array("pcs", "Мест"),
    array("wt", "Вес"),
    array("vol_wt", "Об.вес"),
	
	array("inssum", "Страховка"),

    array("invID", "Номер счета"),
    array("descr", "Примечание"),
    array("S_Ref", "Примечание отправителя")
);

$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
$filter = $_REQUEST['filter'];

$query = "exec wwwLKgetWbs @from='$_REQUEST[from]', @to='$_REQUEST[to]', @clientID={$ag}, @dir='{$filter}'";

$t = new ExcelExport($excelHeaders, $query);
$t->setFileName("Накладные.xls");
$t->export();




