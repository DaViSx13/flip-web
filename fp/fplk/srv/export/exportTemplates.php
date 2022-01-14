<?php

require_once "ExcelExport.php";
require_once "../secureCheck.php";
use FlipPost\ExcelExport;


$excelHeaders = array(
    array("TemplateName", "Наименование шаблона", ),
    array("DName", "Название компании получателя"),
    array("DContName", "Контактное лицо получателя"),
    array("DContPhone", "Телефон контактого лица получателя"),
    array("DAdr", "Адрес получателя"),
    array("DEST, destState", "Город доставки получателя"),
	array("DContMail", "Email получателя"),
	
	array("CName", "Название компании отправителя"),
	array("Address", "Адрес отправителя"),
	array("ORG", "Город отправления"),
	array("ContName", "Контактное лицо отправителя"),
	array("ContPhone", "Телефон контактного лица отправителя"),
	array("ContMail", "Email отпраителя")
	);

$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];

$t = new ExcelExport($excelHeaders, "exec wwwLKgetTemplates @clientID='{$ag}'");
$t->export();




