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

$visa_turista_numero = $data['visa_turista_numero'] ?? '';
$visa_turista_fecha_emision = toNullable($data['visa_turista_fecha_emision'] ?? '');
$visa_turista_fecha_expiracion = toNullable($data['visa_turista_expiracion'] ?? '');
$visado = $data['visado'] ?? '';
$visa_expiracion = toNullable($data['visa_expiracion'] ?? '');

// Validaciones
$errores = [];
$recomendaciones = [];
$hoy = date('Y-m-d');

if ($nacionalidad_tipo === 'Chileno') {
    if (strlen($rut_numero) !== 9) $errores[] = "RUT debe ser menor a 9 dígitos o no puede ser mayor a 9 dígitos";
    if ($rut_fecha_expiracion && $rut_fecha_expiracion < $hoy) $errores[] = "RUT está vencido";

    $viaje_a_ny = false;
    $result = $conexion->query("SELECT destino FROM viajes WHERE destino LIKE '%Nueva York%'");
    if ($result && $result->num_rows > 0) $viaje_a_ny = true;

    if ($viaje_a_ny) {
        if (!$pasaporte_numero) $errores[] = "El usuario seleccionó un viaje de Santiago -> Nueva York, por ende necesita pasaporte";
        if ($pasaporte_fecha_expiracion && $pasaporte_fecha_expiracion < $hoy) $errores[] = "El pasaporte está vencido";

        if (!$visa_waiver_numero) $errores[] = "El usuario seleccionó un viaje de Santiago -> Nueva York, por ende necesita Visa Waiver";
        if ($visa_waiver_fecha_expiracion && $visa_waiver_fecha_expiracion < $hoy) $errores[] = "La Visa Waiver está vencida";
    }

    if (!empty($errores)) {
        $recomendaciones = [
            "Por este enlace puede investigar acerca de la visa waiver: https://www.minrel.gob.cl/minrel/ministerio/programa-visa-waiver",
            "Por este enlace puede revisar acerca del RUT chileno: https://www.chileatiende.gob.cl/fichas/3430-cedula-de-identidad",
            "Por este enlace puede revisar acerca del pasaporte chileno: https://www.chileatiende.gob.cl/fichas/3445-pasaporte",
            "Revise el número de RUT y pasaporte",
            "Revise las fechas de emisión y expiración de cada uno"
        ];
    }

} elseif ($nacionalidad_tipo === 'Extranjero') {
    if ($tiene_rut === 'No') {
        $errores[] = "Seleccionó que no tiene RUT, por ende, no puede viajar sin documentación";
    } else {
        if (strlen($rut_numero) !== 9) $errores[] = "RUT debe ser menor a 9 dígitos o no puede ser mayor a 9 dígitos";
        if ($rut_fecha_expiracion && $rut_fecha_expiracion < $hoy) $errores[] = "RUT está vencido";
    }

    if (in_array(strtolower($visado), ['temporal', 'estudiante'])) {
        $errores[] = "El tipo de visado Temporal o Estudiante no es apto para salir de Chile";
    }

    if ($visa_expiracion && $visa_expiracion < $hoy) $errores[] = "El visado chileno está vencido";

    $viaje_a_ny = false;
    $result = $conexion->query("SELECT destino FROM viajes WHERE destino LIKE '%Nueva York%'");
    if ($result && $result->num_rows > 0) $viaje_a_ny = true;

    if ($viaje_a_ny) {
        if (!$pasaporte_numero) $errores[] = "El usuario seleccionó un viaje de Santiago -> Nueva York, por ende necesita pasaporte";
        if ($pasaporte_fecha_expiracion && $pasaporte_fecha_expiracion < $hoy) $errores[] = "El pasaporte está vencido";

        if (!$visa_turista_numero) $errores[] = "El usuario seleccionó un viaje de Santiago -> Nueva York, por ende necesita Visa Turista";
        if ($visa_turista_fecha_expiracion && $visa_turista_fecha_expiracion < $hoy) $errores[] = "La Visa Turista está vencida";
    }

    if (!empty($errores)) {
        $recomendaciones = [
            "Por acá puede revisar acerca del RUT de extranjero: https://xxxx",
            "Por acá puede revisar acerca de la visa de turista para este destino: https://xxxxx",
            "Verifique el número de RUT y pasaporte",
            "Verifique las fechas correspondientes a visado y RUT/pasaporte",
            "Por acá puede revisar acerca del visado chileno: https://xxxxx"
        ];
    }
}

if (!empty($errores)) {
    echo json_encode([
        "status" => "validation_error",
        "errores" => $errores,
        "recomendaciones" => $recomendaciones,
        "nacionalidad" => $nacionalidad_tipo
    ]);
    exit();
}

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
    $datos_cliente_id = $stmt->insert_id; // ✅ NUEVO: obtenemos el ID insertado
    echo json_encode([
        "status" => "success",
        "message" => "Datos guardados correctamente.",
        "datos_cliente_id" => $datos_cliente_id
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al guardar: " . $stmt->error]);
}

$stmt->close();
$conexion->close();



