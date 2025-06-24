<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

$conexion = new mysqli("mysql_db", "user", "root", "travelingweb");
if ($conexion->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión a la base de datos.",
        "error" => $conexion->connect_error
    ]);
    exit;
}

$fecha_inicio = $_GET['fecha_inicio'] ?? null;
$fecha_fin = $_GET['fecha_fin'] ?? null;
$destino = $_GET['destino'] ?? null;

$where = [];
$params = [];
$types = "";

if ($fecha_inicio && $fecha_fin) {
    $where[] = "v.fecha BETWEEN ? AND ?";
    $params[] = $fecha_inicio;
    $params[] = $fecha_fin;
    $types .= "ss";
}
if ($destino) {
    $where[] = "v.destino = ?";
    $params[] = $destino;
    $types .= "s";
}

$filter_sql = count($where) ? "WHERE " . implode(" AND ", $where) : "";

try {
    $sqlCompras = "SELECT COUNT(*) AS total FROM pagos";
    $resCompras = $conexion->query($sqlCompras);
    $total_compras = 0;
    if ($resCompras) {
        $rowCompras = $resCompras->fetch_assoc();
        $total_compras = (int) $rowCompras['total'];
    }

    $sqlVentas = "SELECT IFNULL(SUM(r.total),0) AS total FROM reservas r
                  INNER JOIN viajes v ON r.viaje_id = v.id
                  $filter_sql";
    $stmtVentas = $conexion->prepare($sqlVentas);
    if ($types) {
        $stmtVentas->bind_param($types, ...$params);
    }
    $stmtVentas->execute();
    $resVentas = $stmtVentas->get_result();
    $rowVentas = $resVentas->fetch_assoc();
    $total_ventas = (float) $rowVentas['total'];

    $sqlDestino = "SELECT v.destino, SUM(r.cantidad_reservas) AS cantidad FROM reservas r
                   INNER JOIN viajes v ON r.viaje_id = v.id
                   $filter_sql
                   GROUP BY v.destino
                   ORDER BY cantidad DESC";
    $stmtDestino = $conexion->prepare($sqlDestino);
    if ($types) {
        $stmtDestino->bind_param($types, ...$params);
    }
    $stmtDestino->execute();
    $resDestino = $stmtDestino->get_result();
    $reservasDestino = [];
    while ($row = $resDestino->fetch_assoc()) {
        $reservasDestino[] = $row;
    }

    $sqlTipoPrecio = "SELECT r.tipo_precio AS tipo, IFNULL(SUM(r.total),0) AS total FROM reservas r
                      INNER JOIN viajes v ON r.viaje_id = v.id
                      $filter_sql
                      GROUP BY r.tipo_precio
                      ORDER BY total DESC";
    $stmtTipoPrecio = $conexion->prepare($sqlTipoPrecio);
    if ($types) {
        $stmtTipoPrecio->bind_param($types, ...$params);
    }
    $stmtTipoPrecio->execute();
    $resTipoPrecio = $stmtTipoPrecio->get_result();
    $ventasTipo = [];
    while ($row = $resTipoPrecio->fetch_assoc()) {
        $ventasTipo[] = [
            "tipo" => $row['tipo'],
            "total" => (float) $row['total']
        ];
    }

    echo json_encode([
        "success" => true,
        "total_compras" => $total_compras,
        "total_ventas" => $total_ventas,
        "reservas_por_destino" => $reservasDestino,
        "ventas_por_tipo_precio" => $ventasTipo
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error inesperado.",
        "error" => $e->getMessage()
    ]);
}
