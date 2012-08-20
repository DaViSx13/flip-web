<?php
	//require_once "secureCheck.php";

    include "dbConnect.php";

//$ag = $_GET['newAgent'] ? $_GET['newAgent'] : $_SESSION['xAgentID'];
$id =  $_GET[id];



$query = "exec wwwEditAgOrders @id={$id}";

$result=mssql_query($query);


while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {

if ($row["dcontmail"]==' ' or $row["dcontmail"]=='')
{
$row["dcontmail"]=null;
}
if ($row["contmail"]==' ' or $row["contmail"]=='')
{
$row["contmail"]=null;
}

$res_arr[] = array('rordnum'=>$row["rordnum"], 'datein'=>$row["datein"],'orgcode'=>$row["orgcode"],'org'=>iconv("windows-1251", "UTF-8", $row["org"]), 
'cname'=>iconv("windows-1251", "UTF-8", $row["cname"]), 'dest'=>iconv("windows-1251", "UTF-8", $row["dest"]),'destcode'=>$row["destcode"], 'dname'=>iconv("windows-1251", "UTF-8", $row["dname"]),
 'packs'=>$row["packs"], 'wt'=>$row["wt"], 'volwt'=>$row["volwt"],'curid'=>$row["curid"], 'type'=>$row["type"],'amt'=>$row["amt"],'orgrems'=>iconv("windows-1251", "UTF-8", $row["orgrems"]), 'destrems'=>iconv("windows-1251", "UTF-8", $row["destrems"]),
 'contphone'=>iconv("windows-1251", "UTF-8",$row["contphone"]), 'contmail'=>$row["contmail"], 'dcontphone'=>iconv("windows-1251", "UTF-8", $row["dcontphone"]),'dcontmail'=>$row["dcontmail"], 'address'=>iconv("windows-1251", "UTF-8", $row["address"]), 'dadr'=>iconv("windows-1251", "UTF-8", $row["dadr"]),
'contname'=>iconv("windows-1251", "UTF-8", $row["contname"]), 'dcontname'=>iconv("windows-1251", "UTF-8", $row["dcontname"]),'paytype'=>$row["paytype"]
,'courdate'=>$row["courdate"], 'courtimef'=>$row["courtimef"], 'courtimet'=>$row["courtimet"]);

}


echo json_encode($res_arr);
?>