<?php

namespace FlipPost;
require_once "../Excel/PHPExcel.php";
require_once "../Excel/PHPExcel/Cell/DataType.php";

use Exception;
use InvalidArgumentException;
use PHPExcel;
use PHPExcel_IOFactory;

/**
 * Class ExcelExport Class for export to Excel documents.
 * @package FlipPost Flippost namespace
 */
class ExcelExport {

    /**
     * @var array excel titles and DB fields alias.
     */
    private $_Headers;

    /**
     * @var string DB query.
     */
    private $_Query;

    /**
     * @var array Data rows style.
     */
    private $rowStyle = array(
                        'borders' => array(
                            'allborders' => array(
                                'style' => 'medium',
                                'color' => array('rgb' =>'CCCCFF'))),
                            'font' => array(
                            'name' => 'Arial',
                            'size' => 10));
    /**
     * @var array Titles row style.
     */
    private $titleStyle = array(
        'alignment' => array(
            'horizontal' => 'center',
            'vertical' => 'center'),
        'borders' => array(
            'allborders' => array(
                'style' => 'medium',
                'color' => array('rgb' =>'CCCCFF'))),
        'font' => array(
            'name' => 'Arial',
            'bold' => true,
            'size' => 10,
            'color'  => array('rgb' =>'FFFFFF')),
        'fill' => array(
            'type' => 'solid',
            'color'  => array('rgb' =>'003366')));

    public function __construct($mapHeaders, $DBQuery) {
        $this->_Headers = $mapHeaders;
        $this->_Query = $DBQuery;
    }

    /**
     * @param $workbook PHPExcel Excel book.
     * @param $isError boolean is error message
     */
    private function sendToClient($workbook, $isError) {
        header('Content-Type: application/vnd.ms-excel');

        if (!$isError)
            header("Content-Disposition:attachment;filename=\"Шаблоны.xls\"");
        else
            header("Content-Disposition:attachment;filename=\"Шаблоны.xls\"");
        header('Cache-Control: max-age=0');
        header('Cache-Control: max-age=1');

        header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
        header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT');
        header ('Cache-Control: cache, must-revalidate');
        header ('Pragma: public');
        try {
            $objWriter = PHPExcel_IOFactory::createWriter($workbook, 'Excel5');
            $objWriter->save('php://output');
        } catch (Exception $e) {
            echo "Общая ошибка формирования документа.";
        }
    }

    /**
     * @param $msg string send error to user
     * @throws \PHPExcel_Exception Excel exception.
     */
    private function printError($msg) {
        $excel = new PHPExcel();
        $workSheet = $excel->getActiveSheet();
        $workSheet -> getCellByColumnAndRow(0, 1) -> setValue(2, 2, iconv('cp1251', 'utf-8', $msg));
        $this->sendToClient($excel, true);
    }

    /**
     * Make DB query.
     * @return array Query result
     */
    private function connectToDB() {
        include_once "../dbConnect.php";
        if($this -> _Query == '')
            throw new InvalidArgumentException("Не корректно задан запрос для экспорта документа");
        return mssql_query($this -> _Query);
    }

    private function createExcelTemplate() {
        $excel = new PHPExcel();
        $worksheet = $excel -> getActiveSheet();
        for ($i = 0; $i < count($this ->_Headers); $i++) {
            $worksheet->getCellByColumnAndRow($i, 1)->setValueExplicit(iconv('cp1251', 'utf-8', $this->_Headers[$i][1]));
            $worksheet->getStyleByColumnAndRow($i, 1) -> applyFromArray($this->titleStyle);
            $worksheet -> getColumnDimensionByColumn($i) -> setAutoSize(true);
        }
        return $excel;
    }

    /**
     * Export document.
     */
    public function export() {
        try {
            $queryResult = $this->connectToDB();
            $excel = $this->createExcelTemplate();
            $lastRow = 2;
            while ($row = $resultSet = mssql_fetch_assoc($queryResult)) {
                for ($i = 0; $i < count($this->_Headers); $i++) {
                    $val = '';
                    if(strpos($this->_Headers[$i][0], ',') === false)
                        $val = $row[$this->_Headers[$i][0]];
                    else
                        $val = $row[trim(explode(',', $this->_Headers[$i][0])[0])].", ".$row[trim(explode(',', $this->_Headers[$i][0])[1])];
                    $excel->
                    getActiveSheet()->
                    getCellByColumnAndRow($i, $lastRow)->
                    setValueExplicit(iconv('cp1251', 'utf-8', $val));
                    $excel-> getActiveSheet()->getStyleByColumnAndRow($i, 1)->applyFromArray($this->rowStyle);
                    $excel-> getActiveSheet()->getColumnDimensionByColumn($i)->setAutoSize(true);
                }
                $lastRow++;
            }

            $this->sendToClient($excel, false);
        } catch (Exception $e) {
            $this->printError("Не удалось сформировать документ. ". $e -> getMessage());
        }
    }
}