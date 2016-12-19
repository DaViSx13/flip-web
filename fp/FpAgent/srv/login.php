<?php
class Response
{
    public $success = false;
    public $msg = '';
    public $username = '';
}

$response = new Response();
try {
    if (!empty($_POST['user'])) {
        require 'db.php'; //include_once "dbConnect.php";
        // echo '2';
        $query          = "exec wwwCheckUser @user='" . $_POST['user'] . "', @password='" . $_POST['password'] . "', @ip='$_SERVER[REMOTE_ADDR]' ";
        // $result=mssql_query($query);
        $ar             = DB::query($query);
        //$ar = array();
        //var_dump($ar);
        //echo $ar[0]["active"];
        $response->data = $ar;
        if (count($ar) == 0) {
            $response->success = false;
            $response->msg     = 'Неверное имя пользователя или пароль...';
            
        } else {
            //$row = mssql_fetch_assoc($result);
            if ($ar[0]["active"] == 0) {
                $response->success = false;
                $response->msg     = 'Доступ блокирован...';
            } else {
                session_name("AGENTSESSIONID");
                session_start();
                $_SESSION['xUser']        = $_POST['user'];
                $_SESSION['xAgentID']     = $ar[0]['agentid'];
                $_SESSION['xAgentName']   = iconv("windows-1251", "UTF-8", "{$ar[0]['partname']} ({$ar[0]['partloc']})");
                $_SESSION['xAgentPlanNo'] = $ar[0]['planno'];
                $response->success        = true;
                $response->msg            = $_SESSION['xAgentID'];
                $response->username       = $_SESSION['xAgentName'];
            }
            
        }
        
    }
    
    echo json_encode($response);
}
catch (Exception $e) {
    $response->success = false;
    $response->msg     = 'Ошибка при входе в систему!';
	echo json_encode($response);
}
?>