<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("conexion_db.php");

$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = $data["password"];

$query = "SELECT * FROM admins WHERE username_admin = ? AND password_admin = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Credenciales inválidas"]);
}
?>
