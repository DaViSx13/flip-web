<?php
/*Flight::route('GET /orders/@First/@Last',['orderController','getOrders']);

Flight::route('POST /orders(/@ID)',['orderController','createOrder']);

Flight::route('GET /cities',['cityController','getCities']);

Flight::route('GET /orders/@ID',['orderController','getOrder']);

Flight::route('GET /pdf/orders/@ordnum',['orderController','getOrderPDF']);

Flight::route('GET /cities(/@city(/@state(/@country)))',['cityController','serchCities']);

Flight::route('GET /types',['typeController','getTypes']);

Flight::route('GET /wb/@wb',['wbController','getWBPDF']);

Flight::route('GET /tarifs/@org/@dest/@wt(/@cargotype)',['tarifsController','getTarifs']);

Flight::route('POST /catapulto',['catapultoController','getCatapultoTarif']);

Flight::route('POST /wb',['wbController','createWb']);*/

Flight::route('POST /wb',['wbJSONController','createWbMain']);

Flight::route('POST /wbs',['wbJSONController','createWbs']);

Flight::route('POST /setwt',['wbJSONController','changeWtInWb']);

Flight::route('POST /pod',['courController','createPOD']);

Flight::route('POST /act',['courController','createLog']);

Flight::route('POST /finalwb',['finalWb','finalizeWB']);
