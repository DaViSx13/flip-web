<?php

class Response
{	
	public $status = 'fail';    
	public $data;	
}

class ResponseError
{	
	public $status = 'error';    
	public $error;	
}

class catapultoController{   
  
  public static function getCatapultoTarif(){

  try{	
	$method = Flight::request()->data->method;
	$params = Flight::request()->data->params;
	$body = Flight::utf8_to_win1251(Flight::request()->getBody());
		
	switch ($method) {
    case 'rates': 
		//Flight::logDB($method);
		//Flight::logDB($body);
		echo Flight::json(self::getRates($params));			
        break;
    case 'shipping':
		Flight::logDB($method);
		Flight::logDB($body);        
		echo Flight::json(self::setShipping($params));
        break;
    case 'pickup':		
        //Flight::logDB($method);
		//Flight::logDB($body);
		echo Flight::json(self::setPickup($params));
        break;
	case 'print_invoice':		
		//Flight::logDB($method);
		//Flight::logDB($body);
		echo Flight::json(self::printInvoice($params));
        break;
	case 'reject':
		Flight::logDB($method);
		Flight::logDB($body);
		echo Flight::json(self::rejectInvoice($params));		
        break;		
	}
  }
  catch (exception $e) {
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 1000;
		$err->note = $e->getMessage();
		$response->error = $err;
		echo Flight::json($response);
		//echo(print_r($response, true));
  }	
	
	
  }
  
  public static function getRates($params){
		
	$city   = Flight::utf8_to_win1251($params['sender']['address']['city']);
	$iso    = Flight::utf8_to_win1251($params['sender']['address']['iso']);
	$region = Flight::utf8_to_win1251($params['sender']['address']['region']);
	
	//Flight::logDB($city);
	
	$sql = "/*catapulto*/ exec wwwAPICatapultoGetCity @city='$city', @iso = '$iso', @region='$region', @loc='org'";		
	$result = Flight::db()->query($sql);
	$org = $result[0]['city'];
	//var_dump($result);
	//exit;
	if (isset($org)) {		
	
	$city   = Flight::utf8_to_win1251($params['receiver']['address']['city']);
	$iso    = Flight::utf8_to_win1251($params['receiver']['address']['iso']);
	$region = Flight::utf8_to_win1251($params['receiver']['address']['region']);	
	
	$sql = "/*catapulto*/ exec wwwAPICatapultoGetCity @city='$city', @iso = '$iso', @region='$region', @loc='dest'";		
	$result = Flight::db()->query($sql);
	$dest = $result[0]['city'];	
	if (isset($dest)) {
	
	$cargoes = $params['cargoes'];
	//Flight::logDB(count($cargoes));
	
	$sumWt=0;
	$volwt=0;
	for($i = 0; $i < count($cargoes)-1; ++$i){
		
		$wt = $cargoes[$i]['weight'];
		$sumWt += $wt;		
		$volwt += ($cargoes[$i]['width']*$cargoes[$i]['height']*$cargoes[$i]['length'])/6000;
	}
	/*
	Flight::logDB($sumWt);
	*/
	if ($cargoes[0]['delivery_type'] == 'docs'){
			
		$t_pak = 'LE';
	} else {
		$t_pak = 'PL';		
	}
	
	//$wt = $params['cargoes'][0]['width'];
	//Flight::logDB($wt);
	if ($sumWt <= $volwt) {
		$sumWt = $volwt;
	}
	
	
	$sql = "/*catapulto*/ exec wwwAPICatapultoGetTarif";
	$result = Flight::db()->query($sql);
	$planno = $result[0]['planno'];
	
	$sql = "/*catapulto*/ exec wwwAPIgetTarif @org='$org', @dest = '$dest', @wt = $sumWt, @planno=$planno, @t_pak='$t_pak'";		
	$result = Flight::db()->query($sql);
	
	if ($result[0]['tarif'] == 0){
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 1000;
		$err->note = 'общая ошибка расчета';
		$response->error = $err;
		return $response;	
	} else {
	//var_dump($params);
	//exit;
	//Flight::logDB($city);
	
	$response = new Response();
	
	$ser = Flight::ser();
	$tar = Flight::tar();
	$tar->code = '002';
	$withreturn = Flight::withreturn();
	$withreturn->with_return = $ser;
	$withreturn->cod = $ser;
	$withreturn->by_hand = $ser;
	
	$tar->services = $withreturn;
	$tar->cost = $result[0]['tarif'];
	if ($result[0]['delivery'] == 0) {
	$tar->days = 1;	
	} else {
	$tar->days = $result[0]['delivery'];
	}
		$response->data = array($tar);
		$response->status = 'success';
		return $response;
	}
	}else {
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 1002;
		$err->note = 'не найден город получателя';
		$response->error = $err;
		return $response;
	}
	} else {
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 1001;
		$err->note = 'не найден город отправителя';
		$response->error = $err;
		return $response;
	}
	
	
     
  }
 public static function setShipping($params){
//-----------------------------------sender--------------------------------------------------------------------------------	
	$sender_city   = $params['sender']['address']['city'];
	$iso    = $params['sender']['address']['iso'];
	$sender_region = $params['sender']['address']['region'];
		
	$sql = "/*catapulto*/ exec wwwAPICatapultoGetCity @city='$sender_city', @iso = '$iso', @region='$sender_region'";		
	$sql = Flight::utf8_to_win1251($sql);	
	
	$result = Flight::db()->query($sql);
	$org = $result[0]['id'];
	if (isset($org)) {
	$contmail = '';
	$cname   = str_ireplace("'", "''", $params['sender']['company']);
	$contname   = str_ireplace("'", "''", $params['sender']['name']);
	$contphone   = $params['sender']['phone'][0].';'.$params['sender']['phone'][1];
	$orgrems   = str_ireplace("'", "''", $params['sender']['comment']);
	$sender_street = str_ireplace("'", "''", $params['sender']['address']['street']);
	$sender_house = str_ireplace("'", "''", $params['sender']['address']['house']);
	$sender_door_number = str_ireplace("'", "''", $params['sender']['address']['door_number']);
	$sender_zip = str_ireplace("'", "''", $params['sender']['address']['zip']);
	
	
	$address = 'Индекс '.$sender_zip.'; '.$sender_region.'; г. '.$sender_city.'; '.$sender_street.'; дом '.$sender_house.'; кв. '.$sender_door_number; 
	//Flight::logDB($address);
	
	
//-----------------------------------receiver--------------------------------------------------------------------------------
	$receiver_city   = $params['receiver']['address']['city'];
	$iso    = $params['receiver']['address']['iso'];
	$receiver_region = $params['receiver']['address']['region'];
	
	$sql = "/*catapulto*/ exec wwwAPICatapultoGetCity @city='$receiver_city', @iso = '$iso', @region='$receiver_region'";		
	$sql = Flight::utf8_to_win1251($sql);
	$result = Flight::db()->query($sql);
	$dest = $result[0]['id'];
	if (isset($dest)) {
	$dcontmail = '';
	$dname   = str_ireplace("'", "''", $params['receiver']['company']);
	$dcontname   = str_ireplace("'", "''", $params['receiver']['name']);
	$dcontphone   = $params['receiver']['phone'][0].';'.$params['receiver']['phone'][1];
	$destrems   = str_ireplace("'", "''", $params['receiver']['comment']);
	$receiver_street = str_ireplace("'", "''", $params['receiver']['address']['street']);
	$receiver_house = str_ireplace("'", "''", $params['receiver']['address']['house']);
	$receiver_door_number = str_ireplace("'", "''", $params['receiver']['address']['door_number']);
	$receiver_zip = str_ireplace("'", "''", $params['receiver']['address']['zip']);
	
	$dadr = 'Индекс '.$receiver_zip.'; '.$receiver_region.'; г. '.$receiver_city.'; '.$receiver_street.'; дом '.$receiver_house.'; кв. '.$receiver_door_number; 
	
//---------------------------------------------cargoes-----------------------------------------------------------------------------
	$cargoes = $params['cargoes'];	
	$sumWt=0;
	$volwt = 0;
	for($i = 0; $i < count($cargoes); ++$i){
		
		$wt = $cargoes[$i]['weight'];
		$sumWt += $wt;
		$volwt += ($cargoes[$i]['width']*$cargoes[$i]['height']*$cargoes[$i]['length'])/6000;
		
	}		
	//Flight::logDB($volwt);
	if ($cargoes[0]['delivery_type'] == 'docs') {
		$t_pak = 1;//'LE';
	} else {
		$t_pak = 0;//'PL';		
	}
	
	$packs = count($cargoes);
	
	$courdate = $params['delivery_date'];//<YYYYMMDD> "2019-06-05"	
	$courdate = substr($courdate,0,4).substr($courdate,5,2).substr($courdate,8,2);
	
	if(strtotime($courdate) < strtotime(date('Ymd'))){
		
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 2020;
		$err->note = 'не правильная дата создания';
		$response->error = $err;
		return $response;
	}
	$courtimef = '';
	$courtimet = '';
	$ag = 875;/*УДАЧНЫЙ ВЫБОР ООО*/
	$userin = 'catapulto';
	$rordnum = 0;
	
	$planno = 2;// взять запросом из БД.
	$sql = "/*catapulto*/ exec wwwAPIgetTarif @org='$org', @dest = '$dest', @wt = $sumWt, @planno=$planno, @t_pak='$t_pak'";		
	$result = Flight::db()->query($sql);
	$amt = $result[0]['tarif'];
	
	$sql = "/*catapulto*/ exec wwwSaveAgOrders
			@ORG=$org,
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
			@Type=$t_pak,
			@Packs=$packs,
			@Wt=$sumWt,
			@VolWt=$volwt,
			@CourDate='$courdate',
			@CourTimeF='$courtimef',
			@CourTimeT='$courtimet',
			@Payr=$ag,
			@UserIn='$userin',
			@amt = $amt,
			@RordNum=$rordnum,
			@isAPI=1";
		
	$sql = Flight::utf8_to_win1251($sql);	
	$sql = stripslashes($sql);
		
	$result = Flight::db()->query($sql);
	if (isset($result)) {
	$inv = Flight::inv();
	$inv->invoice_number = 'ZAK'.$result[0]['rordnum'];
	$catapulto_order_id = $params['catapulto_order_id'];
	$rordnum = $result[0]['rordnum'];
	$comment = str_ireplace("'", "''", $params['comment']);
	$instructions = str_ireplace("'", "''", $params['instructions']);
	$sql = "/*catapulto*/ exec wwwAPICatapultoSetShipping
			@rordnum = $rordnum
			,@catapulto_order_id = '$catapulto_order_id'
			,@sender_city = '$sender_city'
			,@sender_region = '$sender_region'
			,@sender_street = '$sender_street'
			,@sender_house = '$sender_house'
			,@sender_door_number = '$sender_door_number'
			,@sender_zip = '$sender_zip'
			,@sender_comment = '$orgrems'
			,@comment = '$comment'
			,@receiver_city = '$receiver_city'
			,@receiver_region = '$receiver_region'
			,@receiver_street = '$receiver_street'
			,@receiver_house = '$receiver_house'
			,@receiver_door_number = '$receiver_door_number'
			,@receiver_zip = '$receiver_zip'
			,@receiver_comment = '$destrems'
			,@instructions = '$instructions'
			";
	$sql = Flight::utf8_to_win1251($sql);	
	$sql = stripslashes($sql);	
	$result = Flight::db()->query($sql);
	
		
		$response = new Response();	
		$response->data = $inv;
		$response->status = 'success';	
		return $response;
	} else {
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 2000;
		$err->note = 'общая ошибка создания отправления';
		$response->error = $err;
		return $response;
	}
	}else {
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 2002;
		$err->note = 'не правильный адрес получателя';
		$response->error = $err;
		return $response;
	}
	}else {
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 2001;
		$err->note = 'не правильный адрес отправителя';
		$response->error = $err;
		return $response;
	}
 }
 public static function setPickup($params){
	$invoice_number   = $params['invoices'][0]['invoice_number']; 
	$courdate = $params['pickup_date'];//<YYYYMMDD> "2019-06-05"	
	$courdate = substr($courdate,0,4).substr($courdate,5,2).substr($courdate,8,2); 
	$real_num = substr($invoice_number, 3, strlen($invoice_number)-3); 
	$sql = "/*catapulto*/ exec wwwAPICatapultoGetPickUp @rordnum = $real_num, @courdate='$courdate'";		
	
	$result = Flight::db()->query($sql);
	$cost = $result[0]['amt'];
	if (isset($cost)) {
	
	$order = Flight::order();
	$order->order_number = ''.$invoice_number;
	$order->cost = $cost;
	$response = new Response();
	$response->data = array($order);
	$response->status = 'success';
	return $response;
	} else {
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 3000;
		$err->note = 'ошибка создания заказа';
		$response->error = $err;
		return $response;
	}	
 }
 public static function printInvoice($params){
	$invoice_number   = $params['invoice_number']; 
	//Flight::logDB($invoice_number); 	
	$pdf = Flight::pdf();
	$pdf->invoice_number = ''.$invoice_number;
	$real_num = substr($invoice_number, 3, strlen($invoice_number)-3);
	$token = '1a137f33f5576070734e4cfd5f218a80';
	$sql = "/*catapulto*/ exec wwwAPIgetOrderPDF @ordnum='$real_num', @token = '$token'";		
	$result = Flight::db()->query($sql);
	$href = $result[0]['href'];
	if (isset($href)) {
	$b64Doc = base64_encode(file_get_contents($href));	
	
	$pdf->invoice_file = $b64Doc;
	$response = new Response();
	$response->data = $pdf;
	$response->status = 'success';
	return $response;
	} else {
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 4000;
		$err->note = 'общая ошибка получения накладной';
		$response->error = $err;
		return $response;
	}
 }
  public static function rejectInvoice($params){
	$invoice_number   = $params['invoice_number'];
	$real_num = substr($invoice_number, 3, strlen($invoice_number)-3); 
	$sql = "/*catapulto*/ exec wwwAPICatapultoDelOrder @rordnum = $real_num";		
	$result = Flight::db()->query($sql);
	$rordnum = $result[0]['rordnum'];
	if (isset($rordnum)) {
		if ($rordnum == -1){
			$response = new ResponseError();
			$err = Flight::err();
			$err->code = 5002;
			$err->note = 'не найден номер накладной';
			$response->error = $err;
			return $response;
		} else {
			$inv = Flight::inv();
			$inv->invoice_number = ''.$invoice_number;
			$response = new Response();	
			$response->data = $inv;
			$response->status = 'success';
			return $response;
		}
	} else {
		$response = new ResponseError();
		$err = Flight::err();
		$err->code = 5000;
		$err->note = 'общая ошибка отмена отправления';
		$response->error = $err;
		return $response;
	}
 } 
}
