<?php

class Response
{
    public $success = false;
    public $msg = '';
}

$response = new Response();

if (!empty($_POST['user'])) {
    include_once "dbConnect.php";
	$query = "exec wwwCourCheckUser @user='{$_POST[user]}', @password='{$_POST[password]}' ";
    $result=mssql_query($query);

    if( mssql_num_rows($result)==0 ) {
        $response->success = false;
        $response->msg = 'Неверное имя пользователя или пароль...';
    } else {
           $row = mssql_fetch_assoc($result);
           /*if ($row["active"] == 0) { 
		   $response->success = false;
		   $response->msg='Доступ блокирован...';
		   }
                else {*/
                   session_start();
				   $_SESSION['CourLogin'] = $_POST['user'];
                   $_SESSION['CourID'] = $row['id'];
                   $_SESSION['CourName'] = iconv("windows-1251", "UTF-8", "{$row['FirstName']} {$row['SecondName']}");
                   $response->success = true;
				   $response->msg = $_SESSION['CourID']; 
				   $response->username = $_SESSION['CourName'];
               // }; 
        }; 
    ;

}

echo json_encode($response);
?>