<?php				

$status = "Доставлено_ивановйцукен";
//$status = "Доставлено zxc";
print_r($status);


preg_match("/(Доставлено)[^а-яА-Яa-zA-Z]*([а-яА-Яa-zA-Z]+)/i", $status, $matches); 

print_r($matches);

echo "[[[[";
print_r( trim(str_replace(["Доставлено", ".",",","_", "  "], "", $status) ) );
echo "]]]]" ;


?>