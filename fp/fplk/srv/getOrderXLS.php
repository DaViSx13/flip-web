<?php
require_once 'Excel/PHPExcel.php';
include 'dbConnect.php';
require_once 'Excel/PHPExcel/Writer/Excel5.php';
require_once "CellStyle.php";

function setCellStyle($sheet, $cell, $arrstyle){	
	$sheet->getStyle($cell)->applyFromArray($arrstyle);
}

$ordnum = $_REQUEST['ordnum']; 
$query = "exec wwwExportAgOrder @ordnum={$ordnum}";
$result=mssql_query($query);

// Creating a workbook
$workbook = new PHPExcel();

// Устанавливаем индекс активного листа
$workbook->setActiveSheetIndex(0);
// Получаем активный лист
$worksheet = $workbook->getActiveSheet();
$worksheet->setTitle('заказ Флиппост №'.$ordnum);

//формат

$worksheet->getColumnDimension('A')->setWidth(20);// устанавливает столбцу ширину
$worksheet->getColumnDimension('B')->setWidth(40);
$worksheet->getColumnDimension('C')->setWidth(20);// устанавливает столбцу ширину
$worksheet->getColumnDimension('D')->setWidth(40);
$worksheet->getRowDimension(1)->setRowHeight(20);//  устанавливает строке высоту
$worksheet->getRowDimension(13)->setRowHeight(45);
$worksheet->getStyle('A13')->getAlignment()->setWrapText(true);

$worksheet->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
$worksheet->getStyle('A1')->getFont()->setBold(true);
$worksheet->getStyle('A1')->getFont()->setName('Arial');
$worksheet->getStyle('A1')->getFont()->setSize(10);

setCellStyle($worksheet, 'A2', $titleStyle);
setCellStyle($worksheet, 'B2', $titleStyle);
setCellStyle($worksheet, 'C2', $titleStyle);
setCellStyle($worksheet, 'D2', $titleStyle);

setCellStyle($worksheet, 'A3', $titleStyle);
setCellStyle($worksheet, 'A4', $titleStyle);
setCellStyle($worksheet, 'A5', $titleStyle);
setCellStyle($worksheet, 'A6', $titleStyle);
setCellStyle($worksheet, 'A7', $titleStyle);
setCellStyle($worksheet, 'A8', $titleStyle);
setCellStyle($worksheet, 'A9', $titleStyle);
setCellStyle($worksheet, 'A10', $titleStyle);

setCellStyle($worksheet, 'C3', $titleStyle);
setCellStyle($worksheet, 'C4', $titleStyle);
setCellStyle($worksheet, 'C5', $titleStyle);
setCellStyle($worksheet, 'C6', $titleStyle);
setCellStyle($worksheet, 'C7', $titleStyle);
setCellStyle($worksheet, 'C8', $titleStyle);
setCellStyle($worksheet, 'C9', $titleStyle);
setCellStyle($worksheet, 'C10', $titleStyle);

setCellStyle($worksheet, 'A12', $titleStyle);
setCellStyle($worksheet, 'B12', $titleStyle);
setCellStyle($worksheet, 'C12', $titleStyle);
setCellStyle($worksheet, 'D12', $titleStyle);

setCellStyle($worksheet, 'A15', $titleStyle);
setCellStyle($worksheet, 'B15', $titleStyle);
setCellStyle($worksheet, 'C15', $titleStyle);
setCellStyle($worksheet, 'D15', $titleStyle);

setCellStyle($worksheet, 'A16', $titleStyle);
setCellStyle($worksheet, 'B16', $titleStyle);
setCellStyle($worksheet, 'C16', $titleStyle);
setCellStyle($worksheet, 'D16', $titleStyle);

setCellStyle($worksheet, 'A19', $titleStyle);
setCellStyle($worksheet, 'B19', $titleStyle);
setCellStyle($worksheet, 'C19', $titleStyle);

setCellStyle($worksheet, 'A20', $titleStyle);
setCellStyle($worksheet, 'B20', $titleStyle);
setCellStyle($worksheet, 'C20', $titleStyle);

setCellStyle($worksheet, 'A23', $titleStyle);
setCellStyle($worksheet, 'B23', $titleStyle);
setCellStyle($worksheet, 'C23', $titleStyle);

setCellStyle($worksheet, 'A24', $titleStyle);
setCellStyle($worksheet, 'B24', $titleStyle);
setCellStyle($worksheet, 'C24', $titleStyle);

setCellStyle($worksheet, 'A27', $titleStyle);
setCellStyle($worksheet, 'B27', $titleStyle);
setCellStyle($worksheet, 'C27', $titleStyle);
setCellStyle($worksheet, 'D27', $titleStyle);

setCellStyle($worksheet, 'A28', $titleStyle);
setCellStyle($worksheet, 'B28', $titleStyle);
setCellStyle($worksheet, 'C28', $titleStyle);
setCellStyle($worksheet, 'D28', $titleStyle);

setCellStyle($worksheet, 'B3', $rowStyle);
setCellStyle($worksheet, 'B4', $rowStyle);
setCellStyle($worksheet, 'B5', $rowStyle);
setCellStyle($worksheet, 'B6', $rowStyle);
setCellStyle($worksheet, 'B7', $rowStyle);
setCellStyle($worksheet, 'B8', $rowStyle);
setCellStyle($worksheet, 'B9', $rowStyle);
setCellStyle($worksheet, 'B10', $rowStyle);

setCellStyle($worksheet, 'D3', $rowStyle);
setCellStyle($worksheet, 'D4', $rowStyle);
setCellStyle($worksheet, 'D5', $rowStyle);
setCellStyle($worksheet, 'D6', $rowStyle);
setCellStyle($worksheet, 'D7', $rowStyle);
setCellStyle($worksheet, 'D8', $rowStyle);
setCellStyle($worksheet, 'D9', $rowStyle);
setCellStyle($worksheet, 'D10', $rowStyle);

setCellStyle($worksheet, 'A13', $rowStyle);
setCellStyle($worksheet, 'B13', $rowStyle);
setCellStyle($worksheet, 'C13', $rowStyle);
setCellStyle($worksheet, 'D13', $rowStyle);

setCellStyle($worksheet, 'A17', $rowStyle);
setCellStyle($worksheet, 'B17', $rowStyle);
setCellStyle($worksheet, 'C17', $rowStyle);
setCellStyle($worksheet, 'D17', $rowStyle);

setCellStyle($worksheet, 'A21', $rowStyle);
setCellStyle($worksheet, 'B21', $rowStyle);
setCellStyle($worksheet, 'C21', $rowStyle);

setCellStyle($worksheet, 'A25', $rowStyle);
setCellStyle($worksheet, 'B25', $rowStyle);
setCellStyle($worksheet, 'C25', $rowStyle);

setCellStyle($worksheet, 'A29', $rowStyle);
setCellStyle($worksheet, 'B29', $rowStyle);
setCellStyle($worksheet, 'C29', $rowStyle);
setCellStyle($worksheet, 'D29', $rowStyle);

//пишем заголовки
$row = mssql_fetch_array($result, MSSQL_ASSOC);

$worksheet->mergeCells('A1:D1');
$worksheet->setCellValueByColumnAndRow(0, 1, 'Ангентский заказ №'.$ordnum);

$worksheet->mergeCells('A2:B2');
$worksheet->setCellValueByColumnAndRow(0, 2, 'Отправитель');//y,x,value

$worksheet->setCellValueByColumnAndRow(0, 3, 'ORG');
$worksheet->setCellValueByColumnAndRow(1, 3, $row['org']);

$worksheet->setCellValueByColumnAndRow(0, 4, 'Город');
$worksheet->setCellValueByColumnAndRow(1, 4, iconv("windows-1251", "UTF-8", $row['orgcity']));

$worksheet->setCellValueByColumnAndRow(0, 5, 'Отправитель');
$worksheet->setCellValueByColumnAndRow(1, 5, iconv("windows-1251", "UTF-8", $row['cname']));

$worksheet->setCellValueByColumnAndRow(0, 6, 'Адрес');
$worksheet->setCellValueByColumnAndRow(1, 6, iconv("windows-1251", "UTF-8", $row['address']));

$worksheet->setCellValueByColumnAndRow(0, 7, 'Контакт');
$worksheet->setCellValueByColumnAndRow(1, 7, iconv("windows-1251", "UTF-8", $row['contname']));

$worksheet->setCellValueByColumnAndRow(0, 8, 'Телефон');
$worksheet->setCellValueExplicitByColumnAndRow(1, 8, iconv("windows-1251", "UTF-8", $row['contphone']), PHPExcel_Cell_DataType::TYPE_STRING);

$worksheet->setCellValueByColumnAndRow(0, 9, 'E-Mail');
$worksheet->setCellValueByColumnAndRow(1, 9, iconv("windows-1251", "UTF-8", $row['contmail']));

$worksheet->setCellValueByColumnAndRow(0, 10, 'Факс');
$worksheet->setCellValueExplicitByColumnAndRow(1, 10, iconv("windows-1251", "UTF-8", $row['contfax']), PHPExcel_Cell_DataType::TYPE_STRING);

$worksheet->mergeCells('A12:B12');
$worksheet->setCellValueByColumnAndRow(0, 12, 'Примечание');

$worksheet->mergeCells('A13:B13');
$worksheet->setCellValueByColumnAndRow(0, 13, iconv("windows-1251", "UTF-8", $row['orgrems']));

$worksheet->mergeCells('C2:D2');
$worksheet->setCellValueByColumnAndRow(2, 2, 'Получатель');

$worksheet->setCellValueByColumnAndRow(2, 3, 'DEST');
$worksheet->setCellValueByColumnAndRow(3, 3, $row['dest']);

$worksheet->setCellValueByColumnAndRow(2, 4, 'Город');
$worksheet->setCellValueByColumnAndRow(3, 4, iconv("windows-1251", "UTF-8", $row['destcity']));

$worksheet->setCellValueByColumnAndRow(2, 5, 'Отправитель');
$worksheet->setCellValueByColumnAndRow(3, 5, iconv("windows-1251", "UTF-8", $row['dname']));

$worksheet->setCellValueByColumnAndRow(2, 6, 'Адрес');
$worksheet->setCellValueByColumnAndRow(3, 6, iconv("windows-1251", "UTF-8", $row['dadr']));

$worksheet->setCellValueByColumnAndRow(2, 7, 'Контакт');
$worksheet->setCellValueByColumnAndRow(3, 7, iconv("windows-1251", "UTF-8", $row['dcontname']));

$worksheet->setCellValueByColumnAndRow(2, 8, 'Телефон');
$worksheet->setCellValueExplicitByColumnAndRow(3, 8, $row['dcontphone'], PHPExcel_Cell_DataType::TYPE_STRING);

$worksheet->setCellValueByColumnAndRow(2, 9, 'E-Mail');
$worksheet->setCellValueByColumnAndRow(3, 9, $row['dcontmail']);

$worksheet->setCellValueByColumnAndRow(2, 10, 'Факс');
$worksheet->setCellValueExplicitByColumnAndRow(3, 10, $row['dcontfax'], PHPExcel_Cell_DataType::TYPE_STRING);

$worksheet->mergeCells('C12:D12');
$worksheet->setCellValueByColumnAndRow(2, 12, 'Примечание');

$worksheet->mergeCells('C13:D13');
$worksheet->setCellValueByColumnAndRow(12, 2, iconv("windows-1251", "UTF-8", $row['destrems']));

$worksheet->mergeCells('A15:D15');
$worksheet->setCellValueByColumnAndRow(0, 15, 'Информация о плательщике');

$worksheet->setCellValueByColumnAndRow(0, 16, 'Кто платит');
$worksheet->setCellValueByColumnAndRow(0, 17, iconv("windows-1251", "UTF-8", $row['payr']));

$worksheet->setCellValueByColumnAndRow(1, 16, 'Вид оплаты');
$worksheet->setCellValueByColumnAndRow(1, 17, iconv("windows-1251", "UTF-8", $row['paytype']));

$worksheet->mergeCells('C16:D16');
$worksheet->setCellValueByColumnAndRow(2, 16, 'Плательщик');

$worksheet->mergeCells('C17:D17');
$worksheet->setCellValueByColumnAndRow(2, 17, iconv("windows-1251", "UTF-8", $row['pname']));

$worksheet->mergeCells('A19:C19');
$worksheet->setCellValueByColumnAndRow(0, 19, 'Информация о заказе');

$worksheet->setCellValueByColumnAndRow(0, 20, 'Статус');
$worksheet->setCellValueByColumnAndRow(0, 21, iconv("windows-1251", "UTF-8", $row['status']));

$worksheet->setCellValueByColumnAndRow(1, 20, '№ накладной');
$worksheet->setCellValueByColumnAndRow(1, 21, $row['wb_no']);

$worksheet->setCellValueByColumnAndRow(2, 20, 'Заказ принят');
$worksheet->setCellValueByColumnAndRow(2, 21, $row['datein']);

$worksheet->mergeCells('A23:C23');
$worksheet->setCellValueByColumnAndRow(0, 23, 'Дата приезда');

$worksheet->setCellValueByColumnAndRow(0, 24, 'Дата');
$worksheet->setCellValueByColumnAndRow(0, 25, substr($row['courdate'], 0, 10));

$worksheet->setCellValueByColumnAndRow(1, 24, 'Время с');
$worksheet->setCellValueByColumnAndRow(1, 25, $row['courtimef']);

$worksheet->setCellValueByColumnAndRow(2, 24, 'Время по');
$worksheet->setCellValueByColumnAndRow(2, 25, $row['courtimet']);

$worksheet->mergeCells('A27:D27');
$worksheet->setCellValueByColumnAndRow(0, 27, 'Информация о грузе');

$worksheet->setCellValueByColumnAndRow(0, 28, 'Тип груза');
$worksheet->setCellValueByColumnAndRow(0, 29, iconv("windows-1251", "UTF-8", $row['type']));

$worksheet->setCellValueByColumnAndRow(1, 28, 'Кол-во');
$worksheet->setCellValueByColumnAndRow(1, 29, $row['packs']);

$worksheet->setCellValueByColumnAndRow(2, 28, 'Вес');
$worksheet->setCellValueByColumnAndRow(2, 29, $row['wt']);

$worksheet->setCellValueByColumnAndRow(3, 28, 'объемный вес');
$worksheet->setCellValueByColumnAndRow(3, 29, $row['volwt']);

//Отдаем на скачивание
header("Content-Type:application/vnd.ms-excel");
header("Content-Disposition:attachment;filename=\"заказ Флиппост №$ordnum.xls\"");

$objWriter = new PHPExcel_Writer_Excel5($workbook);
$objWriter->save('php://output');
?>