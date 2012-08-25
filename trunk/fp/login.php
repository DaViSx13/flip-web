<?php

$msg = "";
if ( !empty( $_POST['xUser'] )) {
    include_once "agent/dbConnect.php";
    
    $query = "exec wwwCheckUser @user='{$_POST[xUser]}', @password='{$_POST[xPassword]}', @ip='$_SERVER[REMOTE_ADDR]' ";
    $result=mssql_query($query);
    
    if( mssql_num_rows($result)==0 ) {$msg = 'Неверное имя пользователя или пароль...';}
        else {
           $row = mssql_fetch_assoc($result);
           if ($row["active"] == 0) { $msg='Доступ блокирован...';}
                else {
                   session_start();
                   $_SESSION['xUser'] = $_POST['xUser'];
                   $_SESSION['xAgentID'] = $row['agentid'];
                   $_SESSION['xAgentName'] = $row['partname'];
                   header("Location: agent/work.php");
                   exit;  
                }; 
        }; 
    
    }

?>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=windows-1251" />
	<meta name="author" content="admin" />
	<title>WelCome to Flippost</title>
    
<script type="text/javascript">
function onOff(){
    u = document.getElementById('xUser').value
    p = document.getElementById('xPassword').value
    document.getElementById('btnSubmit').disabled = (u == '') || (p == '')
}

</script>    
</head>

<body onload="onOff()">

<?php

$form = <<<FORM
<div align="center">
<form method="post" action="login.php">
<table>
<tr><td colspan="2" align="center"><img src="http://flippost.com/assets/templates/fl/images/logo.gif"/></td></tr>
<tr><td colspan="2" align="center">ООО Флиппост. Агентский вход</td></tr>
<tr><td>Имя</td><td><input type="text" name="xUser" id="xUser" onkeyup="onOff()" onblur="onOff()" onchange="onOff()" value="{$_POST['xUser']}" /></td></tr>
<tr><td>Пароль</td><td><input type="password" name="xPassword" id="xPassword" onkeyup="onOff()" onblur="onOff()" onchange="onOff()"/></td></tr>
<tr><td colspan="2" align="center"><input type="submit" value="Вход" disabled="1" id="btnSubmit"/></td></tr>
<tr><td colspan="2" style="color: red;">{$msg}</td></tr>
</table>
</form>
</div>
FORM;

echo $form;

?>
</body>
</html>