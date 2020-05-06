<?php
//ы
ini_set("mssql.datetimeconvert", 0);
ini_set('mssql.charset', 'cp1251');
//mssql_connect(".", "dvs", "");
//mssql_connect(".", "pod", "");
//mssql_connect("localhost", "dvs", "");
mssql_connect("192.168.56.102:1433", "pod", "");
mssql_select_db("alert_f");
mssql_query("set quoted_identifier on
set arithabort on
set numeric_roundabort off
set ansi_warnings on
set ansi_padding on
set ansi_nulls on");
?>