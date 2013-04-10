<?php
session_start();
if (!isset($_SESSION['xUser']))
    {
    header("Location: ../login.php"); /* Redirect browser */
    exit;
    };
/*
   echo session_id(); echo "<BR>";
   echo "user: {$_SESSION['xUser']}<BR>";  
   echo "password: {$_SESSION['xPassword']}<BR>"; 
   echo "<HR>";
   echo "<pre>";
   print_r($_SESSION);
   echo "</pre>";
   echo "<HR>";
   */
//<a href="../logout.php">Выход</a><br/>
?>
