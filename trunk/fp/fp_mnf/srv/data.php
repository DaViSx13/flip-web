<?php
//завязка
session_start();
header("Content-type: text/plain; charset=utf-8");
error_reporting(0);
class Response
{
    public $success = false;
    public $msg = 'defaultResponse';
    public $data = array();
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
            break;
        case 'getCourWbs':
            $query = "exec wwwCourGetWbs @courId=$_SESSION[courId]";
            break;
        case 'getCourOrders':
            $query = "exec wwwCourGetOrders @courId='$_SESSION[courId]'";
            break;
        case 'getAgOrders':
            $ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];
            $query = "exec wwwGetAgOrders @period='$_REQUEST[newPeriod]', @agentID={$ag}";
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
                while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
                    foreach ($row as &$value) {
                        $value = iconv("windows-1251", "UTF-8", $value);
                    }
                    $response->data[] = $row;
                }
                mssql_free_result($result);
                $response->success = true;
                $response->msg = 'ok';
            } else {
                $response->msg = 'sql error: ' . mssql_get_last_message();
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