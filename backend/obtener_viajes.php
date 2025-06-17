<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include("conexion_db.php");

$sql = "SELECT * FROM viajes";
$result = mysqli_query($conexion, $sql);

$viajes = [];

while ($row = mysqli_fetch_assoc($result)) {
    $viajes[] = $row;
}

echo json_encode($viajes);
?>
