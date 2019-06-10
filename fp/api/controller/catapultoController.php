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
	
	$method = Flight::request()->data->method;
	$params = Flight::request()->data->params;
	$body = Flight::utf8_to_win1251(Flight::request()->getBody());
	//var_dump($method['sender']['address']['city']);
	//exit;
	
	
	switch ($method) {
    case 'rates':        
		echo Flight::json(self::getRates($params));	
		Flight::logDB($body);
		//Flight::logDB($method);
        break;
    case 'shipping':
		echo Flight::json(self::setShipping($params));
		Flight::logDB($body);
        Flight::logDB($method);
        break;
    case 'pickup':
		echo Flight::json(self::setPickup($params));
        Flight::logDB($method);
		Flight::logDB($body);
        break;
	case 'print_invoice':
		echo Flight::json(self::printInvoice($params));
		Flight::logDB($method);
		Flight::logDB($body);
        break;
	case 'reject':
		echo Flight::json(self::rejectInvoice($params));
		Flight::logDB($method);
		Flight::logDB($body);
        break;		
}
	
	
  }
  
  public static function getRates($params){
		
	$city   = Flight::utf8_to_win1251($params['sender']['address']['city']);
	$iso    = Flight::utf8_to_win1251($params['sender']['address']['iso']);
	$region = Flight::utf8_to_win1251($params['sender']['address']['region']);
	
	//Flight::logDB($city);
	
	$sql = "/*catapulto*/ exec wwwAPICatapultoGetCity @city='$city', @iso = '$iso', @region='$region'";		
	$result = Flight::db()->query($sql);
	$org = $result[0]['city'];
	//var_dump($result);
	//exit;
	if (isset($org)) {		
	
	$city   = Flight::utf8_to_win1251($params['receiver']['address']['city']);
	$iso    = Flight::utf8_to_win1251($params['receiver']['address']['iso']);
	$region = Flight::utf8_to_win1251($params['receiver']['address']['region']);	
	
	$sql = "/*catapulto*/ exec wwwAPICatapultoGetCity @city='$city', @iso = '$iso', @region='$region'";		
	$result = Flight::db()->query($sql);
	$dest = $result[0]['city'];	
	if (isset($dest)) {
	
	$cargoes = $params['cargoes'];
	//Flight::logDB(count($cargoes));
	
	$sumWt=0;
	for($i = 0; $i < count($cargoes)-1; ++$i){
		
		$wt = $cargoes[$i]['weight'];
		$sumWt += $wt;		
	}
	/*
	Flight::logDB($sumWt);
	*/
	if ((count($cargoes) == 2) && 
		($params['cargoes'][0]['width'] == 10) && ($params['cargoes'][0]['length'] == 5) &&
		($params['cargoes'][0]['weight'] == 0.2) && ($params['cargoes'][0]['height'] == 10)){
			
		$t_pak = 'LE';
	} else {
		$t_pak = 'PL';		
	}
	
	$wt = $params['cargoes'][0]['width'];//implode ("|", array_keys($params['cargoes'][0]) );
	Flight::logDB($wt);
	//exit;
	$planno = 2;
	
	$sql = "/*catapulto*/ exec wwwAPIgetTarif @org='$org', @dest = '$dest', @wt = $sumWt, @planno=$planno, @t_pak='$t_pak'";		
	$result = Flight::db()->query($sql);
	
	
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
	$tar->days = $result[0]['delivery'];
	
		$response->data = array($tar);
		$response->status = 'success';
		return $response;
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
	$city   = $params['sender']['address']['city'];
	$iso    = $params['sender']['address']['iso'];
	$region = $params['sender']['address']['region'];
		
	$sql = "/*catapulto*/ exec wwwAPICatapultoGetCity @city='$city', @iso = '$iso', @region='$region'";		
	$sql = Flight::utf8_to_win1251($sql);	
	
	$result = Flight::db()->query($sql);
	$org = $result[0]['id'];
	
	$contmail = '';
	$cname   = $params['sender']['company'];
	$contname   = $params['sender']['name'];
	$contphone   = $params['sender']['phone'][0];
	$orgrems   = $params['sender']['comment'];
	$street = $params['sender']['address']['street'];
	$house = $params['sender']['address']['house'];
	$door_number = $params['sender']['address']['door_number'];
	$zip = $params['sender']['address']['zip'];
	
	
	$address = 'Индекс '.$zip.'; '.$region.'; г. '.$city.'; '.$street.'; дом '.$house.'; кв. '.$door_number; 
	//Flight::logDB($address);
	
	
//-----------------------------------receiver--------------------------------------------------------------------------------
	$city   = $params['receiver']['address']['city'];
	$iso    = $params['receiver']['address']['iso'];
	$region = $params['receiver']['address']['region'];
	
	$sql = "/*catapulto*/ exec wwwAPICatapultoGetCity @city='$city', @iso = '$iso', @region='$region'";		
	$sql = Flight::utf8_to_win1251($sql);
	$result = Flight::db()->query($sql);
	$dest = $result[0]['id'];
	
	$dcontmail = '';
	$dname   = $params['receiver']['company'];
	$dcontname   = $params['receiver']['name'];
	$dcontphone   = $params['receiver']['phone'][0];
	$destrems   = $params['receiver']['comment'];
	$street = $params['receiver']['address']['street'];
	$house = $params['receiver']['address']['house'];
	$door_number = $params['receiver']['address']['door_number'];
	$zip = $params['receiver']['address']['zip'];
	
	$dadr = 'Индекс '.$zip.'; '.$region.'; г. '.$city.'; '.$street.'; дом '.$house.'; кв. '.$door_number; 
	
//---------------------------------------------cargoes-----------------------------------------------------------------------------
	$cargoes = $params['cargoes'];	
	$sumWt=0;
	for($i = 0; $i < count($cargoes); ++$i){
		
		$wt = $cargoes[$i]['weight'];
		$sumWt += $wt;		
	}		
	
	if ((count($cargoes) == 2) && 
		($params['cargoes'][0]['width'] == 10) && ($params['cargoes'][0]['length'] == 5) &&
		($params['cargoes'][0]['weight'] == 0.2) && ($params['cargoes'][0]['height'] == 10)){
			
		$t_pak = 0;//'LE';
	} else {
		$t_pak = 1;//'PL';		
	}
	//Flight::logDB(Flight::utf8_to_win1251($sql));
	$packs = count($cargoes);
	$volwt = 0;
	$courdate = $params['delivery_date'];//<YYYYMMDD> "2019-06-05"	
	$courdate = substr($courdate,0,4).substr($courdate,5,2).substr($courdate,8,2);
	$courtimef = '';
	$courtimet = '';
	$ag = 875;/*УДАЧНЫЙ ВЫБОР ООО*/
	$userin = 'catapulto';
	$rordnum = 0;
	
	
	
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
			@RordNum=$rordnum";
		
	$sql = Flight::utf8_to_win1251($sql);	
	$sql = stripslashes($sql);
	//Flight::logDB($sql);
	//exit;
	
	
	$result = Flight::db()->query($sql);
		
	$inv = Flight::inv();
	$inv->invoice_number = ''.$result[0]['rordnum'];
	$response = new Response();
	
	//$ser = Flight::ser();
	//$tar = Flight::tar();
	//$tar->code = 'r: ';
	//$withreturn = Flight::withreturn();
	//$withreturn->with_return = $ser;
	//$withreturn->cod = $ser;
	//$withreturn->by_hand = $ser;
	
	//$tar->services = $withreturn;
	//$tar->cost = $result[0]['tarif'];
	//$tar->days = $result[0]['delivery'];
	
		$response->data = $inv;
		$response->status = 'success';
		
	
   return $response;
 }
 public static function setPickup($params){
	$invoice_number   = $params['invoices'][0]['invoice_number']; 
	//Flight::logDB($invoice_number); 
	//exit; 
	$order = Flight::order();
	$order->order_number = ''.$invoice_number;
	$order->cost = 555.55;
	$response = new Response();
	$response->data = array($order);
	$response->status = 'success';
	return $response;
 }
 public static function printInvoice($params){
	$invoice_number   = $params['invoice_number']; 
	Flight::logDB($invoice_number); 
	//exit; 
	$pdf = Flight::pdf();
	$pdf->invoice_number = ''.$invoice_number;
	$token = '1a137f33f5576070734e4cfd5f218a80';
	$sql = "/*catapulto*/ exec wwwAPIgetOrderPDF @ordnum='$invoice_number', @token = '$token'";		
	$result = Flight::db()->query($sql);
	$href = $result[0]['href'];
	
	$b64Doc = /*chunk_split(*/base64_encode(file_get_contents($href))/*)*/;	
	
	$pdf->invoice_file = $b64Doc;
	$response = new Response();
	$response->data = $pdf;
	$response->status = 'success';
	return $response;
 }
  public static function rejectInvoice($params){
	$invoice_number   = $params['invoice_number']; 
	$inv = Flight::inv();
	$inv->invoice_number = ''.$invoice_number;
	$response = new Response();	
	$response->data = $inv;
	$response->status = 'success';
	return $response;
 } 
}
