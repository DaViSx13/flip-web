<?php

class ResponseCity
{
	public $status = 'fail';    
	public $data = null;
}

class cityController{

    public static function getCities(){    
    $sql = "/*--apitest--*/ exec wwwGetCity";
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
			
      $sql = "/*catapulto*/ exec wwwAPIgetCities @country='$country', @state = '$state', @city = '$city'";
	  $sql = Flight::utf8_to_win1251($sql);
      $sql = stripslashes($sql);
      $result = Flight::db()->query($sql);
      $response = new ResponseCity();
	$response->data = $result;
	$response->status = 'success';
    echo Flight::json($response);
    }
}