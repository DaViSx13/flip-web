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

    /**
     * Создание нкладной.
     * @throws Exception Ошибка создания
     */
    public static function createWb() {     
	  $token = $_SERVER["HTTP_TOKEN"];
      $token = Flight::checkToken($token);

       $wbNo = self::getField("wbno", true);
       self::checkStringField($wbNo, "wbno", 50);

       $sCityID = self::getField("scityid", true);	   
	   self::checkNumberValue($sCityID, "scityid");
       cityController::checkCities($sCityID);


       $sName = self::getField("sName", true);
       self::checkStringField($sName, "sName", 50);

       $sTel = self::getFieldWithDefault("sTel", "");
       self::checkStringField($sTel, "sTel", 50);

       $sCo = self::getFieldWithDefault("sCo", "");
       self::checkStringField($sCo, "sCo", 90);

       $sAdr = self::getField("sAdr", true);
       self::checkStringField($sAdr, "sAdr", 200);

       $sMail = self::getField("sMail", true);
       self::checkStringField($sMail, "sMail", 200);

       $sRef = self::getFieldWithDefault("sRef", "");
       self::checkStringField($sRef, "sRef", 300);

       $rCityID = self::getField("rCityID", true);
       self::checkNumberValue($rCityID, "rCityID");
       cityController::checkCities($rCityID);

       $rName = self::getField("rName", true);
       self::checkStringField($rName, "rName", 50);

       $rTel = self::getFieldWithDefault("rTel", "");
       self::checkStringField($rTel, "rTel", 50);

       $rCo = self::getFieldWithDefault("rCo", "");
       self::checkStringField($rCo, "rCo", 50);

       $rAdr = self::getField("rAdr", true);
       self::checkStringField($rAdr, "rAdr", 200);

       $rRef = self::getFieldWithDefault("rRef", "");
       self::checkStringField($rRef, "rRef", 300);

       $rMail = self::getField("rMail", "true");
       self::checkStringField($rMail, "rMail", 200);

      /* $userIN = self::getField("userIN", true);
       self::checkStringField($userIN, "userIN", 50);*/

       $wt = self::getField("wt", true);
       self::checkNumberValue($wt, "wt");

       $volWt = self::getField("volWt", true);
       self::checkNumberValue($volWt, "wt");

       $pcs = self::getField("pcs", true);
       self::checkNumberValue($pcs, "pcs");

       $tPac = self::getField("tPac", true);
       self::checkNumberValue($tPac, "tPac");
       self::checkRange($tPac, "tPac",  array(0, 1));

       $Descr = self::getFieldWithDefault("Descr", "");
       self::checkStringField($Descr, "Descr", 500);

       $inSum = self::getFieldWithDefault("inSum", 0);
       self::checkNumberValue($tPac, "inSum");
       self::checkRange($tPac, "inSum", array(0, 1));

       /*$metPaym = self::getFieldWithDefault("metPaym", 'INV');
       self::checkStringField($metPaym, "metPaym", 5);
       self::checkRange($metPaym,"metPaym", array("INV", "CSH"));

       $payer = self::getFieldWithDefault("payer", 0);
       self::checkNumberValue($payer, "payer");
       self::checkRange($payer, "payer", array(0, 1, 2)); */      

        $token = current($token);
        $userin = $token['auser'];
        $ag = $token['agentid'];

        $sql = "/*--apitest--*/exec wwwClientSetWb
       	    @ID = null,
            @Wb_No = '$wbNo',
            @Ord_No = 0,
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
            @User_IN = '$userin',
            @WT = $wt,
            @VOL_WT = $volWt,
            @PCS = $pcs,
            @T_PAC = $tPac,
            @Descr = '$Descr',
            @Inssum = $inSum,
			@wbsource = 'api',            
            @agentID = $ag";
       $response = new Response();
       $sql = Flight::utf8_to_win1251($sql);
       $sql = stripslashes($sql);
       $result = Flight::db()->query($sql);
       $response->data = $result;
       $response->status = 'success';
       echo Flight::json($response);
  }

    /**
     * Получение значения из запроса.
     * @param $fieldName string Наименование ключа
     * @param $isSet string Проверка заполнен ли ключ
     * @return mixed Значение из запроса
     * @throws Exception Ошибка проверки
     */
  private static function getField($fieldName, $isSet) {
       $result = Flight::request() -> data -> $fieldName;
       if($isSet & !isset($result))
            throw new Exception("Не задано поле '$fieldName'. Задайте значение поля и повторите запрос");

        return $result;
  }

    /**
     * Получение значения из запроса
     * со значением по умолчанию.
     * @param $fieldName string Наименование ключа
     * @param $default mixed Значение по умолчанию
     * @return mixed Значение из запроса
     */
  private static function getFieldWithDefault($fieldName, $default) {
      $result = Flight::request() -> data -> $fieldName;
      if(!isset($result))
        return $default;
      else
        return $result;
  }

    /**
     * Проерка строчного значения.
     * @param $field string Значение
     * @param $fieldName string Наименование ключа
     * @param $charCount integer Количество допустимых символов
     * @throws Exception Ошибка проверки
     */
  private static function checkStringField($field, $fieldName, $charCount) {
      $injectionSymbols = array(
          "--",
          "1=1",
          "0=0",
          "true",
          "script>"
      );

     if (gettype($field) != "string")
         throw new Exception(
             "Значения ключа '$fieldName' не является строчным.
                       Исправьте тело запроса и повторите попытку");

     if (strlen($field) > $charCount)
         throw new Exception(
             "Количесво символов значения ключа '$fieldName' 
                      превышает доустимое количество - '$charCount'. 
                      Исправьте значение и повторите попытку");

     foreach ($injectionSymbols as $item) {
         if(strpos($field, $item) == true)
             throw new Exception("В значении ключа '$fieldName' обнаружено недопустимое значение - '$item'");
     }
  }

    /**
     * Проверка числового значения.
     * @param $field double Значение
     * @param $fieldName string Наименование ключа
     * @throws Exception Ошибка проверки
     */
  private function checkNumberValue($field, $fieldName) {
	   if (strlen($field)==0 || (!is_int($field+0) || !is_numeric($field)))
		if (strlen($field)==0 || (!is_float($field+0) || !is_numeric($field)))   
              throw new Exception(
                  "Значения ключа '$fieldName' не является числом.
                           Исправьте тело запроса и повторите попытку");
  }

    /**
     * Проверка значения находится ли в списке допустимых.
     * @param $field mixed Значение
     * @param $fieldName string Наименование ключа
     * @param $range array Область значения
     * @throws Exception Ошибка проверки
     */
  private function checkRange($field, $fieldName, $range) {
      $found = false;
      foreach ($range as $item) {
          if ($field == $item)
              $found = true;
      }

      if (!$found)
          throw new Exception("Значение($fieldName) не находится в списке допустимых");
  }
}
