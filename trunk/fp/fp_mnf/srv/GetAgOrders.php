<?php
	//require_once "secureCheck.php";

    include "dbConnect.php";

$ag = 55;//$_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];  
 
//$query = "exec wwwGetAgOrders @period='20111116', @agentID=54";
$query = "exec wwwGetAgOrders @period='$_REQUEST[newPeriod]', @agentID={$ag}";

$result=mssql_query($query);


while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {

$res_arr[] = array('ROrdNum'=>$row["ROrdNum"], 'datein'=>$row["datein"],'ORGCity'=>iconv("windows-1251", "UTF-8", $row["ORGCity"]), 
'CName'=>iconv("windows-1251", "UTF-8", $row["CName"]), 'DESTCity'=>iconv("windows-1251", "UTF-8", $row["DESTCity"]), 'DName'=>iconv("windows-1251", "UTF-8", $row["DName"]),
 'Packs'=>$row["Packs"], 'Wt'=>$row["Wt"], 'VolWt'=>$row["VolWt"], 'status'=>iconv("windows-1251", "UTF-8", $row["status"]),'wb_no'=>$row["Wb_no"] );

}
if(sizeof($res_arr)==0){
echo json_encode(array('success'=>true, 'msg'=>iconv("windows-1251", "UTF-8", "ok")));
}else{
echo json_encode($res_arr);
}
?>