<?php
session_start();

include_once('Loader.php');
include_once('DBInsert.php');
error_reporting(0);
class Response
{    
	public $success = false;
    public $msg = '';
}
$response = new Response();

/*если загрузка на сервере запрещена, разрешим*/
if (!ini_get('file_uploads')) 	{	ini_set('file_uploads', '1');
	}

$orderN = $_POST['orderNum'];
$usID = $_SESSION['xAgentID'];
$act = $_POST['act'];	
	

$msg =  "ошибка";

if ($act == 'ins')
{
	/*obj загрузчик */
	$a = new Loader (GetCWD()."/tmpfolder/", array("pdf","xls","xlsx","doc","docx"));
	/* загружаем */
	$a->maxUploadFileSize = 1024*1024*1;//размер загружаемого файла в байтах !!!!
	$res=$a->loads();
	if( $res >0)
		{
		InsBD ($a,$orderN,$usID);
		}
		else 
		{
		switch ($res) {
      case -1:
          $response->msg = 'Файлы этого типа загружать зпрещено';
		  $response->success = false;
		  break;
      case -2:
          $response->msg = "Превышен допустимый размер файла: ".round($a->maxUploadFileSize/1024,2)."кб. (размер файла: ".round($a->fsize/1024,2)."кб.)";
		  $response->success = false;
		  break;
      default:
          $response->msg = 'Ошибка загрузки';
		  $response->success = false;
	}
		
		echo json_encode($response);//echo "{'success': false, 'msg':'".$msg."'}";
		}
	/*
	$a = new Loader ('https://webdav.yandex.ru', array("gif", "jpeg", "jpg", "png","xls","xlsx","zip"));
	if ( $a->LoadYandex())
		{
		echo '{"success": true, "file": "'. $a->fname .'" }';
		}
		else 
		{
		echo '{"success": false}';
		}
	*/
}
else
{
	if ($act == 'del')
	{
	$msg =  "ошибка удаления.";
	$dbins = new DBInsert ('', '', '', '', '', $orderN, $usID/*, '.', 'dvs', '','alert_f'*/);
	$res = false;
	if (( strlen($dbins->orderNum) > 0)&&( strlen($dbins->userID) > 0))
		{
		$res = $dbins->delDB();
		}
	if ($res)
		{
		if (sizeof($res[0])>1)
			{
			$a = new Loader (GetCWD()."/tmpfolder/", array("gif", "jpeg", "jpg", "png","xls","xlsx","zip"));
			$a->fnewname = $res[0]['RealDelName'];
			$del = $a->delFile();
			if ($del)
				{
				//echo "{'success': true, 'msg': '". $res[0]['AutorDelName'] ."'}";
				$response->msg = 'Файл удален';
				$response->success = true;
				}
			else
				{
				//echo "{'success': false, 'msg':'".$msg."'}";
				$response->msg = $msg;
				$response->success = false;
				}
			}
		else {
			//echo "{'success': false, 'msg':'".$msg."'}";
			$response->msg = $msg;
			$response->success = false;
			}
		}
	else 
		{
		//echo "{'success': false, 'msg':'".$msg."'}";
		$response->msg = $msg;
		$response->success = false;
		}
	echo json_encode($response);	
	}
	
	else
	{
		if ($act == 'onl')
		{
		$dbins = new DBInsert ('', '', '', '', '', $orderN, $usID/*, '.', 'dvs', '','alert_f'*/);
		$res = false;
		if (( strlen($dbins->orderNum) > 0)&&( strlen($dbins->userID) > 0))
			{
			$res = $dbins->prints();
			}
		if (sizeof($res[0])>1)
			{
			$btn =  ($dbins->userID!=$usID)?"n":"y";
			//echo "{'success': true, 'msg': '". $dbins->fname.'('.$dbins->fsize.')' ."' ,'dataurl': '". $dbins->fnewname."', 'delbtn':".$btn."}";
			$response->msg = $dbins->fname.'('.$dbins->fsize.')';
			$response->success = true;
			}
		else {
		//echo "{'success': false, 'msg':'".$msg."'}";
		$response->msg = $msg;
		$response->success = false;
			}
		echo json_encode($response);	
		}
	}
}				
	/*obj запись в БД и выборка из БД */
function InsBD ($b,$orderNum,$userID)
{
	$dbins = new DBInsert ($b->fname, $b->ftype, $b->fsize, $b->fnewname, $b->folder, $orderNum, $userID/*, '.', 'dvs', '','alert_f'*/);
	$res = false;
	/*занесем в базу, что загрузили*/
	if ( strlen($dbins->fname) > 0) 
		{ 
		$res = $dbins->insertDB();
		}
	if ($res)
		{ 
		$resarray = $dbins->prints();
		if (sizeof($resarray[0])>1)
			{
			
			//echo"{'success': true, 'msg': 'Загружен файл: ". $dbins->fname.'('.$dbins->fsize.')' ."' ,'dataurl': '". $dbins->fnewname."'}";
			$response->msg = 'Загружен файл: '.$dbins->fname.'('.$dbins->fsize.')';
			$response->success = true;
			}
		else {
		//echo "{'success': false, 'msg':'".$msg."'}";
		$response->msg = 'Ошибка записи в БД! Нет данных!';
		$response->success = false;
			}
		}
	else 
		{
		$response->msg = 'Ошибка записи в БД! Не смог записать!';
		$response->success = false;
		//echo "{'success': false, 'msg':'".$msg."'}";
		}
	echo json_encode($response);	
}	


 
  ?>