<?php
/**
 * Class dataInserter
 *
 * @author    a.nikitaev
 * @description	на входе строка запроса, на выходе массив данных или ошибки.	
 */
require_once '../dbConnect.php';

class dataInserter {
	var $data = array();
	var $success;
	var $msg;
	function dataInserter($query) {
				try {
						$this->msg = '';
						$this->success = false;
						$query = iconv("UTF-8", "windows-1251", $query);
						$msQuery = mssql_query($query);
						if(mssql_num_rows($msQuery) === 0) {
						    $this -> success = false;
						    $this -> msg = "Ошибка вставки данных. Не обработано ниодной строки";
						} else {
						    while ($row = mssql_fetch_array($msQuery)) {
                                array_push($this->data , $row);
                            }
						    $this -> success = true;
						}
					} catch (exception $e) {
						$this -> msg = $e -> getMessage();
						$this -> success = false;
					}
	}	
}
?>