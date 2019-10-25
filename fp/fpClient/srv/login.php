<?php
class Response
{
    public $success = false;
    public $msg = '';
	public $username = '';
}
$response = new Response();
//echo '1';
$user = $_POST['user'];
$password = $_POST['password'];
if ( !empty( $_POST['user'] )) {
    include_once "dbConnect.php";
   // echo '2';
    $query = "exec wwwClientCheckUser @user='{$user}', @password='{$password}', @ip='$_SERVER[REMOTE_ADDR]' ";
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
                   session_name("CLIENTSESSIONID");
		   session_start();
				   $_SESSION['xUser'] = $_POST['user'];
                   $_SESSION['xAgentID'] = $row['agentID'];
                   $_SESSION['xAgentName'] = iconv("windows-1251", "UTF-8", "{$row['agentName']} ({$row['agentLOC']})");
                   $_SESSION['xClientID'] = iconv("windows-1251", "UTF-8", "{$row['clientID']}");
                   $_SESSION['xClientName'] = iconv("windows-1251", "UTF-8", "{$row['clientName']} ({$row['clientLOC']})");
				   $_SESSION['xPlanno'] = $row['planno'];
                   $response->success = true;
				   $response->msg = $_SESSION['xAgentID']; 
				   $response->username = $_SESSION['xAgentName'];

				   $response->clientID = $_SESSION['xClientID']; 
				   $response->clientName = $_SESSION['xClientName']; 
                }; 
        }; 
    }
	
echo json_encode($response);
?>