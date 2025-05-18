<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'conexion_db.php';

if (!isset($_GET['aerolineas_id'])) {
    echo json_encode(["error" => "Falta aerolineas_id"]);
    exit;
}

$id = intval($_GET['aerolineas_id']);
$sql = "SELECT id, precio_ida, precio_ida_vuelta FROM precios WHERE aerolineas_id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

$data = [];
while ($row = $res->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
