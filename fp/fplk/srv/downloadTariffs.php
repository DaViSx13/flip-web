<?php
/*закрузка тарифов с сервера: для корректной работы на сервере должны быть файлы с тарифами TariffsFlipPost<номер тарифа в таблице Klient поле PlanNo>.xls*/
session_name("LKSESSIONID");
session_start();
$agp = $_SESSION['xClientPlanNo'];
$file = ("tmpfolder/tarifs20171201_plan_{$agp}.xlsx");
$rName='Тарифы ФлипПост с 01.12.2017.xlsx';
header ("Content-Type: application/octet-stream");
header ("Accept-Ranges: bytes");
header ("Content-Length: ".filesize($file)); 
header ("Content-Disposition: attachment; filename=\"$rName\""); 
readfile($file);
?>
