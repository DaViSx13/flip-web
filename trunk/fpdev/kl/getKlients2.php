<?php
    //require_once "secureCheck.php";

    include "dbConnect.php";
setlocale(LC_ALL,'rus','ru', 'RU_ru', 'ru-RU', 'ru_RU.CP1251', 'rus_RUS.CP1251', 'Russian_Russia.1251');
    //if ( strlen($_GET['cname'])>=3 ) $pat = $_GET['cname'] else $pat='^^^^';
   $pat = strlen($_GET['cname'])>=3  ? iconv("UTF-8", "windows-1251", $_GET['cname']) : '^^^^';
   $z = iconv("UTF-8", "windows-1251", $_GET['cname']);    
//$query = "exec wwwGetAgentWbs @period='20100201', @agentID=54";
//$query = "exec wwwGetAgentWbs @period='$_GET[period]', @agentID={$_SESSION['xAgentID']}";
$query = "select cacc, c_co, c_adr from klient where loc='mow' and c_co like '%{$pat}%' order by c_co ";
$result=mssql_query($query);

header("Content-type: text/xml; charset=windows-1251");
echo "<?xml version=\"1.0\" encoding=\"windows-1251\" standalone=\"yes\"?>\n";
echo "<data c=\"פûגא\" z=\"{$z}\" x=\"{$_GET['cname']}\">\n";

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