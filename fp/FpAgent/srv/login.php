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
    $user = trim($_POST['user']);
    $query = "exec wwwCheckUser @user='{$user}', @password='{$_POST['password']}', @ip='{$_SERVER[REMOTE_ADDR]}' ";
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
					session_name("AGENTSESSIONID");
                   session_start();
				   $_SESSION['xUser'] = $user;
                   $_SESSION['xAgentID'] = $row['agentid'];
                   $_SESSION['xAgentName'] = iconv("windows-1251", "UTF-8", "{$row['partname']} ({$row['partloc']})");
				   $_SESSION['xAgentPlanNo'] = $row['planno'];
                   $response->success = true;
				   $response->msg = $_SESSION['xAgentID']; 
				   $response->username = $_SESSION['xAgentName'];
                }; 
        }; 
    }
header('Access-Control-Allow-Origin: https://flippost.com');
header('Access-Control-Allow-Credentials: true');	
echo json_encode($response);
?>