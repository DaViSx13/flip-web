<?php

class Response
{
    public $success = false;
    public $msg = '';
}
$response = new Response();
session_start();
if ( !empty( $_POST['agent'] )) {
	
	$_SESSION['AdmAgentID'] = $_POST['agent'];
    
	$response->success = true;
	$response->msg = $_SESSION['AdmAgentID'];
                   
    
    } else {
	$response->success = false;
	$response->msg='Доступ блокирован...';
	
	}
echo json_encode($response);
?>