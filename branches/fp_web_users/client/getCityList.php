<?php
	//require_once "secureCheck.php";

    include "dbConnect.php";

$pName = $_GET['pName'] ? $_GET['pName'] : '';  
$pName = iconv("UTF-8", "windows-1251",$pName);   
//$pName = $pName ? $pName : 'zzzzzz';  
 
//$query = "exec wwwGetAgentWbs @period='20100201', @agentID=54";
$query = "exec wwwGetCityCodes @pName = '{$pName}'";
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