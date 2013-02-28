<?php
/*
вносит информацию о загруженом файле в базу данных и выбирает ее для просмотра
 $fname настаящее имя файла
 $ftype тип файла
 $fsize размер файла
 $fnewname имя, под которым файл хранится на сервере
 $place место хранения файла
 информация для подключения к БД
 $hostname имя хоста
 $username имя пользователя DB
 $password пароль DB
 $udatabase имя базы данных DB

*/	
class DBInsert
{
	public $fname;
	public $ftype;
	public $fsize;
	public $fnewname;
	public $place;
	public $orderNum;
	public $userID;
	protected $hostname;
	protected $username;
	protected $password;
	protected $udatabase;

	function __construct($fname, $ftype, $fsize, $fnewname, $place,$orderNum, $userID, $hostname, $username, $password, $udatabase)
	{
		$this->fname = $fname;
		$this->ftype = $ftype;
		$this->fsize = $fsize;
		$this->fnewname = $fnewname;
		$this->place = $place;
		$this->orderNum = $orderNum;
		$this->userID = $userID;
		$this->hostname = $hostname;
		$this->username = $username;
		$this->password = $password;
		$this->udatabase = $udatabase;
	}
/*подключение к БД*/
	function connDB()
	{
		ini_set("mssql.datetimeconvert", 0);
		$d = mssql_connect($this->hostname, $this->username, $this->password);       
		mssql_select_db($this->udatabase);
		return $d;				
	}
	/*вставляет данные в таблицу*/
	function insertDB()
	{
		$db = $this->connDB();
		$query = " exec wwwInsertAgFiles  @ROrdNum={$this->orderNum}, @AutorFileName='{$this->fname}',@RealFileName='{$this->fnewname}',@FileType='{$this->ftype}',@FileSize='{$this->fsize}',@FilePlase='{$this->place}',@InsUsr='{$this->userID}'"; //@InsUsr='{$_SESSION[xUser]}'
	    $query = iconv("UTF-8", "windows-1251", $query);
		$result = mssql_query($query);// true good? false bad
		mssql_close($db); 
		return $result ;
	}

	/*yдаляет данные из табоицы*/
	function delDB()
	{
		$db = $this->connDB();
		$query = "exec wwwDeleteAgFiles @ROrdNum ='{$this->orderNum}', @InsUsr='{$this->userID}',  @RealFileName='{$this->fnewname}'";
	    $query = iconv("UTF-8", "windows-1251", $query);
		$result = mssql_query($query);// true good? false bad

	/* проверяем вернулась ли хотя бы 1 строка*/
		if (mssql_num_rows($result) > 0)
		{
			$i = 0;
			/* вытаскиваем одну за другой строки, помещаем в $row mssql_fetch_assoc($result)  -  строка в виде ассоциативного массива,  mssql_fetch_num - порядковые номера колонок , mssql_fetch_array($result) и то и то			*/
			while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) 			
			{	
                  foreach ($row as $f => &$value) {
							$value = iconv("windows-1251", "UTF-8", $value);
						}
  
				$inputvals[$i] = array( "RealDelName" => $row["RealDelName"],
									"AutorDelName" => $row["AutorDelName"],
									"FilePlase" => $row["FilePlase"]);
				$i++;
				
			}
		}
		else 
		{
			$inputvals[0]= array ("err" => "no data");
		}
		mssql_close($db);
		
	return $inputvals ;
	
	}
	
	/*выбирает данные из таблицы */	
	function prints()
	{
		$db = $this->connDB();
		$inputvals = array();
		
		$query = "exec wwwSelectAgFiles   @ROrdNum='{$this->orderNum}'";
		
		$query = iconv("UTF-8", "windows-1251", $query);
		$result = mssql_query($query);
		/* проверяем вернулась ли хотя бы 1 строка*/
		if (mssql_num_rows($result) > 0)
		{
			$i = 0;
			/* вытаскиваем одну за другой строки, помещаем в $row mssql_fetch_assoc($result)  -  строка в виде ассоциативного массива,  mssql_fetch_num - порядковые номера колонок , mssql_fetch_array($result) и то и то			*/
			while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) 			
			{	
                  foreach ($row as $f => &$value) {
							$value = iconv("windows-1251", "UTF-8", $value);
						}
  
				$inputvals[$i] = array( "UploadFileTime" => $row["UploadFileTime"],
									"ROrdNum" => $row["ROrdNum"],
									"RealFileName" => $row["RealFileName"] ,
									"AutorFileName" => $row["AutorFileName"],
									"FSize" => $row["FSize"],
									"InsUsr" => $row["InsUsr"],
									"FilePlase" => $row["FilePlase"]);
				$i++;
				
			}
		$this->fname = $inputvals[0]['AutorFileName'];
		$this->fsize = $inputvals[0]['FSize'];
		$this->fnewname = $inputvals[0]['RealFileName'];
		$this->userID = $inputvals[0]['InsUsr'];
		$this->place = $inputvals[0]['FilePlase'];

		} 
		else 
		{
			$inputvals[0]= array ("err" => "no data");
		}
	mssql_close($db);
	/*возвращаем значение*/
	
	return $inputvals;
	}


}
	
?>
