<?php
class Response
{
	public $status = 'fail';    
	public $data = null;
}
class wbController{

   public static function getWBPDF($wb_no){    
	$token1 = $_SERVER["HTTP_TOKEN"];
	
	$token = Flight::checkToken($token1);
	$response = new Response();
	if(isset($token)){				
		$sql = "exec wwwAPIgetWbPDF @wbno='$wb_no', @token = '$token1'";		
		$result = Flight::db()->query($sql);
		$response->data = $result;		
		$response->status = 'success';
	} else {
		$response->data = NULL;
		$response->status = 'fail';
	}	
   echo Flight::json($response);
  }
}
