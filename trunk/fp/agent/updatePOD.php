<?php
include_once 'secureCheck.php';
include_once 'dbConnect.php';
//header("Content-type: text/plain; charset=utf-8");
//setlocale(LC_ALL,'rus','ru', 'RU_ru', 'ru-RU', 'ru_RU.CP1251', 'rus_RUS.CP1251', 'Russian_Russia.1251');

$rcpn = iconv("UTF-8", "windows-1251", $_POST['rcpn']);   
//echo('rcpn=='.$_POST['rcpn'].'=='); 
//echo('rcpn=='.$rcpn.'=='); 
$d = explode('.', $_POST['p_d_in']);
$p_d_in = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) );  

$query = "exec wwwSetPOD @wb_no='{$_POST[wb_no]}', @p_d_in='{$p_d_in}', @tdd='{$_POST[tdd]}', @rcpn='{$rcpn}', @user='{$_SESSION[xUser]}' ";
$result=mssql_query($query);

//print_r($_POST);
print_r(mssql_get_last_message());

?>