<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

session_start();
include 'conexion_db.php'; // <-- Esta debe definir $conexion

if (!isset($_GET['viaje_id'])) {
    echo json_encode(["error" => "Falta el parámetro 'viaje_id'"]);
    exit;
}

$viaje_id = intval($_GET['viaje_id']); // Sanitize

$sql = "SELECT nombre, tipo_vuelo, hora_salida, hora_llegada, logo_nombre FROM aerolineas WHERE viaje_id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $viaje_id);
$stmt->execute();
$resultado = $stmt->get_result();

$aerolineas = [];
while ($fila = $resultado->fetch_assoc()) {
    $aerolineas[] = $fila;
}

echo json_encode($aerolineas);
