<?php
/*
	загружает файл на локальный ресурс 
	 $folder имя каталога на сервере 
	 $whitelist список разрешенных расширений
	 $fname имя файла
	 
	 возвращаемые:
	 $ftype тип зпгруженого файла
	 $fsize размер файла
	 $fnewname имя, под которым файл загружен 

*/
class Loader 
{
	public $folder; 
	public $whitelist;
	public $fname;
	public $ftype;
	public $fsize;
	public $fnewname;
	public $res; //resultat zagruzki
	public $maxUploadFileSize;
	
	function __construct($folder, $whitelist)
	{
		$this->folder = $folder;
		$this->whitelist = $whitelist;
	}
	
	function noWhitelist($fn)
	{
	/*проверка типа файла. если его расширение не содержится в $whitelist, возвращается ошибка*/
	$error = true;
	if(in_array(strtolower(substr($fn, 1+strrpos($fn,"."))),$this->whitelist) ) { $error = false;}
	return $error;
	}
	
	function newName($nm)
	{
	/*генерация случайного имени для загрузки файла для хранения */
	$ext =  strtolower(strrchr($nm,'.'));
	return uniqid(rand(10000,99999)).$ext;
	}
	
	/* загружает файл на диск, возвращает статус загрузки*/
	function loads()
	{	
		$this->maxUploadFileSize=((int)$this->maxUploadFileSize>0)?((int)$this->maxUploadFileSize):(ini_get('file_uploads'));
	
	if ($this->noWhitelist($_FILES['uploadFile']['name']))
		{return -1;}
		
	$this->fsize = $_FILES['uploadFile']['size'];
	
	if ((int)$this->fsize > (int)$this->maxUploadFileSize)
		{return -2;}
		
		/*$uploadedFile путь для загрузки + имя файла*/
		$uploadedFile = $this->folder.basename($_FILES['uploadFile']['name']);
		if(!empty($_FILES['uploadFile']['tmp_name']))
		{ 
			$file_name = $this->newName($_FILES['uploadFile']['name']);
			
			$uploadedFile  = $this->folder.$file_name;
				
			/*перемещает загруженый файл в указаное место*/
			if(move_uploaded_file($_FILES['uploadFile']['tmp_name'],   $uploadedFile))
			{  
				$this->setProp ( $file_name);	
				return 1;
			}
			else   
			{
				return -3;  
			}
		}
		else
		{  
			return -4;  
		}
	}
	
	function setProp ($newn)
	{
		$this->fname = $_FILES['uploadFile']['name'];
		$this->ftype = $_FILES['uploadFile']['type'];
		$this->fsize = round($_FILES['uploadFile']['size']/1024,2).' кб.';
		$this->fnewname	= $newn;				
	}
	
	function delFile()
	{
	
	return unlink($this->folder.$this->fnewname);
	}
	function LoadYandex ()
	{
		$yaserver = 'https://webdav.yandex.ru';
		$yauser = 'mirrorYNDX';
		$yapass = 'Dthjybrfnik';
		$yadir = 'upload_files/';
		
		if ($this->noWhitelist($_FILES['uploadFile']['name']))
		die("Ошибка,  Вы не можете загружать файл этого типа"); 
		
		$file_name = $this->newName($_FILES['uploadFile']['name']);
		
		$uploadedFile = $_FILES['uploadFile']['tmp_name'];

		$fp = fopen($uploadedFile, 'r');
		

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://webdav.yandex.ru:443/upload_files/".$file_name);//$_FILES['uploadFile']['name']);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);   // no verify
 		$headers = array(
		'PUT / HTTP/1.1',
		'Connection: Close\r\n\r\n', 
		'User-Agent: php class webdav_client $Revision: 1.7 $',
		'Authorization: Basic '. base64_encode("$yauser:$yapass"),
		'Content-length: ' . filesize($uploadedFile),
		'Content-type: application/octet-stream'
		);
		curl_setopt($ch, CURLOPT_HTTPHEADER,$headers); 
		curl_setopt($ch, CURLOPT_USERPWD, $yauser . ":" . $yapass);		
		curl_setopt($ch, CURLOPT_UPLOAD, 1);
		curl_setopt($ch, CURLOPT_INFILE, $fp);
		curl_setopt($ch, CURLOPT_INFILESIZE, filesize($uploadedFile));
		curl_setopt($ch,  CURLOPT_RETURNTRANSFER, 1);//для возврата результата в $res вдруг пригодится
		$this->res = curl_exec($ch);

		$error_no = curl_errno($ch);

		curl_close ($ch);
		
        if ($error_no == 0) {
			$this->setProp ( $file_name);	
            return true;
        } else {
            return 'File upload error. '.$error_no ;
        }
		fclose($fp);
	}
	
}
	

/*

Собсно, что на нужно для счестья на примере яндекса:

curl --user юзер:пароль -o filename.ext https://webdav.yandex.ru/backup/filename.ext
curl --user юзер:пароль -T filename.ext https://webdav.yandex.ru/backup/
curl --user юзер:пароль -T {filename.ext,othername.ext} https://webdav.yandex.ru/backup/
curl --user юзер:пароль --request DELETE https://webdav.yandex.ru/backup/filename.ext

Здесь мы ковыряемся с файлами в папке backup. Согласно манам, при указании папки нужно осталять крайний слэш, стобы curl не терялся в догадках не файл ли это.

Вариант раз - забираем файл из облака. Имя файла указывается два раза - в URL'е (очевидно зачем, да?) и как имя выходного файла, т.к. иначе curl выплюнет файл на stdout.

Варианты два и три - заливаем файл в облако. В первом случае один файл, во втором несколько (и оба реактивные). Вообще, такая обработка нескольких файлов не относится конкретно к webdav, но пусть будет для галочки. Если файл с таким именем уже существует, он молча перезаписывается.

Ну и вариант четыре - удаление файла. Гуглом находятся и команды получения списка файлов, и переименования, но для моей задачи какбэ не требуется.
		
*/
	
?>
