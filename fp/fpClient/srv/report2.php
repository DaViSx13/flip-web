<?php
    require_once "secureCheck.php";
    set_time_limit(300);

    $wbno = $_REQUEST['wbNo'];

// Боевой сервер
// TODO Расскоментировать перед выставлением

    $url = 'http://jasperadmin:jasperadmin@10.10.10.6:8080'.
        '/jasperserver'.
        '/rest_v2'.
        '/reports'.
        '/flippost'.
        '/reports'.
        '/wbreportGROUP.pdf?wbNo='.$wbno;

    // Локальный сервер
    /*$url = 'http://jasperadmin:jasperadmin@localhost:8080' .
        '/jasperserver'.
        '/rest_v2'.
        '/reports'.
        '/flippost'.
        '/reports'.
        '/wbreportGROUP.pdf?wbNo='.$wbno;*/
    $ch = curl_init($url);
    $fh = fopen('php://temp', 'w');
    curl_setopt($ch, CURLOPT_FILE, $fh);
    curl_exec($ch);
    curl_close($ch);
    rewind($fh);
    header ("Content-Type: application/pdf");
    header ("Content-Disposition: inline;  ;filename=Накладные.pdf");
    fpassthru($fh);
    fclose($fh);
