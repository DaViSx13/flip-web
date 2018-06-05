<?php
require 'db_.php';
Flight::path("model/");

Flight::path("controller/");

Flight::register('db','SQLSRV_DataBase',[$config['db']['username'], $config['db']['password'], $config['db']['databasename'], $config['db']['host']]);

//Flight::register("util","util");

//Flight::register("auth","authController");

Flight::register("posts","postController");

//Flight::register("users","userController");

//Flight::set("flight.base_url",$config['web']['base_url']);

//Flight::map('link',function($url){
 // echo Flight::get('flight.base_url').$url;
//});
