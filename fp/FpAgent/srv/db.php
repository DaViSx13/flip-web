<?php
require 'DBcfg.php';//конфиг подключения к БД
//ini_set('display_errors',1);
//error_reporting(E_ALL);
//класс-синглтон для подключения к БД и выполнения запросов
//использовать так: $ar = DB::query($query);
class DB
{
  protected static $_instance; //экземпляр объекта
  private $pdo;
  private $init_connection = <<<EOD
--mix
--set quoted_identifier off
--set arithabort off
--set numeric_roundabort off
set ansi_warnings on
set ansi_padding on
set ansi_nulls on
set concat_null_yields_null on
--set cursor_close_on_commit off
--set implicit_transactions off
--set language us_english
--set dateformat ymd
--set datefirst 1
--set transaction isolation level read committed


EOD;

  public static function getInstance() // получить экземпляр данного класса 
  {
    if (self::$_instance === null) { // если экземпляр данного класса  не создан
      self::$_instance = new self; // создаем экземпляр данного класса 
    }
    return self::$_instance; // возвращаем экземпляр данного класса
  }

  private function __construct() // конструктор отрабатывает один раз при вызове DB::getInstance();
  {
	try
	{	
    $server   = DBcfg::$server;
    $dbName   = DBcfg::$dbName;
    $userName = DBcfg::$userName;
    $pass     = DBcfg::$pass;
    
	//подключаемся к БД
	if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
		$dsn = "sqlsrv:Server={$server};Database={$dbName}"; //windows
	}
	else
	{
		$dsn = "dblib:charset=UTF-8;host={$server};Database={$dbName}"; //linux
	}
    //echo("подключаемся к БД: ". $dsn);
    $this->pdo = new PDO($dsn, $userName, $pass);
    
	//$this->pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}  
	catch(PDOException $e)  
		{   
		die( print_r( $e->getMessage() ) );
		//return false;
		}
	//$this->pdo->query($init_connection);
  }

  private function __clone() //запрещаем клонирование объекта модификатором private
  {
  }

  private function __wakeup() //запрещаем клонирование объекта модификатором private
  {
  }

  //выполняет запрос и возвращает массив
  public static function query($query)
  {
	try {
    self::getInstance();
	//$query = self::$_instance->init_connection . $query;
	//$_init_connection = self::$_instance->init_connection;
    $_pdo = self::$_instance->pdo;
    if (isset($_pdo)) {
      //$query = $this->db->quote($query);
      //$query = stripslashes($query);
	  //$stmt = $_pdo->prepare($query);
	  
	 $stmt = $_pdo->query($query);
	 //if ($stmt === false)
	//	 echo 'error 0000';
      //$status = $stmt->execute();
	  //print_r($status);
	  
	  $errorInfo = $stmt->errorInfo();
	  //$errorCode = $stmt->errorCode();
	  //var_dump($errorInfo);
	  //var_dump($_pdo->errorInfo());
	 // if ($errorInfo[0] != 0)
	//	  die($errorInfo[2]);
	 // var_dump($errorInfo);
	  
	  
		/*
		echo "\nPDOStatement::errorInfo():\n";
		echo "<code>";
		$arr = $stmt->errorInfo();
		print_r($arr);
		echo "</code>";
		*/
	  //if ($stmt){
		$ar = array();
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $ar[] = array_change_key_case($row);
      }
	  //}
      ;
      return $ar;
    }
    return false;
	}  
	catch(PDOException $e)  
		{ 
		
		die( print_r( $e->getMessage() ) );
		//return false;
		}
  }

  //выполняет запрос и возвращает массив
  public static function getData2($query, array $namedParams)
  {
    self::getInstance();
    $_pdo = self::$_instance->pdo;
    $stmt = $_pdo->prepare($query);
    $stmt->execute($namedParams);
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $ar[] = array_change_key_case($row);
    }
    ;
    return $ar;
  }
}
?>
