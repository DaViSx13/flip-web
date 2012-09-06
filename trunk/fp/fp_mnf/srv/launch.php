<?php

class Response
{
    public $success = false;
    public $msg = '';
}
$response = new Response();
session_start();
if ( !empty( $_SESSION['xUser'] ) && !empty( $_SESSION['xAgentID'] )) {
    
	$response->success = true;
	$response->msg = 'Превед';
                   
    
    } else {
	$response->success = false;
	$response->msg='Доступ блокирован...';
	
	}
echo json_encode($response);
?>