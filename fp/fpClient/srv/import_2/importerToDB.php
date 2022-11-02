<?php
/**
 * Class importerToDB
 *
 * @author    		a.nikitaev
 * @description		
 */
require_once('filesInitializer.php');
require_once('queryBuilder.php');
require_once('dataInserter.php');
require_once('response.php');
require_once('tplStore.php');
require_once('../Excel/PHPExcel.php');
require_once('../Excel/PHPExcel/Writer/Excel5.php');
error_reporting(E_ERROR);

class importerToDB
{
    /**
     * @var null Загруженый файл для обработки.
     */
    var $file;

    /**
     * @var string Локатор процедуры для обработки данных в БД.
     */
    var $action;

    /**
     * @var string путь к сгенерированным отчетам.
     */
    var $generatedFolder = '../tmpfolder';

    /**
     * Конструктор.
     */
    public function importerToDB()
    {
        $this->file = null;
        $this->tpl = null;
        $this->action = null;
    }

    /**
     * Ипорт данных.
     */
    public function import()
    {
        $this->deleteOldFiles();
        $tpl = new tplStore();
        if ($tpl->getTpl($this->action)) {
            $handle = new filesInitializer($this->file);
            if ($handle->uploaded) {
                $build = new queryBuilder($handle->file_src_pathname, $tpl->getTpl($this->action), $handle->file_src_name_ext);
                if ($build->builded) {
                    $data = new dataInserter($build->query);
                    if ($data->success) {
                        try {
                            $this->fillDocumentStatus($handle->file_src_pathname, $data->data);
                        } catch (Exception $ex) {
                            $this -> sendToClient('Ошибка формирования результата импорта. Сообщение - '.$ex->getMessage(), true);
                        }

					} else {
                        $this -> sendToClient('Ошибка записи данных импорта в базу данных. Сообщение - '.$data->msg, true);
                    }
                } else {
                    $this -> sendToClient('Не удалось сформировать запрос в базу данных. Сообщение - '.$build->error, true);
                }
            } else {
                $this -> sendToClient('Ошибка загрузки файла ля импорта. Сообщение - '.$handle->error, true);
            }
        } else {
            echo 'Неправильно указан шаблон или такой шаблон импорта не существует! ('.$this->action.')';
        }
    }

    /**
     * Заполняет документ результатами обработки.
     * @param $filePath string Путь к файлу закрузки
     * @param $data array Результаты обработки полученные из запроса к БД.
     * @throws PHPExcel_Exception Возникает при ошибке обработки Excel файла
     * @throws PHPExcel_Reader_Exception Возникает при ошибке чтения Excel файла
     */
    private function fillDocumentStatus($filePath, $data)
    {
        $excel = PHPExcel_IOFactory::load($filePath);
        $worksheet = $excel->getActiveSheet();
        $lastColumn = 0;
        $lastRow = 2;
        $hasIssue = false;
        for($i = 1; $i < 100; $i++) {
            $val = $worksheet->getCellByColumnAndRow($i)->getValue();
            if($val === null || $val === '') {
                $lastColumn = $i;
                break;
            }
        }

        $worksheet-> getColumnDimensionByColumn($lastColumn) -> setAutoSize(true);
        $worksheet-> getColumnDimensionByColumn($lastColumn + 1) -> setAutoSize(true);

        foreach ($data as $index) {
            $stat = ''.iconv("windows-1251", "UTF-8", $index['stat']);
            $mess = ''.iconv("windows-1251", "UTF-8", $index['mess']);
            if($stat === 'Не обработан')
                $hasIssue = true;
            $worksheet->getCellByColumnAndRow($lastColumn, $lastRow)->setValue($stat);
            $worksheet->getCellByColumnAndRow($lastColumn + 1, $lastRow)->setValue($mess);
            $lastRow++;
        }

        try {
            $dir = 'template-'.date('m_d_Y_h_i_s', time()).'_'.rand(1000, 10000).'-import.xls';
            $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel5');

            $objWriter->save($this -> generatedFolder.'/'.$dir);
            $this -> sendToClient($dir, false, $hasIssue);
        } catch (Exception $ex) {
            $this -> sendToClient($ex->getMessage(), true);
        }
    }

    /**
     *
     * Отправка результатов импорта клиенту.
     * Если обработка импорта прошла успешно,
     * то клиенту отправляется статус('success') = true,
     * а в сообщении('message') отправляется ссылка на файл.
     *
     * если при обработке возникает ошибка,
     * то клиенту отправляется статус('success') = false,
     * а в сообщении('message') отправляется описание ошибки.
     * @param $message string Сообщение
     *
     * @param $isError bool Ошибка?
     *
     * @param bool $hasIssues Есть ли проблемы с импортом
     */
    private function sendToClient($message, $isError, $hasIssues = false)
    {
            $responseJson = new Response();
            if($isError)
                $responseJson -> success = false;
            else
                $responseJson -> success = true;

            $responseJson -> message = $message;
            $responseJson -> hasIssues = $hasIssues;
            echo json_encode($responseJson);
    }

    /**
     * Удаляет старые файлы из директории сохранения файлов-рзультатов обработки.
     */
    private function deleteOldFiles() {
        if(!file_exists($this->generatedFolder))
            mkdir($this->generatedFolder, 0777, true);

        $files = scandir($this -> generatedFolder);
        foreach ($files as $file) {
            $now = time() - filectime($file);
            if(abs($now) < (60 * 15)) {
                if(strpos(basename($file, ".xls"), "template") === 0)
                    unlink($this -> generatedFolder.'/'.$file);
            }
        }
    }
}