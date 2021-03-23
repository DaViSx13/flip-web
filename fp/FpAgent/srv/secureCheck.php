<?php
session_name($_REQUEST["se"]."AGENTSESSIONID");
session_start();
if (!isset($_SESSION['xUser']))
    {
    header("Location: ../login.php"); /* Redirect browser ы*/
    exit;
    };
?>
