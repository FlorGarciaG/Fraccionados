<?php
include 'conexion.php';

$result = mysqli_query($connection,"SELECT * FROM palabras WHERE PAL_CAT=1 " );

if ($result->num_rows > 0) {

    $palabra = $result->fetch_assoc()['PAL_PALABRA'];

} else {
    echo "No se encontraron registros.";
}

echo($palabra);

?>
