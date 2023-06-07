<?php
$respuesta = $_POST['respuesta'];
$idPregunta = $_POST['idPregunta'];

include 'conexion.php';

$result = mysqli_query($connection,"SELECT PROB_RESULTADO FROM problemas where PROB_ID = $idPregunta AND PROB_RESULTADO='$respuesta' "  );

if ($result->num_rows > 0) {

    $coincide = true;

} else {

    $coincide = false;
    
}

echo json_encode(array('coincide' => $coincide));

?>