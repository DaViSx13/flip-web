<?php
require 'db_.php';
//Flight::path("model/");

Flight::path("controller/");

Flight::register('db','SQLSRV_DataBase',[$config['db']['username'], $config['db']['password'], $config['db']['databasename'], $config['db']['host']]);

Flight::register("cities","cityController");

Flight::register("types","typeController");

Flight::register("orders","orderController");



Flight::map('error', function(Exception $ex){
	class ErResp
{
	public $status = 'error';
    public $message = '';
	//public $data = null;
}
$erresp = new ErResp();
    // Handle error
	$erresp->message = $ex->getMessage();
    echo Flight::json($erresp);
});

//Flight::register("users","userController");

//Flight::set("flight.base_url",$config['web']['base_url']);

Flight::map('checkToken',function($token){
  $sql = "exec wwwCheckToken @token = '$token'";
      $result = Flight::db()->query($sql);
      //if($result != false){
        return $result;
     // }else {
     //   return false;
     // }
});
