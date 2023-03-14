<?php
class Response
{
     public $status = 'fail';
     public $data = null;
}
class wbJSONController{

    /**
     * Создание нкладной.
     * @throws Exception Ошибка создания
     */
    public static function createWb() {     
     
        $token = $_SERVER["HTTP_TOKEN"];
        $userName = Flight::checkToken($token);
	/*------------------Ограничение частоты вызова----------------------------------*/	
	/*	$file = 'time.txt';
		$oldTime = file_get_contents($file);	
		$newTime = $_SERVER['REQUEST_TIME'];
		if(($newTime - $oldTime) < 1)	{
			file_put_contents($file, $newTime);
			throw new Exception("Ваш лимит частоты вызова API - 1 раз в секунду");
		}
		file_put_contents($file, $newTime);	*/	
	/*-----------------------------------------------------------------------------*/	
        $waybillNumber = self::getField("waybillNumber", "", true);
        self::checkStringField($waybillNumber, "waybillNumber", 50);

        $sender = self::getField("sender", true);
       
        $sender_name = str_ireplace("'", "''", $sender["name"]);        
        self::checkStringField($sender_name, "sender name", 20);
        $sender_company = str_ireplace("'", "''", $sender["company"]);
        self::checkStringField($sender_company, "sender company", 40);
        $sender_phone = str_ireplace("'", "''", $sender["phone"]);
        self::checkStringField($sender_phone, "sender phone", 50);
        
        $sender_location_country = str_ireplace("'", "''", $sender["location"]["country"]);
        self::checkStringField($sender_location_country, "sender location country", 50);
        $sender_location_state = str_ireplace("'", "''", $sender["location"]["state"]);
        self::checkStringField($sender_location_state, "sender location state", 50);
        $sender_location_city = str_ireplace("'", "''", $sender["location"]["city"]);
        self::checkStringField($sender_location_city, "sender location city", 50);
        $sender_location_address = str_ireplace("'", "''", $sender["location"]["address"]);
        self::checkStringField($sender_location_address, "sender location address", 100);
        $sender_location_zip = str_ireplace("'", "''", $sender["location"]["zip"]);
        self::checkStringField($sender_location_zip, "sender location zip", 9);
        
        $receiver = self::getField("receiver", true);
        
        $receiver_name = str_ireplace("'", "''", $receiver["name"]);
        self::checkStringField($receiver_name, "receiver name", 20);
        $receiver_company = str_ireplace("'", "''", $receiver["company"]);
        self::checkStringField($receiver["company"], "receiver company", 40);
        $receiver_phone = str_ireplace("'", "''", $receiver["phone"]);
        self::checkStringField($receiver_phone, "receiver phone", 50);
            
        $receiver_location_country = str_ireplace("'", "''", $receiver["location"]["country"]);
        self::checkStringField($receiver_location_country, "receiver location country", 50);
        $receiver_location_state = str_ireplace("'", "''", $receiver["location"]["state"]);
        self::checkStringField($receiver_location_state, "receiver location state", 50);
        $receiver_location_city = str_ireplace("'", "''", $receiver["location"]["city"]);
        self::checkStringField($receiver_location_city, "receiver location city", 50);
        $receiver_location_address = str_ireplace("'", "''", $receiver["location"]["address"]);
        self::checkStringField($receiver_location_address, "receiver location address", 100);
        $receiver_location_zip = str_ireplace("'", "''", $receiver["location"]["zip"]);
        self::checkStringField($receiver_location_zip, "receiver location zip", 9);
        
        $payer = self::getField("payer", true);
       
        $payer_name = str_ireplace("'", "''", $payer["name"]);
        self::checkStringField($payer_name, "payer name", 20);
        $payer_company = str_ireplace("'", "''", $payer["company"]);
        self::checkStringField($payer_company, "payer company", 40);
        $payer_phone = str_ireplace("'", "''", $payer["phone"]);
        self::checkStringField($payer_phone, "payer phone", 50);
        
        $payer_location_country = str_ireplace("'", "''", $payer["location"]["country"]);
        self::checkStringField($payer_location_country, "payer location country", 50);
        $payer_location_state = str_ireplace("'", "''", $payer["location"]["state"]);
        self::checkStringField($payer_location_state, "payer location state", 50);
        $payer_location_city = str_ireplace("'", "''", $payer["location"]["city"]);
        self::checkStringField($payer_location_city, "payer location city", 50);
        $payer_location_address = str_ireplace("'", "''", $payer["location"]["address"]);
        self::checkStringField($payer_location_address, "payer location address", 100);
        $payer_location_zip = str_ireplace("'", "''", $payer["location"]["zip"]);
        self::checkStringField($payer_location_zip, "payer location zip", 9);
       


       $weight = self::getField("weight", true);
       self::checkNumberValue($weight, "weight");

       $volumeWeight = self::getField("volumeWeight", true);
       self::checkNumberValue($volumeWeight, "volumeWeight");

       $packs = self::getField("packs", true);
       self::checkNumberValue($packs, "packs");

       $payType = self::getField("payType", true);
       self::checkStringField($payType, "payType", 3);
       self::checkRange($payType,"payType", array("inv", "csh"));
       
        $payerType = self::getField("payerType", true);
        self::checkNumberValue($payerType, "payerType");
        self::checkRange($payerType, "payerType", array(1, 2, 3));
        
        $packType = self::getField("packType", true);
        self::checkStringField($packType, "packType", 2);
        self::checkRange($packType,"packType", array("pl", "le"));
        
        $waybillDate = self::getField("waybillDate", true);
       self::checkStringField($waybillDate, "waybillDate", 8);
        
       $description = str_ireplace("'", "''", self::getFieldWithDefault("description", ""));
       self::checkStringField($description, "description", 500);

       $senderComment = str_ireplace("'", "''", self::getFieldWithDefault("senderComment", ""));
       self::checkStringField($senderComment, "senderComment", 300);
       //self::checkRange($tPac, "inSum", array(0, 1));

       /*$metPaym = self::getFieldWithDefault("metPaym", 'INV');
       self::checkStringField($metPaym, "metPaym", 5);
       self::checkRange($metPaym,"metPaym", array("INV", "CSH"));

       $payer = self::getFieldWithDefault("payer", 0);
       self::checkNumberValue($payer, "payer");
       self::checkRange($payer, "payer", array(0, 1, 2)); */      

      /*  $token = current($token);
        $userin = $token['auser'];
        $ag = $token['agentid'];
*/
        $sql = "/*--wwwAPICreateWb--*/exec wwwAPICreateWb
            @waybillNumber = '$waybillNumber',
            @s_name = '$sender_name',
            @s_company = '$sender_company',
            @s_phone = '$sender_phone',
            @s_l_country = '$sender_location_country',
            @s_l_state = '$sender_location_state',
            @s_l_city = '$sender_location_city',
            @s_l_address = '$sender_location_address',
            @s_l_zip = '$sender_location_zip',
            @r_name = '$receiver_name',
            @r_company = '$receiver_company',
            @r_phone = '$receiver_phone',
            @r_l_country = '$receiver_location_country',
            @r_l_state = '$receiver_location_state',
            @r_l_city = '$receiver_location_city',
            @r_l_address = '$receiver_location_address',
            @r_l_zip = '$receiver_location_zip',
            @p_name = '$payer_name',
            @p_company = '$payer_company',
            @p_phone = '$payer_phone',
            @p_l_country = '$payer_location_country',
            @p_l_state = '$payer_location_state',
            @p_l_city = '$payer_location_city',
            @p_l_address = '$payer_location_address',
            @p_l_zip = '$payer_location_zip',
            @weight = $weight,
            @volumeWeight = $volumeWeight,
            @packs = $packs,
            @payType = '$payType',
            @payerType = $payerType,
            @packType = '$packType',
            @waybillDate = '$waybillDate',
            @description = '$description',
            @senderComment = '$senderComment',
            @userName = '$userName'
            ";
            

       $response = new Response();
       $sql = Flight::utf8_to_win1251($sql);
       $sql = stripslashes($sql);
       $result = Flight::db()->query($sql);
       $response->data = $result;
       $response->status = 'success';
       echo Flight::json($response);
  }

public static function createWbs() {     
     
        $token = $_SERVER["HTTP_TOKEN"];
        $userName = Flight::checkToken($token);
		$isError = false;
        $WBS = Flight::request() -> data;
		
		if(!isset($WBS[0]))
			throw new Exception("Не корректный формат JSON. АПИ ожидает массив накладных");
		
		if(count($WBS) > 1000)
			throw new Exception("Максимальное количество накладных в пачке не более 1000 штук");
				
		for ($i = 0; $i < count($WBS); $i++) { 
			try {
				 
				$waybillNumber = $WBS[$i]['waybillNumber'];
				self::checkStringField($waybillNumber, "waybillNumber", 50);

				$sender = $WBS[$i]['sender'];
       
				$sender_name = str_ireplace("'", "''", $sender["name"]);        
				self::checkStringField($sender_name, "sender name", 20);
				$sender_company = str_ireplace("'", "''", $sender["company"]);
				self::checkStringField($sender_company, "sender company", 40);
				$sender_phone = str_ireplace("'", "''", $sender["phone"]);
				self::checkStringField($sender_phone, "sender phone", 50);
        
				$sender_location_country = str_ireplace("'", "''", $sender["location"]["country"]);
				self::checkStringField($sender_location_country, "sender location country", 50);
				$sender_location_state = str_ireplace("'", "''", $sender["location"]["state"]);
				self::checkStringField($sender_location_state, "sender location state", 50);
				$sender_location_city = str_ireplace("'", "''", $sender["location"]["city"]);
				self::checkStringField($sender_location_city, "sender location city", 50);
				$sender_location_address = str_ireplace("'", "''", $sender["location"]["address"]);
				self::checkStringField($sender_location_address, "sender location address", 100);
				$sender_location_zip = str_ireplace("'", "''", $sender["location"]["zip"]);
				self::checkStringField($sender_location_zip, "sender location zip", 9);
        
				$receiver = $WBS[$i]['receiver'];
        
				$receiver_name = str_ireplace("'", "''", $receiver["name"]);
				self::checkStringField($receiver_name, "receiver name", 20);
				$receiver_company = str_ireplace("'", "''", $receiver["company"]);
				self::checkStringField($receiver["company"], "receiver company", 40);
				$receiver_phone = str_ireplace("'", "''", $receiver["phone"]);
				self::checkStringField($receiver_phone, "receiver phone", 50);
            
				$receiver_location_country = str_ireplace("'", "''", $receiver["location"]["country"]);
				self::checkStringField($receiver_location_country, "receiver location country", 50);
				$receiver_location_state = str_ireplace("'", "''", $receiver["location"]["state"]);
				self::checkStringField($receiver_location_state, "receiver location state", 50);
				$receiver_location_city = str_ireplace("'", "''", $receiver["location"]["city"]);
				self::checkStringField($receiver_location_city, "receiver location city", 50);
				$receiver_location_address = str_ireplace("'", "''", $receiver["location"]["address"]);
				self::checkStringField($receiver_location_address, "receiver location address", 100);
				$receiver_location_zip = str_ireplace("'", "''", $receiver["location"]["zip"]);
				self::checkStringField($receiver_location_zip, "receiver location zip", 9);
        
				$payer = $WBS[$i]['payer'];//self::getField("payer", true);
       
				$payer_name = str_ireplace("'", "''", $payer["name"]);
				self::checkStringField($payer_name, "payer name", 20);
				$payer_company = str_ireplace("'", "''", $payer["company"]);
				self::checkStringField($payer_company, "payer company", 40);
				$payer_phone = str_ireplace("'", "''", $payer["phone"]);
				self::checkStringField($payer_phone, "payer phone", 50);
        
				$payer_location_country = str_ireplace("'", "''", $payer["location"]["country"]);
				self::checkStringField($payer_location_country, "payer location country", 50);
				$payer_location_state = str_ireplace("'", "''", $payer["location"]["state"]);
				self::checkStringField($payer_location_state, "payer location state", 50);
				$payer_location_city = str_ireplace("'", "''", $payer["location"]["city"]);
				self::checkStringField($payer_location_city, "payer location city", 50);
				$payer_location_address = str_ireplace("'", "''", $payer["location"]["address"]);
				self::checkStringField($payer_location_address, "payer location address", 100);
				$payer_location_zip = str_ireplace("'", "''", $payer["location"]["zip"]);
				self::checkStringField($payer_location_zip, "payer location zip", 9);

				$weight = $WBS[$i]['weight'];//self::getField("weight", true);
				self::checkNumberValue($weight, "weight");

				$volumeWeight = $WBS[$i]['volumeWeight'];//self::getField("volumeWeight", true);
				self::checkNumberValue($volumeWeight, "volumeWeight");

				$packs = $WBS[$i]['packs'];//self::getField("packs", true);
				self::checkNumberValue($packs, "packs");

				$payType = $WBS[$i]['payType'];//self::getField("payType", true);
				self::checkStringField($payType, "payType", 3);
				self::checkRange($payType,"payType", array("inv", "csh"));
       
				$payerType = $WBS[$i]['payerType'];//self::getField("payerType", true);
				self::checkNumberValue($payerType, "payerType");
				self::checkRange($payerType, "payerType", array(1, 2, 3));
        
				$packType = $WBS[$i]['packType'];//self::getField("packType", true);
				self::checkStringField($packType, "packType", 2);
				self::checkRange($packType,"packType", array("pl", "le"));
        
				$waybillDate = $WBS[$i]['waybillDate'];//self::getField("waybillDate", true);
				self::checkStringField($waybillDate, "waybillDate", 8);
        
				$description = str_ireplace("'", "''", $WBS[$i]['description']);
				self::checkStringField($description, "description", 500);

				$senderComment = str_ireplace("'", "''", $WBS[$i]['senderComment']);
				self::checkStringField($senderComment, "senderComment", 300);

        $sql = "/*--wwwAPICreateWb--*/exec wwwAPICreateWb
            @waybillNumber = '$waybillNumber',
            @s_name = '$sender_name',
            @s_company = '$sender_company',
            @s_phone = '$sender_phone',
            @s_l_country = '$sender_location_country',
            @s_l_state = '$sender_location_state',
            @s_l_city = '$sender_location_city',
            @s_l_address = '$sender_location_address',
            @s_l_zip = '$sender_location_zip',
            @r_name = '$receiver_name',
            @r_company = '$receiver_company',
            @r_phone = '$receiver_phone',
            @r_l_country = '$receiver_location_country',
            @r_l_state = '$receiver_location_state',
            @r_l_city = '$receiver_location_city',
            @r_l_address = '$receiver_location_address',
            @r_l_zip = '$receiver_location_zip',
            @p_name = '$payer_name',
            @p_company = '$payer_company',
            @p_phone = '$payer_phone',
            @p_l_country = '$payer_location_country',
            @p_l_state = '$payer_location_state',
            @p_l_city = '$payer_location_city',
            @p_l_address = '$payer_location_address',
            @p_l_zip = '$payer_location_zip',
            @weight = $weight,
            @volumeWeight = $volumeWeight,
            @packs = $packs,
            @payType = '$payType',
            @payerType = $payerType,
            @packType = '$packType',
            @waybillDate = '$waybillDate',
            @description = '$description',
            @senderComment = '$senderComment',
            @userName = '$userName'
            ";            

		$sql = Flight::utf8_to_win1251($sql);
		$sql = stripslashes($sql);
		$result = Flight::db()->query($sql);

		$resp[$i] = $result[0];
		$resp[$i]['status'] = 'success';
		$resp[$i]['msg'] = 'Накладная внесена';
		} catch (Exception $e) {				
				$isError = true;
				$resp[$i]['waybillNumber'] = $waybillNumber;
				$resp[$i]['status'] = 'error';	
				$resp[$i]['msg'] = $e->getMessage();								
			}			
		}
		$response = new Response();
		$response->data = $resp;
		if ($isError){					
			$response->status = 'error';			
		} else {
			$response->status = 'success';			
		}  
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
             "Значения ключа '$fieldName' не является строчным");

  if (mb_strlen($field,'UTF-8')> $charCount)
         throw new Exception(
             "Количесво символов значения ключа '$fieldName' превышает доустимое количество - '$charCount'");

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
          if (($field == $item) || (strcasecmp($field, $item) == 0))
              $found = true;
      }

      if (!$found)
          throw new Exception("Значение($fieldName) не находится в списке допустимых");
  }
}
