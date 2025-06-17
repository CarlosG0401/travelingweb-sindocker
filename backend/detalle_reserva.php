<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include("conexion_db.php");

$reserva_id = $_GET['reserva_id'];

$query = "
SELECT r.*, 
       dc.nombres AS cliente_nombre, 
       dc.correo AS cliente_email, 
       a.nombre AS aerolinea_nombre,
       v.origen, v.destino, v.fecha_inicio, v.fecha_fin
FROM reservas r
JOIN datos_cliente dc ON r.datos_cliente_id = dc.id
JOIN aerolineas a ON r.aerolinea_id = a.ID
JOIN viajes v ON r.viaje_id = v.id
WHERE r.id = ?
";

$stmt = $conexion->prepare($query);
$stmt->bind_param("i", $reserva_id);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $fila = $resultado->fetch_assoc();
    echo json_encode($fila);
} else {
    echo json_encode(["error" => "Reserva no encontrada"]);
}
?>

