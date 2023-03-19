<?php
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
?>