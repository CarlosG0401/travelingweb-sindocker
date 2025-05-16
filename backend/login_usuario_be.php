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

    // Crear cookie válida por 1 hora (puedes ajustar el tiempo)
    setcookie("username", $usuario['username'], time() + 3600, "/");

    // Redirigir a la app de React
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
