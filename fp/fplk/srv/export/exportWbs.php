<?php

require_once "ExcelExport.php";
require_once "../secureCheck.php";
use FlipPost\ExcelExport;


$excelHeaders = array(
    array('wb_no', '� ���������'),
	array('d_acc_txt', '����'),
	array('org', 'ORG'),
	array('dest', 'DEST'),
	array("s_city", "����� �����������"),
	array('s_co', '�����������'),
	array("s_adr", "����� �����������"),
	array("s_name", " ������� �����������"),
	array("r_city", "����� ����������"),
	array('r_co', '����������'),
	array("r_adr", "����� ����������"),
	array("MetPaym", "������"),
	array("t_srv", "���."),
	array("pcs", "����"),
	array("wt", "���"),
	array("vol_wt", "��.���"),
	array('B_Chg', '�������� �����'),
	array('A_Chg', '���. �����'),
	array('V_Chg', '����. �����'),
	array('B_Chg', '�����'),
	array('INS', '��������� ����'),
	array('INSSUM', '��������� �����'),
	array('resPay', '������ �����������'),
	array('dtd_txt', '���'),
	array('deliveTo', '��������� ��'),
	array('dod_txt', '����������'),
	array('rcpn', '������'),
	array('t_acc_text', '�����'),
    array('p_d_in_txt', '�����.'),
	array('Transit', '�������'), 	
    array('User_TDD', '����'), 	
	array('Srate', '��. ��'), // �������� ��� ��?	
	array('ACC', '����������'), 	
	array('OrderNo', '� ������'), 
	array("S_Ref", "���������� �����������"),
	array("descr", "���������� �����������"),
	array("COD", "�������� ������"),
	array("serviceType", "��� ������"),
	array("danger", "������� ����"),
    array("invID", "����� �����"),
	array("inv1C", "����� ����� 1�"),
    array("outsidePost", "������� �����"),
	array("consolidation", "������������"),
    array("isRush", "������"),
	array("DESTzip", "������"),
);

$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
$filter = $_REQUEST['filter'];

$query = "exec wwwLKexportWBS @from='$_REQUEST[from]', @to='$_REQUEST[to]', @clientID={$ag}, @dir='{$filter}'";

$t = new ExcelExport($excelHeaders, $query);
$t->setFileName("���������.xls");
$t->export();




