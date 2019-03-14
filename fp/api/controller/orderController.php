<?php

class Response
{
	public $status = 'fail';
    //public $msg = '';
	public $data = null;
}


class orderController{ 
   public static function getOrders($First, $Last){    
	$token = $_SERVER["HTTP_TOKEN"];
	
	$token = Flight::checkToken($token);
	$response = new Response();
	if(isset($token)){		
		$token = current($token);
		$ag = $token['agentid'];		
		$sql = "exec wwwAPIgetAgOrders @agentID=$ag, @First='$First', @Last='$Last'";		
		$result = Flight::db()->query($sql);
		$response->data = $result;
		$response->status = 'success';
	} else {
		$response->data = NULL;
		$response->status = 'fail';
	}	
   echo Flight::json($response);
  }
  
  public static function getOrder($ID){    
	$token = $_SERVER["HTTP_TOKEN"];
	
	$token = Flight::checkToken($token);
	$response = new Response();
	if(isset($token)){		
		$token = current($token);
		$ag = $token['agentid'];		
		$sql = "exec wwwAPIgetAgOrder @id=$ID, @agent=$ag";		
		$result = Flight::db()->query($sql);
		$response->data = $result;
		$response->status = 'success';
	} else {
		$response->data = NULL;
		$response->status = 'fail';
	}	
   echo Flight::json($response);
  }
  
  public static function checkAgOrdNum($ID){    
    $sql = "exec wwwAPIcheckAgOrdNum @ID=$ID";
    $result = Flight::db()->query($sql);
	return $result;
    }
	
  public static function getOrderPDF($ordnum){    
	$token1 = $_SERVER["HTTP_TOKEN"];
	
	$token = Flight::checkToken($token1);
	$response = new Response();
	if(isset($token)){				
		$sql = "exec wwwAPIgetOrderPDF @ordnum='$ordnum', @token = '$token1'";		
		$result = Flight::db()->query($sql);
		$response->data = $result;		
		$response->status = 'success';
	} else {
		$response->data = NULL;
		$response->status = 'fail';
	}	
   echo Flight::json($response);
  }
  
  public static function createOrder($ID){	
    $token = $_SERVER["HTTP_TOKEN"];	
	$token = Flight::checkToken($token);
	$response = new Response();	
	$cname = trim(Flight::request()->data->sendername);	
	if (isset($cname)){
	if (strlen($cname)==0 || mb_strlen($cname, 'utf-8')> 60){
		throw new Exception('Длинна поля sendername должна быть больше 0 и меньше 60 символов!');
	}
	} else{
		throw new Exception('Не заполнено поле sendername');
	}
	$address = trim(Flight::request()->data->senderaddress);
	if (strlen($address)==0 || mb_strlen($address, 'utf-8')> 200){
		throw new Exception('Длинна поля senderaddress должна быть больше 0 и меньше 200 символов!');
	}
	$org = trim(Flight::request()->data->orgcitycode);
	if (strlen($org)==0 || (!is_int($org+0) || !is_numeric($org))){
		throw new Exception('Поле orgcitycode должно содержать код в виде целого числа из справочника городов!');
	}	
	$checkCity = Flight::cities()->checkCities($org);
	$checkCity = current($checkCity);
	if ($checkCity['iscity']==0){
		throw new Exception('Поле orgcitycode должно содержать код в виде целого числа из справочника городов!');
	}	
	$contname = trim(Flight::request()->data->sendercontactname);
	if (strlen($contname)==0 || mb_strlen($contname, 'utf-8')> 50){
		throw new Exception('Длинна поля sendercontactname должна быть больше 0 и меньше 50 символов!');
	}
	$contphone = trim(Flight::request()->data->sendercontactphone);
	if (strlen($contphone)==0 || mb_strlen($contphone, 'utf-8')> 50){
		throw new Exception('Длинна поля sendercontactphone должна быть больше 0 и меньше 50 символов!');
	}
	$contmail = trim(Flight::request()->data->sendercontactemail);
	if (mb_strlen($contmail, 'utf-8')> 50){
		throw new Exception('Длинна поля sendercontactemail должна быть меньше 50 символов!');
	}
	$orgrems = trim(Flight::request()->data->senderdescription);
	if (mb_strlen($contmail, 'utf-8')> 1000){
		throw new Exception('Длинна поля senderdescription должна быть меньше 1000 символов!');
	}
	$dest = trim(Flight::request()->data->destcitycode);
	if (strlen($dest)==0 || (!is_int($dest+0) || !is_numeric($dest))){
		throw new Exception('Поле destcitycode должно содержать код в виде целого числа из справочника городов!');
	}	
	$checkCity = Flight::cities()->checkCities($dest);
	$checkCity = current($checkCity);
	if ($checkCity['iscity']==0){
		throw new Exception('Поле destcitycode должно содержать код в виде целого числа из справочника городов!');
	} 	
	$dname = trim(Flight::request()->data->destinationname);
	if (mb_strlen($dname, 'utf-8')==0 || mb_strlen($dname, 'utf-8')> 50){
		throw new Exception('Длинна поля destinationname должна быть больше 0 и меньше 50 символов!');
	}
	$dadr = trim(Flight::request()->data->destinationaddress);
	if (mb_strlen($dadr, 'utf-8')==0 || mb_strlen($dadr, 'utf-8')> 200){
		throw new Exception('Длинна поля destinationaddress должна быть больше 0 и меньше 200 символов!');
	}
	$dcontname = trim(Flight::request()->data->destinationcontactname);
	if (mb_strlen($dcontname, 'utf-8')==0 || mb_strlen($dcontname, 'utf-8')> 50){
		throw new Exception('Длинна поля destinationcontactname должна быть больше 0 и меньше 50 символов! ');
	}
	$dcontphone	= trim(Flight::request()->data->destinationcontactphone);
	if (strlen($dcontphone)==0 || mb_strlen($dcontphone, 'utf-8')> 50){
		throw new Exception('Длинна поля destinationcontactphone должна быть больше 0 и меньше 50 символов!');
	}
	$dcontmail = trim(Flight::request()->data->destinationcontactemail);
	if (mb_strlen($dcontmail, 'utf-8')> 50){
		throw new Exception('Длинна поля destinationcontactemail должна быть меньше 50 символов!');
	}
	$destrems = trim(Flight::request()->data->destinationdescription);
	if (mb_strlen($destrems, 'utf-8')> 1000){
		throw new Exception('Длинна поля destinationdescription должна быть меньше 1000 символов!');
	}
	$type = trim(Flight::request()->data->cargotype);
	if (strlen($type)==0 || (!is_int($type+0) || !is_numeric($type))){
		throw new Exception('Поле cargotype должно содержать 0 или 1!');
	}
	$packs = trim(Flight::request()->data->numberofpackages);
	if (strlen($packs)==0 || (!is_int($packs+0) || !is_numeric($packs))){
		throw new Exception('Поле numberofpackages должно содержать количество упаковок в виде целого числа!');
	} 
	$wt = trim(Flight::request()->data->weight);
	if (strlen($wt)==0 || (!is_float($wt+0) || !is_numeric($wt))){
		throw new Exception('Поле weight должно содержать вес в виде числа с целой и дробной частью разделенными точкой!');
	}	
	$volwt = trim(Flight::request()->data->volumeweight);
	if (strlen($volwt)==0 || (!is_float($volwt+0) || !is_numeric($volwt))){
		throw new Exception('Поле volumeweight должно содержать объёмный вес в виде числа с целой и дробной частью разделенными точкой!');
	}
	$courdate = trim(Flight::request()->data->courierarrivaldate);
	if (strlen($courdate)!=8 || (!is_int($courdate+0) || !is_numeric($courdate))){
		throw new Exception('Поле courierarrivaldate должно содержать дату в виде <YYYYMMDD>!');
	}	
	if (!checkdate(substr($courdate,4,2), substr($courdate,6,2), substr($courdate,0,4))){
		throw new Exception('Поле courierarrivaldate должно содержать дату в виде <YYYYMMDD>!');
	}
	if(strtotime($courdate) < strtotime(date('Ymd'))){
		throw new Exception('Поле courierarrivaldate должно содержать дату больше или равной текущей, в виде <YYYYMMDD>!');
	}
	$courtimef = trim(Flight::request()->data->courierarrivaltimefirst);
	if (strlen($courtimef)!=5){
		throw new Exception('Поле courierarrivaltimefirst должно содержать время в виде <HH:MM>!');
	}
	if (strtotime($courtimef)===false){
		throw new Exception('Поле courierarrivaltimefirst должно содержать время в виде <HH:MM>!');
	}
	$courtimet = trim(Flight::request()->data->courierarrivaltimelast);
	if (strlen($courtimet)!=5){
		throw new Exception('Поле courierarrivaltimelast должно содержать время в виде <HH:MM>!');
	}
	if (strtotime($courtimet)===false){
		throw new Exception('Поле courierarrivaltimelast должно содержать время в виде <HH:MM>!');
	}
	if(strtotime($courtimef) >= strtotime($courtimet)){
		throw new Exception('Поле courierarrivaltimelast должно быть больше courierarrivaltimefirst!');
	}
	if (strlen($ID)!=0){
	if (!is_int($ID+0) || !is_numeric($ID)){
		throw new Exception('Номер заказа должен быть целым числом!');
	}
	$checkAgOrdNum = Flight::orders()->checkAgOrdNum($ID);
	$checkAgOrdNum = current($checkAgOrdNum);
	if ($checkAgOrdNum['isorder']==0){
		throw new Exception('Заказ с таким номером не существует!');
	}
	$rordnum = trim($ID);
	}else{
	$rordnum = 0;	
	}
	if (isset($address,$org,$contname,$contphone,$dest,$dname,$dadr,$dcontname,
				$dcontphone,$type,$packs,$wt,$volwt,$courdate,$courtimef,$courtimet,$token)){
	$token = current($token);
	$userin = $token['auser'];	
	$ag = $token['agentid'];
	
	$sql = "exec wwwSaveAgOrders
			@ORG='$org',
			@CName='$cname',
			@Address='$address',
			@ContName='$contname',
			@ContPhone='$contphone',
			@ContMail='$contmail',
			@OrgRems='$orgrems',
			@DEST=$dest,
			@DName='$dname',
			@DAdr='$dadr',
			@DContName='$dcontname',
			@DContPhone='$dcontphone',
			@DContMail='$dcontmail',
			@DESTRems='$destrems',
			@Type=$type,
			@Packs=$packs,
			@Wt=$wt,
			@VolWt=$volwt,
			@CourDate='$courdate',
			@CourTimeF='$courtimef',
			@CourTimeT='$courtimet',
			@Payr=$ag,
			@UserIn='$userin',
			@RordNum=$rordnum";	
		$sql = Flight::utf8_to_win1251($sql);
        $sql = stripslashes($sql);
		$result = Flight::db()->query($sql);  
		$response->data = $result;
		$response->status = 'success';
		echo Flight::json($response);
	} else {
		throw new Exception('Не все обязательные поля заполнены!');
	}    
  }
}