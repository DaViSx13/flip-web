<?php
Flight::route('GET /orders/@First/@Last',['orderController','getOrders']);

Flight::route('POST /order/create',['orderController','createOrder']);

Flight::route('GET /cities',['cityController','getCities']);

Flight::route('GET /order/@ID',['orderController','getOrder']);

Flight::route('GET /cities(/@city(/@state(/@country)))',['cityController','serchCities']);

Flight::route('GET /types',['typeController','getTypes']);

//Flight::route('GET /login',['viewController','login']);

//Flight::route('POST /login',['authController','login']);

//Flight::route('GET /logout',['authController','logout']);

//Flight::route('POST /saveprofile',['userController','saveProfile']);
