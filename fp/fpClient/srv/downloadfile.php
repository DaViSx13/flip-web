<?php
/*закрузка файла с сервера*/   
$file = ("tmpfolder/".$_GET['fn']."");
	//$rName='test';
	//$hostname='.'; 
	//$username='dvs'; 
	//$password='';
	//$udatabase='alert_f';
	//$db = mssql_connect($hostname, $username, $password);       
	//mssql_select_db($udatabase);
	$query = "exec wwwSelectAgFiles @RealFileName='{$_GET['fn']}' ";
	$query = iconv("UTF-8", "windows-1251", $query);
	include "dbConnect.php";
	$result = mssql_query($query);
	if (mssql_num_rows($result) > 0)
		{
			while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) 			
			{	
				$rName = $row["AutorFileName"];
			}
		}
		//mssql_close($db);
header ("Content-Type: application/octet-stream");
header ("Accept-Ranges: bytes");
header ("Content-Length: ".filesize($file)); 
header ("Content-Disposition: attachment; filename=\"$rName\""); 
readfile($file);

?>
