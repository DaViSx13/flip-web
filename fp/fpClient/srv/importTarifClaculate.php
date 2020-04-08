<?php
/**
 * Групповой расчет тарифа.
 */
require_once 'Excel/PHPExcel.php';
require_once 'Excel/PHPExcel/IOFactory.php';
session_name("CLIENTSESSIONID");
session_start();

if (!isset($_REQUEST['action'])) {
    echo "echo '{\"success\": false}'";
} else {
    switch ($_REQUEST['action']) {
        case 'getGroupTarifExample':
            try {
                generateExample();
            } catch (exception $e) {
                echo '{"success": false}';
            }
        break;
        case 'getTarfGroupCalulate':
            calculateTariff();
        break;
        case 'downloadCalculated':
            try {
                if(!isset($_REQUEST['filename'])) {
                    echo '{"success": false}';
                } else {
                    downloadCalc($_REQUEST['filename']);
                }
                downloadCalc();
            } catch (exception $e) {
                echo '{"success": false}';
            }
        break;
    }
}

function downloadCalc($filename) {
    $xls = PHPExcel_IOFactory::load(getFileTempDir()."/".$filename);
    downloadFile($xls, "Результат расчета.xls");
    unlink(getFileTempDir()."/".$filename);
}

/**
 * Отдача файла клиету
 * @param $file 'Путь до файла'
 * @param $fileName 'Имя файла'
 * @throws PHPExcel_Reader_Exception Пропуск исключений чтения
 * @throws PHPExcel_Writer_Exception Пропуск исключений записи
 */
function downloadFile($file, $fileName) {
	header('Content-Type: application/vnd.ms-excel; charset=utf-8');
	header("Content-Disposition:attachment;filename=".$fileName."");
	header("Pragma: no-cache");
	header("Expires: 0");
	ob_end_clean();
	$objWriter = PHPExcel_IOFactory::createWriter($file, 'Excel5');
	$objWriter->save('php://output');
	
}

/**
 * Возвращает стиль ошибки.
 * @return array Стиль
 */
function getErrorStyle() {
    return array(
        'font'     => array(
                            'bold'  => true,
                            'color' => array('rgb' => 'FF0000'),
                            'size'  => 11,
                            'name'  => 'Verdana'),
        'borders'  => array(
                            'allborders' => array(
                            'style'      => PHPExcel_Style_Border::BORDER_THIN,
                            'color'      => array('rgb' => 'F28A8C'))));
}

/**
 * Возвращает стиль заголовков.
 * @return array Стиль
 */
function getHeaderStyle() {
    return array(
                 // Шрифт
                'font'=>array(
                              'bold' => true,
                              'name' => 'Times New Roman',
                              'size' => 12,
                              'color'=>array(
                                             'rgb' => 'ffffff')),
                // Выравнивание
                'alignment' => array(
                                     'horizontal' => PHPExcel_STYLE_ALIGNMENT::HORIZONTAL_CENTER,
                                     'vertical' => PHPExcel_STYLE_ALIGNMENT::VERTICAL_CENTER),
                // Заполнение цветом
                'fill' => array(
                                'type' => PHPExcel_STYLE_FILL::FILL_SOLID,
                                'color'=>array(
                                               'rgb' => 'b452bf')));
}

/**
 * Возвращает стиль тела.
 * @return array Стиль
 */
function getBodyStyle() {
    return array(
                 'borders' => array(
                                    'allborders' => array(
                                                          'style' => PHPExcel_Style_Border::BORDER_THIN,
                                                          'color' => array('rgb' => 'b452bf'))));
}

/**
 * Возвращает папку временных файлов.
 * @return string Путь
 */
function getFileTempDir() {
    return '/media/www/flip-web/fp/fpClient/temp';
}

/**
 * Генерация шаблона.
 * @throws PHPExcel_Exception Пропуск исключений
 */
function generateExample() {
    $xls = new PHPExcel();
    $xls   -> setActiveSheetIndex(0);
    $sheet = $xls -> getActiveSheet();
    $sheet -> setTitle("Example");
    printTitles($sheet);

    downloadFile($xls, "Шаблон импорта.xls");
}

/**
 * Вставляет шапку.
 * @param PHPExcel_Worksheet $sheet Активный лимт
 * @throws PHPExcel_Exception Пропуск исключений
 */
function printTitles(PHPExcel_Worksheet $sheet) {
    $sheet -> setCellValue("A1", "Город отправления");
    $sheet -> getColumnDimension("A") -> setWidth(40);
    $sheet -> setCellValue("B1", "Город получения");
    $sheet -> getColumnDimension("B") -> setWidth(40);
    $sheet -> setCellValue("C1", "Вес");
    $sheet -> getColumnDimension("C") -> setWidth(15);
    $sheet -> setCellValue("D1", "Длинна");
    $sheet -> getColumnDimension("D") -> setWidth(15);
    $sheet -> setCellValue("E1", "Высота");
    $sheet -> getColumnDimension("E") -> setWidth(15);
    $sheet -> setCellValue("F1", "Ширина");
    $sheet -> getColumnDimension("F") -> setWidth(15);
    $sheet -> getRowDimension("1")    -> setRowHeight(20);
    $sheet -> getStyle("A1:F1") ->
              applyFromArray(getHeaderStyle());
}

/**
 * Проверяет Шапку из загружаемого файла.
 * @param PHPExcel_Worksheet $sheet Активный лист
 * @throws PHPExcel_Exception Пропуск исключений
 * @return int начальная строка
 */
function checkTitles(PHPExcel_Worksheet $sheet) {
    $startRow = 0;
    $firstTitleValue = $sheet -> getCell("A1") -> getValue();

    if ($firstTitleValue != 'Город отправления') {
        $sheet -> insertNewRowBefore(1);
        printTitles($sheet);
        $startRow++;
    }

    $sheet->setCellValue('G1', "Стоимость");
    $sheet->setCellValue('H1', "Срок доставки");
    $sheet->duplicateStyle($sheet->getStyle('F1'), 'G1:H1');

    return $startRow;
}

/**
 * Сохраняет загружаемый файл.
 * @return string Путь к файлу
 * @throws Exception Пропуск исключений
 */
function getSavedUploadingFileDir() {
    if(!is_dir(getFileTempDir())) {
        mkdir(getFileTempDir(),0777,true);
    }

    $uploadfile = getFileTempDir().'/'.basename($_FILES['document']['tmp_name'].'.xls');
    if(!move_uploaded_file($_FILES['document']['tmp_name'], $uploadfile)) {
        throw new Exception("Не удалось загрузить файл");
    }

    return basename($_FILES['document']['tmp_name'].'.xls');
}

/**
 * Расчет тарифа.
 */
function calculateTariff(){

    $savedFilePath = "";
	try {
            $savedFileName = getSavedUploadingFileDir();
	        $savedFilePath = getFileTempDir().'/'.$savedFileName;
			$xls = PHPExcel_IOFactory::load($savedFilePath);
			$xls->setActiveSheetIndex(0);
			$aSheet = $xls->getActiveSheet();

            $i = checkTitles($aSheet);

			include "dbConnect.php";

			$targetArray = $aSheet->toArray();
			if($i != 0) {
			   unset($targetArray[0]);
            }

            $i = 2;

			foreach($targetArray as $row) {
			    try {
                    checkData($row);
                } catch (exception $e) {
                    $aSheet->setCellValue('G'.$i, $e -> getMessage());
                    $aSheet->getStyle('G'.$i)->applyFromArray(getErrorStyle());
                    $i++;
                    continue;
                }

				$cityFrom 	= getCity(strtolower($row[0]));
				$cityTo 	= getCity(strtolower($row[1]));
				$weight 	= $row[2];
				$length 	= $row[3];
				$height 	= $row[4];
				$width 		= $row[5];

                if(!isset($cityFrom)) {
                    $aSheet->setCellValue('G'.$i, "Не найден 'Город из'");
                    $aSheet->getStyle('G'.$i)->applyFromArray(getErrorStyle());
                    $i++;
                    continue;
                }
                if(!isset($cityTo)) {
                    $aSheet->setCellValue('G'.$i, "Не найден 'Город до'");
                    $aSheet->getStyle('G'.$i)->applyFromArray(getErrorStyle());
                    $i++;
                    continue;
                }

				$planno = $_SESSION['xPlanno'] ? $_SESSION['xPlanno'] : 1;
				$volwt = ($width * $height * $length )/6000;
				if ($weight<$volwt) $weight = $volwt;	

				$query = "exec wwwAPIgetTarif @org='{$cityFrom}', @dest = '{$cityTo}', @wt = {$weight}, @planno = {$planno}, @t_pak='{$_REQUEST['isDocument']}'";
				$res = sendRequest($query);
				if (is_resource($res) === TRUE) {			
                    while($row = mssql_fetch_assoc($res)){
                        $aSheet->setCellValue('G'.$i, $row['tarif'].' руб.');
                        if(isset($row['deliverymin'])){
                            $aSheet->setCellValue('H'.$i, $row['delivery'].' - '.$row['deliverymin'].' раб. дней');
                        } else {
                            $aSheet->setCellValue('H'.$i, $row['delivery'].' раб. дней');
                        }
                    }
				} else {
					$aSheet->setCellValue('G'.$i, "Ошибка запроса");
					$i++;
					continue;
				}
				$i++;
			}
		$aSheet->getStyle("A1:H".($i - 1))->applyFromArray(getBodyStyle());
        $objWriter = PHPExcel_IOFactory::createWriter($xls, 'Excel5');
        $objWriter->save($savedFilePath);
	} catch (exception $e) {
        //echo '{"success": false}';
    }

    echo '{"success": true, "link":"'.$savedFileName.'" }';
}

/**
 * Проверка данных из загружаемого файла.
 * @param $row Строка с данными
 * @throws Exception Пропуск исключений
 */
function checkData($row) {
    if (!isset($row[0])) {
        throw new Exception("Не задан 'Город отпраления'");
    }

    if (!isset($row[1])) {
        throw new Exception("Не задан 'Город получения'");
    }

    if (!is_numeric($row[2])) {
        throw new Exception("Не корректно введены данные в столбец 'Вес");
    }

    if (!is_numeric($row[3])) {
        throw new Exception("Не корректно введены данные в столбец 'Длинна");
    }

    if (!is_numeric($row[4])) {
        throw new Exception("Не корректно введены данные в столбец 'Высота");
    }

    if (!is_numeric($row[5])) {
        throw new Exception("Не корректно введены данные в столбец 'Ширина");
    }
}

/**
 * Получение города
 * @param $city 'Город'
 * @return mixed 'Найденый город'
 */
function getCity($city) {	
	$query = 'exec wwwGetCity @pName = \''.$city.'\'';
	$res = sendRequest($query);

    if (is_resource($res) === TRUE) {
        while($row = mssql_fetch_assoc($res)) {
            return $row['cityCode'];
        }
	} else {
		echo '{"success": false}';
	}

    return '';
}

/**
 * Выполяет запрос в базу.
 * @param $query 'Запрос'
 * @return mixed 'Массив данных от сервера'
 */
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
        error_reporting(E_ERROR);
        return mssql_query($qry);
    }
    catch (exception $e) {
        echo '{"success": false}';
    }

    return '';
}

/**
 * Проверка сесии.
 * @return bool Активна ли сессия
 */
function isSessionActive(){
	return isset($_SESSION['xUser']);
}

/**
 * Конвертация строки
 * @param $str 'Водная строка'
 * @return string 'Конвертированная строка'
 */
function utf8_to_win1251($str){
	ini_set('mbstring.substitute_character', "none");
	return mb_convert_encoding($str, "windows-1251", "utf-8");
}
?>