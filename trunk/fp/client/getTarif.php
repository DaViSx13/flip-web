<?php
	//require_once "secureCheck.php";

    include "dbConnect.php";

$code = $_GET['code'] ? $_GET['code'] : '';  
$code = iconv("UTF-8", "windows-1251",$code);   

$wt = $_GET['wt'] ? $_GET['wt'] : '';
$wt = str_replace(',', '.', $wt);  

$frmid = $_REQUEST['frmid'] ? $_REQUEST['frmid'] : 4;

 
//$query = "exec wwwGetAgentWbs @period='20100201', @agentID=54";
$query = "exec wwwGetTarif @code = '{$code}', @wt = {$wt}, @frmid = {$frmid}";
$result=mssql_query($query);

header("Content-type: text/xml; charset=windows-1251");
echo "<?xml version=\"1.0\" encoding=\"windows-1251\" standalone=\"yes\"?>\n";
echo "<data>\n";

while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
echo "<row";
    foreach ($row as $f => $col_value) {
//        echo " $f=\"$col_value\""; //htmlspecialchars 
        echo " " . strtolower($f) . "=\"" . htmlspecialchars($col_value) . "\""; //htmlspecialchars 
        
    }
echo "/>\n";
}

echo "</data>"; 
?>