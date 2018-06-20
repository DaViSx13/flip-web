<?php

class ResponseCity
{
	public $status = 'fail';    
	public $data = null;
}

class cityController{

    public static function getCities(){    
    $sql = "exec wwwGetCity";
    $result = Flight::db()->query($sql);
	$response = new ResponseCity();
	$response->data = $result;
	$response->status = 'success';
   echo Flight::json($response);
    }

    public static function checkCities($ID){    
    $sql = "exec wwwAPIcheckCity @ID=$ID";
    $result = Flight::db()->query($sql);
	return $result;
    }
	
    public static function serchCities($city, $state, $country){
		
      $sql = "exec wwwAPIgetCities @country='$country', @state = '$state', @city = '$city'";
	  $sql = iconv("UTF-8", "windows-1251", $sql);
      $sql = stripslashes($sql);
      $result = Flight::db()->query($sql);
      $response = new ResponseCity();
	$response->data = $result;
	$response->status = 'success';
    echo Flight::json($response);
    }
}