<?php header('Access-Control-Allow-Origin: *');
// Conexión a la base de datos
$host = "localhost";
$user = "root";
$password = "";
$database = "fraccionados";
$connection = new mysqli($host, $user, $password, $database);

// Verificar la conexión
/*if ($connection->connect_error) {
  die("Conexión fallida: " . $connection->connect_error);
}else{
  echo "conexión exitosa";
}*/

?>