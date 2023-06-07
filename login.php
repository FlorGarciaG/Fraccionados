<?php
include 'conexion.php';

$nombreUsuario = $_POST["nombreUsuario"];
$contraseña = $_POST["contraseña"];

$result = mysqli_query($connection,"SELECT * FROM jugador WHERE user_nombre = '".$nombreUsuario."' and user_contraseña = '".$contraseña."'");
$nr=mysqli_num_rows($result);
if(!$result) 
{
    echo "No se ha podido realizar la consulta";
}

if($nr==1){
    //header("Location: http://localhost/Fraccionados/niveles.html");
    //$tel = $result->fetch_assoc()['USER_TEL'];
    $coincide = true;
    $fila = $result->fetch_assoc();
    $userID = $fila['USER_ID'];
    $telefono = $fila['USER_TEL'];

}else if ($nr == 0){   
  //$message = "¡nombre de usuario o clave incorrecta!";
  //echo $message;
  $coincide = false;
 // header("Refresh: 0.05; http://localhost/Fraccionados/inicio.html"); 
}

if ($coincide) {
  // Prepara la respuesta JSON con el resultado y el teléfono
  $response = array(
    'coincide' => true,
    'userID' => $userID,
    'telefono' => $telefono
      
  );
} else {
  // Prepara la respuesta JSON con el resultado
  $response = array(
      'coincide' => false
  );
}

// Devuelve la respuesta JSON
header('Content-Type: application/json');
echo json_encode($response);

?>