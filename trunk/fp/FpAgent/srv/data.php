<?php
//завязка
session_start();
header("Content-type: text/plain; charset=utf-8");
//error_reporting(0);
class Response
{
    
	public $success = false;
    public $msg = '';
}
$response = new Response();
$iserror = false;
$errormsg = ''; 
include "errorhandler.php";

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
	};
	
    $response->msg = 'ok';
    switch ($dbAct) {
        case 'dbTest':
            $query = "select '$params[test]' as test";
			//$query = "select cast(null as varchar(10)) as test";
            break;
        case 'getAgOrders':
            $ag = $params['newAgent'] ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
            $query = "exec wwwGetAgOrders @period='$params[newPeriod]', @agentID={$ag}";
            break;
		case 'GetMnf':
			$is_Ready = $params['is_Ready'];
			$ag = $params['newAgent'] ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec wwwGetMnf @period='$params[period]', @agentID={$ag}, @is_Ready={$is_Ready}";
			break;
		case 'GetWbMnf':
			$mnfRefNo = $params['mnfRefNo'];
			$ag = $params['newAgent'] ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec wwwGetWbMnf @agentID={$ag}, @mnfRefNo='{$mnfRefNo}'";
			break;
		case 'GetCity':
			$pName = $params['query'] ? $params['query'] : '';  
			$query = "exec wwwGetCity @pName = '{$pName}'";
			break;
		case 'editagorder':
			$id =  $params[id];
			$agent = $_SESSION['xAgentID'];
			$query = "exec wwwEditAgOrders @id={$id}, @agent={$agent}";
			break;
		case 'saveagorder':
			$CName=$params[cname];
			$ag=$_SESSION['xAgentID'];
			$DName=$params[dname];
			$Amt=$params[amt] ? $params[amt] : 0;
			$CurId=$params[curid] ? $params[curid] : 0;
			$VolWt=$params[volwt] ? $params[volwt] : 0;
			$Rordnum=$params[rordnum] ? $params[rordnum] : 0;
			$Address=$params[address];
			$ContName=$params[contname];
			$OrgRems=$params[orgrems];
			$DContName=$params[dcontname];
			$DAdr=$params[dadr];
			$DESTRems=$params[destrems];
			$UserIn= $_SESSION['xUser'];
			$courdate=$params[courdate];
			$courtimef=$params[courtimef];
			$courtimet=$params[courtimet];
			$ContPhone=$params[contphone];
			$DContPhone=$params[dcontphone];

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
			$ag = $params['newAgent'] ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec wwwGetAgentWbs @period='$params[newPeriod]', @agentID={$ag}, @dir='$params[dir]'";
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
			$query = "exec wwwSetTar_a_ag @wb_no='{$params[wb_no]}', @interid={$params['interid']}, @tar_a_ag={$tar_a_ag}, @rem='{$rem_ag}', @user='{$_SESSION[xUser]}' ";
			break;
		case 'NewEx':
			$exContent = $params['exContent'];   
			$d = explode('.', $params['exRaised']);
			$exRaised = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ) . ' ' . $params['exRaisedTime'];
			$d = explode('.', $params['exRptd']);
			$exRptd = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ); 
			$query = "exec wwwNewEx @wb_no='{$params[wb_no]}', @raised='{$exRaised}', @rptd='{$exRptd}', @loc='{$params[exLoc]}', @exCode = '{$params[exCode]}', @Content = '$exContent' , @user='{$_SESSION[xUser]}' ";
			break;	
		case 'SetPOD':
			$rcpn = $params['rcpn'];
			$d = explode('.', $params['p_d_in']);
			$p_d_in = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ); 
			$query = "exec wwwSetPOD @wb_no='{$params[wb_no]}', @p_d_in='{$p_d_in}', @tdd='{$params[tdd]}', @rcpn='{$rcpn}', @user='{$_SESSION[xUser]}' ";
			break;
		case 'GetWbsTotal':
			$ag = $params['newAgent'] ? $params['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec wwwGetWbsTotal @dir='{$params[dir]}', @period='{$params[period]}',  @agentID={$ag} ";
			break;
		case 'GetAgents':
			$query = "exec wwwGetAgents";
			break;
		case 'SetWbno':
			$paging = false;
			$rordnum = $params['rordnum'] ? $params['rordnum'] : 0;
			$wbno = $params['wbno'] ? $params['wbno'] : 'NULL';
			$query = "exec wwwSetWbno @rordnum={$rordnum}, @wbno='{$wbno}'";
			break;
		case 'getAgTemplates':
			$ag = $params['newAgent'] ? $params['newAgent'] : $_SESSION['xAgentID'];
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
			$query = "exec wwwSetUsers @id={$params[id]}, @auser='{$params[auser]}', @pass='{$params[passfirst]}', @agentID={$params[agents]}"; 
			break;
		case 'setActive':			
			$query = "exec wwwSetActive @id={$params[id]}, @active={$params[active]}"; 
			break;
		case 'GetAgentsList':
			$query = "exec wwwGetAgentsList";
			break;
    }

    if (!isset($query)) {
        $response->msg = 'не правильный запрос';
    } else {
        $query = iconv("UTF-8", "windows-1251", $query);
        $query = stripslashes($query);

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
                      $filterParams = json_decode(stripslashes($params['filter']), true);
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
				
                mssql_free_result($result);
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