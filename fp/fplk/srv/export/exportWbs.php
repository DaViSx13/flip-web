<?php

require_once "ExcelExport.php";
require_once "../secureCheck.php";
use FlipPost\ExcelExport;


$excelHeaders = array(
    array('wb_no', '� ���������'),
    array('d_acc_txt', '�������'),
    array('dod_txt', '����������'),
    array('rcpn', '�������'),
    array('p_d_in_txt', '�����.'),
    array('p_d_in_txt', '�����.'),

    array('org', 'ORG'),
    array('s_co', '�������� �����������'),
    array('s_name', '��� �����������'),
    array("s_adr", "����� �����������"),
    array("s_city", "����� �����������"),

    array('dest', 'DEST'),
    array('r_co', '�������� ����������'),
    array('r_name', '��� ����������'),
    array("r_adr", "����� ����������"),
    array("r_city", "����� ����������"),

    array("pcs", "����"),
    array("wt", "���"),
    array("vol_wt", "��.���"),
	
	array("inssum", "���������"),

    array("invID", "����� �����"),
    array("descr", "����������"),
    array("S_Ref", "���������� �����������")
);

$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
$filter = $_REQUEST['filter'];

$query = "exec wwwLKgetWbs @from='$_REQUEST[from]', @to='$_REQUEST[to]', @clientID={$ag}, @dir='{$filter}'";

$t = new ExcelExport($excelHeaders, $query);
$t->setFileName("���������.xls");
$t->export();




