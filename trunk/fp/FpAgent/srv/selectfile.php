<?php

include_once('Loader.php');
include_once('DBInsert.php');

	/*если загрузка на сервере запрещена, разрешим*/
			if (!ini_get('file_uploads')) 
			{	
				ini_set('file_uploads', '1');
			}
	
/*obj загрузчик */
$a = new Loader (GetCWD()."/tmpfolder/", array("gif", "jpeg", "jpg", "png","xls","xlsx","zip"));

/* загружаем */
if( $a->loads())
	{
	InsBD ($a);
	}
	else 
	{
    echo '{"success": false}';
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

/*obj запись в БД и выборка из БД */
function InsBD ($b)
{
$orderNum = '7777';
$userId='webuser';
$dbins = new DBInsert ($b->fname, $b->ftype, $b->fsize, $b->fnewname, $b->folder,$orderNum, '.', 'dvs', '','alert_f');

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
		echo "{'success': true, 'file': '". $resarray[0]['AutorFileName'].'('.$resarray[0]['FSize'].')' ."' ,'dataurl': '". $resarray[0]['RealFileName'] ."'}";
		}
	else {
		echo "{'success': false}";
		}
	}
else 
	{
    echo "{'success': false}";
	}
	
}	

 
 
  ?>