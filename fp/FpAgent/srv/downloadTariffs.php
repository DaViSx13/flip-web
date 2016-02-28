<?php
/*закрузка тарифов с сервера: для корректной работы на сервере должны быть файлы с тарифами TariffsFlipPost<номер тарифа в таблице Klient поле PlanNo>.xls*/
session_start();
$agp = $_SESSION['xAgentPlanNo'];
$file = ("tmpfolder/TariffsFlipPost{$agp}.xls");
if (!file_exists($file)) {
$file = ("tmpfolder/TariffsFlipPost.xls");
};
$rName='Тарифы ФлипПост.xls';
header ("Content-Type: application/octet-stream");
header ("Accept-Ranges: bytes");
header ("Content-Length: ".filesize($file)); 
header ("Content-Disposition: attachment; filename=\"$rName\""); 
readfile($file);
?>
