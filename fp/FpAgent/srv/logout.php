<?php
class Response
{
    public $success = false;
    public $msg = '';
}
$response = new Response();
  session_name($_REQUEST["se"]."AGENTSESSIONID");
  session_start();
  //session_destroy();
  //session_unset();
  $response->success = true;
  $response->msg = 'Logout ok';//$_SESSION['xUser'];
  //unset ($_SESSION['xUser']);
 // unset ($_SESSION['xAgentID']);
  
  
  session_unset();
  session_destroy();
  echo json_encode($response);  
?>