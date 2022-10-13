<?php
$file = $_GET['file'];
$dir = '../import_2/generated/'.$file;

header('Content-Type: application/vnd.ms-excel');

header("Content-Disposition:attachment;filename=\"Результат импорта.xls\"");
header('Cache-Control: max-age=1');

header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Cache-Control: cache, must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($dir));
readfile($dir);
exit();







