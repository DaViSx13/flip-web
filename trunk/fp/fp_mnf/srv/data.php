<?php
//завязка
session_start();
header("Content-type: text/plain; charset=utf-8");
error_reporting(0);
class Response
{
    public $success = false;
    public $msg = '';
}
$response = new Response();

//кульминация

if (!isset($_REQUEST['dbAct'])) {
    $response->msg = 'совсем не правильный запрос';
} else {
    $dbAct = $_REQUEST['dbAct'];
    //в case нужно сформировать строку sql запроса $query
    //если нужен paging установить $paging = true
    //можно задать сообщение, которое вернуть при успехе $response->msg = 'успех'

    $response->msg = 'ok';
    switch ($dbAct) {
        case 'dbTest':
            $query = "select '$_REQUEST[test]' as test";
			//$query = "select cast(null as varchar(10)) as test";
            break;
        case 'getAgOrders':
            $ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];
            $query = "exec wwwGetAgOrders @period='$_REQUEST[newPeriod]', @agentID={$ag}";
            break;
		case 'GetMnf':
			$is_Ready = $_REQUEST['is_Ready'];
			$ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];
			$query = "exec wwwGetMnf @period='$_REQUEST[period]', @agentID={$ag}, @is_Ready={$is_Ready}";
			break;
		case 'GetWbMnf':
			$mnfRefNo = $_REQUEST['mnfRefNo'];
			$ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];
			$query = "exec wwwGetWbMnf @agentID={$ag}, @mnfRefNo='{$mnfRefNo}'";
			break;
		case 'GetCity':
			$pName = $_REQUEST['query'] ? $_REQUEST['query'] : '';  
			$query = "exec wwwGetCity @pName = '{$pName}'";
			break;
		case 'editagorder':
			$id =  $_REQUEST[id];
			$query = "exec wwwEditAgOrders @id={$id}";
			break;
		case 'saveagorder':
			$CName=$_POST[cname];
			$ag=$_SESSION['xAgentID'];
			$DName=$_POST[dname];
			$Amt=$_POST[amt] ? $_POST[amt] : 0;
			$CurId=$_POST[curid] ? $_POST[curid] : 0;
			$VolWt=$_POST[volwt] ? $_POST[volwt] : 0;
			$Rordnum=$_POST[rordnum] ? $_POST[rordnum] : 0;
			$Address=$_POST[address];
			$ContName=$_POST[contname];
			$OrgRems=$_POST[orgrems];
			$DContName=$_POST[dcontname];
			$DAdr=$_POST[dadr];
			$DESTRems=$_POST[destrems];
			$UserIn= $_SESSION['xUser'];
			$courdate=$_POST[courdate];
			$courtimef=$_POST[courtimef];
			$courtimet=$_POST[courtimet];
			$ContPhone=$_POST[contphone];
			$DContPhone=$_POST[dcontphone];

			if($courdate){
				$d = explode('.', $courdate);
				$courdate = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) );
			}

			$query = "exec wwwSaveAgOrders
			@ORG=$_POST[org],
			@CName='$CName',
			@Address='$Address',
			@ContName='$ContName',
			@ContPhone='$ContPhone',
			@ContMail='$_POST[contmail]',
			@OrgRems='$OrgRems',
			@DEST=$_POST[dest],
			@DName='$DName',
			@DAdr='$DAdr',
			@DContName='$DContName',
			@DContPhone='$DContPhone',
			@DContMail='$_POST[dcontmail]',
			@DESTRems='$DESTRems',
			@Type=$_POST[type],
			@Packs=$_POST[packs],
			@Wt=$_POST[wt],
			@VolWt=$VolWt,
			@CourDate='$courdate',
			@CourTimeF='$courtimef',
			@CourTimeT='$courtimet',
			@Payr=$ag,
			@UserIn=$UserIn,
			@RordNum=$Rordnum";			
			break;
		case 'GetAgentWbs':
			$ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];  
			$query = "exec wwwGetAgentWbs @period='$_REQUEST[newPeriod]', @agentID={$ag}, @dir='$_REQUEST[dir]'";
            $paging = true;
			break;
		case 'GetExCodes':
			  
			$query = "exec wwwGetExCodes";
			break;
		case 'GetWbEx':
			  
			$query = "exec wwwGetWbEx @wbno='$_REQUEST[wb_no]'";
			break;
		case 'SetTar_a_ag':
			$rem_ag = $_POST['rem_ag'];   
			$rem_ag = stripslashes($rem_ag);
			$tar_a_ag = strtr($_POST['tar_a_ag'], ',', '.');  
			$query = "exec wwwSetTar_a_ag @wb_no='{$_POST[wb_no]}', @interid={$_POST['interid']}, @tar_a_ag={$tar_a_ag}, @rem='{$rem_ag}', @user='{$_SESSION[xUser]}' ";
			break;
		case 'NewEx':
			$exContent = $_POST['exContent'];   
			$d = explode('.', $_POST['exRaised']);
			$exRaised = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ) . ' ' . $_POST['exRaisedTime'];
			$d = explode('.', $_POST['exRptd']);
			$exRptd = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ); 
			$query = "exec wwwNewEx @wb_no='{$_POST[wb_no]}', @raised='{$exRaised}', @rptd='{$exRptd}', @loc='{$_POST[exLoc]}', @exCode = '{$_POST[exCode]}', @Content = '$exContent' , @user='{$_SESSION[xUser]}' ";
			break;	
		case 'SetPOD':
			$rcpn = $_POST['rcpn'];
			$d = explode('.', $_POST['p_d_in']);
			$p_d_in = strftime('%Y%m%d', mktime(0,0,0, $d[1], $d[0], $d[2]) ); 
			$query = "exec wwwSetPOD @wb_no='{$_POST[wb_no]}', @p_d_in='{$p_d_in}', @tdd='{$_POST[tdd]}', @rcpn='{$rcpn}', @user='{$_SESSION[xUser]}' ";
			break;
		case 'GetWbsTotal':
			$ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];
			$query = "exec wwwGetWbsTotal @dir='{$_POST[dir]}', @period='{$_POST[period]}',  @agentID={$ag} ";
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
				    //$response->paging = 'paging';
		  			$page = $_REQUEST['page'];
        			$start = $_REQUEST['start'];
        			$limit = $_REQUEST['limit'];

                    //setlocale(LC_ALL, "ru_RU.UTF-8", "Russian_Russia.65001");
                    //$response->zzz = strnatcasecmp('ВЫСОЦКАЯ', 'Васильева');
                    //$response->xxx = setlocale(LC_ALL, '0');

                    $sortParams = json_decode(stripslashes($_REQUEST['sort']), true);
                    $sortKey = strtolower($sortParams[0]['property']);
                    $sortDir = strtolower($sortParams[0]['direction']);

                    include 'multiSort.php';
                    $multisort = new multisort();
                    $response->data = $multisort->run($response->data, $sortKey, $sortDir);
                    //uasort($response->data, build_sorter('rcpn'), 'desc');


					$response->total = count($response->data);
					$response->data = array_slice($response->data, $start, $limit);
				}
				
                mssql_free_result($result);
                $response->success = true;
                
            } else {
                $response->msg = 'sql error: ' . iconv("windows-1251", "UTF-8", mssql_get_last_message());
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

if (extension_loaded('mbstring')) {
    echo my_json_encode($response);
} else {
    echo json_encode($response);
}
?>