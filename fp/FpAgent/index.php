<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>ФлипПост WEB</title>
    <link rel="stylesheet" href="resources/css/default/app.css">
    <link rel="stylesheet" type="text/css" href="resources/css/wbs.css"/>
    <!-- <x-compile> -->
        <!-- <x-bootstrap> -->
            <script src="ext/ext-dev.js"></script>
            <script src="bootstrap.js"></script>
        <!-- </x-bootstrap> -->
        <script src="app/app.js"></script>
		<script type="text/javascript" src="vtypes.js"></script>
        <?php
		if(!isset($_COOKIE['myLang']) || $_COOKIE['myLang'] == 'ru'){
		echo '<script type="text/javascript" src="ext/locale/ext-lang-ru.js"></script>';
        echo '<script type="text/javascript" src="ext-lang-ru-add.js"></script>';
		}
		?>
    <!-- </x-compile> -->
</head>
<body></body>
</html>
