<?php
//	require_once "secureCheck.php";

    include "dbConnect.php";

$wbno = $_GET['wbno'];  
 
$query = "exec wwwGetWbXML @wbno='$wbno'";
$result=mssql_query($query);

header("Content-type: text/xml; charset=windows-1251");
echo "<?xml version=\"1.0\" encoding=\"windows-1251\" standalone=\"yes\"?>\n";
echo "<data>\n";

while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
/*    echo "\n";
    print_r($row);    
    echo "\n";
*/
    foreach ($row as $f => $col_value) {
//        echo " $f=\"$col_value\""; //htmlspecialchars 
//        echo " " . strtolower($f) . "=\"" . htmlspecialchars($col_value) . "\""; //htmlspecialchars 
        echo $col_value;
//        echo htmlspecialchars($col_value)
        
    }
}

echo "\n</data>"; 
?>