<?php
include_once 'secureCheck.php';
include_once 'dbConnect.php';

$exContent = iconv("UTF-8", "windows-1251", $_POST['exContent']);   
//echo('rcpn=='.$_POST['rcpn'].'=='); 
//echo('rcpn=='.$rcpn.'=='); 
$d = explode('.', $_POST['exRaised']);
$exRaised = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ) . ' ' . $_POST['exRaisedTime'];  

$d = explode('.', $_POST['exRptd']);
$exRptd = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) );  

$query = "exec wwwNewEx @wb_no='{$_POST[exWBno]}', @raised='{$exRaised}', @rptd='{$exRptd}', @loc='{$_POST[exLoc]}', @exCode = '{$_POST[exCode]}', @Content = '$exContent' , @user='{$_SESSION[xUser]}' ";
$result=mssql_query($query);

//print_r($_POST);
print_r(mssql_get_last_message());
//print_r($exRaised);
//print_r($exRptd);
//print_r($exContent);

?>