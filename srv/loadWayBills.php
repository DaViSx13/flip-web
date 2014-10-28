<?php
session_start();
error_reporting(0);
class Response
{    
	public $success = false;
    public $msg = 'данные не импортированы!';
}
$response = new Response();

/*если загрузка на сервере запрещена, разрешим*/
if (!ini_get('file_uploads')) 	{
	ini_set('file_uploads', '1');
}

$userID = $_SESSION['xAgentID'];
$acttion = $_POST['act'];
$all_query = "";
$count_rowws = 0;
$empty_rows=0;
if ($acttion == 'imp'){
	if (isset($_FILES['uploadFile'])){
		$fn = $_FILES['uploadFile']['name'];
		$fs = $_FILES['uploadFile']['size'];
		$f = $_FILES['uploadFile']['tmp_name'];
		if(in_array(strtolower(substr($fn, 1+strrpos($fn,"."))),array("csv")) ){//только csv формат UTF-8 без BOM
			if ($fs < 1500000) {// http://popoff.donetsk.ua/text/work/libs/a/charset/
			include "a.charset.php";// Преобразовать строку на русском языке из неизвестной кодировки в кодировку windows-1251 => функция charset_x_win()
				if (($handle_f = fopen($f, "r")) !== FALSE){
					while ( ($data_f = fgetcsv($handle_f, 10000, ";"))!== FALSE) {		
						if (sizeof($data_f) == 3){
							if ($empty_rows>0){//не пустая после пустой - смело ругаемся
								$response->success = false;
								$response->msg = 'Не верный формат данных: наличие пустой строки в файле.';
								echo json_encode($response);
								exit;
							}
							else{
							for ($i=0; $i<sizeof($data_f); $i++){
								$data_f[$i] = trim($data_f[$i]);
								$query = "";
								$data_f[$i] = preg_replace('/[\s]{2,}/', ' ', $data_f[$i]);
								$dt1 = preg_match("/^\d{2}.\d{2}.\d{2,4} \d{2}:\d{2}$/D", $data_f[1]);// Дата в формате "дд.мм.гггг чч:мм:сс"/"дд.мм.гг чч:мм:сс"
								$dt2 = preg_match("/^\d{2}-\d{2}-\d{2,4} \d{2}:\d{2}$/D", $data_f[1]);// Дата в формате "дд-мм-гггг чч:мм:сс"/"дд-мм-гг чч:мм:сс"
								$rcpn = strlen($data_f[2]);
								$wbs = preg_match("/^[0-9-]+$/", $data_f[0]);
								if ($dt1 || $dt2){ //если есть дата в 1м из форматов //соберем каждую нормальную строку тут
									$rcpn = charset_x_win($data_f[2] ); //из a.charset.php
									$wb_no =  charset_x_win($data_f[0]); //из a.charset.php
									//дата
									$dateIn = explode('.', $data_f[1]);
									$addYear = (strlen($dateIn[2])==10)?"":"20";
									//время
									$timeHM = explode(' ', $dateIn[2]);
									$timeHM = explode(':', $timeHM[1]);
									
									if ((!checkdate( $dateIn[1] ,$dateIn[0], $addYear.$dateIn[2]))||( (int)$timeHM[0]>=24)||((int)$timeHM[1]>=60)){
										//не является корректной датой
										$response->success = false;
										$response->msg = 'Не верный формат данных (дата) в '.(round($count_rowws/3) +1).' строке содержимого файла.';
										echo json_encode($response);
										exit;
									}
									if (mktime(0,0,0, $dateIn[1], $dateIn[0], $addYear.$dateIn[2]) >=  time()){
										//привет из будующего
										$response->success = false;
										$response->msg = 'Дата не может быть больше текущей. В '.(round($count_rowws/3) +1).' строке содержимого файла.';
										echo json_encode($response);
										exit;
									}
									
									$p_d_in = //strftime('%Y%m%d', mktime(0,0,0, $dateIn[1], $dateIn[0], $addYear.$dateIn[2]) );
												strftime('%Y%m%d %H:%M', mktime($timeHM[0],$timeHM[1],0, $dateIn[1], $dateIn[0], $addYear.$dateIn[2]) );
									$query = "insert into  #resp_wb_n  exec wwwSetPOD_import @wb_no='{$wb_no}', @p_d_in='{$p_d_in}', @tdd='{$p_d_in}', @rcpn='{$rcpn}', @user='{$_SESSION[xUser]}'; ";
									$query = stripslashes($query);
									$count_rowws++; 
									
								}
								else{
									$response->success = false;
									$response->msg = 'Не верный формат данных в '.(round($count_rowws/3) +1).' строке содержимого или не верная кодировка файла.';
									echo json_encode($response);
									exit;
								}
								if(strlen($rcpn )< 1){
									$response->success = false;
									$response->msg = 'Не верный формат данных (пустое имя) содержимого или не верная кодировка файла.';
									echo json_encode($response);
									exit;
								}
							}	
							}
						} 
						else {		//сюда попадают пустые и корявые(не верный разделитель)строки. пустые строки посчитаем. на корявые поругаемся. 
							$data_f[1] = trim($data_f[1]);
							if ((!empty($data_f[1]))&&(count($data_f)<2)){//не пустая - поругаемся
								$response->success = false;
								$response->msg ='Не верный разделитель в строке '.(round($count_rowws/3) +1). ".".count($data_f). "." ;
								echo json_encode($response);
								exit;
							}
							else {//пустая, посчитаем
								$empty_rows++;
							}	
						}
						if (strlen($query)>0) 
							$all_query = $all_query . $query;
					}//end while
					fclose($handle_f);
					
					$try = "BEGIN TRY create table #resp_wb_n (wb_no varchar(11),countNo int,ex int,gd int); BEGIN TRAN  ";
					$catch =  
					         "  if  ((select count(*) from #resp_wb_n where countNo + ex + gd < 3)=0)  begin  select cn = -1; COMMIT TRAN; end  "
							. "  else  begin select top 1 cn=convert(char(1),countNo)+'*'+convert(char(1),ex)+'*'+convert(char(1),gd)+'*'+wb_no "
							. " from #resp_wb_n where countNo + ex + gd < 3; "
							. " ROLLBACK; end drop table #resp_wb_n ; "
							. "  END TRY BEGIN  CATCH ROLLBACK TRAN  DECLARE @ErrorMessage NVARCHAR(4000); "
							. "  SELECT @ErrorMessage = 'Error : '+ ERROR_MESSAGE() ;  RAISERROR (@ErrorMessage, 16, 1 );  END CATCH ";
					$query = $try . $all_query . $catch;
					//если все норм, вернется -1, если накл с таким № не явл входящей для данного юзверя, или ее нет, вернется номер накладной, 
					//если ошибка СКЛ, вернется ошибка
					try {
						include "dbConnect.php";
						$result = mssql_query($query);
						if ($result) {
							for($i = 0; $i < mssql_num_fields($result); $i++){
								$response->fields[mssql_field_name($result, $i)] = mssql_field_type($result, $i);
							}
							while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
								foreach ($row as $f => &$value) {
									if((($response->fields[$f] == 'char')||($response->fields[$f] == 'text'))&&($value)){
										$value1 = iconv("windows-1251", "UTF-8", $value);
									}
								}
								$response->data[] = array_change_key_case($row);
							}
							if ($value == '-1'){
								$response->success = true;
								$response->msg = "обновлено " . (round($count_rowws/3)).  " строк";
							}
							else{
								$response->success = false;
								$arr = explode("*", $value1);
								$err = "№".$arr[3]
								. ( ($arr[0]!='1')?' не является для Вас входящей.' :(($arr[1]!='1')?' не существует.' :' имеет не корректную дату доставки.'));
								$response->msg = "Ошибка: накладная {$err }";
							}
							unset($response->fields);				
							mssql_free_result($result);
						}
						else {
							$errormsg = 'Ошибка sql: ' . iconv("windows-1251", "UTF-8", mssql_get_last_message());
						}
					}catch (exception $e) {
						$response->msg = $e->getMessage();
					}
				} 
				else { 
					$response->success = false;
					$response->msg = 'Не получилось открыть файл ' + $file_name;
				}
			}
			else {
				$response->success = false;
				$response->msg = 'Файл слишком большой!';
			}
		} 
		else {
			$response->success = false;
			$response->msg = 'Файл должен быть формата csv!';
		}
	} 
	else {
		$response->success = false;
		$response->msg = 'Ошибка!';//если action не 'imp'. пришел не правильный запрос
	}
}
 else {
$response->success = false;
$response->msg = 'Неправильное обращение к серверу!';
}
echo json_encode($response);


?>