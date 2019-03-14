<?php
Flight::route('GET /orders/@First/@Last',['orderController','getOrders']);

Flight::route('POST /orders(/@ID)',['orderController','createOrder']);

Flight::route('GET /cities',['cityController','getCities']);

Flight::route('GET /orders/@ID',['orderController','getOrder']);

Flight::route('GET /orders/PDF/@ordnum',['wbController','getOrderPDF']);

Flight::route('GET /cities(/@city(/@state(/@country)))',['cityController','serchCities']);

Flight::route('GET /types',['typeController','getTypes']);

Flight::route('GET /wb/@wb',['wbController','getWBPDF']);

Flight::route('GET /tarifs/@org/@dest/@wt',['tarifsController','getTarifs']);
