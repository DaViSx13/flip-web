<?php
session_name("AGENTSESSIONID");
session_start();
if (!isset($_SESSION['xUser']))
    {
    header("Location: ../login.php"); /* Redirect browser ы*/
    exit;
    };
?>
