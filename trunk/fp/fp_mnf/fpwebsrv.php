<?php
	//require_once "secureCheck.php";

    include "dbConnect.php";

$ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];
$proc =  $_REQUEST['proc']; 

//$query = "exec wwwGetMnf @period='201207', @agentID=55, @is_Ready=2";
if ($proc=='GetMnf'){
$is_Ready = $_REQUEST['is_Ready'];
$query = "exec www{$proc} @period='$_REQUEST[period]', @agentID=55, @is_Ready={$is_Ready}";
}
if ($proc=='GetWbMnf'){
$mnfRefNo = $_REQUEST['mnfRefNo'] ;//? $_REQUEST['mnfRefNo'] : null;
$query = "exec www{$proc} @agentID=55, @mnfRefNo='{$mnfRefNo}'";
//print_r($query);
}


$result=mssql_query($query);

while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {

//$res_arr[] = array('MNFRegNo'=>$row["MNFRegNo"], 'MNFRefNo'=>$row["MNFRefNo"],'OrgTrk'=>iconv("windows-1251", "UTF-8", $row["OrgTrk"])); 

//foreach ($row as $key => $value) {
while (list($key, $val) = each($row)) {
 $res_ar[$key] = iconv("windows-1251", "UTF-8",$val);
}
$res_arr[] = $res_ar;
/*
'CName'=>iconv("windows-1251", "UTF-8", $row["CName"]), 'DESTCity'=>iconv("windows-1251", "UTF-8", $row["DESTCity"]), 'DName'=>iconv("windows-1251", "UTF-8", $row["DName"]),
 'Packs'=>$row["Packs"], 'Wt'=>$row["Wt"], 'VolWt'=>$row["VolWt"], 'status'=>iconv("windows-1251", "UTF-8", $row["status"]),'wb_no'=>$row["Wb_no"] );
*/
}


if(sizeof($res_arr)==0){
echo json_encode(array('success'=>true, 'msg'=>iconv("windows-1251", "UTF-8", "ok")));
}else{
echo json_encode($res_arr);

}
//print_r($res_arr);
//print_r('------------------------------');
//print_r($res_arr);
?>