<?php

require_once "ExcelExport.php";
//require_once "../secureCheck.php";
use FlipPost\ExcelExport;


$excelHeaders = array(
    array('POST_ID', 'POST_ID'),//
    array('REGION_SRC', 'REGION_SRC'),//
    array('REGION_DST', 'REGION_DST'), //
    array('POST_REG_DATE', 'POST_REG_DATE'),//
    array('STARTED', 'STARTED'),//
    array('POST_OFFICE_TYPE', 'POST_OFFICE_TYPE'),//
    array('POST_FULL_NAME', 'POST_FULL_NAME'),//

    array('SENDER_INFO', 'SENDER_INFO'),
    array('SENDER_NAME', 'SENDER_NAME'),
    array('SENDER_ADDRESS', 'SENDER_ADDRESS'),
    array("REC_INFO", "REC_INFO"),
    array("REC_NAME", "REC_NAME"),

    array('REC_ADDRESS', 'REC_ADDRESS'),
    array('POST_TYPE', 'POST_TYPE'),
    array('POST_DESCR', 'POST_DESCR'),
    array("POST_WEIGHT", "POST_WEIGHT"),
);

$query = "exec sp_getWBforFSB @adate='$_REQUEST[from]'";

$t = new ExcelExport($excelHeaders, $query);
$t->setFileName("Выгрузка ФСБ.xls");
$t->export();




