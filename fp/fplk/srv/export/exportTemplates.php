<?php

require_once "ExcelExport.php";
require_once "../secureCheck.php";
use FlipPost\ExcelExport;


$excelHeaders = array(
    array("TemplateName", "������������ �������", ),
    array("DName", "�������� �������� ����������"),
    array("DContName", "���������� ���� ����������"),
    array("DContPhone", "������� ���������� ���� ����������"),
    array("DAdr", "����� ����������"),
    array("DEST, destState", "����� �������� ����������"),
	array("DContMail", "Email ����������"),
	
	array("CName", "�������� �������� �����������"),
	array("Address", "����� �����������"),
	array("ORG", "����� �����������"),
	array("ContName", "���������� ���� �����������"),
	array("ContPhone", "������� ����������� ���� �����������"),
	array("ContMail", "Email ����������")
	);

$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];

$t = new ExcelExport($excelHeaders, "exec wwwLKgetTemplates @clientID='{$ag}'");
$t->export();




