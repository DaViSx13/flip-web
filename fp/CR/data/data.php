<?php
//завязка
session_name("COURIERSESSIONID");
session_start();
header("Content-type: application/json; charset=utf-8");
error_reporting(0);
class Response
{
    public $success = false;
    public $msg = '';
}
$response = new Response();

//методы сервиса печати
$printSvcRoutes = array("printUchetList", "printOrder", "printWB");
//URL сервиса печати
$printSvcUrl = "http://10.10.10.6:8181/"; //прод
$printSvcUrl = "http://192.168.0.15:8080/";

//кульминация
if ( isset($_REQUEST['dbAct']) ) {
    $dbAct = $_REQUEST['dbAct'];
}

if (!isset($dbAct)) {
    $response->msg = 'совсем не правильный запрос';
} 
else 
	if( in_array( mb_strtolower($dbAct), array_map('mb_strtolower',$printSvcRoutes)) ){	
	/* вызов сервиса печати */
	try{
	
		$options = array(
			//CURLOPT_HTTPHEADER => $headers,
		);

		//URL
		$url = $printSvcUrl.$dbAct;

		//массив параметров
		$get = array();
		if ( strcasecmp($dbAct, 'printUchetList')==0 ){
			$get['courID'] = $_SESSION['CourID'];
		} else	if ( strcasecmp($dbAct, 'printOrder')==0 ){
			$get['orderNo'] = $_REQUEST['orderno'];
		} else	if ( strcasecmp($dbAct, 'printWB')==0 ){
			$get['wbno'] = $_REQUEST['wbno'];
		}
		
		//вызов
		$resp = curl_get($url, $get, $options);
		$response->msg = $resp;
				
		$response->success = true;
	}
	catch (exception $e) {
		$response->msg = "Ошибка сервиса печати: ".$e->getMessage();
	}	
}
else
{
    //в case нужно сформировать строку sql запроса $query
    //если нужен paging установить $paging = true
    //можно задать сообщение, которое вернуть при успехе $response->msg = 'успех'

    $response->msg = 'ok';
    switch ($dbAct) {
        case 'dbTest':
            $query = "exec wwwGetExCodes";
			//$query = "select cast(null as varchar(10)) as test";
            break;
        case 'getCourAll':
            $query = "exec wwwCourGetAll @courId=$_SESSION[CourID]";
            break;
		case 'SetPOD':
			$rcpn = $_POST['rcpn'];
			//$d = explode('.', $_POST['p_d_in']);
			//$p_d_in = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ); 
			$p_d_in = $_POST['p_d_in'];
			$query = "exec wwwSetPOD @wb_no='{$_POST[wb_no]}', @p_d_in='{$p_d_in}', @tdd='{$_POST[tdd]}', @rcpn='{$rcpn}', @user='{$_SESSION[CourLogin]}' ";
			break;
		case 'SetWB':
			$pcs_in = $_POST[pcs_in];
			$pcs_in = $pcs_in ? $pcs_in : 0;
			$orderno = $_POST[orderno];
			$orderno = $orderno ? $orderno : 0;
			$query = "exec wwwCourSetWB @wb_no='{$_POST[wb_no]}', @orderno = {$orderno}, @user='{$_SESSION[CourLogin]}', @pcs_in = {$pcs_in}";
			break;	
		case 'courLog':
			$courId = $_SESSION[CourID];
			$ano = $_POST['ano'];
			$event = $_POST['event'];
			$eventtime = $_POST['eventtime'];
			$rem = $_POST['rem']; $rem = $rem ? $rem : '';
			$query = "exec wwwSpCourLog @courId={$courId}, @ano='{$ano}', @event='{$event}', @eventtime='{$eventtime}', @rem='{$rem}' ";
			break;
    }

    if (!isset($query)) {
        $response->msg = 'не правильный запрос';
    } else {
        $query = iconv("UTF-8", "windows-1251", $query);
        $query = stripslashes($query);

        try {
            include "dbConnect.php";
            $result = mssql_query($query);
            
			
			if ($result) {

				for($i = 0; $i < mssql_num_fields($result); $i++){
					$response->fields[mssql_field_name($result, $i)] = mssql_field_type($result, $i);
				}
			
                while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
                    foreach ($row as $f => &$value) {
						if((($response->fields[$f] == 'char')||($response->fields[$f] == 'text'))&&($value)){
							$value = iconv("windows-1251", "UTF-8", $value);
						}
                    }

                    $response->data[] = array_change_key_case($row);
                }

                //$response->dvs = 'превед';
                unset($response->fields);

				//paging
				if($paging){

                    //filtering
                    if(isset($_REQUEST['filter'])){
                      $filterParams = json_decode(stripslashes($_REQUEST['filter']), true);
                      $filterKey = strtolower($filterParams[0]['property']);
                      $filterValue = strtolower($filterParams[0]['value']);

                      $response->filterKey = $filterKey;
                      $response->filterValue = $filterValue;

                      include 'filterer.php';
                      $filterer = new Filterer();
                      $response->data = $filterer->filter($response->data, $filterKey, $filterValue);

                    }

                    //sorting
                    if(isset($_REQUEST['sort'])){
                      $sortParams = json_decode(stripslashes($_REQUEST['sort']), true);
                      $sortKey = strtolower($sortParams[0]['property']);
                      $sortDir = strtolower($sortParams[0]['direction']);

                      include 'multiSort.php';
                      $multisort = new multisort();
                      $response->data = $multisort->run($response->data, $sortKey, $sortDir);
                    }

                    //paging
		  			$page = $_REQUEST['page'];
        			$start = $_REQUEST['start'];
        			$limit = $_REQUEST['limit'];
					$response->total = count($response->data);
					$response->data = array_slice($response->data, $start, $limit);
				}
				
                mssql_free_result($result);
                $response->success = true;
                
            } else {
                $response->msg = 'sql error: ' . iconv("windows-1251", "UTF-8", mssql_get_last_message());
            }
        }
        catch (exception $e) {
            $response->msg = $e->getMessage();
        }
    }
}

//финал
function my_json_encode($arr)
{
    //convmap since 0x80 char codes so it takes all multibyte codes (above ASCII 127). So such characters are being "hidden" from normal json_encoding
    array_walk_recursive($arr, create_function('&$item, $key',
        'if (is_string($item)) $item = mb_encode_numericentity($item, array (0x80, 0xffff, 0, 0xffff), "UTF-8"); '));
    return mb_decode_numericentity(json_encode($arr), array(
        0x80,
        0xffff,
        0,
        0xffff), 'UTF-8');

}

if (extension_loaded('mbstring')) {
    echo my_json_encode($response);
} else {
    echo json_encode($response);
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

?>