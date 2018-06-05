<?php
Flight::route('GET /orders/@First/@Last',['postController','getOrders']);

Flight::route('POST /orders/create',['postController','createOrder']);

//Flight::route('GET /create',['viewController','createPost']);

//Flight::route('POST /create',['postController','createPost']);

//Flight::route('GET /profile',['viewController','author']);

//Flight::route('GET /author/@user_id',['viewController','author']);

//Flight::route('GET /login',['viewController','login']);

//Flight::route('POST /login',['authController','login']);

//Flight::route('GET /logout',['authController','logout']);

//Flight::route('POST /saveprofile',['userController','saveProfile']);
