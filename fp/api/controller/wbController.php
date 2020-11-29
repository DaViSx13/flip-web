<?php
class Response
{
     public $status = 'fail';
     public $data = null;
}
class wbController{

    public static function getWBPDF($wb_no){
	$token1 = $_SERVER["HTTP_TOKEN"];
	
	$token = Flight::checkToken($token1);
	$response = new Response();
	if(isset($token)){				
		$sql = "exec wwwAPIgetWbPDF @wbno='$wb_no', @token = '$token1'";		
		$result = Flight::db()->query($sql);
		$response->data = $result;		
		$response->status = 'success';
	} else {
		$response->data = NULL;
		$response->status = 'fail';
	}	
   echo Flight::json($response);
  }

    public static function createWb() {
      /*$token1 = $_SERVER["HTTP_TOKEN"];

      $token = Flight::checkToken($token1);*/
       $wbNo = self::getField("wbNo", "true");

       $orgNo = self::getField("orgNo", "true");
       $sCityID = self::getField("sCityID", "true");
       $sName = self::getField("sName", "true");
       $sTel = self::getField("sTel", "true");
       $sCo = self::getField("sCo", "true");
       $sAdr = self::getField("sAрf", "true");
       $sMail = self::getField("sMail", "true");
       $rCityID = self::getField("rCityID", "true");
       $rName = self::getField("rName", "true");
       $rTel = self::getField("rTel", "true");
       $rCo = self::getField("rCo", "true");
       $rAdr = self::getField("rAdr", "true");
       $rRef = self::getField("rRef", "true");
       $rMail = self::getField("rMail", "true");
       $userIN = self::getField("userIN", "true");
       $wt = self::getField("wt", "true");
       $volWt = self::getField("volWt", "true");
       $pcs = self::getField("pcs", "true");
       $tPac = self::getField("tPac", "true");
       $Descr = self::getFieldWithDefault("Descr", null);
       $inSum = self::getFieldWithDefault("inSum", 0);
       $metPaym = self::getFieldWithDefault("metPaym", null);
       $payer = self::getFieldWithDefault("payer", 0);;
       $webSource = self::getFieldWithDefault("webSource", 'web');
       $agentID = self::getFieldWithDefault("agentID", null);

       $sql = "exec wwwClientSetWb
       	    @ID = null,
            @Wb_No = '$wbNo',
            @Ord_No = '$orgNo',
            @S_City_ID = $sCityID,
            @S_Name = '$sName',
            @S_Tel = '$sTel',
            @S_Co = '$sCo',
            @S_Adr = '$sAdr',
            @S_Ref = '$sRef',
            @S_Mail = '$sMail',
            @R_City_ID = $rCityID,
            @R_Name = '$rName',
            @R_Tel = '$rTel',
            @R_Co = '$rCo',
            @R_Adr = '$rAdr',
            @R_Ref = '$rRef',
            @R_Mail = '$rMail',
            @User_IN = '$userIN',
            @WT = $wt,
            @VOL_WT = $volWt,
            @PCS = $pcs,
            @T_PAC = $tPac,
            @Descr = '$Descr',
            @Inssum = $inSum,
            @Metpaym = '$metPaym',
            @Payr = $payer,
            @wbsource = '$webSource',
            @agentID = '$agentID'";
       $response = new Response();
       $sql = Flight::utf8_to_win1251($sql);
       $sql = stripslashes($sql);
       $result = Flight::db()->query($sql);
       $response->data = $result;
       $response->status = 'success';
       echo Flight::json($response);
  }

  private static function getField($fieldName, $isSet) {
       $result = Flight::request() -> data -> $fieldName;
       if($isSet & !isset($result))
            throw new Exception("Не задано поле '$fieldName'. Задайте значение поля и повторите запрос");

        return $result;
  }

  private static function getFieldWithDefault($fieldName, $default) {
      $result = Flight::request() -> data -> $fieldName;
      if(!isset($result))
        return $default;
      else
        return $result;
  }
}
