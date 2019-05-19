<?php
//завязка
//session_start();
header("Content-type: text/plain; charset=utf-8");
error_reporting(0);
class Response
{
    public $success = false;
    public $msg = '';
	public $events = array();
}
$response = new Response();
$errMsg = '';

$wbno_orig = $_REQUEST['wbno'];
$wbno = $wbno_orig;

//кульминация

if (!isset($wbno)) {
    $response->msg = 'track number is required';
} else {
	$response->number = $wbno;
	$response->oriNumber = $wbno;
	
    $dbAct = 'getTrackInfo';
    //в case нужно сформировать строку sql запроса $query
    //если нужен paging установить $paging = true
    //можно задать сообщение, которое вернуть при успехе $response->msg = 'успех'

    $response->msg = 'ok';
    switch ($dbAct) {
        case 'getTrackInfo':
            $query = "exec [wwwGetWbTrackingInfo_17track] @wbno='$wbno'";
            break;
	    }

    if (!isset($query)) {
        $response->msg = 'не правильный запрос: '.$errMsg;
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

					$row = array_change_key_case($row);
					
                    $response->events[] = $row;
                }

                //$response->dvs = 'превед';
                unset($response->fields);

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
	
	//getWBinfo
	if (/*isset($response->events)*/4==4)
	{	$query = "exec [wwwGetWbInfo_17track] @wbno='$wbno'";

        $query = iconv("UTF-8", "windows-1251", $query);
        $query = stripslashes($query);

        try {
            //include "dbConnect.php";
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
					
                    //$response->events[] = $row;
					$response->oriCountry = $row['orgcountrycode'];
					$response->destCountry = $row['destcountrycode'];
					$response->status = $row['status'];
                }

                //$response->dvs = 'превед';
                unset($response->fields);

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
	//getWBinfo
	
	
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