<?php
include "sql_prepare.php";
//завязка
//session_start();
header("Content-type: text/plain; charset=utf-8");
error_reporting(0);
class Response
{
    public $success = false;
    public $msg = '';
	public $data = array();
}
$response = new Response();
$errMsg = '';

$wbno_orig = $_REQUEST['wbno'];
$wbno = $wbno_orig;

//кульминация

if (!isset($_REQUEST['dbAct'])) {
    $response->msg = 'совсем не правильный запрос';
} else {
    $dbAct = $_REQUEST['dbAct'];
    //в case нужно сформировать строку sql запроса $query
    //если нужен paging установить $paging = true
    //можно задать сообщение, которое вернуть при успехе $response->msg = 'успех'

    $response->msg = 'ok';
    switch ($dbAct) {
        case 'dbTest':
            $query = "select #{req} as test";
            try {
                $query = sql_prepare::prepare($query, array('req' => $_REQUEST['test']));
            } catch (Exception $ex) {
                $error = new Response();
                $error -> success = false;
                $error -> msg = iconv("windows-1251", "UTF-8", $ex -> getMessage());
                echo json_encode($error);
                return;
            }
			//$query = "select cast(null as varchar(10)) as test";
            break;
        case 'getCountries':
            $query = "exec wwwAPIgetCountries";
            break;
        case 'getStates':
            $query = "exec wwwAPIgetStates @country='$_REQUEST[country]'";
            break;
        case 'getCities':			
			include "constants.php";			
			if (array_key_exists($_REQUEST[city], $constantCities_)) {				
				$response->success = true;
				$response->data[] = $constantCities_[$_REQUEST[city]];
				if (extension_loaded('mbstring')) {
					echo my_json_encode($response);
				} else {
					echo json_encode($response);
				}
				exit;
			}            
			$query = "/*www.flippost.com*/ exec wwwAPIgetCities @country='$_REQUEST[country]', @state = '$_REQUEST[state]', @city = '$_REQUEST[city]'";
            break;
        case 'getTarif':
			$fromSite = isset($_REQUEST['fromSite']) ? 1 : 0; //спец. расчет для калькулятора на сайте
			$CACC = $_REQUEST['CACC'] ? $_REQUEST['CACC'] : '';
			$weight = $_REQUEST['weight'] ? $_REQUEST['weight'] : 0.1;
			//$weight = $_REQUEST['weight'];
			if (!is_numeric($weight)) 
				{ $errMsg = 'weight - не число!!!';	
				} 
				else {
				$query = "exec wwwAPIgetTarif @org='$_REQUEST[org]', @dest = '$_REQUEST[dest]', @wt = {$weight}, @fromSite={$fromSite}, @CACC='{$CACC}'";
				}
            break;
        case 'getWb':
            $query = "exec wwwAPIgetWb @wbno='$wbno'";
            break;
        case 'getWbEx':
            $query = "exec wwwAPIGetWbEx @wbno='$wbno'";
            break;
        case 'getTrackInfo':
            $query = "exec wwwAPIGetWbTrackingInfo @wbno='$wbno'";
            break;
	    }

    if (!isset($query)) {
        $response->msg = 'не правильный запрос: '.$errMsg;
    } else {
        echo $query;
        $query = iconv("UTF-8", "windows-1251", $query);
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

					$row = array_change_key_case($row);
					
                    $response->data[] = $row;
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
                //$response->data = $query;
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
?>