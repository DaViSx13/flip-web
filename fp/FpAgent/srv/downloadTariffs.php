<?php
/*закрузка тарифов с сервера: для корректной работы на сервере должны быть файлы с тарифами TariffsFlipPost<номер тарифа в таблице Klient поле PlanNo>.xls*/
session_name($_REQUEST["se"]."AGENTSESSIONID");
session_start();
$agp = $_SESSION['xAgentPlanNo'];
$file = ("tmpfolder/tariffsflippost20221201_plan_{$agp}.xlsx");
$rName='Тарифы ФлипПост с 01.12.2022.xlsx';
header ("Content-Type: application/octet-stream");
header ("Accept-Ranges: bytes");
header ("Content-Length: ".filesize($file)); 
header ("Content-Disposition: attachment; filename=\"$rName\""); 
readfile($file);
?>
