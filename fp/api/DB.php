<?php
require 'db_.php';


$db = new SQLSRV_DataBase('sa', 1, 'alert_f','ROCKET');
//echo $db->query('select 123 as id, GETDATE() as adate union select 123 as id, GETDATE() as adate');
echo $db->query('select idx, loc, legname from frm');
echo $db->num_rows;
?>
