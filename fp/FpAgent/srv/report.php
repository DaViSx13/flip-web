<?php
class Response
{
	public $status = 'fail';    
	public $data = null;
}
include 'dbConnect.php';
set_time_limit(300);
$token = $_REQUEST['token'];
if(!isset($token)){
	require_once "secureCheck.php";
} else {
	$sql = "exec wwwAPIcheckToken @token = '$token'";
	$result=mssql_query($sql);
	$row = mssql_fetch_array($result);
	if (!isset($row['agentID']))
	{
		$response = new Response();
		echo json_encode($response);
		exit;
	}  
}

$qry = '';
if(!isset($_REQUEST['cabinet_type'])) {
	$wbno = $_REQUEST['wbno'];
	$qry = "exec wwwGetWb @wb_no='{$wbno}'";
} else {
	$order = $_REQUEST['order'];
	$qry = "exec wwwGetEmptyWb @Order={$order}, @type = '{$_REQUEST['cabinet_type']}'";
}
$result=mssql_query($qry);

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
                
                unset($response->fields);

$wbData = json_encode($response->data[0]);
$data_string = urlencode($wbData);
$str = "?wbData={$data_string}";
//$url = 'http://jasperadmin:jasperadmin@192.168.56.1:8082/rest_v2/reports/flippost/reports/wbreport.pdf'.$str;
$url = 'http://jasperadmin:jasperadmin@10.10.10.6:8080/jasperserver/rest_v2/reports/flippost/reports/wbreport.pdf'.$str;
$ch = curl_init($url);
$fh = fopen('php://temp', 'w');                                                                                                                  
curl_setopt($ch, CURLOPT_FILE, $fh);
curl_exec($ch);
curl_close($ch);
rewind($fh);
$rName = 'Накладная_'.$wbno.'.pdf';
header ("Content-Type: application/pdf"); 
header ("Content-Disposition: inline;  ;filename=\"$rName\"");
fpassthru($fh);
fclose($fh);
?>
