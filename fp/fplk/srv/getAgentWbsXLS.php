<?php
require_once 'Excel/PHPExcel.php';
require_once "secureCheck.php";
include 'dbConnect.php';
require_once 'Excel/PHPExcel/Writer/Excel5.php';
require_once "CellStyle.php";

function setCellStyle($sheet, $cell, $arrstyle){	
	$sheet->getStyle($cell)->applyFromArray($arrstyle);
}

$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];} 
$filter = $_REQUEST['filter'];

$query = "exec wwwLKgetWbs @from='$_REQUEST[from]', @to='$_REQUEST[to]', @clientID={$ag}, @dir='{$filter}'";
$result=mssql_query($query);

// Creating a workbook
$workbook = new PHPExcel();
$workbook->setActiveSheetIndex(0);

$worksheet = $workbook->getActiveSheet();
$worksheet->setTitle('Флиппост');

// The actual data

//соответствие заголовков и поле
$fields['Накладная'] = 'wb_no';
$fields['Принято'] = 'd_acc_txt';
$fields['Доставлено'] = 'dod_txt';
$fields['Получил'] = 'rcpn';
$fields['Подтв.'] = 'p_d_in_txt';
$fields['ORG'] = 'org';
$fields['DEST'] = 'dest';
$fields['Услуга'] = 't_srv';
$fields['Отправитель'] = 's_co';
$fields['Получатель'] = 'r_co';
$fields['Мест'] = 'pcs';
$fields['Вес'] = 'wt';
$fields['Об.вес'] = 'vol_wt';

$rowNo = 1;
$startColNo = 1;

function cellsToMergeByColsRow($start = -1, $end = -1, $row = -1){
	$merge = 'A1:A1';
	if($start>=0 && $end>=0 && $row>=0){
		$start = PHPExcel_Cell::stringFromColumnIndex($start);
		$end = PHPExcel_Cell::stringFromColumnIndex($end);
		$merge = "$start{$row}:$end{$row}";
	}
	return $merge;
}

$startColNo = 0;
foreach ($fields as $f => $value) {
	setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);
	$worksheet->setCellValueByColumnAndRow($startColNo++, $rowNo, $f);
}


$rowNo++;

while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
	//пишем данные
	if($filter == 'all' || $row['dir'] == $filter ){
		$startColNo = 0;
		foreach ($fields as $f => $value) {
			setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $rowStyle);            
			if ($value == 'wb_no') {
				$worksheet->setCellValueExplicitByColumnAndRow($startColNo++, $rowNo, iconv("windows-1251", "UTF-8", $row[$value]), PHPExcel_Cell_DataType::TYPE_STRING);	
			} else {
				$worksheet->setCellValueByColumnAndRow($startColNo++, $rowNo, iconv("windows-1251", "UTF-8", $row[$value]));
			}
		};
		$rowNo++;
	}
}

//итоги

$startColNo = array_search('wt', array_values($fields));
$cell1 = PHPExcel_Cell::stringFromColumnIndex($startColNo).'3';
$cell2 = PHPExcel_Cell::stringFromColumnIndex($startColNo).($rowNo-1);
$worksheet->setCellValue(PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, "=SUM($cell1:$cell2)");
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

$startColNo = array_search('vol_wt', array_values($fields));
$cell1 = PHPExcel_Cell::stringFromColumnIndex($startColNo).'3';
$cell2 = PHPExcel_Cell::stringFromColumnIndex($startColNo).($rowNo-1);
$worksheet->setCellValue(PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, "=SUM($cell1:$cell2)");
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

$startColNo = array_search('pcs', array_values($fields));
$cell1 = PHPExcel_Cell::stringFromColumnIndex($startColNo).'3';
$cell2 = PHPExcel_Cell::stringFromColumnIndex($startColNo).($rowNo-1);
$worksheet->setCellValue(PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, "=SUM($cell1:$cell2)");
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

//Отдаем на скачивание
header("Content-Type:application/vnd.ms-excel");
header("Content-Disposition:attachment;filename=\"отправки Флиппост.xls\"");

$objWriter = new PHPExcel_Writer_Excel5($workbook);
$objWriter->save('php://output');

?>