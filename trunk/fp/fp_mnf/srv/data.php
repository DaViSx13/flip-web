<?php
//завязка
session_start();
header("Content-type: text/plain; charset=utf-8");
error_reporting(0);
class Response
{
    public $success = false;
    public $msg = 'defaultResponse';
    //public $data = array();
}
$response = new Response();


//кульминация

if (!isset($_REQUEST['dbAct'])) {
    $response->msg = 'совсем не правильный запрос';
} else {
    $dbAct = $_REQUEST['dbAct'];
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
		case 'GetAgentWbs':
			$ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];  
			$query = "exec wwwGetAgentWbs @period='$_REQUEST[newPeriod]', @agentID={$ag}";
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
			$query = "exec wwwGetAgentWbs @period='$_REQUEST[newPeriod]', @agentID={$ag}";
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
						if(($response->fields[$f] == 'char')&&($value)){
							$value = iconv("windows-1251", "UTF-8", $value);
						}
                    }
                    $response->data[] = array_change_key_case($row);
                }
                mssql_free_result($result);
                $response->success = true;
                $response->msg = 'ok';
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