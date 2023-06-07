<?php
include 'conexion.php';

$nombre = $_POST["user"];
$tel = $_POST["telefono"];
$pass = $_POST["pass"];

if(!empty($nombre) && !empty($tel) && !empty($pass)){
    $sql = "INSERT INTO jugador (USER_NOMBRE, USER_TEL, USER_CONTRASEÑA) VALUES ('$nombre','$tel','$pass')";
    $stmt = $connection->prepare($sql);
    if ($stmt->execute()) {
        $message = "¡Registro correcto! ahora puede Iniciar sesion";
        echo "<script type='text/javascript'>alert('$message');</script>";
        header("Refresh: 0.05; http://localhost/Fraccionados/inicio.html"); 
    } else {
      $message = 'Error, no se pudo completar su registo';
      echo "<script type='text/javascript'>alert('$message');</script>";
      header("Refresh: 0.05; http://localhost/Fraccionados/registro.html"); 
    }
}else{
    $message = 'Todos los campos deben estar rellenados';
    echo "<script type='text/javascript'>alert('$message');</script>";
    header("Refresh: 0.05; http://localhost/Fraccionados/registro.html"); 
}
?>