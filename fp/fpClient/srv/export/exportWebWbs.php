<?php

require_once "ExcelExport.php";
require_once "../secureCheck.php";
use FlipPost\ExcelExport;


$excelHeaders = array(
    array('Wb_no', '� ���������'),//
    array('ord_no', '� ������'), //
    array('date_in', '����'),//

    array('org', 'ORG'),//
    array('s_co', '�������� �����������'),//
    array('s_name', '��� �����������'),//
    array("s_adr", "����� �����������"),//
    array("s_tel", "������� �����������"),//
    array("s_mail", "EMAIL �����������"),//
    array("s_ref", "���������� �����������"),//

    array('dest', 'DEST'),//
    array('r_co', '�������� ����������'),//
    array('r_name', '��� ����������'),//
    array("r_adr", "����� ����������"),//
    array("r_tel", "������� ����������"),
    array("r_mail", "EMAIL ����������"),
    array("r_ref", "���������� ����������"),//

    array("inssum", "����� ���������"),//
    array("metpaym_text", "��� ������"),
    array("payr_text", "����������"),

    array("pcs", "����� ����"),//
    array("Wt", "���"),//
    array("vol_wt", "��.���"),//


    array("Descr", "��������"),

);

$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}

$query = "exec wwwClientGetWebWbs @from='$_REQUEST[from]', @to='$_REQUEST[to]', @clientID={$ag}";

$t = new ExcelExport($excelHeaders, $query);
$t->setFileName("Web ���������.xls");
$t->export();




