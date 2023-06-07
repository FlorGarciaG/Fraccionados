<?php
include 'conexion.php';

$result = mysqli_query($connection,"SELECT * FROM problemas ORDER BY PROB_ID ASC " );

$data = array();

if ($result->num_rows > 0) {
    // Recorre cada fila de la tabla y agrega los datos al array principal
    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row['PROB_PREGUNTA'];
    }

} else {
    echo "No se encontraron registros.";
}

echo json_encode($data);

?>
