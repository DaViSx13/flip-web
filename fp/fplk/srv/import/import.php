<?php
/*
* Импорт Excel таблицы в БД.
*
*/
require_once('importerToDB.php');
//session_name("LKSESSIONID");
//session_start();
error_reporting(0);
function isSessionActive(){
	return isset($_SESSION['xUser']);
}

if (!ini_get('file_uploads')){
	ini_set('file_uploads', '1');
}
//if (!isSessionActive()){
				//throw new Exception('Сеанс завершен. Обновите страницу.');
				//};
$importer = new importerToDB();
$importer->file = $_FILES['uploadFile'];
$importer->action = $_POST['act'];
$importer->import();

?>