<?php
/**
 * Обработчик ошибок
 * @param int $code уровень ошибки
 * @param string $msg сообщение об ошибке
 * @param string $file имя файла, в котором произошла ошибка
 * @param int $line номер строки, в которой произошла ошибка
 * @return boolean
 */

function my_error_handler($code, $msg, $file, $line) {
global $iserror, $errormsg; 
if (error_reporting() & $code)
    {
        $errors = array(
            E_ERROR => 'E_ERROR',
            E_WARNING => 'E_WARNING',
            E_PARSE => 'E_PARSE',
            E_NOTICE => 'E_NOTICE',
            E_CORE_ERROR => 'E_CORE_ERROR',
            E_CORE_WARNING => 'E_CORE_WARNING',
            E_COMPILE_ERROR => 'E_COMPILE_ERROR',
            E_COMPILE_WARNING => 'E_COMPILE_WARNING',
            E_USER_ERROR => 'E_USER_ERROR',
            E_USER_WARNING => 'E_USER_WARNING',
            E_USER_NOTICE => 'E_USER_NOTICE',
            E_STRICT => 'E_STRICT',
            E_RECOVERABLE_ERROR => 'E_RECOVERABLE_ERROR',
            E_DEPRECATED => 'E_DEPRECATED',
            E_USER_DEPRECATED => 'E_USER_DEPRECATED',
        );
		$iserror = true;
		$errormsg = "{$errors[$code]}[$code] $msg ($file на $line строке)";		
	}
	return true;
}

set_error_handler('my_error_handler');    
?>