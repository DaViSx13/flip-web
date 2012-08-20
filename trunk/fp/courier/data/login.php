<?php

class Response
{
    public $success = false;
    public $msg = '';
}

$response = new Response();

if (!empty($_POST['user'])) {
    include_once "dbConnect.php";

    if ($_POST['user'] != '123') {
        $response->success = false;
        $response->msg = 'Неверное имя пользователя или пароль...';
    } else {
        $response->success = true;
        $response->msg = 'Превед';

        session_start();
        $_SESSION['courId'] = 10231;
    }
    ;

}

echo json_encode($response);
?>