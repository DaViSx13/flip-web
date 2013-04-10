<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<meta http-equiv="content-type" content="text/html; windows-1251" />
	<meta name="author" content="admin" />

	<title>Неназванный 3</title>
</head>

<body>

<form action="f.php" method="get" enctype="text/plain">
<input type="text" name="par" id="par" />
<input type="submit" value="go"/>
</form>

<?php

echo $_GET['par'];

?>


</body>
</html>