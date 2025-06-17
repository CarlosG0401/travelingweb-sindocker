<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'conexion_db.php';

// Obtener y decodificar los datos del JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validar campos esenciales
$usuario_id = intval($data['usuario_id'] ?? 0);
$datos_cliente_id = intval($data['datos_cliente_id'] ?? 0);
$aerolinea_id = intval($data['aerolinea_id'] ?? 0);
$viaje_id = intval($data['viaje_id'] ?? 0);
$asientos = $data['asientos'] ?? [];

if (!$usuario_id || !$datos_cliente_id || !$aerolinea_id || !$viaje_id || empty($asientos)) {
    echo json_encode(["status" => "error", "message" => "Faltan datos obligatorios para procesar la reserva."]);
    exit();
}

// Determinar tipo de precio y monto
$cantidad = count($asientos);
$tipo_precio = $cantidad === 1 ? 'ida' : 'ida_y_vuelta';

$query_precio = "SELECT precio_{$tipo_precio} AS precio_unitario FROM precios WHERE aerolineas_id = ?";
$stmt = $conexion->prepare($query_precio);
$stmt->bind_param("i", $aerolinea_id);
$stmt->execute();
$result = $stmt->get_result();
$precio_unitario = 0;

if ($row = $result->fetch_assoc()) {
    $precio_unitario = intval($row['precio_unitario']);
} else {
    echo json_encode(["status" => "error", "message" => "No se encontró el precio para esta aerolínea."]);
    exit();
}

$total = $precio_unitario * $cantidad;

// Insertar en la tabla de reservas
$sql = "INSERT INTO reservas (
    usuario_id, asientos, tipo_precio, precio_unitario,
    cantidad_reservas, total, aerolinea_id, viaje_id, datos_cliente_id
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$asientos_str = implode(',', $asientos);

$stmt = $conexion->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Error en prepare: " . $conexion->error]);
    exit();
}

$stmt->bind_param(
    "issiiiiii",
    $usuario_id,
    $asientos_str,
    $tipo_precio,
    $precio_unitario,
    $cantidad,
    $total,
    $aerolinea_id,
    $viaje_id,
    $datos_cliente_id
);

if ($stmt->execute()) {
    $reserva_id = $stmt->insert_id;
    echo json_encode(["status" => "success", "message" => "Reserva registrada correctamente.", "reserva_id" => $reserva_id]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al guardar la reserva: " . $stmt->error]);
}


$stmt->close();
$conexion->close();
