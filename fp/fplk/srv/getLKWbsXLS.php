<?php
require_once dirname(__FILE__) . '/Excel/PHPExcel.php';
require_once "secureCheck.php";
include 'dbConnect.php';
require_once "CellStyle.php";

function setCellStyle($sheet, $cell, $arrstyle){	
	$sheet->getStyle($cell)->applyFromArray($arrstyle);
}

set_time_limit(300);

$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
$bdate = $_REQUEST['bdate'];
$edate = $_REQUEST['edate'];



$query = "exec wwwLKgetWebWbs @from='{$bdate}', @to='{$edate}', @clientID={$ag}";


$qry = <<<EOD

BEGIN TRY

{$query};

END TRY
BEGIN CATCH
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'E1: '+ ERROR_MESSAGE()
	RAISERROR (@ErrorMessage, -- Message text.
               16, -- Severity.
               1 -- State.
               );
END CATCH
EOD;

$result=mssql_query($qry);

// Creating a workbook
$workbook = new PHPExcel();
$workbook->setActiveSheetIndex(0);

$worksheet = $workbook->getActiveSheet();
$worksheet->setTitle('Флиппост');
$workbook->getProperties()->setCreator("FlipPost")
							 ->setLastModifiedBy("FlipPost")							 
							 ->setSubject("Office Document")
							 ->setDescription("Document for MSOffice XLS.")							 
							 ->setCategory("Office Document");

//соответствие заголовков и полей
$fields['№ Накладной'] = 'wb_no';
$fields['Заказ'] = 'ord_no';
$fields['Дата'] = 'date_in';


$fields['Отправитель'] = 's_co';
$fields['Контактное лицо '] = 's_name';
$fields['ORG'] = 'org';
$fields['Адрес '] = 's_adr';
$fields['Телефон '] = 's_tel';
$fields['EMAIL '] = 's_mail';
$fields['Примечание '] = 's_ref';

$fields['Получатель'] = 'r_co';
$fields['Контактное лицо'] = 'r_name';
$fields['DEST'] = 'dest';
$fields['Адрес'] = 'r_adr';
$fields['Телефон'] = 'r_tel';
$fields['EMAIL'] = 'r_mail';
$fields['Примечание'] = 'r_ref';

$fields['Сумма страховки'] = 'ord_no';
$fields['Вид оплаты'] = 'metpaym';
$fields['Платильщик'] = 'payr';

$fields['Число мест'] = 'pcs';
$fields['Тип груза'] = 'type';
$fields['Вес'] = 'inssum';
$fields['V вес'] = 'vol_wt';

$fields['Описание'] = 'descr';



$rowNo = 2;
$startColNo = 0;
foreach ($fields as $f => $value) {
    if($value == 's_co') {

        $worksheet->mergeCellsByColumnAndRow($startColNo, $rowNo - 1, $startColNo + 6, $rowNo - 1);
        $worksheet->setCellValueByColumnAndRow($startColNo, $rowNo - 1, "Отправитель");
        setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).'1', $titleStyle);
    }

    if($value == 'r_co') {
        $worksheet->mergeCellsByColumnAndRow($startColNo, $rowNo - 1, $startColNo + 6, $rowNo - 1);
        $worksheet->setCellValueByColumnAndRow($startColNo, $rowNo - 1, "Получатель");
        setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).'1', $titleStyle);
    }

	setCellStyle($worksheet, PHPExcel_Cell::stringFromColumnIndex($startColNo).$rowNo, $titleStyle);

    $worksheet->getColumnDimensionByColumn($startColNo)->setAutoSize(true);
	$worksheet->setCellValueByColumnAndRow($startColNo++, $rowNo, $f);
}

$rowNo = 3;

while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
        $startColNo = 0;

		foreach ($fields as $f => $value) {
            switch ($value) {
                default:
                    $worksheet->setCellValueExplicitByColumnAndRow($startColNo++, $rowNo, iconv("windows-1251", "UTF-8", $row[$value]), PHPExcel_Cell_DataType::TYPE_STRING);
                    break;
                case 'ord_no': case 'ord_no': case 'pcs':case 'inssum': case 'vol_wt':
                    $worksheet->setCellValueExplicitByColumnAndRow($startColNo++, $rowNo, iconv("windows-1251", "UTF-8", $row[$value]), PHPExcel_Cell_DataType::TYPE_NUMERIC);
                    break;
                case 'date_in':
                    $time = strtotime($row[$value]);
                    $newformat = date('d.m.Y', $time);

                    $worksheet->setCellValueExplicitByColumnAndRow($startColNo++, $rowNo, iconv("windows-1251", "UTF-8", $newformat), PHPExcel_Cell_DataType::TYPE_STRING);
                    break;
                case 'metpaym':
                    $val = ($row[$value]== 'INV') ? "По счету" : "Наличными";
                    $worksheet->setCellValueByColumnAndRow($startColNo++, $rowNo, $val);
                    break;
                case 'type':
                    $val = ($row[$value] != 1) ? "Не документ" : "Документ";
                    $worksheet->setCellValueByColumnAndRow($startColNo++, $rowNo, $val);
                    break;
                case 'payr':
                    $val = ($row[$value] == 1) ? "Отправитель" : "Получатель";
                    $worksheet->setCellValueByColumnAndRow($startColNo++, $rowNo, $val);
                    break;
            }
		}

		$rowNo++;
}

$sharedStyle1 = new PHPExcel_Style();
$lastRow = $rowNo-1;
$sharedStyle1->applyFromArray($rowStyle);
$worksheet->setSharedStyle($sharedStyle1, "A3:BB{$lastRow}");

//Отдаем на скачивание
// Redirect output to a client’s web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header("Content-Disposition:attachment;filename=\"отправки Флиппост.xls\"");
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');

// If you're serving to IE over SSL, then the following may be needed
header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header ('Pragma: public'); // HTTP/1.0

//PHPExcel_Calculation::getInstance($workbook)->cyclicFormulaCount = 1;
$objWriter = PHPExcel_IOFactory::createWriter($workbook, 'Excel5');
$objWriter->save('php://output');
exit;

?>