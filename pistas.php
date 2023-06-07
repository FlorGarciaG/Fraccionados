<?php
    include 'conexion.php';


// Verificar si se recibió la solicitud de pistas desde JavaScript
if (isset($_POST['obtener_pistas'])) {
    // Obtener pistas de la base de datos
    $sql = "SELECT * FROM pistas";
    $result = $connection->query($sql);

    // Construir el contenido de las pistas
    $pistas = "";
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $pistas .= $row["PIST_DESCRIPCION"] . "\n";
        }
    } else {
        $pistas = "No hay pistas disponibles.";
    }

    // Retornar las pistas al JavaScript
    echo $pistas;
}

// Cerrar la conexión a la base de datos
$connection->close();
?>
