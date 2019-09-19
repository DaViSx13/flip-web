<?php
/*
с uft-8 в deplhi какая-то непонятная проблема при запуске планировщиком.
отвечам в windows-1251

победил - возвращаю обратно uft-8
*/

header("Content-type: text/plain; charset=utf-8");
//header("Content-type: text/plain; charset=windows-1251");
include "errorhandler.php";
define('EOL', "\r\n");

$wbno = $_REQUEST['wbno'];
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
$result_track = '';

if( !empty($wbno)  ){
	/* если есть номер накладной, то запрос в АПИ */
	//print "запрос в АПИ \n";
	
	$result_str = get_plex_info($wbno);;
	
} else {
	$result_str = 'ОШИБКА=не заданы параметры';
}

//print utf8_to_win1251($result_str);
echo $result_str;

//functions

function get_plex_info($wbno){
	$response = get_plex_response($wbno);
	//print $response;
	
	$result = json_decode($response);
//print_r($result);
//print $result->{'CURL_ERROR'};
	
	$res_str = '';

	if($result->{'CURL_ERROR'}){
		$res_str = 'ОШИБКА=' . $response;
	}else{
		$data = $result->data; //array
		if(count($data) == 0){
			$res_str = 'ОШИБКА=Пустой ответ - накладная не найдена';
		}elseif($data[0]->error){
			$res_str = 'ОШИБКА=' . json_encode($data[0], JSON_UNESCAPED_UNICODE);
		}else{
			foreach ($data as $item) {

/* какая то хрень с русскими символами и preg_match
//				if( preg_match("/(Доставлено. )(.*)/i", $item->status, $matches) ){
				if( preg_match("/(Доставлено)[^а-яА-Яa-zA-Z]*([а-яА-Яa-zA-Z]+)/i", $item->status, $matches) ){
					//print('$matches');
					//print_r($item->status);
					print_r($matches);
					$res_str = $res_str . 'wbno=' . $wbno . EOL;
					$res_str = $res_str . 'RCPN=' . $matches[2] . EOL;
					$res_str = $res_str . 'DOD=' . $item->date . EOL;
				}
*/
				if( stripos($item->status, "Доставлено") !== false ){
					$res_str = $res_str . 'wbno=' . $wbno . EOL;
					$res_str = $res_str . 'RCPN=' . trim(str_replace(["Доставлено", ".",",","_", "  "], "", $item->status) ) . EOL;
					$res_str = $res_str . 'DOD=' . $item->date . EOL;
				}
				else{
					//print('Нет инфо о доставке');
				};
			}
		};
		
	};

	

	return $res_str;
	
	
	
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


function get_plex_response($wbno){

	$url = 'http://exdel.gbl24.ru/api/getstatus/read.php';
	$token = '906D8861-55DB-4316-B4A0-A62DD3DECA06';
	//{"data":[{"error":"100","message":"Неверный Token!!"}]}  
	//var_dump($url);
	$options = array();

	$get = array(
		'documents' => $wbno,
		'TOKEN' => $token
	);
	
	try{
		$response = curl_get($url, $get, $options);
	}catch (Exception $e)
		{   //надо вернуть объект-ошибку
			//{"CURL_ERROR":"Could not resolve host: exdel.gbl241.ru"}
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

