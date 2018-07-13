<?php

class Response
{
    public $success = false;
    public $msg = '';
	public $username = '';
}
$response = new Response();
session_name("LKSESSIONID");
session_start();
if ( !empty( $_SESSION['xUser'] ) /*&& !empty( $_SESSION['xAgentID'] )*/) {
    
	$_SESSION['AdmAgentID']=null;
	$response->success = true;
	$response->msg = $_SESSION['xClientID']; 
    $response->username =$_SESSION['xClientName'];               
    
	$response->clientID = $_SESSION['xClientID']; 
    $response->clientName = $_SESSION['xClientName']; 
    
    } else {
	$_SESSION['AdmAgentID']=null;
	$response->success = false;
	$response->msg='Доступ блокирован...';
	
	
	}
echo json_encode($response);
?>