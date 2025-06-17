<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'conexion_db.php';

// Obtener datos JSON del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que todos los campos requeridos están presentes
if (
    !isset($data['nombre']) ||
    !isset($data['numero_tarjeta']) ||
    !isset($data['fecha_expiracion']) ||
    !isset($data['cvv']) ||
    !isset($data['reserva_id'])
) {
    echo json_encode(['status' => 'error', 'message' => 'Faltan campos obligatorios.']);
    exit;
}

$nombre = $data['nombre'];
$numero_tarjeta = $data['numero_tarjeta'];
$cvv = $data['cvv'];
$reserva_id = $data['reserva_id'];

// Convertir '2029-07' → '2029-07-01' para que sea compatible con MySQL DATE
$fecha_expiracion = $data['fecha_expiracion'] . "-01";

// Insertar en la base de datos
$stmt = $conexion->prepare("INSERT INTO pagos (nombre_titular, numero_tarjeta, fecha_expiracion, cvv, reserva_id) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssssi", $nombre, $numero_tarjeta, $fecha_expiracion, $cvv, $reserva_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Pago guardado correctamente']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al guardar el pago']);
}

$stmt->close();
$conexion->close();
