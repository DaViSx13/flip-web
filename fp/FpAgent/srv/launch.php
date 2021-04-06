<?php

class Response
{
    public $success = false;
    public $msg = '';
	public $username = '';
}

function setBadRequest() {
    $_SESSION['AdmAgentID']=null;
    $response = new Response();
    $response->success = false;
    $response->msg='Доступ блокирован...';
    echo json_encode($response);
}
 if (!isset($_REQUEST["se"])) {
     setBadRequest();
     return;
 }

$response = new Response();
session_name($_REQUEST["se"]."AGENTSESSIONID");
session_start();
if ( !empty( $_SESSION['xUser'] ) && !empty( $_SESSION['xAgentID'] )) {
	$_SESSION['AdmAgentID']=null;
	$response->success = true;
	$response->msg = $_SESSION['xAgentID'];
    $response->username =$_SESSION['xAgentName'];
    echo json_encode($response);
} else {
    setBadRequest();
    return;
}