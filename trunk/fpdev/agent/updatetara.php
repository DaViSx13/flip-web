<?php
include_once 'secureCheck.php';
include_once 'dbConnect.php';
//header("Content-type: text/plain; charset=utf-8");
//setlocale(LC_ALL,'rus','ru', 'RU_ru', 'ru-RU', 'ru_RU.CP1251', 'rus_RUS.CP1251', 'Russian_Russia.1251');

$rem_ag = iconv("UTF-8", "windows-1251", $_POST['rem_ag']);   
$rem_ag = stripslashes($rem_ag);
$tar_a_ag = strtr($_POST['tar_a_ag'], ',', '.');
 
//echo('rem_ag=='.$_POST['rem_ag'].'=='); 
//echo('$rem_ag=='.$rem_ag.'==');
//echo('tar_a_ag=='.$tar_a_ag.'==');
//echo('interid=='.$_POST['interid'].'==');
 

//$d = explode('.', $_POST['p_d_in']);
//$p_d_in = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) );  

$query = "exec wwwSetTar_a_ag @wb_no='{$_POST[wb_no]}', @interid={$_POST['interid']}, @tar_a_ag={$tar_a_ag}, @rem='{$rem_ag}', @user='{$_SESSION[xUser]}' ";
$result=mssql_query($query);

//print_r($_POST);
print_r(mssql_get_last_message());

?>