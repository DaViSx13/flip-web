<?php
/*закрузка тарифов с сервера: для корректной работы на сервере должны быть файлы с тарифами TariffsFlipPost<номер тарифа в таблице Klient поле PlanNo>.xls*/
session_name("AGENTSESSIONID");
session_start();
$agp = $_SESSION['xAgentPlanNo'];
$file = ("tmpfolder/tarifs20170601_plan_{$agp}.xls");
$rName='Тарифы ФлипПост с 01.04.2016.xls';
header ("Content-Type: application/octet-stream");
header ("Accept-Ranges: bytes");
header ("Content-Length: ".filesize($file)); 
header ("Content-Disposition: attachment; filename=\"$rName\""); 
readfile($file);
?>
