<?php
/*закрузка тарифов с сервера: для корректной работы на сервере должны быть файлы с тарифами TariffsFlipPost<номер тарифа в таблице Klient поле PlanNo>.xls*/
session_start();
$agp = $_SESSION['xAgentPlanNo'];
$file = ("tmpfolder/tarifs20160301_plan_{$agp}.xls");
$rName='Тарифы ФлипПост с 01.03.2016.xls';
header ("Content-Type: application/octet-stream");
header ("Accept-Ranges: bytes");
header ("Content-Length: ".filesize($file)); 
header ("Content-Disposition: attachment; filename=\"$rName\""); 
readfile($file);
?>
