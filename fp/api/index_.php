<?php
require 'flight/Flight.php';

/*Flight::route('/@name/@id', function($name, $id){
    echo "hello, $name ($id)!";
});*/

Flight::route('/', function(){
    echo 'hello world!';
});

Flight::route('GET
 /put/', function(){
    echo 'I received a PUT request.';
});


Flight::route('GET /json/@wbno', function($wbno) {
    
ini_set("mssql.datetimeconvert", 0);
mssql_connect("ROCKET", "pod", "");
mssql_select_db("alert_f");
mssql_query("set quoted_identifier on
set arithabort on
set numeric_roundabort off
set ansi_warnings on
set ansi_padding on
set ansi_nulls on");
	
$qry = "exec wwwGetWb @wb_no='$wbno'";
$result=mssql_query($qry);

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
                
                unset($response->fields);				

$wbData = json_encode($response->data[0]);
echo $wbData;
});


Flight::start();
?>
