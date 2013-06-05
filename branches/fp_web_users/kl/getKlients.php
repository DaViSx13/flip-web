<?php
    //require_once "secureCheck.php";

    include "dbConnect.php";

//$query = "exec wwwGetAgentWbs @period='20100201', @agentID=54";
//$query = "exec wwwGetAgentWbs @period='$_GET[period]', @agentID={$_SESSION['xAgentID']}";
$query = "select cacc, c_co, c_adr from klient where loc='mow' order by c_co ";
$result=mssql_query($query);

header("Content-type: text/xml; charset=windows-1251");
echo "<?xml version=\"1.0\" encoding=\"windows-1251\" standalone=\"yes\"?>\n";
echo "<data>\n";

while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
echo "<row";
    foreach ($row as $f => $col_value) {
//        echo " $f=\"$col_value\""; //htmlspecialchars 
        echo " $f=\"" . htmlspecialchars($col_value) . "\""; //htmlspecialchars 
        
    }
echo "/>\n";
}

echo "</data>"; 
?>