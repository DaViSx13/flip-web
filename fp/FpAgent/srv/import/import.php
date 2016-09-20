<?php
/*
* Импорт Excel таблицы в БД.
*
*/
require_once('importerToDB.php');
session_start();
error_reporting(0);

if (!ini_get('file_uploads')){
	ini_set('file_uploads', '1');
}
$importer = new importerToDB();
$importer->file = $_FILES['uploadFile'];
$importer->action = $_POST['act'];
$importer->import();

?>