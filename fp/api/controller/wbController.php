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
		//$token = current($token);
		//$planno = $token['planno'];
		//$wt = trim(Flight::request()->data->weight);
		
		//$dest = trim(Flight::request()->data->destcitycode);
		/*if (strlen($dest)==0 || (!is_int($dest+0) || !is_numeric($dest))){
			throw new Exception('Поле destcitycode должно содержать код в виде целого числа из справочника городов!');
		}*/
		/*if (strlen($dest)==0 || mb_strlen($dest, 'utf-8')> 50){
			throw new Exception('Длинна поля dest должна быть больше 0 и меньше 50 символов!');
		}
		if (strlen($org)==0 || mb_strlen($org, 'utf-8')> 50){
			throw new Exception('Длинна поля org должна быть больше 0 и меньше 50 символов!');
		}*/
		//$org = trim(Flight::request()->data->orgcitycode);
		/*if (strlen($org)==0 || (!is_int($org+0) || !is_numeric($org))){
			throw new Exception('Поле orgcitycode должно содержать код в виде целого числа из справочника городов!');
		}*/
		
		//if (strlen($wt)==0 || (!is_float($wt+0) || !is_numeric($wt))){
		//	throw new Exception('Поле weight должно содержать вес в виде числа с целой и дробной частью разделенными точкой!');
		//}	
		
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
