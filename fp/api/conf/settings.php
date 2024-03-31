<?php
require 'db_.php';

Flight::path("controller/");

Flight::register('db','SQLSRV_DataBase',[$config['db']['username'], $config['db']['password'], $config['db']['databasename'], $config['db']['host']]);

Flight::register("cities","cityController");

Flight::register("types","typeController");

Flight::register("orders","orderController");

Flight::register("tarifs","tarifsController");

Flight::register("catapulto","catapultoController");

Flight::register("sber","sberController");

Flight::path("model/");

Flight::register("tar", "dataTar");

Flight::register("ser", "dataSer");

Flight::register("withreturn", "dataReturn");

Flight::register("err", "dataError");

Flight::register("inv", "dataInv");

Flight::register("order", "dataOrd");

Flight::register("pdf", "dataPdf");

Flight::map('error', function(Exception $ex){
	class ErResp
{
	public $status = 'error';
    public $message = '';	
}
$erresp = new ErResp();
    // Handle error
	$msg = $ex->getMessage();
	
	if (strpos($msg, "RouteDenied") !== false)	
	{
	$msg = "Запрещено создание отправки в направлении:".str_ireplace("(severity 16)", "" ,str_ireplace( "RouteDenied", "",stristr($msg, "RouteDenied")));	
	}

	$erresp->message = $msg;
    echo Flight::json($erresp);
});

Flight::map('checkToken',function($token){
  $sql = "exec wwwAPIcheckToken @token = '$token'";
  $result = Flight::db()->query($sql);      
  return $result;     
});

Flight::map('logDB',function($msg){
	$msg = str_ireplace("'", "''", $msg);
	$sql = "EXEC wwwAPIlogDB @request = '$msg'";
    $result = Flight::db()->query($sql);      
    return $result;     
});


Flight::map('utf8_to_win1251',function ($str){
	ini_set('mbstring.substitute_character', "none");
	return mb_convert_encoding($str, "windows-1251", "utf-8");
});