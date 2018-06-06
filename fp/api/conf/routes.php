<?php
Flight::route('GET /orders/@First/@Last',['orderController','getOrders']);

Flight::route('POST /orders/create',['orderController','createOrder']);

Flight::route('GET /lists/city',['listController','getCity']);

//Flight::route('POST /create',['postController','createPost']);

//Flight::route('GET /profile',['viewController','author']);

//Flight::route('GET /author/@user_id',['viewController','author']);

//Flight::route('GET /login',['viewController','login']);

//Flight::route('POST /login',['authController','login']);

//Flight::route('GET /logout',['authController','logout']);

//Flight::route('POST /saveprofile',['userController','saveProfile']);
