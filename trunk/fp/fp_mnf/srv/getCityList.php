<?php
	
    include "dbConnect.php";

$pName = $_GET['query'] ? $_GET['query'] : '';  
$pName = iconv("UTF-8", "windows-1251",$pName);   

//print($pName);

$query = "exec wwwGetCity @pName = '{$pName}'";

//print($query);

$result=mssql_query($query);


//$res_arr = array();

while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {

$res_arr[] = array('code'=>$row["Code"],'fname'=>iconv("windows-1251", "UTF-8", $row["fname"]) );



}
//echo "uuu";

echo json_encode($res_arr);

?>