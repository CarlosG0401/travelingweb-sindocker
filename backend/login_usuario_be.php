<?php
session_start();
include 'conexion_db.php';

$email = $_POST['email'];
$password = $_POST['password'];
$password = hash('sha512', $password);


$validar_login = mysqli_query($conexion, "SELECT * FROM users WHERE email='$email' AND password='$password'");

if (mysqli_num_rows($validar_login) > 0) {
    $usuario = mysqli_fetch_assoc($validar_login);
    $_SESSION['user'] = $usuario['username'];

    
    setcookie("username", $usuario['username'], time() + 3600, "/", "localhost", false, false);
    setcookie("usuario_id", $usuario['id'], time() + 3600, "/", "localhost", false, false); 

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

