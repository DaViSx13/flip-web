<?php
/**
 * Class queryBuilder
 *
 * @author    a.nikitaev
 * @description		Создает валидный массив скриптов для вставки в БД
 */
require_once '../Excel/PHPExcel/IOFactory.php';
require_once "a.charset.php";
class queryBuilder {
	var $worksheetTitle;
	var $value;
	var $query;
	var $error;
	var $builded;			
	function queryBuilder($file, $tpl, $ext) {				/* На входе ссылка на валидный файл Excel и на массив-шаблон мапинга столбцов и параметров процедуры */	
		$this->builded			= false;
		$this->worksheetTitle 	= '';
		$this->value 			= null;	
		$this->query 			= '';
		$this->error 			= '';	
		if($ext=='csv'){									/* Считывание csv файлов*/
			$html = file_get_contents($file);
            if (detect_cyr_charset($html)=='w')  // проверяем кодировку
            {
				$html=iconv("cp1251", "utf-8", $html);
				file_put_contents($file, $html);				
			}
			$objReader = new PHPExcel_Reader_CSV();			
			$objReader->setDelimiter(';');
			$objReader->setSheetIndex(0);
			$objPHPExcel = $objReader->load($file);
		} else {
			$objPHPExcel = PHPExcel_IOFactory::load($file);
			$objPHPExcel->setActiveSheetIndex(0);
		}		
		$sheet = $objPHPExcel->getActiveSheet();
		$this->worksheetTitle = $sheet->getTitle();		
		$nTpl = count($tpl);		
		$this->query = " IF (LEN(@procResult) > 1) "
					. "begin "
					. "ROLLBACK TRAN; " 
					. "select rtrim(convert(char(10), @sum))+': '+ @procResult as Error; "
					. "return; "
					. "end else "
					. "select @sum=@sum+1; ";	
		$table = '';
		$lastrow = '';
		$isTable = 0;
		for ($i = 1; $i <= $sheet->getHighestRow()-1; $i++) {				
			for ($j = 1; $j < $nTpl; $j++) {
					if($isTable <= $nTpl){ 																			/* Формируем строку создания временной таблицы согласно шаблона*/
						$table = $table.$tpl[$j][0].' ';
						switch ($tpl[$j][1]) {
							case 'int':
								$table = $table.'int NULL,';
							break;
							case 'float':
								$table = $table.'float NULL,';
							break;
							case 'date':
								$table = $table.'datetime NULL,';
							break;
							case 'time':
								$table = $table.'time NULL,';
							break;
							case 'str':
							case 'constant':
								$table = $table.'varchar(max) NULL,';
							break;							
							default:
								$this->error = 'Не верный тип данных! Значение не является корректным: ['.$paramType.'].';
								$this->builded = false;
						}
						if($j == $nTpl-1){							
							$table = "create table #import (".$table." result varchar(max) NULL);";
							$lastrow = $lastrow.' @'.$tpl[$j][0]."=NULL,";
							$lastrow = "exec ".$tpl[0][0]." ".$lastrow." @result = 'last';";						/* Последний вызов процедуры с ключевым словом "last" означает конец данных и дает возможность сделать финальные операции*/
							$isTable = $j+2;
						} else {
							$isTable = $j;
							$lastrow = $lastrow.' @'.$tpl[$j][0]."=NULL,";											/* Формируем последний вызов процедуры с пустыми параметрами */
						}																		
					}					
				if(preg_match("/^[0-9-]+$/", $tpl[$j][2]) && strcmp($tpl[$j][1], 'constant') != 0){					/* Проверим является ли 3 элемент шаблона целым числом(номер столбца) */
					$val = $sheet->getCellByColumnAndRow($tpl[$j][2], $i+1)->getValue();							/* Начинаем с i = 2, чтобы отсеч заголовки таблицы */
					$cel = $sheet->getCellByColumnAndRow($tpl[$j][2], $i+1);
					if( is_string($val) ) $val = trim($val);				 
					if(is_null($val) || strlen($val)==0){															/* Проверка на пустую ячейку */					
						if ($tpl[$j][3] == 1){																		/* Если обязательное поле пустое, то заканчиваем строить отчет */
							if(isset($this->value[$i]))	unset($this->value[$i]);											
								$this->builded = false;	
								$this->error = 'Нет обязательных данных в ячейке: '.$cel->getCoordinate().'!';			/* Если нет ни одной строки, значит таблица пустая */
							break 2;						
						} else {																					/* Если поле не обязательное то присваиваем значение по умолчанию */
							$val = $tpl[$j][4];
						}
					}
					if (!is_null($val))
					if ($this->initType($tpl[$j][1],$val, $cel) == false){											/* Проверка типа данных */						
						break 2;
					}					
					if(($tpl[$j][1] == 'date' || $tpl[$j][1] == 'str' || $tpl[$j][1] == 'time') && !is_null($val)){ /* Типы данных с кавычками */
						$this->value[$i]=$this->value[$i].' @'.$tpl[$j][0]."='".$val."',";
					} else {
						if (is_null($val)){																			/* Пустое значение */
							$this->value[$i]=$this->value[$i].' @'.$tpl[$j][0]."=NULL,";
						} else {																					/* Типы данных без кавычек */
							$this->value[$i]=$this->value[$i].' @'.$tpl[$j][0]."=".$val.",";
						}
					}
				} else if(strcmp($tpl[$j][1], 'constant') == 0){													/* Константа */
					$this->value[$i]=$this->value[$i].' @'.$tpl[$j][0]."='".$tpl[$j][2]."',";
				} else {																							/* Проблемы с шаблоном */
					$this->error = 'Не верный шаблон.';
					$this->builded = false;
				}				
			} /* end for */			
			$this->value[$i] = "exec ".$tpl[0][0]." ".$this->value[$i]." @result = @procResult OUTPUT;".$this->query;
			$this->value[$i] = stripslashes($this->value[$i]);
			$all_query = $all_query . $this->value[$i];			
		} /* end for */
		$this->query = '';		
		if ($this->builded == true/* || 1 == 1*/){
			
			$try = 				  "BEGIN TRY "
								. "DECLARE @procResult NVARCHAR(400), @sum int = 1; "
								. $table
								. "BEGIN TRAN ";
																													/* Сюда добавим N строк с вызовом процедуры вставки */
			$catch =  	          "select @procResult =convert(char(10), @sum-1) "
								. $lastrow
								. "COMMIT TRAN " 
								. "select @procResult as Result; drop table #import; "
								. "END TRY " 
								. "BEGIN CATCH " 	 
								. "ROLLBACK " 
								. "DECLARE @ErrorMessage NVARCHAR(4000); " 
								. "SELECT @ErrorMessage = 'Error : '+ ERROR_MESSAGE(); " 
								. "RAISERROR (@ErrorMessage, 16, 1 ); " 
								. "END CATCH";
			$this->query = $try . $all_query . $catch;
			$this->query = preg_replace('|\s+|', ' ', $this->query);			
			$this->query = stripslashes($this->query);
		} else {
			$this->value = null;
		}
	}	
	function initType($paramType, &$param, $cell) {		
		
			switch ($paramType) {
				case 'int':					
					$this->builded = $this->initInteger($paramType, $param, $cell, $this->error);
				break;
				case 'float':
					$this->builded = $this->initFloat($paramType, $param, $cell, $this->error);
				break;
				case 'date':
					$this->builded = $this->initDate($paramType, $param, $cell, $this->error);
				break;
				case 'time':
					$this->builded = $this->initTime($paramType, $param, $cell, $this->error);
				break;
				case 'str':
					$this->builded = $this->initString($paramType, $param, $cell, $this->error);
				break;
				default:
					$this->error = 'Не верный тип данных в ячейке: '.$cell->getCoordinate().'! Значение ['.$param.'] не является корректным для типа данных ['.$paramType.'].';
					$this->builded = false;
			}
			
		return $this->builded;		
	}
	function initDate($type, &$value, $cell, &$error) {
		if($type == 'date' && !is_null($value)) {	
			if((PHPExcel_Shared_Date::isDateTime($cell)) && (ctype_digit($value))){
				$value = gmdate('d.m.Y H:i', PHPExcel_Shared_Date::ExcelToPHP($value));			/* Для замены даты в формате INT в стандартный */
			}
			$value = preg_replace('|\s+|', ' ', $value);											/* Для замены любых пробельных символов (перевод на новую строку, табуляция, пробел) */
			
			if(preg_match("/^\d{2}.\d{2}.\d{2,4}( \d{2}:\d{2})?$/D", $value) || preg_match("/^\d{2}-\d{2}-\d{2,4}( \d{2}:\d{2})?$/D", $value)
				) {
				$value = preg_replace('/\-/', '.', $value);											/* Заменяем "-" на "." */		
				$dateIn = explode('.', $value); 													/* Разбиваем на массив */
														/* Добавляем тысячелетие и столетие, если их нет */			
				
				if (stristr($dateIn[2], ' ') === FALSE){
					$timeHM[1] = '00:00';
					$addYear = (strlen($dateIn[2])>=2)?"":"20";
				} else {
					$addYear = (strlen($dateIn[2])>=7)?"":"20";
					$timeHM = explode(' ', $dateIn[2]);
				}
				$timeHM = explode(':', $timeHM[1]);	
				if ((!checkdate( $dateIn[1] ,$dateIn[0], $addYear.$dateIn[2]))||( (int)$timeHM[0]>=24)||((int)$timeHM[1]>=60)){
					$error = 'Не верная дата! Значение ['.$value.'] не является корректным для типа данных ['.$type.']. Ячейка: '.$cell->getCoordinate().'!'.
					'Дата должна иметь формат: дд.мм.гггг чч:мм';
					return false;																	/* Не является корректной датой */
				}
				//if (/*mktime(0,0,0, $dateIn[1], $dateIn[0], $addYear.$dateIn[2]) >=  time()*/1==1){	
				//	$error = 'Дата из будущего! Значение ['.strftime('%Y%m%d %H:%M', mktime($timeHM[0],$timeHM[1],0, $dateIn[1], $dateIn[0], $addYear.$dateIn[2])).'] не является корректным для типа данных ['.$type.']. Ячейка: '.$cell->getCoordinate().'!';
				//	return false;																	// Дата из будующего 
				//}
				$value = strftime('%Y%m%d %H:%M', mktime($timeHM[0],$timeHM[1],0, $dateIn[1], $dateIn[0], $addYear.$dateIn[2]));
					return true;
			} else {
				$error = 'Значение ['.$value.'] не является корректным для типа данных ['.$type.'].Ячейка: '.$cell->getCoordinate().'!';
				return false;
			}
		} else {
			$error = 'Тип данных не является датой! Ячейка: '.$cell->getCoordinate().'!';
			return false;
		}
					
	}
	function initTime($type, &$value, $cell, &$error) {
		if($type == 'time' && !is_null($value)) {	
			if(PHPExcel_Shared_Date::isDateTime($cell)){
				$value = gmdate('H:i', PHPExcel_Shared_Date::ExcelToPHP($value));					/* Для замены даты в формате INT в стандартный */
			}
			$value = preg_replace('|\s+|', ' ', $value);											/* Для замены любых пробельных символов (перевод на новую строку, табуляция, пробел) */
			if(preg_match("/^\d{2}:\d{2}$/D", $value)){				
				$timeHM = explode(':', $value);	
				if (((int)$timeHM[0]>=24)||((int)$timeHM[1]>=60)){
					$error = 'Не верное время! Значение ['.$value.'] не является корректным для типа данных ['.$type.']. Ячейка: '.$cell->getCoordinate().'!';
					return false;																	/* Не является корректной датой */
				}					
				return true;
			} else {
				$error = 'Значение ['.$value.']. Не является корректным временем! Ячейка: '.$cell->getCoordinate().'!';
				return false;
			}
		} else {
			$error = 'Тип данных не является временем! Ячейка: '.$cell->getCoordinate().'!';
			return false;
		}
					
	}
	function initString($type, &$value, $cell, &$error) {
		if($type == 'str' && !is_null($value)) {
			$value = preg_replace('|\s+|', ' ', $value);
			charset_x_win($value); 																	/* из a.charset.php преобразование в нормальную кодировку */
			return true;
		} else {
			$error = 'Тип данных не является строкой! Ячейка: '.$cell->getCoordinate().'!';
			return false;
		}
					
	}
	function initInteger($type, &$value, $cell, &$error) {
		if($type == 'int' && !is_null($value)) {
			if(preg_match("/^[0-9-]+$/", $value) || is_int($value)){
				return true;
			} else {
				$error = 'Тип данных не является целым числом! Ячейка: '.$cell->getCoordinate().'!';
				return false;
			}
		} else {
			$error = 'Тип данных не является целым числом! Ячейка: '.$cell->getCoordinate().'!';
			return false;
		}
					
	}
	function initFloat($type, &$value, $cell, &$error) {
		if($type == 'float' && !is_null($value)) {
			if(is_float($value) || preg_match("/^-?[1-9]\d*\.\d+|0\.\d+|-0\.\d*[1-9]\d*$/", $value) || preg_match("/^-?[1-9]\d*\,\d+|0\,\d+|-0\,\d*[1-9]\d*$/", $value) || preg_match("/^[0-9-]+$/", $value)){
				$value = preg_replace('/\,/', '.', $value);
				return true;
			} else {
				$error = 'Тип данных не является дробным числом! Ячейка: '.$cell->getCoordinate().'!';
				return false;
			}
		} else {
			$error = 'Тип данных не является дробным числом! Ячейка: '.$cell->getCoordinate().'!';
			return false;
		}
					
	}
}
?>