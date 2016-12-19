<?php

require 'db.php';

class Response
{
  public $success = false;
  public $msg = '';
  public $data = array();
};

$response = new Response();

try{
$query = <<<EOD
DECLARE @ANSI_WARN VARCHAR(3) = 'OFF';  
IF ( (8 & @@OPTIONS) = 8 ) SET @ANSI_WARN = 'ON';  
SELECT @ANSI_WARN AS [ANSI_WARNINGS];  
EOD;

$query = <<<EOD
--set arithabort off
SET ANSI_Warnings On
select 1/0 as cnt
EOD;

//$query = 'select 1/0 as cnt';
//$query = 'select 55 as cnt';
//$query ='insert main(wb_no) values(123)';
//$query ="SELECT * FROM sTypes";
$query ='exec wwwTest';

$ar = DB::query($query);


/*
echo '<pre>';
print_r($ar);
//var_dump($ar);
echo '</pre>';
*/
  $response->success = true;
  $response->data    = $ar;
}
catch(Exception $e){
  $response->success = false;
  $response->msg = $e->getMessage();
};
//echo '<code>';
echo json_encode($response, JSON_UNESCAPED_UNICODE);
//echo '</code>';
?>