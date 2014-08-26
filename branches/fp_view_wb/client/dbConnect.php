<?php
mssql_connect(".", "pod", "");
//mssql_connect("ROCKET", "pod", "ytabupfgznstcnfdbnm");
mssql_select_db("alert_f");
mssql_query("set quoted_identifier on
set arithabort on
set numeric_roundabort off
set ansi_warnings on
set ansi_padding on
set ansi_nulls on
SET ANSI_NULL_DFLT_ON ON");
?>
