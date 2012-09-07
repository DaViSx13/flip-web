<?php

class Response
{
    public $success = false;
    public $msg = '';
	public $username = '';
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
				   
                   session_start();
				   $_SESSION['xUser'] = $_POST['user'];
                   $_SESSION['xAgentID'] = $row['agentid'];
                   $_SESSION['xAgentName'] = $row['partname'];
                   $response->success = true;
				   $response->msg = $_SESSION['xAgentID']; 
				   $response->username =$_SESSION['xAgentName'];				   
                }; 
        }; 
    
    }
echo json_encode($response);
?>