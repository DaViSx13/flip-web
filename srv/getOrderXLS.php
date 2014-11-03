<?php
	require_once "secureCheck.php";

    include "dbConnect.php";

    require_once 'Spreadsheet/Excel/Writer.php';

$ordnum = $_REQUEST['ordnum']; 
$query = "exec wwwExportAgOrder @ordnum={$ordnum}";
$result=mssql_query($query);

// Creating a workbook
$workbook = new Spreadsheet_Excel_Writer();

// sending HTTP headers
$workbook->send('заказ Флиппост №'.$ordnum.'.xls');

// Creating a worksheet
$worksheet =& $workbook->addWorksheet('заказ Флиппост №'.$ordnum);

//формат
$format_title =& $workbook->addFormat();
$format_title->setBold();
$format_title->setColor('white'); 
$format_title->setFgColor(23+7);
$format_title->setAlign('center'); 
$format_title->setBorder(1);
$format_title->setBorderColor(17+7);

$format_data =& $workbook->addFormat();
$format_data->setBorder(1);
$format_data->setBorderColor(17+7);

$format_default =& $workbook->addFormat();
$format_default->setBorder(1);
$format_default->setBorderColor(17+7);
$format_default->setTextWrap(1);

$format_page =& $workbook->addFormat();
$format_page->setBold();
$format_page->setAlign('center');

$worksheet->setColumn ( 0 , 0 , 20 );
$worksheet->setColumn ( 1 , 1 , 40 );
$worksheet->setColumn ( 2 , 2 , 20 );
$worksheet->setColumn ( 3 , 3 , 40 );

$worksheet->setRow ( 0, 20);
$worksheet->setRow ( 12, 45);

//пишем заголовки
$row = mssql_fetch_array($result, MSSQL_ASSOC);

$worksheet->setMerge(0, 0, 0, 3 );
$worksheet->write(0, 0, 'Ангентский заказ №'.$ordnum, $format_page);

$worksheet->setMerge(1, 0, 1, 1 );
$worksheet->write(1, 0, 'Отправитель', $format_title);
$worksheet->write(1, 1, null, $format_title);

$worksheet->write(2, 0, 'ORG', $format_title);
$worksheet->write(2, 1, $row['org'], $format_data);

$worksheet->write(3, 0, 'Город', $format_title);
$worksheet->write(3, 1, $row['orgcity'], $format_data);

$worksheet->write(4, 0, 'Отправитель', $format_title);
$worksheet->write(4, 1, $row['cname'], $format_data);

$worksheet->write(5, 0, 'Адрес', $format_title);
$worksheet->write(5, 1, $row['address'], $format_data);

$worksheet->write(6, 0, 'Контакт', $format_title);
$worksheet->write(6, 1, $row['contname'], $format_data);

$worksheet->write(7, 0, 'Телефон', $format_title);
$worksheet->writeString(7, 1, $row['contphone'], $format_data);

$worksheet->write(8, 0, 'E-Mail', $format_title);
$worksheet->write(8, 1, $row['contmail'], $format_data);

$worksheet->write(9, 0, 'Факс', $format_title);
$worksheet->write(9, 1, $row['contfax'], $format_data);

$worksheet->setMerge(11, 0, 11, 1);
$worksheet->write(11, 0, 'Примечание', $format_title);
$worksheet->write(11, 1, null, $format_title);

$worksheet->setMerge(12, 0, 12, 1);
$worksheet->write(12, 0, $row['orgrems'], $format_default);
$worksheet->write(12, 1, null, $format_data);


$worksheet->write(1, 2, 'Получатель', $format_title);
$worksheet->setMerge(1, 2, 1, 3 );
$worksheet->write(1, 3, null, $format_title);

$worksheet->write(2, 2, 'DEST', $format_title);
$worksheet->write(2, 3, $row['dest'], $format_data);

$worksheet->write(3, 2, 'Город', $format_title);
$worksheet->write(3, 3, $row['destcity'], $format_data);

$worksheet->write(4, 2, 'Отправитель', $format_title);
$worksheet->write(4, 3, $row['dname'], $format_data);

$worksheet->write(5, 2, 'Адрес', $format_title);
$worksheet->write(5, 3, $row['dadr'], $format_data);

$worksheet->write(6, 2, 'Контакт', $format_title);
$worksheet->write(6, 3, $row['dcontname'], $format_data);

$worksheet->write(7, 2, 'Телефон', $format_title);
$worksheet->writeString(7, 3, $row['dcontphone'], $format_data);

$worksheet->write(8, 2, 'E-Mail', $format_title);
$worksheet->write(8, 3, $row['dcontmail'], $format_data);

$worksheet->write(9, 2, 'Факс', $format_title);
$worksheet->write(9, 3, $row['dcontfax'], $format_data);

$worksheet->setMerge(11, 2, 11, 3);
$worksheet->write(11, 2, 'Примечание', $format_title);
$worksheet->write(12, 3, null, $format_title);

$worksheet->setMerge(12, 2, 12, 3);
$worksheet->write(12, 2, $row['destrems'], $format_default);
$worksheet->write(12, 3, null, $format_data);

$worksheet->setMerge(14, 0, 14, 3 );
$worksheet->write(14, 0, 'Информация о плательщике', $format_title);
$worksheet->write(14, 1, null, $format_title);
$worksheet->write(14, 2, null, $format_title);
$worksheet->write(14, 3, null, $format_title);

$worksheet->write(15, 0, 'Кто платит', $format_title);
$worksheet->write(16, 0, $row['payr'], $format_data);

$worksheet->write(15, 1, 'Вид оплаты', $format_title);
$worksheet->write(16, 1, $row['paytype'], $format_data);

$worksheet->setMerge(15, 2, 15, 3 );
$worksheet->write(15, 2, 'Плательщик', $format_title);
$worksheet->write(15, 3, null, $format_title);
$worksheet->setMerge(16, 2, 16, 3 );
$worksheet->write(16, 2, $row['pname'], $format_data);
$worksheet->write(16, 3, null, $format_data);

$worksheet->setMerge(18, 0, 18, 2 );
$worksheet->write(18, 0, 'Информация о заказе', $format_title);
$worksheet->write(18, 1, null, $format_title);
$worksheet->write(18, 2, null, $format_title);
//$worksheet->write(18, 3, null, $format_title);

$worksheet->write(19, 0, 'Статус', $format_title);
$worksheet->write(20, 0, $row['status'], $format_data);

$worksheet->write(19, 1, '№ накладной', $format_title);
$worksheet->write(20, 1, $row['wb_no'], $format_data);

$worksheet->write(19, 2, 'Заказ принят', $format_title);
$worksheet->write(20, 2, $row['datein'], $format_data);

$worksheet->setMerge(22, 0, 22, 2 );
$worksheet->write(22, 0, 'Дата приезда', $format_title);
$worksheet->write(22, 1, null, $format_title);
$worksheet->write(22, 2, null, $format_title);
//$worksheet->write(22, 3, null, $format_title);

$worksheet->write(23, 0, 'Дата', $format_title);
$worksheet->write(24, 0, $row['courdate'], $format_data);

$worksheet->write(23, 1, 'Время с', $format_title);
$worksheet->write(24, 1, $row['courtimef'], $format_data);

$worksheet->write(23, 2, 'Время по', $format_title);
$worksheet->write(24, 2, $row['courtimet'], $format_data);

$worksheet->setMerge(26, 0, 26, 3 );
$worksheet->write(26, 0, 'Информация о грузе', $format_title);
$worksheet->write(26, 1, null, $format_title);
$worksheet->write(26, 2, null, $format_title);
$worksheet->write(26, 3, null, $format_title);

$worksheet->write(27, 0, 'Тип груза', $format_title);
$worksheet->write(28, 0, $row['type'], $format_data);

$worksheet->write(27, 1, 'Кол-во', $format_title);
$worksheet->write(28, 1, $row['packs'], $format_data);

$worksheet->write(27, 2, 'Вес', $format_title);
$worksheet->write(28, 2, $row['wt'], $format_data);

$worksheet->write(27, 3, 'объемный вес', $format_title);
$worksheet->write(28, 3, $row['volwt'], $format_data);

// Let's send the file
$workbook->close();

?>