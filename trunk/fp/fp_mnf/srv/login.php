<?php

class Response
{
    public $success = false;
    public $msg = '';
}
$response = new Response();
//echo '1';
if ( !empty( $_POST['user'] )) {
    include_once "dbConnect.php";
   // echo '2';
    $query = "exec wwwCheckUser @user='{$_POST[user]}', @password='{$_POST[password]}', @ip='$_SERVER[REMOTE_ADDR]' ";
    $result=mssql_query($query);
    
    if( mssql_num_rows($result)==0 ) {
	$response->success = false;
	$response->msg = 'Неверное имя пользователя или пароль...';
	
	}
        else {
           $row = mssql_fetch_assoc($result);
           if ($row["active"] == 0) { 
		   $response->success = false;
		   $response->msg='Доступ блокирован...';
		   
		   }
                else {
				   $response->success = true;
				   $response->msg = 'Превед';
                   session_start();
				   $_SESSION['xUser'] = $_POST['user'];
                   $_SESSION['xAgentID'] = $row['agentid'];
                   $_SESSION['xAgentName'] = $row['partname'];
                   //header("Location: agent/work.php");
				   
                  // exit;  
                }; 
        }; 
    
    }
echo json_encode($response);
?>