<?php
/*закрузка файла с сервера*/   
$file = ("tmpfolder/tarif_20160201.xls");
$rName='Тарифы ФлипПост с 01.02.2016.xls';
header ("Content-Type: application/octet-stream");
header ("Accept-Ranges: bytes");
header ("Content-Length: ".filesize($file)); 
header ("Content-Disposition: attachment; filename=\"$rName\""); 
readfile($file);

?>
