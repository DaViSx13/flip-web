<?php
/*
* Импорт Excel таблицы в БД.
*
*/
require_once 'Excel/PHPExcel.php';
require_once 'Excel/PHPExcel/IOFactory.php';
session_name("CLIENTSESSIONID");
session_start();

if(
	isset($_REQUEST['action']) 
	&& $_REQUEST['action'] == 'getGroupTarifExample'){
		downloadFile(
					'/media/www/flip-web/fp/fpClient/srv/import/Example_calculation_tarif.xlsx',
					'Шаблон расчета тарифа.xls');
		echo "{sate: true}";
}

if(
	isset($_REQUEST['action'])
	&& $_REQUEST['action'] == 'getTarfGroupCalulate'){		
		caclculateTarifs();

}

// Отдача файла клиенту.
// $filePath Путь к файлу
// $fileName Конечное имя файла 
function downloadFile($filePath, $fileName) {
	$xls = PHPExcel_IOFactory::load($filePath);

	header('Content-Type: application/vnd.ms-excel; charset=utf-8');
	header("Content-Disposition:attachment;filename=".$fileName."");
	header("Pragma: no-cache");
	header("Expires: 0");
	ob_end_clean();
	$objWriter = PHPExcel_IOFactory::createWriter($xls, 'Excel5');
	$objWriter->save('php://output');
	
}

// Расчети тарифа
function caclculateTarifs(){
	$uploaddir = '/media/www/flip-web/fp/fpClient/temp';
	if(!is_dir($uploaddir)) {
		mkdir($uploaddir,0777,true);
	};
	try {
		$uploadfile = $uploaddir.'/'.basename($_FILES['document']['tmp_name'].'.xls');
		if(move_uploaded_file($_FILES['document']['tmp_name'], $uploadfile)) {
			$xls = PHPExcel_IOFactory::load($uploadfile);

			$xls->setActiveSheetIndex(0);
			$aSheet = $xls->getActiveSheet();
			$tables[] = $aSheet->toArray();
			$iterationCount = 0;
			include "dbConnect.php";
			$i = 2;

			foreach($aSheet->toArray() as $row) {
				if($iterationCount == 0) {
					$aSheet->setCellValue('G1', "Стоимость");
					$aSheet->setCellValue('H1', "Срок доставки");
					$aSheet->duplicateStyle($aSheet->getStyle('F1'), 'G1:H1');
					$iterationCount++;
					continue;
				} 
			
				$cityFrom 	= getCity(strtolower($row[0]));
				$cityTo 	= getCity(strtolower($row[1]));
				$weight 	= $row[2];
				$lenght 	= $row[3];
				$height 	= $row[4];
				$width 		= $row[5];

				$planno = $_SESSION['xPlanno'] ? $_SESSION['xPlanno'] : 1;
				$volwt = ($width * $height * $lenght )/6000;
				if ($weight<$volwt) $weight = $volwt;	
				$styleArray = array(
									'font'  => array(
										'bold'  => true,
										'color' => array('rgb' => 'FF0000'),
										'size'  => 11,
										'name'  => 'Verdana'
									));
				if(!isset($cityFrom)) {
					$aSheet->setCellValue('G'.$i, "Не найден 'Город из'");
					$aSheet->getStyle('G'.$i)->applyFromArray($styleArray);
					$i++;
					continue;
				}
				if(!isset($cityTo)) {
					$aSheet->setCellValue('G'.$i, "Не найден 'Город до'");
					$aSheet->getStyle('G'.$i)->applyFromArray($styleArray);
					$i++;
					continue;
				}
				$query = "exec wwwAPIgetTarif @org='{$cityFrom}', @dest = '{$cityTo}', @wt = {$weight}, @planno = {$planno}, @t_pak='{$_REQUEST['isDocument']}'";	
				echo $query;
				$res = sendRequest($query);
				if (is_resource($res) === TRUE) {			
				while($row = mssql_fetch_assoc($res)){ 
					echo $row['tarif'].' '.$row['delivery'].' - '.$row['deliverymin'].' '.'G'.$i;
					$aSheet->setCellValue('G'.$i, $row['tarif'].' руб.');
					if(isset($row['deliverymin'])){
						$aSheet->setCellValue('H'.$i, $row['delivery'].' - '.$row['deliverymin'].' раб. дней');
					} else {
						$aSheet->setCellValue('H'.$i, $row['delivery'].' раб. дней');
					}
					
					
				}
				} else {
					$aSheet->setCellValue('G'.$i, "Ошибка запроса");
				}
				$i++;
			}
		$aSheet->getStyle("A1:H".($i - 1))->applyFromArray(
		array(
				'borders' => array(
					'allborders' => array(
						'style' => PHPExcel_Style_Border::BORDER_THIN,
						'color' => array('rgb' => 'b452bf')
					)
				)
			)
		);	

		$objWriter = PHPExcel_IOFactory::createWriter($xls, 'Excel5');
		$objWriter->save($uploadfile);
		downloadFile($uploadfile, 'Групповой расчет.xls');
		unlink($uploadfile);
	} else {
		echo '{"success": false}';
	} 
	} catch (exception $e) {
    echo '{"success": false}';
}	
	echo '{"success": true, "\'Групповой расчет.xls\'" }';	
}

// Получает город
// $city Название города
function getCity($city) {	
	$query = 'exec wwwGetCity @pName = \''.$city.'\'';
	$res = sendRequest($query);
    if (is_resource($res) === TRUE) {
		
    while($row = mssql_fetch_assoc($res)){ 
		
        $result = $row['cityCode'];
    }
	} else {
		echo '{"success": false}';
	}

return  $result;		
}

// Отправлят запрос в базу
// $query Запрос
function sendRequest($query) {
	$query = utf8_to_win1251($query);
    $query = stripslashes($query);

	try {
		if (!isSessionActive()){
			throw new Exception('Сеанс завершен. Обновите страницу.');
		};
$qry = <<<EOD
-- user={$_SESSION['xUser']} dbAct=\'getCity\'} 
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

    include "dbConnect.php";
	return mssql_query($qry);
}
catch (exception $e) {
    echo '{"success": false}';
}
}

// Проврка сессии
function isSessionActive(){
	return isset($_SESSION['xUser']);
}

// Конвертация строки
// $str Строка
function utf8_to_win1251($str){
	ini_set('mbstring.substitute_character', "none");
	return mb_convert_encoding($str, "windows-1251", "utf-8");
}
?>