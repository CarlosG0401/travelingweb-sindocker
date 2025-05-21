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


$usuario_id = $_COOKIE['usuario_id'] ?? null;

if (!$usuario_id) {
    echo json_encode(["status" => "error", "message" => "Usuario no autenticado (cookie no encontrada)"]);
    exit();
}


function toNullable($fecha) {
    return empty($fecha) ? null : $fecha;
}


$data = json_decode(file_get_contents("php://input"), true);


$nombres = $data['nombres'] ?? '';
$apellidos = $data['apellidos'] ?? '';
$fecha_nacimiento = toNullable($data['fecha_nacimiento'] ?? '');
$correo = $data['correo'] ?? '';
$telefono = $data['telefono'] ?? '';
$nacionalidad_tipo = $data['nacionalidad'] ?? '';
$tiene_rut = $data['tiene_rut'] ?? '';
$rut_numero = $data['rut_numero'] ?? '';
$rut_fecha_emision = toNullable($data['rut_fecha_emision'] ?? '');
$rut_fecha_expiracion = toNullable($data['rut_fecha_expiracion'] ?? '');
$pasaporte_numero = $data['pasaporte_numero'] ?? '';
$pasaporte_fecha_emision = toNullable($data['pasaporte_fecha_emision'] ?? '');
$pasaporte_fecha_expiracion = toNullable($data['pasaporte_fecha_expiracion'] ?? '');
$visa_waiver_numero = $data['visa_waiver_numero'] ?? '';
$visa_waiver_fecha_emision = toNullable($data['visa_waiver_fecha_emision'] ?? '');
$visa_waiver_fecha_expiracion = toNullable($data['visa_waiver_fecha_expiracion'] ?? '');
$requiere_pasaporte = $data['requiere_pasaporte'] ?? '';
$consejos_viaje = $data['consejos_viaje'] ?? '';


$sql = "INSERT INTO datos_cliente (
    usuario_id, nombres, apellidos, fecha_nacimiento, correo, telefono, nacionalidad_tipo, tiene_rut,
    rut_numero, rut_fecha_emision, rut_fecha_expiracion,
    pasaporte_numero, pasaporte_fecha_emision, pasaporte_fecha_expiracion,
    visa_waiver_numero, visa_waiver_fecha_emision, visa_waiver_fecha_expiracion,
    requiere_pasaporte, consejos_viaje
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Error en prepare: " . $conexion->error]);
    exit();
}


$stmt->bind_param(
    "issssssssssssssssss",
    $usuario_id,
    $nombres,
    $apellidos,
    $fecha_nacimiento,
    $correo,
    $telefono,
    $nacionalidad_tipo,
    $tiene_rut,
    $rut_numero,
    $rut_fecha_emision,
    $rut_fecha_expiracion,
    $pasaporte_numero,
    $pasaporte_fecha_emision,
    $pasaporte_fecha_expiracion,
    $visa_waiver_numero,
    $visa_waiver_fecha_emision,
    $visa_waiver_fecha_expiracion,
    $requiere_pasaporte,
    $consejos_viaje
);


if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Datos guardados correctamente."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al guardar: " . $stmt->error]);
}

$stmt->close();
$conexion->close();

?>

