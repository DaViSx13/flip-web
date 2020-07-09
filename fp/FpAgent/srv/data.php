<?php
include "errorhandler.php";

//завязка_
session_name("AGENTSESSIONID");
session_start();
header("Content-type: text/plain; charset=utf-8");
//error_reporting(-1);
error_reporting(E_ALL /*& ~E_NOTICE*/);
ini_set('display_errors', '0');

function utf8_to_win1251($str){
	//ищем способ конвертации без ошибок
	//для примера левых символов
	//$str = "‎89104260898";
	//$str = "Санкт-Петербург, Малый пр., В.О., дом ¹57";	
	
	//IGNORE на PHP5.5 все равно выдает NOTICE и возвращает пустую строку
	//return iconv("UTF-8", "windows-1251//IGNORE", $str);
	
	//TRANSLIT работает без ошибок, левые символы заменяет на ?
	//return iconv("UTF-8", "windows-1251//TRANSLIT", $str);
	
	//без ini_set работает как TRANSLIT, с ним так, как должен работать IGNORE
	ini_set('mbstring.substitute_character', "none");
	return mb_convert_encoding($str, "windows-1251", "utf-8");
}

function quoteString($str){
	return str_ireplace("'", "''", $str);
}

function array_unshift_assoc(&$arr, $key, $val) 
{ 
    $arr = array_reverse($arr, true); 
    $arr[$key] = $val; 
    $arr = array_reverse($arr, true); 
    return count($arr); 
} 

function arrayToString($arr){
	return urldecode(http_build_query($arr, '', '||'));
}

function doLog($arr){
	$logFile = '_reqLog.txt';
	$str =  arrayToString($arr) . PHP_EOL;
	$str = "time=" . strftime("%F %T") . "||" . "user=" . $_SESSION['xUser'] . "||" . "sessionID=" . session_id() . "||" . $str;
	file_put_contents($logFile, $str, FILE_APPEND);
}

function logRequestToDB($p){
	$arr = $p;
	
	array_unshift_assoc($arr, "sessionID", session_id());
	array_unshift_assoc($arr, "user", $_SESSION['xUser']);
	array_unshift_assoc($arr, "time", strftime("%F %T"));
	
	$str =  arrayToString($arr);
	$query = "exec wwwLogRequest @request='{$str}'";
	$query = utf8_to_win1251($query);
	mssql_query($query);
}

function isSessionActive(){
	return isset($_SESSION['xUser']);
}

class Response
{
	public $success = false;
    public $msg = '';
	public $data = null;
}

$response = new Response();
$iserror = false;
$errormsg = ''; 
$paging = false;
$params = $_REQUEST;
$needLogRequest = false;
$switchDefault = false;


//кульминация

if (!isset($_REQUEST['dbAct'])) {
    $response->msg = 'совсем не правильный запрос';
} else {
	try {
		if (!isSessionActive()){
			throw new Exception('Сеанс завершен. Обновите страницу.');
			};

				$dbAct = $_REQUEST['dbAct'];
    //в case нужно сформировать строку sql запроса $query
    //если нужен paging установить $paging = true
    //можно задать сообщение, которое вернуть при успехе $response->msg = 'успех'

	foreach ($params as &$value) {
		if( is_string($value) ) $value = trim($value);
		if( is_string($value) ) $value = quoteString($value);
	};

    $response->msg = 'ok';
    switch ($dbAct) {
        case 'dbTest':
            $query = "select '$params[test]' as test";
			//$query = "select cast(null as varchar(10)) as test";
            break;
        case 'getAgOrders':
            $ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			if(isset($params['newPeriod']))
                $query = "exec wwwGetAgOrders @period='$params[newPeriod]', @agentID={$ag}";
			else
                $query = "exec wwwGetAgOrders @First='$params[startDate]',@Last='$params[endDate]', @agentID={$ag}";
            break;
	    case 'getClientAgOrders':
            $ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
            if(isset($params['newPeriod']))
                $query = "exec wwwGetAgClientOrders @period='$params[newPeriod]', @agentID={$ag}";
            else
                $query = "exec wwwGetAgClientOrders @First='$params[startDate]', @Last='$params[endDate]', @agentID={$ag}";
            break;
		case 'GetMnf':
			$is_Ready = $params['is_Ready'];
			$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			if(isset($params['period'])) {
                $query = "exec wwwGetMnf @period='{$params['period']}', @agentID={$ag}, @is_Ready={$is_Ready}";
            } else {
                $query = "exec wwwGetMnf @from='{$params['from']}', @to='{$params['to']}', @agentID={$ag}, @is_Ready={$is_Ready}";
            }
			break;
		case 'GetWbMnf':
			$mnfRefNo = $params['mnfRefNo'];
			$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec wwwGetWbMnf @agentID={$ag}, @mnfRefNo='{$mnfRefNo}'";
			break;
		case 'GetCity':
			$pName = isset($params['query']) ? $params['query'] : '';
			$query = "exec wwwGetCity @pName = '{$pName}'";
			break;
		case 'editagorder':
			$id =  $params['id'];
			$agent = $_SESSION['xAgentID'];
			$query = "exec wwwEditAgOrders @id={$id}, @agent={$agent}";
			break;
		case 'saveagorder':
			$needLogRequest = true;

			$CName=$params['cname'];
			$ag=$_SESSION['xAgentID'];
			$DName=$params['dname'];
			$Amt=isset($params['amt']) ? $params['amt'] : 0;
			$CurId=isset($params['curid']) ? $params['curid'] : 0;
			$VolWt=$params['volwt'] ? $params['volwt'] : 0;
			$Rordnum=$params['rordnum'] ? $params['rordnum'] : 0;
			$Address=$params['address'];
			$ContName=$params['contname'];
			$OrgRems=$params['orgrems'];
			$DContName=$params['dcontname'];
			$DAdr=$params['dadr'];
			$DESTRems=$params['destrems'];
			$UserIn= $_SESSION['xUser'];
			$courdate=$params['courdate'];
			$courtimef=$params['courtimef'];
			$courtimet=$params['courtimet'];
			$ContPhone=$params['contphone'];
			$DContPhone=$params['dcontphone'];

			if($courdate){
				$d = explode('.', $courdate);
				$courdate = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) );
			}

			$query = "exec wwwSaveAgOrders
			@ORG=$params[org],
			@CName='$CName',
			@Address='$Address',
			@ContName='$ContName',
			@ContPhone='$ContPhone',
			@ContMail='$params[contmail]',
			@OrgRems='$OrgRems',
			@DEST=$params[dest],
			@DName='$DName',
			@DAdr='$DAdr',
			@DContName='$DContName',
			@DContPhone='$DContPhone',
			@DContMail='$params[dcontmail]',
			@DESTRems='$DESTRems',
			@Type=$params[type],
			@Packs=$params[packs],
			@Wt=$params[wt],
			@VolWt=$VolWt,
			@CourDate='$courdate',
			@CourTimeF='$courtimef',
			@CourTimeT='$courtimet',
			@Payr=$ag,
			@UserIn=$UserIn,
			@RordNum=$Rordnum";
			break;
		case 'GetAgentWbs':
			$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$dirWbs = $params['dir'];
			if(isset($params['newPeriod'])) {
                $newPeriodWbs = $params['newPeriod'];
                $query = "exec wwwGetAgentWbs @period='{$newPeriodWbs}', @agentID={$ag}, @dir='{$dirWbs}'";
            } else {
                $query = "exec wwwGetAgentWbs @from='{$params['from']}', @to='{$params['to']}', @agentID={$ag}, @dir='{$dirWbs}'";
            }
            $paging = true;
			break;
		case 'GetExCodes':
			$query = "exec wwwGetExCodes";
			break;
		case 'SetToken':
		    $ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xAgentID'];
			$token = openssl_random_pseudo_bytes(32);
			$token = bin2hex($token);			
			$query = "exec wwwSetToken @token='{$token}', @ag={$ag}";
			break;
		case 'GetToken':
			$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xAgentID'];			
			$query = "exec wwwGetToken @ag={$ag}";
			break;
		case 'GetWbEx':
			  
			$query = "exec wwwGetWbEx @wbno='$params[wb_no]'";
			break;
		case 'GetOrdEx':	
			$Rordnum=$params['rordnum'] ? $params['rordnum'] : 0;
			$query = "exec wwwGetAgOrdEx @ROrdNum=$Rordnum";
			break;
		case 'SetTar_a_ag':
			$rem_ag = $params['rem_ag'];   
			$rem_ag = stripslashes($rem_ag);
			$tar_a_ag = strtr($params['tar_a_ag'], ',', '.');  
			$query = "exec wwwSetTar_a_ag @wb_no='{$params['wb_no']}', @interid={$params['interid']}, @tar_a_ag={$tar_a_ag}, @rem='{$rem_ag}', @user='{$_SESSION['xUser']}' ";
			break;
		case 'NewEx':
			$exContent = $params['exContent'];   
			$d = explode('.', $params['exRaised']);
			$exRaised = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ) . ' ' . $params['exRaisedTime'];
			$d = explode('.', $params['exRptd']);
			$exRptd = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ); 
			$query = "exec wwwNewEx @wb_no='{$params['wb_no']}', @raised='{$exRaised}', @rptd='{$exRptd}', @loc='{$params['exLoc']}', @exCode = '{$params['exCode']}', @Content = '$exContent' , @user='{$_SESSION['xUser']}' ";
			break;	
		case 'SetPOD':
			$needLogRequest = true;
			
			$rcpn = $params['rcpn'];
			$d = explode('.', $params['p_d_in']);
			$p_d_in = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ); 
			$query = "exec wwwSetPOD @wb_no='{$params['wb_no']}', @p_d_in='{$p_d_in}', @tdd='{$params['tdd']}', @rcpn='{$rcpn}', @user='{$_SESSION['xUser']}' ";
			break;
		case 'GetWbsTotal':
			$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			if(isset($params['period'])) {
                $query = "exec wwwGetWbsTotal @dir='{$params['dir']}', @period='{$params['period']}',  @agentID={$ag} ";
            } else {
                $query = "exec wwwGetWbsTotal @dir='{$params['dir']}', @from='{$params['from']}', @to='{$params['to']}',  @agentID={$ag} ";
            }
			break;
		case 'GetAgents':
			$query = "exec wwwGetAgents";
			break;
		case 'SetWbno':
			$paging = false;
			$rordnum = isset($params['rordnum']) ? $params['rordnum'] : 0;
			$wbno = isset($params['wbno']) ? $params['wbno'] : 'NULL';
			$query = "exec wwwSetWbno @rordnum={$rordnum}, @wbno='{$wbno}'";
			break;
		case 'SetWbnoCli':
			$paging = false;
			$rordnum = isset($params['rordnum']) ? $params['rordnum'] : 0;
			$wbno = isset($params['wbno']) ? $params['wbno'] : 'NULL';
			$query = "exec wwwSetWbnoCli @rordnum={$rordnum}, @wbno='{$wbno}'";
			break;
		case 'getAgTemplates':
			$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec wwwGetAgTemplates @agentID={$ag}";
			break;
		case 'SetAgTemplates':
			$CName=$params['cname'];
			$ag=$_SESSION['xAgentID'];
			$DName=$params['dname'];
			$id=$params['id'] ? $params['id'] : 0;
			$Address=$params['address'];
			$ContName=$params['contname'];
			$OrgRems=$params['orgrems'];
			$DContName=$params['dcontname'];
			$DAdr=$params['dadr'];
			$DESTRems=$params['destrems'];			
			$ContPhone=$params['contphone'];
			$DContPhone=$params['dcontphone'];			

			$query = "exec wwwSetAgTemplates
			@TemplateName='$params[templatename]',
			@agentID=$ag,
			@id=$id,
			@ORG=$params[org],
			@CName='$CName',
			@Address='$Address',
			@ContName='$ContName',
			@ContPhone='$ContPhone',
			@ContMail='$params[contmail]',
			@OrgRems='$OrgRems',
			@DEST=$params[dest],
			@DName='$DName',
			@DAdr='$DAdr',
			@DContName='$DContName',
			@DContPhone='$DContPhone',
			@DContMail='$params[dcontmail]',
			@DESTRems='$DESTRems'";			
			break;
		case 'DelAgTemplates':
			$id = $params['id'];			
			$query = "exec wwwDelAgTemplates @id={$id}";
			break;
		case 'getUsers':			  
			$query = "exec wwwGetUsers";
			break;
		case 'setUsers':						
			$query = "exec wwwSetUsers @id={$params['id']}, @auser='{$params['auser']}', @pass='{$params['passfirst']}', @agentID={$params['agents']}"; 
			break;
		case 'setActive':			
			$query = "exec wwwSetActive @id={$params['id']}, @active={$params['active']}"; 
			break;
		case 'GetAgentsList':
			$query = "exec wwwGetAgentsList";
			break;
		case 'GetWb':
			$query = "exec wwwGetWb @wb_no='{$params['wb_no']}'";
			break;
		default:
			$switchDefault = true;
			break;
    }

    if (!isset($query) || strlen($query) == 0) {
        $response->msg = 'не правильный запрос';
		if ($switchDefault === true) {
			$response->msg = $response->msg . ' !!switchDefault!!';
		}
	} else {
        $query = utf8_to_win1251($query);
        $query = stripslashes($query);

$qry = <<<EOD
-- user={$_SESSION['xUser']} dbAct={$params['dbAct']} 
BEGIN TRY

{$query};

END TRY
BEGIN CATCH
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'E1: '+ ERROR_MESSAGE()
	RAISERROR (@ErrorMessage, -- Message text.
               16, -- Severity.
               1 -- State.
               );
END CATCH
EOD;

//$qry = $query;
		
				
            include "dbConnect.php";
			if($needLogRequest){
				logRequestToDB($params);
			};
			
			$result = mssql_query($qry);
            if ( is_resource($result) === TRUE ) {

				for($i = 0; $i < mssql_num_fields($result); $i++){
					$response->fields[mssql_field_name($result, $i)] = mssql_field_type($result, $i);
				}
			
                while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
                    foreach ($row as $f => &$value) {
						if((($response->fields[$f] == 'char')||($response->fields[$f] == 'text'))&&($value)){
							$value = iconv("windows-1251", "UTF-8", $value);
						}
                    }

                    $response->data[] = array_change_key_case($row);
                }

                //$response->dvs = 'превед';
                unset($response->fields);

				//paging
				if($paging){

                    //filtering
                    if( isset($params['filter']) && is_array($response->data) ){
					  $filterParams = json_decode($params['filter'], true);
                      $filterKey = strtolower($filterParams[0]['property']);
                      $filterValue = strtolower($filterParams[0]['value']);

                      $response->filterKey = $filterKey;
                      $response->filterValue = $filterValue;
					  
                      include 'filterer.php';
                      $filterer = new Filterer();
                      $response->data = $filterer->filter($response->data, $filterKey, $filterValue);

                    }

                    //sorting
                    if( isset($params['sort']) && is_array($response->data) ){
                      $sortParams = json_decode(stripslashes($params['sort']), true);
                      $sortKey = strtolower($sortParams[0]['property']);
                      $sortDir = strtolower($sortParams[0]['direction']);

                      include 'multiSort.php';
                      $multisort = new multisort();
                      $response->data = $multisort->run($response->data, $sortKey, $sortDir);
                    }

                    //paging
					if(array_key_exists('page', $params)){
						$page = $params['page'];
						$start = $params['start'];
						$limit = $params['limit'];
						$response->total = count($response->data);
						if ($response->data){
							$response->data = array_slice($response->data, $start, $limit);
						}
					}
				}
				
                //mssql_free_result($result);
                $response->success = true;
                
            } else {
                $errormsg = 'sql error: ' . iconv("windows-1251", "UTF-8", mssql_get_last_message());
				$iserror = true;
            }
        
    }
	}
        catch (exception $e) {
            $response->msg = $e->getMessage();
        }
}

//финал
function my_json_encode($arr)
{
    //convmap since 0x80 char codes so it takes all multibyte codes (above ASCII 127). So such characters are being "hidden" from normal json_encoding
    array_walk_recursive($arr, create_function('&$item, $key',
        'if (is_string($item)) $item = mb_encode_numericentity($item, array (0x80, 0xffff, 0, 0xffff), "UTF-8"); '));
    return mb_decode_numericentity(json_encode($arr), array(
        0x80,
        0xffff,
        0,
        0xffff), 'UTF-8');

}

if ($iserror){
	$response->success = false;
	$response->msg = $errormsg;
	/*
	$sqlerrormsg = iconv("windows-1251", "UTF-8", mssql_get_last_message());
	if (isset($sqlerrormsg)) {
		$response->msg = $sqlerrormsg .  ' ============================================================= ' . $response->msg;
	}
	*/
	//$response->msg = $errormsg . " ====>" . mssql_get_last_message() . "<==== ";

	logErrorToFile($errormsg . " ====>" . iconv("windows-1251", "UTF-8", mssql_get_last_message()) . "<==== " . "||" . arrayToString($params). "||query=" . iconv("windows-1251", "UTF-8", $query) );
}

/*
if (extension_loaded('mbstring')) {
    echo my_json_encode($response);
} else {
    echo json_encode($response);
}
*/
echo json_encode($response);
?>