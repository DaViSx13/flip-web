<?php
try {
include "dbConnect.php";
require_once "secureCheck.php";
$CName=iconv("UTF-8", "windows-1251",stripslashes($_POST[cname]));
$ag=$_SESSION['xAgentID'];
$DName=iconv("UTF-8", "windows-1251",$_POST[dname]);
$Amt=$_POST[amt] ? $_POST[amt] : 0;
$CurId=$_POST[curid] ? $_POST[curid] : 0;
$VolWt=$_POST[volwt] ? $_POST[volwt] : 0;
$Rordnum=$_POST[rordnum] ? $_POST[rordnum] : 0;
$Address=iconv("UTF-8", "windows-1251",$_POST[address]);
$ContName=iconv("UTF-8", "windows-1251",$_POST[contname]);
$OrgRems=iconv("UTF-8", "windows-1251",$_POST[orgrems]);
$DContName=iconv("UTF-8", "windows-1251",$_POST[dcontname]);
$DAdr=iconv("UTF-8", "windows-1251",$_POST[dadr]);
$DESTRems=iconv("UTF-8", "windows-1251",$_POST[destrems]);
$UserIn= $_SESSION['xUser'];
$courdate=iconv("UTF-8", "windows-1251",$_POST[courdate]);
$courtimef=iconv("UTF-8", "windows-1251",$_POST[courtimef]);
$courtimet=iconv("UTF-8", "windows-1251",$_POST[courtimet]);
$ContPhone=iconv("UTF-8", "windows-1251",$_POST[contphone]); 
$DContPhone=iconv("UTF-8", "windows-1251",$_POST[dcontphone]); 

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
 
error_reporting(0);  
mssql_query($query);

//echo"1";  
if (mssql_get_last_message() == "Operation completed successfully") {
//echo "2";
print_r(json_encode(array('success'=>true, 'msg'=>iconv("windows-1251", "UTF-8", "Заказ сохранен"))));			//"{ "success": true, "msg": "User added successfully" }";
} else {
     print_r(json_encode(array('success'=>false, 'msg'=> iconv("windows-1251", "UTF-8", "Ошибка БД!"))));
}   
   //$result= mssql_query($query);
}catch (Exception $e) {
    print_r(json_encode(array('success'=>false, 'msg'=>iconv("windows-1251", "UTF-8", "Ошибка Сервера"))));
    }

?>
