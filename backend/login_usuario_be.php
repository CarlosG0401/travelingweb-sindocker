<?php
session_start();
include 'conexion_db.php';

$email = $_POST['email'];
$password = $_POST['password'];
$password = hash('sha512', $password);

// Verifica credenciales
$validar_login = mysqli_query($conexion, "SELECT * FROM users WHERE email='$email' AND password='$password'");

if (mysqli_num_rows($validar_login) > 0) {
    $usuario = mysqli_fetch_assoc($validar_login);
    $_SESSION['user'] = $usuario['username'];

    // ✅ Agregamos también el ID del usuario en cookies
    setcookie("username", $usuario['username'], time() + 3600, "/", "localhost", false, false);
    setcookie("usuario_id", $usuario['id'], time() + 3600, "/", "localhost", false, false); // ← esta es clave

    // Redirigir a React
    echo '
    <script>
        window.location = "http://localhost:3000/dashboard";
    </script>
    ';
    exit;
} else {
    echo '
    <script>
        alert("Usuario no existe, por favor verifique los datos introducidos");
        window.location = "http://localhost:3000";
    </script>
    ';
    exit;
}
?>

