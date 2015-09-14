<?php
/**
 * Class dataInserter
 *
 * @author    a.nikitaev
 * @description	на входе строка запроса, на выходе массив данных или ошибки.	
 */
require_once '../dbConnect.php';

class dataInserter {
	var $data;	
	var $success;
	var $msg;
	function dataInserter($query) {
				try {
						$this->msg = '';
						$this->success = false;
						$query = iconv("UTF-8", "windows-1251", $query);						
						$result = mssql_query($query);
						$field = null;
						$field = mssql_field_name($result);					
						if ($result && !empty($field)) {							
							while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {								
								$this->data = array_change_key_case($row);
							}
							if (strcmp($field, 'Result') == 0){
								$this->success = true;
								$this->msg = 'Всего обработано строк: '.$this->data['result'];
							}
							else{
								$this->success = false;								
								$this->msg = 'Ошибка в строке '.iconv("windows-1251", "UTF-8", $this->data['error']);								
							}											
							mssql_free_result($result);
						}
						else {
							$this->msg = 'Ошибка sql: ' . iconv("windows-1251", "UTF-8", mssql_get_last_message());
							$this->success = false;
						}
					}catch (exception $e) {
						$this->msg = $e->getMessage();
						$this->success = false;						
					}
	}	
}
?>