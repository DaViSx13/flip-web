<?php
header("Content-type: text/plain; charset=utf-8");
//include "errorhandler.php";
define('EOL', "\r\n");

/*config*/
$base_url = 'https://www.webhook.site/d42cbca0-8061-4b6d-9f51-83c4f37b3070'; //test
$base_url = 'https://cs.staging.ctplt.ru'; //test
$token = 'rIo5FDJPX9';
/*config*/



$catapulto_order_id = $_REQUEST['catapulto_order_id'];
$action = $_REQUEST['action'];
$content_xml = $_REQUEST['content_xml'];

echo 'content_xml:'.$content_xml;
/*
//debug
$catapulto_order_id="ctp123";
$action="update";
$content_xml="<content><wt>0.100</wt><cost>706.0000</cost></content>";
//debug
*/

$result_str = '';
//$result_str = 'Привет' . EOL;

if( empty($catapulto_order_id) ){
	$result_str = 'ОШИБКА=не указан catapulto_order_id';
}elseif( empty($action) ){
	$result_str = 'ОШИБКА=не указан action';
}elseif( empty($content_xml) ){
	$result_str = 'ОШИБКА=не указан content_xml';
}else{
	//работаем
	$xml = simplexml_load_string($content_xml);
	$content_json_str = json_encode($xml);	
echo 'Запрос: '.$content_json_str;
	if( $action == 'update' ){
		$result_str = ctp_update();
	}elseif( $action == 'track' ){
		$result_str = ctp_track();
	}
	
}

//$result_str = str_replace(array("\r\n", "\n", "\r"), "", $result_str);
//echo '['.$result_str.']';
echo 'Ответ: '.$result_str;


//functions

function ctp_update(){
	global $base_url, $catapulto_order_id, $content_json_str, $token;
						 
	$url  = $base_url . "/rest/v1/shipping/{$catapulto_order_id}/update/"; 
	//$url  = $base_url; //!!!!!!!!!!!!! test
	$data = $content_json_str;
	$method  = 'PUT';
	
	$headers = [
		"Content-Type: application/json"
		,"X-Token: Token {$token}"
	];

	$options = array(
		CURLOPT_HTTPHEADER => $headers,
	);
	
	return do_curl($url, $method, $data, $options);
}

function ctp_track(){
	global $base_url, $catapulto_order_id, $content_json_str, $token;
	
	$url  = $base_url . "/rest/v1/tracking/create/"; 
	//$url  = $base_url; //!!!!!!!!!!!!! test
	$data = $content_json_str;
	$method  = 'POST';
	
	$headers = [
		"Content-Type: application/json"
		,"X-Token: Token {$token}"
	];

	$options = array(
		CURLOPT_HTTPHEADER => $headers,
	);
	
	return do_curl($url, $method, $data, $options);
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
    
		//print '$defaults<br/>';
        //print_r( $defaults);

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


function do_curl($url, $method, $data, array $options = array()) 
{    
	$defaults = array( 
        //CURLOPT_URL => $url. (strpos($url, '?') === FALSE ? '?' : ''). http_build_query($get), 
		CURLOPT_URL => $url, 
        CURLOPT_HEADER => 0, 
        CURLOPT_RETURNTRANSFER => TRUE, 
        CURLOPT_TIMEOUT => 10 ,
		CURLOPT_CUSTOMREQUEST => $method,
		CURLOPT_POSTFIELDS => $data
		//, CURLOPT_FAILONERROR => true
    ); 
    
		//print '$defaults<br/>';
        //print_r( $defaults);

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

