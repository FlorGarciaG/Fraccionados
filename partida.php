<?php
include 'conexion.php';

$date = date("Y-m-d H:i:s");
$userID = $_POST["userID"];
$ganadaor = $_POST["ganador"];

if(!empty($date) && !empty($userID) && !empty($ganadaor)){
    $sql = "INSERT INTO partida (PAR_FECHA, PAR_USER, PAR_GANADOR) VALUES ('$date','$userid','$ganador')";
    $stmt = $connection->prepare($sql);
    if ($stmt->execute()) {
        $message = "¡Registro correcto!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    } else {
      $message = 'Error, no se pudo completar su registo';
      echo "<script type='text/javascript'>alert('$message');</script>";
    }
}else{
    $message = 'Todos los campos deben estar rellenados';
    echo "<script type='text/javascript'>alert('$message');</script>";
}
?>