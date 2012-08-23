<?php
	require_once "secureCheck.php";

    include "dbConnect.php";

$ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];
$proc =  $_REQUEST['proc']; 

//$query = "exec wwwGetMnf @period='201207', @agentID=55, @is_Ready=2";
if ($proc=='GetMnf'){
	$is_Ready = $_REQUEST['is_Ready'];
	$query = "exec www{$proc} @period='$_REQUEST[period]', @agentID={$ag}, @is_Ready={$is_Ready}";
}
if ($proc=='GetWbMnf'){
	$mnfRefNo = $_REQUEST['mnfRefNo'];
	$query = "exec www{$proc} @agentID={$ag}, @mnfRefNo='{$mnfRefNo}'";
}
$result=mssql_query($query);

while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
	while (list($key, $val) = each($row)) {
			$res_ar[$key] = iconv("windows-1251", "UTF-8",$val);
	}
	$res_arr[] = $res_ar;
}

if(sizeof($res_arr)==0){
echo json_encode(array('success'=>true, 'msg'=>iconv("windows-1251", "UTF-8", "ok")));
}else{
echo json_encode($res_arr);
}
?>