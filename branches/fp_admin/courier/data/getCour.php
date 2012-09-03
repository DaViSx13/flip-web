<?php
session_start();
class Response
{
    public $success = false;
    public $msg = 'defaultMsg';
    public $data = array();
}
$response = new Response();
class Courier
{
    public $courId = 0;
    public $name = '';
}
$courier = new Courier();
if (isset($_SESSION['courId'])) {
    include_once "dbConnect.php";
    $courier->courId = $_SESSION['courId'];
    $courier->name = 'Шарип';
    $response->msg = 'true';
    $response->success = true;
    $response->data[] = $courier;
} else {
    $response->msg = 'false';
}
echo json_encode($response);
?>