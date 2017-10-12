<?php
/**
 * Обработчик ошибок
 * @param int $code уровень ошибки
 * @param string $msg сообщение об ошибке
 * @param string $file имя файла, в котором произошла ошибка
 * @param int $line номер строки, в которой произошла ошибка
 * @return boolean
 */
function logErrorToFile($msg){
	$logFile = date("Ymd") . ".txt";
	$str = "time=" . strftime("%F %T") . "||" . "user=" . $_SESSION['xUser'] . "||" . "sessionID=" . session_id() . "||" . $msg . PHP_EOL;
	file_put_contents($logFile, $str, FILE_APPEND);
}
///////////////////////////////////////////// 
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
		$errormsg = "GLOBAL_ERROR = {$errors[$code]}[$code] $msg ($file на $line строке)";		
		logErrorToFile($errormsg);
	}
	return true;
}

set_error_handler('my_error_handler');    
///////////////////////////////////////////// 

function shutdown() {
	//logErrorToFile('call to shutdown');
    $error = error_get_last();
	//var_dump($error);
    if (
        // если в коде была допущена ошибка
        is_array($error) &&
        // и это одна из фатальных ошибок
        in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])
    ) {
        // очищаем буфер вывода (о нём мы ещё поговорим в последующих статьях)
        while (ob_get_level()) {
            ob_end_clean();
        }
        // выводим описание проблемы
        //echo "Сервер находится на техническом обслуживании, зайдите позже";
		$errormsg = "FATAL_ERROR = type={$error['type']} {$error['message']} ({$error['file']} на {$error['line']} строке)";
		logErrorToFile($errormsg);
    }
}
register_shutdown_function('shutdown');

///////////////////////////////////////////// 
?>