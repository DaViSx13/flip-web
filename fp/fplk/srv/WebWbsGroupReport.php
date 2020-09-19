<?php
    require_once "secureCheck.php";
    set_time_limit(300);

    $wbno = $_REQUEST['wbNo'];

    $url = 'http://jasperadmin:jasperadmin@localhost:8081' +
        '/jasperserver' +
        '/rest_v2' +
        '/reports' +
        '/flippost' +
        '/reports' +
        '/wbreportGROUP.pdf'.$wbno;
    $ch = curl_init($url);
    $fh = fopen('php://temp', 'w');
    curl_setopt($ch, CURLOPT_FILE, $fh);
    curl_exec($ch);
    curl_close($ch);
    rewind($fh);
    $rName = 'Накладная_'.$wbno.'.pdf';
    header ("Content-Type: application/pdf");
    header ("Content-Disposition: inline;  ;filename=\"$rName\"");
    fpassthru($fh);
    fclose($fh);
