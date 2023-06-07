<?php
// Obtén los parámetros del número de teléfono y el mensaje desde PHP
$numero_telefono = $_POST['numero_telefono'];
$mensaje = $_POST['mensaje'];

//$numero_telefono =9513305967;
//$mensaje = "Ganaste!!!";


// Escapa las comillas simples en el mensaje para evitar problemas de sintaxis en la línea de comandos
$mensaje = escapeshellarg($mensaje);

// Ejecuta el código Python con los parámetros proporcionados
$resultado = exec("python mensaje.py " . $numero_telefono . " " . $mensaje);

// Imprime el resultado
echo $resultado;
?>
