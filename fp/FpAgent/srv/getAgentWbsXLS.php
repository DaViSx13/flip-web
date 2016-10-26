<?php
require_once dirname(__FILE__) . '/Excel/PHPExcel.php';
require_once "secureCheck.php";
include 'dbConnect.php';
require_once "CellStyle.php";

function setCellStyle($sheet, $cell, $arrstyle){	
	$sheet->getStyle($cell)->applyFromArray($arrstyle);
}

set_time_limit(300);

$ag = isset($_REQUEST['newAgent']) ? $_REQUEST['newAgent'] : $_SESSION['xAgentID']; 
if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];} 
$filter = $_REQUEST['filter'];
$period = $_REQUEST['newPeriod'];

$query = "exec wwwGetAgentWbs @period='{$period}', @agentID={$ag}, @dir='{$filter}'";
$result=mssql_query($query);

// Creating a workbook
$workbook = new PHPExcel();
$workbook->setActiveSheetIndex(0);

$worksheet = $workbook->getActiveSheet();
$worksheet->setTitle('Флиппост_'.$period);
$workbook->getProperties()->setCreator("FlipPost")
							 ->setLastModifiedBy("FlipPost")							 
							 ->setSubject("Office Document")
							 ->setDescription("Document for MSOffice XLS.")							 
							 ->setCategory("Office Document");

// The actual data

//соответствие заголовков и полей
$fields['ИС'] = 'is_ex';
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
$fields['Вес'] = 'wt';
$fields['Об.вес'] = 'vol_wt';

$fields['баз.'] = 'tar_flip_b';
$fields['доп.'] = 'tar_flip_a';
$fields['Всего'] = 'tar_flip_t';
$fields['прим.'] = 'rem_flip';

$fields[' баз.'] = 'tar_ag_b';
$fields[' доп.'] = 'tar_ag_a';
$fields[' Всего'] = 'tar_ag_t';
$fields[' прим.'] = 'rem_ag';

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

//пишем заголовки

$startColNo = array_search('tar_flip_b', array_values($fields));
$worksheet->setCellValueByColumnAndRow($startColNo, $rowNo, 'тариф Флип');
$worksheet->mergeCells(cellsToMergeByColsRow($startColNo,$startColNo+3,$rowNo));
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo+1).$rowNo, $titleStyle);
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo+2).$rowNo, $titleStyle);
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo+3).$rowNo, $titleStyle);
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

$startColNo = array_search('tar_ag_b', array_values($fields));
$worksheet->setCellValueByColumnAndRow($startColNo, $rowNo, 'тариф Аг');
$worksheet->mergeCells(cellsToMergeByColsRow($startColNo,$startColNo+3,$rowNo));
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo+1).$rowNo, $titleStyle);
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo+2).$rowNo, $titleStyle);
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo+3).$rowNo, $titleStyle);
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

$rowNo++;

$startColNo = 0;
foreach ($fields as $f => $value) {
	setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);
	$worksheet->setCellValueByColumnAndRow($startColNo++, $rowNo, $f);	
};

$rowNo++;

while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
	//пишем данные
	if($filter == 'all' || $row['dir'] == $filter ){
		$startColNo = 0;
		
		foreach ($fields as $f => $value) {		
			if ($value == 'wb_no') {
				$worksheet->setCellValueExplicitByColumnAndRow($startColNo++, $rowNo, iconv("windows-1251", "UTF-8", $row[$value]), PHPExcel_Cell_DataType::TYPE_STRING);	
			} else {
				$worksheet->setCellValueByColumnAndRow($startColNo++, $rowNo, iconv("windows-1251", "UTF-8", $row[$value]));
			}
		};
		$rowNo++;
	}
}
$sharedStyle1 = new PHPExcel_Style();
$lastRow = $rowNo-1;
$sharedStyle1->applyFromArray($rowStyle);
$worksheet->setSharedStyle($sharedStyle1, "A3:U{$lastRow}");
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

$startColNo = array_search('tar_flip_b', array_values($fields));
$cell1 = PHPExcel_Cell::stringFromColumnIndex($startColNo).'3';
$cell2 = PHPExcel_Cell::stringFromColumnIndex($startColNo).($rowNo-1);
$worksheet->setCellValue(PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, "=SUM($cell1:$cell2)");
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

$startColNo = array_search('tar_flip_a', array_values($fields));
$cell1 = PHPExcel_Cell::stringFromColumnIndex($startColNo).'3';
$cell2 = PHPExcel_Cell::stringFromColumnIndex($startColNo).($rowNo-1);
$worksheet->setCellValue(PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, "=SUM($cell1:$cell2)");
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

$startColNo = array_search('tar_flip_t', array_values($fields));
$cell1 = PHPExcel_Cell::stringFromColumnIndex($startColNo).'3';
$cell2 = PHPExcel_Cell::stringFromColumnIndex($startColNo).($rowNo-1);
$worksheet->setCellValue(PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, "=SUM($cell1:$cell2)");
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

$startColNo = array_search('tar_ag_b', array_values($fields));
$cell1 = PHPExcel_Cell::stringFromColumnIndex($startColNo).'3';
$cell2 = PHPExcel_Cell::stringFromColumnIndex($startColNo).($rowNo-1);
$worksheet->setCellValue(PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, "=SUM($cell1:$cell2)");
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

$startColNo = array_search('tar_ag_a', array_values($fields));
$cell1 = PHPExcel_Cell::stringFromColumnIndex($startColNo).'3';
$cell2 = PHPExcel_Cell::stringFromColumnIndex($startColNo).($rowNo-1);
$worksheet->setCellValue(PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, "=SUM($cell1:$cell2)");
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

$startColNo = array_search('tar_ag_t', array_values($fields));
$cell1 = PHPExcel_Cell::stringFromColumnIndex($startColNo).'3';
$cell2 = PHPExcel_Cell::stringFromColumnIndex($startColNo).($rowNo-1);
$worksheet->setCellValue(PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, "=SUM($cell1:$cell2)");
setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

//Отдаем на скачивание
// Redirect output to a client’s web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header("Content-Disposition:attachment;filename=\"отправки Флиппост {$period}.xls\"");
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');

// If you're serving to IE over SSL, then the following may be needed
header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header ('Pragma: public'); // HTTP/1.0

$objWriter = PHPExcel_IOFactory::createWriter($workbook, 'Excel5');
$objWriter->save('php://output');
exit;

?>