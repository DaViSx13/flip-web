<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>ФлипПост WEB</title>
    <link rel="stylesheet" href="resources/css/default/app.css">
    <link rel="stylesheet" type="text/css" href="resources/css/wbs.css"/>
	<?php
		if(!isset($_COOKIE['myLang']) || $_COOKIE['myLang'] == 'ru'){
		echo '<script type="text/javascript" src="all-classes-ru.js"></script>';        
		} else {
		echo '<script type="text/javascript" src="all-classes-en.js"></script>';
		}
		?>

</head>
<body></body>
</html>
