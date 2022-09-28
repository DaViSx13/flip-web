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
		if(count($data->documents) == 0){
			$res_str = 'ОШИБКА=Пустой ответ - накладная не найдена';
		}elseif($data->documents[0]->error){
			$res_str = 'ОШИБКА=' . json_encode($data->documents[0], JSON_UNESCAPED_UNICODE);
		}else{
			foreach ($data->documents[0]->checkpoints as $item) {

				if( stripos($item->point, "Доставлено") !== false ){
					$res_str = $res_str . 'wbno=' . $wbno . EOL;
					$res_str = $res_str . 'RCPN=' . trim(str_replace(["Доставлено", ".",",","_", "  "], "", $item->point) ) . EOL;
					$res_str = $res_str . 'DOD=' . $item->onDate . EOL;
				}
				else{
					//print('Нет инфо о доставке');
				};
			}
		};
		
	};

	return $res_str;
}


function get_plex_response($wbno){

	$url = 'https://api.gbl24.ru/api/v1/tracking';
    $headers = array(
      'Authorization: Basic '. base64_encode("plex:GApbbW")
    );

	//var_dump($url);
	$options = array(
		CURLOPT_HTTPHEADER => $headers,
	);

	$get = array(
		'documents' => $wbno
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
        CURLOPT_TIMEOUT => 10,
		CURLOPT_SSL_VERIFYPEER => FALSE,
		CURLOPT_SSL_VERIFYHOST => FALSE
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

