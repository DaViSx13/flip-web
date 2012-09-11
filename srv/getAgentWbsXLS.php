<?php
	require_once "secureCheck.php";

    include "dbConnect.php";

    require_once 'Spreadsheet/Excel/Writer.php';


$ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID']; 
if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];} 
$filter = $_REQUEST['filter'];

//$query = "exec wwwGetAgentWbs @period='20100201', @agentID=54";
$query = "exec wwwGetAgentWbs @period='$_REQUEST[newPeriod]', @agentID={$ag}, @dir='{$filter}'";
$result=mssql_query($query);

// Creating a workbook
$workbook = new Spreadsheet_Excel_Writer();

// sending HTTP headers
$workbook->send('отправки Флиппост.xls');

// Creating a worksheet
$worksheet =& $workbook->addWorksheet('Флиппост');

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

//формат
$format_title =& $workbook->addFormat();
$format_title->setBold();
$format_title->setColor('white'); 
$format_title->setFgColor(56);
$format_title->setAlign('center'); 
$format_title->setBorder(1);
$format_title->setBorderColor(22);

$format_data =& $workbook->addFormat();
$format_data->setBorder(1);
$format_data->setBorderColor(56);


$rowNo = 0;
$startColNo = 0;



//пишем заголовки

$startColNo = array_search('tar_flip_b', array_values($fields));
$worksheet->write($rowNo, $startColNo, 'тариф Флип', $format_title);
$worksheet->setMerge($rowNo, $startColNo, $rowNo, $startColNo+3 );


$startColNo = array_search('tar_ag_b', array_values($fields));
$worksheet->write($rowNo, $startColNo, 'тариф Аг', $format_title);
$worksheet->setMerge($rowNo, $startColNo, $rowNo, $startColNo+3 );

$rowNo++;

$startColNo = 0;
foreach ($fields as $f => $value) {
    $worksheet->write($rowNo, $startColNo++, $f, $format_title);
    };
    
$rowNo++;

while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
//пишем данные
    if($filter == 'all' || $row['dir'] == $filter ){
        $startColNo = 0;
        foreach ($fields as $f => $value) {
            $worksheet->write($rowNo, $startColNo++, $row[$value], $format_data);
            };
        $rowNo++;
    }
}

//итоги

$startColNo = array_search('wt', array_values($fields));
$cell1 = Spreadsheet_Excel_Writer::rowcolToCell(2, $startColNo);
$cell2 = Spreadsheet_Excel_Writer::rowcolToCell($rowNo-1, $startColNo);
$worksheet->writeFormula($rowNo, $startColNo, "=SUM($cell1:$cell2)", $format_title);


$startColNo = array_search('vol_wt', array_values($fields));
$cell1 = Spreadsheet_Excel_Writer::rowcolToCell(2, $startColNo);
$cell2 = Spreadsheet_Excel_Writer::rowcolToCell($rowNo-1, $startColNo);
$worksheet->writeFormula($rowNo, $startColNo, "=SUM($cell1:$cell2)", $format_title);

$startColNo = array_search('tar_flip_b', array_values($fields));
$cell1 = Spreadsheet_Excel_Writer::rowcolToCell(2, $startColNo);
$cell2 = Spreadsheet_Excel_Writer::rowcolToCell($rowNo-1, $startColNo);
$worksheet->writeFormula($rowNo, $startColNo, "=SUM($cell1:$cell2)", $format_title);

$startColNo = array_search('tar_flip_a', array_values($fields));
$cell1 = Spreadsheet_Excel_Writer::rowcolToCell(2, $startColNo);
$cell2 = Spreadsheet_Excel_Writer::rowcolToCell($rowNo-1, $startColNo);
$worksheet->writeFormula($rowNo, $startColNo, "=SUM($cell1:$cell2)", $format_title);

$startColNo = array_search('tar_flip_t', array_values($fields));
$cell1 = Spreadsheet_Excel_Writer::rowcolToCell(2, $startColNo);
$cell2 = Spreadsheet_Excel_Writer::rowcolToCell($rowNo-1, $startColNo);
$worksheet->writeFormula($rowNo, $startColNo, "=SUM($cell1:$cell2)", $format_title);

$startColNo = array_search('tar_ag_b', array_values($fields));
$cell1 = Spreadsheet_Excel_Writer::rowcolToCell(2, $startColNo);
$cell2 = Spreadsheet_Excel_Writer::rowcolToCell($rowNo-1, $startColNo);
$worksheet->writeFormula($rowNo, $startColNo, "=SUM($cell1:$cell2)", $format_title);

$startColNo = array_search('tar_ag_a', array_values($fields));
$cell1 = Spreadsheet_Excel_Writer::rowcolToCell(2, $startColNo);
$cell2 = Spreadsheet_Excel_Writer::rowcolToCell($rowNo-1, $startColNo);
$worksheet->writeFormula($rowNo, $startColNo, "=SUM($cell1:$cell2)", $format_title);

$startColNo = array_search('tar_ag_t', array_values($fields));
$cell1 = Spreadsheet_Excel_Writer::rowcolToCell(2, $startColNo);
$cell2 = Spreadsheet_Excel_Writer::rowcolToCell($rowNo-1, $startColNo);
$worksheet->writeFormula($rowNo, $startColNo, "=SUM($cell1:$cell2)", $format_title);


// Let's send the file
$workbook->close();

?>