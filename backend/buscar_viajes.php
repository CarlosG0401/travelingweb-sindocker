<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

session_start();
include 'conexion_db.php';

// Obtener los valores del formulario
$origen = $_POST['origen'] ?? '';
$destino = $_POST['destino'] ?? '';
$fecha_inicio = $_POST['fecha_inicio'] ?? '';
$fecha_fin = $_POST['fecha_fin'] ?? '';

// Validación básica
if (empty($origen) || empty($destino) || empty($fecha_inicio) || empty($fecha_fin)) {
    echo json_encode(["error" => "Todos los campos son requeridos."]);
    exit;
}

// Consulta actualizada basada en las nuevas columnas
$query = "
    SELECT id, origen, destino, fecha_inicio, fecha_fin, dias
    FROM viajes
    WHERE origen = ?
      AND destino = ?
      AND (
        (fecha_inicio BETWEEN ? AND ?)
        OR (fecha_fin BETWEEN ? AND ?)
        OR (fecha_inicio <= ? AND fecha_fin >= ?)
      )
";


$stmt = $conexion->prepare($query);
$stmt->bind_param("ssssssss", $origen, $destino, $fecha_inicio, $fecha_fin, $fecha_inicio, $fecha_fin, $fecha_inicio, $fecha_fin);
$stmt->execute();

$result = $stmt->get_result();
$viajes = [];

while ($row = $result->fetch_assoc()) {
    $viajes[] = $row;
}

echo json_encode($viajes);

$stmt->close();
$conexion->close();
?>

