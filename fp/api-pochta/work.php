<?php
/*
с uft-8 в deplhi какая-то непонятная проблема при запуске планировщиком.
отвечам в windows-1251
*/

//header("Content-type: text/plain; charset=utf-8");
header("Content-type: text/plain; charset=windows-1251");
include "errorhandler.php";
define('EOL', "\r\n");

$wbno = $_REQUEST['wbno'];
$tracknumber = $_REQUEST['tracknumber'];
/*
print "wbno={$wbno}=\n";
print "tracknumber={$$tracknumber}=\n";
print empty($tracknumber)."\n";
print empty($wbno)."\n";
print "zzzzzzzzzzzzzzzzzzzzzz\n";
*/
//$wbno = '5525510086';
//$wbno = '5555504216';

$result_str = '';
//$result_str = 'Привет' . EOL;
$result_info = '';
$result_track = '';
$barcode = $tracknumber;


if( !empty($wbno) and empty($tracknumber) ){
	/* если есть номер накладной, а трекномера нет, то запрос в АПИ отправки */
	//print "запрос в АПИ отправки\n";
	
	$pochta_response = get_pochta_response($wbno);

	//print $pochta_response;
	/*
	$resp_obj = json_decode($pochta_response);
	if(is_array($resp_obj) && count($resp_obj)>0){
		$barcode = json_decode($pochta_response)[0]->barcode;
		//print $barcode;
	}
	*/
	$result_info = get_shipment_info($pochta_response);
	$result_str = $result_str . $result_info;
	
} elseif ( !empty($tracknumber) ){
	/* если есть трекномер, то запрос в АПИ отслеживания */
	//print "запрос в АПИ отслеживания\n";
	
	//$result_track = get_tracking_info($barcode);
	//$result_str = $result_str . $result_track;
} else {
	$result_str = 'ОШИБКА=не заданы параметры';
}

print utf8_to_win1251($result_str);

//functions

function get_tracking_info($barcode){
	$response = get_tracking_response($barcode);
	//print $response;
	$result = json_decode($response);
	
	$res_str = '';
	//print $result->faultcode;
	if($result->faultcode){
		//$res_str = 'ОШИБКА=' . $response;
		$res_str = 'ОШИБКА=' . json_encode($response, JSON_UNESCAPED_UNICODE);
		//return $res_str;
	}
	else{
		$hr = $result->OperationHistoryData->historyRecord;
		if( $hr ){
			if( is_array($hr) ){
				$last = end( $hr );
			}else {
				$last = $hr;
			}

			$OperDate = $last->OperationParameters->OperDate;
			//print "\nOperDate={$OperDate}\n";
			if($OperDate <>''){
				//преобразуем дату в нужный формат у учетом пояса
				$date = date_create_from_format("Y-m-d\TH:i:s.uP", $OperDate);
				$OperDate = strftime('%F %T', $date->getTimestamp());
			}

			$res_str = "OperAttrName=" . $last->OperationParameters->OperAttr->Name . EOL
					. "OperAttrId=" . $last->OperationParameters->OperAttr->Id . EOL
					. "OperTypeName=" . $last->OperationParameters->OperType->Name . EOL
					. "OperTypeId=" . $last->OperationParameters->OperType->Id . EOL
					. "OperDate=" . $OperDate// . EOL
			;
		};
	}
	return $res_str;
}

function get_tracking_response($barcode){
	//$barcode = '80083427002600';
	$login = 'xsIuxpTOiSHqGJ';
	$password = 'NQ8oLmRsPiyX';

	$wsdlurl = 'https://tracking.russianpost.ru/rtm34?wsdl';
	$client2 = '';

	$client2 = new SoapClient($wsdlurl, array('trace' => 1, 'soap_version' => SOAP_1_2));

	$params3 = array ('OperationHistoryRequest' => array ('Barcode' => $barcode, 'MessageType' => '0','Language' => 'RUS'),
					  'AuthorizationHeader' => array ('login'=>$login,'password'=>$password));
	$res_str = '';
	
	try{
		$result = $client2->getOperationHistory(new SoapParam($params3,'OperationHistoryRequest'));
		$res_str = json_encode($result, JSON_UNESCAPED_UNICODE);
		//$res_str = json_encode($result);
	}catch (Exception $e)
		{
			$res_str = json_encode($e, JSON_UNESCAPED_UNICODE);
			//$res_str = json_encode($e);
			//echo 'Выброшено исключение: ',  $e->getMessage(), "\n";
		};
	return $res_str;
}


function get_shipment_info($response){
	global $wbno;
	//$response = get_pochta_response($wbno);

	//print $response;
	//var_dump(json_decode($response));

	//в ответе д.б. json
	//парсим его
	$resp_obj = json_decode($response);
	$resp_str = '';

	if (is_object($resp_obj) ){ //плохой ответ - объект
		$resp_str = "ОШИБКА={$wbno} : " . $response;
	} elseif ( is_array($resp_obj) ){ //хороший ответ - массив
		if( count($resp_obj) == 0){
			$resp_str = "ОШИБКА={$wbno} : Отправление не найдено";
		} else {
			$resp_obj = $resp_obj[0];
			$resp_str = "wbno=" . $resp_obj->{'order-num'} . EOL 
					  . "barcode=" . $resp_obj->barcode . EOL 
					  . "weight=" . $resp_obj->mass// . EOL 
					;		
		};
		
	};

	return $resp_str;
}


function get_pochta_response($wbno){

	$url = 'https://otpravka-api.pochta.ru/1.0/shipment/search';
	$token = 'AccessToken SSSmrP_Ak_qdDFuB0Q3rL6PiK03rMIeI'; //Authorization
	//{"status":"ERROR","message":"Error token value not found"}
	$key = 'Basic TUdvbG9zZW5rb0BmbGlwcG9zdC5jb206MjIwMjgy'; //X-User-Authorization
	//{ "timestamp" : "2018-09-08T14:38:30+0300", "status" : 500, "error" : "Internal Server Error", "message" : "Last unit does not have enough valid bits", "path" : "/1.0/shipment/search" }

	$headers = [
		"Authorization: {$token}",
		"X-User-Authorization: {$key}",
		"Content-Type : application/json;charset=UTF-8"
	];

	//var_dump($url);

	$options = array(
		CURLOPT_HTTPHEADER => $headers,
	);

	$get = array(
		'query' => $wbno
	);
	
	try{
		$response = curl_get($url, $get, $options);
	}catch (Exception $e)
		{   //надо вернуть объект-ошибку
			
			$curl_error = array('CURL_ERROR' => $e->getMessage());
			$curl_error = (object) $curl_error;
			//echo json_encode($curl_error, JSON_UNESCAPED_UNICODE);
			//$res_str = json_encode($e, JSON_UNESCAPED_UNICODE);
			//$response = json_encode($e);
			$response = json_encode($curl_error, JSON_UNESCAPED_UNICODE);
			//echo 'Выброшено исключение: ',  $e->getMessage(), "\n";
		};
		
	return $response;
}

/** 
* Send a GET requst using cURL 
* @param string $url to request 
* @param array $get values to send 
* @param array $options for cURL 
* @return string 
*/ 
function curl_get($url, array $get = NULL, array $options = array()) 
{    
	$defaults = array( 
        CURLOPT_URL => $url. (strpos($url, '?') === FALSE ? '?' : ''). http_build_query($get), 
        CURLOPT_HEADER => 0, 
        CURLOPT_RETURNTRANSFER => TRUE, 
        CURLOPT_TIMEOUT => 10 
		//, CURLOPT_FAILONERROR => true
    ); 
    
    $ch = curl_init(); 
    curl_setopt_array($ch, ($options + $defaults)); 
	$result = curl_exec($ch);
    if($result === false) 
    { 
		//print 'curl_error<br/>';
        //print curl_error($ch);
		//trigger_error(curl_error($ch)); 
		throw new Exception(curl_error($ch)); 
		
    } 
	/*
	print 'result<br/>';
	var_dump( $result);
	print 'curl_error<br/>';
	print curl_error($ch);
	print 'END========<br/>';
	*/
    curl_close($ch); 
    return $result; 
	
} 

function utf8_to_win1251($str){
	//ищем способ конвертации без ошибок
	//для примера левых символов
	//$str = "‎89104260898";
	//$str = "Санкт-Петербург, Малый пр., В.О., дом ¹57";	
	
	//IGNORE на PHP5.5 все равно выдает NOTICE и возвращает пустую строку
	//return iconv("UTF-8", "windows-1251//IGNORE", $str);
	
	//TRANSLIT работает без ошибок, левые символы заменяет на ?
	//return iconv("UTF-8", "windows-1251//TRANSLIT", $str);
	
	//без ini_set работает как TRANSLIT, с ним так, как должен работать IGNORE
	ini_set('mbstring.substitute_character', "none");
	return mb_convert_encoding($str, "windows-1251", "utf-8");
}

?>

