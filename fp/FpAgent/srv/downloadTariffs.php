<?php
/*закрузка файла с сервера*/   
$file = ("tmpfolder/TariffsFlipPost.xls");
$rName='Тарифы ФлипПост.xls';
header ("Content-Type: application/octet-stream");
header ("Accept-Ranges: bytes");
header ("Content-Length: ".filesize($file)); 
header ("Content-Disposition: attachment; filename=\"$rName\""); 
readfile($file);

?>
