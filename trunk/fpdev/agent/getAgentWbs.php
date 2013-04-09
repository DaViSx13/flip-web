<?php
	require_once "secureCheck.php";

    include "dbConnect.php";

$ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];  
 
//$query = "exec wwwGetAgentWbs @period='20100201', @agentID=54";
$query = "exec wwwGetAgentWbs @period='$_REQUEST[newPeriod]', @agentID={$ag}";
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