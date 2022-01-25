<?php

require_once "ExcelExport.php";
require_once "../secureCheck.php";
use FlipPost\ExcelExport;


$excelHeaders = array(
    array('wb_no', '№ Накладной'),
	array('d_acc_txt', 'Дата'),
	array('org', 'ORG'),
	array('dest', 'DEST'),
	array("s_city", "Город отправителя"),
	array('s_co', 'Отправитель'),
	array("s_adr", "Адрес отправителя"),
	array("s_name", " Фамилия отправителя"),
	array("r_city", "Город получателя"),
	array('r_co', 'Получатель'),
	array("r_adr", "Адрес получателя"),
	array("MetPaym", "Оплата"),
	array("t_srv", "Усл."),
	array("pcs", "Мест"),
	array("wt", "Вес"),
	array("vol_wt", "Об.вес"),
	array('B_Chg', 'Основной тариф'),
	array('A_Chg', 'Доп. тариф'),
	array('V_Chg', 'Оцен. тариф'),
	array('B_Chg', 'Тариф'),
	array('INS', 'Страховой сбор'),
	array('INSSUM', 'Страховая сумма'),
	array('resPay', 'Оплата долучателем'),
	array('dtd_txt', 'РДД'),
	array('deliveTo', 'Доставить до'),
	array('dod_txt', 'Доставлено'),
	array('rcpn', 'Принял'),
	array('t_acc_text', 'Время'),
    array('p_d_in_txt', 'Подтв.'),
	array('Transit', 'Транзит'), 	
    array('User_TDD', 'Внес'), 	
	array('Srate', 'Об. ст'), // Уточнить что за?	
	array('ACC', 'Платильщик'), 	
	array('OrderNo', '№ заказа'), 
	array("S_Ref", "Примечание отправителя"),
	array("descr", "Примечание отправления"),
	array("COD", "Наложный платеж"),
	array("serviceType", "Вид услуги"),
	array("danger", "Опасный груз"),
    array("invID", "Номер счета"),
	array("inv1C", "Номер счета 1С"),
    array("outsidePost", "Внешняя почта"),
	array("consolidation", "Консолидация"),
    array("isRush", "Срочно"),
	array("DESTzip", "Индекс"),
);

$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
$filter = $_REQUEST['filter'];

$query = "exec wwwLKexportWBS @from='$_REQUEST[from]', @to='$_REQUEST[to]', @clientID={$ag}, @dir='{$filter}'";

$t = new ExcelExport($excelHeaders, $query);
$t->setFileName("Накладные.xls");
$t->export();




