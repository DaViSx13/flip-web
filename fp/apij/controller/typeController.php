<?php

class Response
{
	public $status = 'fail';    
	public $data = null;
}
class typeController{

    public static function getTypes(){
      $sql = "SELECT 'Документ' as Name, 1 as Code union select 'Не документ' as Name, 0 as Code";
	  $sql = iconv("UTF-8", "windows-1251", $sql);
      $sql = stripslashes($sql);
      $result = Flight::db()->query($sql);
	$response = new Response();
	$response->data = $result;
	$response->status = 'success';
   echo Flight::json($response);
    }
}
