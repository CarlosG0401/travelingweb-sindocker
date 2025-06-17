<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include("conexion_db.php");

$data = json_decode(file_get_contents("php://input"), true);

$origen = $data["origen"];
$destino = $data["destino"];
$fecha_inicio = $data["fecha_inicio"];
$fecha_fin = $data["fecha_fin"];
$dias = $data["dias"];
$fecha = $data["fecha"];

$sql = "INSERT INTO viajes (origen, destino, fecha_inicio, fecha_fin, dias, fecha)
        VALUES ('$origen', '$destino', '$fecha_inicio', '$fecha_fin', $dias, '$fecha')";

if (mysqli_query($conexion, $sql)) {
    echo json_encode(["success" => true, "message" => "Vuelo agregado exitosamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . mysqli_error($conexion)]);
}
?>
