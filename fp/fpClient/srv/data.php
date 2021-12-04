<?php
include "errorhandler.php";

//завязка
session_name("CLIENTSESSIONID");
session_start();
header("Content-type: text/plain; charset=utf-8");
//error_reporting(0);
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
  public $data;
  public $success = false;
  public $msg = '';
}
$response = new Response();
$iserror = false;
$errormsg = ''; 
$paging = false;

//кульминация

if (!isset($_REQUEST['dbAct'])) {
    $response->msg = 'совсем не правильный запрос';
} else {
    $dbAct = $_REQUEST['dbAct'];
    //в case нужно сформировать строку sql запроса $query
    //если нужен paging установить $paging = true
    //можно задать сообщение, которое вернуть при успехе $response->msg = 'успех'

	$params = $_REQUEST;
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
            $ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			if(isset($params['newPeriod'])) {
                $query = "exec [wwwClientGetAgOrders] @period='$params[newPeriod]', @clientID={$ag}";
            } else {
                $query = "exec [wwwClientGetAgOrders] @from='$params[from]', @to='$params[to]', @clientID={$ag}";
            }
            break;
		case 'GetWebWbs':
            $ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
			if (!empty($_SESSION['AdmAgentID'])) $ag =$_SESSION['AdmAgentID'];
			if(isset($params['newPeriod'])) {
                $query = "exec [wwwClientGetWebWbs] @period='$params[newPeriod]', @clientID={$ag}";
            } else {
                $query = "exec [wwwClientGetWebWbs] @from='$params[from]', @to='$params[to]', @clientID={$ag}";
            }
            break;
		case 'GetMnf':
			$is_Ready = $params['is_Ready'];
			$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec wwwGetMnf @period='{$params['period']}', @agentID={$ag}, @is_Ready={$is_Ready}";
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
			$webwb=$params['webwb'] ? $params['webwb'] : 0;
            $fPayer = isset($params['fpayr']) ? $params['fpayr'] : 3;
            $metpaym = isset($params['metpaym']) ? $params['metpaym'] : 'inv';

			if($courdate){
				$d = explode('.', $courdate);
				$courdate = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) );
			}
			if(strtotime($courdate) < strtotime(date('Ymd'))){
				throw new Exception('Дата приезда курьера должна содержать дату больше или равной текущей!');
			}
			if (!isset($params['org'])) $params['org'] = -1; //магия
			
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
			@RordNum=$Rordnum,
			@webwb=$webwb,
			@fMetpaym = '$metpaym',
            @fPayr = $fPayer";
			break;
		case 'SetWebWB':			
			$id=$params['id'] ? $params['id'] : 0;
			$wb_no=$params['wb_no'];			
			$ord_no=$params['ord_no'] ? $params['ord_no'] : 0;
			//$org=$params['org'];
			$s_city_id=$params['org'];//$params['s_city'];
			$s_name=$params['s_name'];
			$s_tel=$params['s_tel'];
			$s_co=$params['s_co'];
			$s_adr=$params['s_adr'];
			$s_ref=$params['s_ref'];
			$s_mail=$params['s_mail'];
			//$dest=$params['dest'];
			$r_city_id=$params['dest'];//$params['r_city'];
			$r_name=$params['r_name'];
			$r_tel=$params['r_tel'];
			$r_co=$params['r_co'];
			$r_adr=$params['r_adr'];
			$r_ref=$params['r_ref'];
			$r_mail=$params['r_mail'];
			
			$t_pac=isset($params['type']) ? $params['type'] : 0;
			$vol_wt=$params['vol_wt'] ? $params['vol_wt'] : 0;	
			$wt=$params['wt'] ? $params['wt'] : 0;
			$pcs=$params['pcs'] ? $params['pcs'] : 0;
			$UserIn= $_SESSION['xUser'];
			$ag=$_SESSION['xAgentID'];
            $inssum = isset($params['inssum']) ? $params['inssum'] : 'null';
            //$metpaym = isset($params['metpaym']) ? $params['metpaym'] : 'null';
            //$payr = isset($params['payr']) ? $params['payr'] : 'null';
			//$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
				
			$query = "exec wwwClientSetWb
			 @ID = $id
			,@Wb_No = '$wb_no'
			,@Ord_No = $ord_no			
			,@S_City_ID = '$s_city_id'
			,@S_Name = '$s_name'
			,@S_Tel = '$s_tel'
			,@S_Co = '$s_co'
			,@S_Adr = '$s_adr'
			,@S_Ref = '$s_ref'
			,@S_Mail = '$s_mail'			
			,@R_City_ID = '$r_city_id'
			,@R_Name = '$r_name'
			,@R_Tel = '$r_tel'
			,@R_Co = '$r_co'
			,@R_Adr = '$r_adr'
			,@R_Ref = '$r_ref'
			,@R_Mail = '$r_mail'
			,@User_IN = '$UserIn'			
			,@WT = $wt
			,@VOL_WT = $vol_wt
			,@PCS = $pcs
			,@T_PAC = $t_pac
			,@Inssum = $inssum
            ,@wbsource = 'webClient'";
			break;	
		case 'GetClientWbs':
			$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			if(isset($params['newPeriod'])) {
                $query = "exec [wwwClientGetWbs] @period='$params[newPeriod]', @clientID={$ag}, @dir='$params[dir]'";
            } else {
                $query = "exec [wwwClientGetWbs] @from='$params[from]', @to='$params[to]', @clientID={$ag}, @dir='$params[dir]'";
            }
            $paging = true;
			break;
		case 'GetExCodes':
			  
			$query = "exec wwwGetExCodes";
			break;
		case 'GetWbEx':
			  
			$query = "exec wwwGetWbEx @wbno='$params[wb_no]'";
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
			$rcpn = $params['rcpn'];
			$d = explode('.', $params['p_d_in']);
			$p_d_in = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ); 
			$query = "exec wwwSetPOD @wb_no='{$params['wb_no']}', @p_d_in='{$p_d_in}', @tdd='{$params['tdd']}', @rcpn='{$rcpn}', @user='{$_SESSION['xUser']}' ";
			break;
		case 'GetWbsTotal':
			$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec [wwwClientGetWbsTotal] @period='{$params['period']}',  @clientID={$ag} ";
			break;
		case 'GetAgents':
			$query = "exec wwwGetClients";
			break;
		case 'SetWbno':
			$paging = false;
			$rordnum = isset($params['rordnum']) ? $params['rordnum'] : 0;
			$wbno = isset($params['wbno']) ? $params['wbno'] : 'NULL';
			$query = "exec wwwSetWbno @rordnum={$rordnum}, @wbno='{$wbno}'";
			break;
		case 'getAgTemplates':
			$ag = isset($params['newAgent']) ? $params['newAgent'] : $_SESSION['xClientID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec [wwwClientGetTemplates] @clientID={$ag}";
			break;
		case 'SetAgTemplates':
			$CName=$params['cname'];
			$ag=$_SESSION['xClientID'];
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

			$query = "exec [wwwClientSetTemplate]
			@TemplateName='$params[templatename]',
			@clientID=$ag,
			@tplid=$id,
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
			$query = "exec [wwwClientDelTemplate] @tplID = {$id}";
			break;
		case 'getUsers':			  
			$query = "exec wwwClientGetUsers";
			break;
		case 'setUsers':
			$pass = '';
			if (isset($params['passfirst'])) {$pass = $params['passfirst'];};
			$query = "exec [wwwClientSetUser] @id={$params['id']}, @auser='{$params['auser']}', @pass='{$pass}', @agentID={$params['agents']}, @cacc='{$params['cacc']}'"; 
			break;
		case 'setActive':			
			$query = "exec [wwwClientSetUserActive] @id={$params['id']}, @active={$params['active']}"; 
			break;
		case 'GetAgentsList':
			$query = "exec wwwGetAgentsList";
			break;
		case 'GetWb':
			$query = "exec wwwGetWb @wb_no='{$params['wb_no']}'";
			break;
		case 'GetClientInfo':
			$ag=$_SESSION["xClientID"];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec [wwwClientGetClientInfo]	@clientID=$ag";
			break;
		case 'getTarif':
			$weight = $params['weight'] ? $params['weight'] : 0.1;
			$planno = $_SESSION['xPlanno'] ? $_SESSION['xPlanno'] : 1;
			$volwt = ($params['width']*$params['height']*$params['length'])/6000;
			if ($weight<$volwt) $weight = $volwt;			
			$query = "exec wwwAPIgetTarif @org='$params[org]', @dest = '$params[dest]', @wt = {$weight}, @planno = {$planno}, @t_pak='LE'";						
            break;
    }

    if (!isset($query)) {
        $response->msg = 'не правильный запрос';
    } else {
        $query = utf8_to_win1251($query);
        $query = stripslashes($query);

        try {
			if (!isSessionActive()){
				throw new Exception('Сеанс завершен. Обновите страницу.');
				};
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

		

		
            include "dbConnect.php";
			$result = mssql_query($qry);
            if (is_resource($result) === TRUE) {

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
                    if(isset($params['filter'])){
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
                    if(isset($params['sort'])){
                      $sortParams = json_decode(stripslashes($params['sort']), true);
                      $sortKey = strtolower($sortParams[0]['property']);
                      $sortDir = strtolower($sortParams[0]['direction']);

                      include 'multiSort.php';
                      $multisort = new multisort();
                      $response->data = $multisort->run($response->data, $sortKey, $sortDir);
                    }

                    //paging
		  			$page = $params['page'];
        			$start = $params['start'];
        			$limit = $params['limit'];
					$response->total = count($response->data);
					if ($response->data){
						$response->data = array_slice($response->data, $start, $limit);
					}
				}
				
                //mssql_free_result($result);
                $response->success = true;
                
            } else {
                $errormsg = 'sql error: ' . iconv("windows-1251", "UTF-8", mssql_get_last_message());
            }
        }
        catch (exception $e) {
            $response->msg = $e->getMessage();
        }
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