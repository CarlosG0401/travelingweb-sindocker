<?php

    include 'conexion_db.php';

    $username= $_POST['username'];
    $email= $_POST['email'];
    $password= $_POST['password'];
    $password = hash('sha512', $password);

    $query = "INSERT INTO users(username, email, password) VALUES('$username', '$email', '$password')";

    
    $verificar_correo = mysqli_query($conexion, "SELECT * FROM users WHERE email='$email' ");

    if(mysqli_num_rows($verificar_correo) > 0){
        echo '
            <script>
                alert("Este correo ya está registrado, intenta con otro diferente");
                window.location = "http://localhost:3000";
            </script>
        ';
        exit();
    }

    $verificar_usuario = mysqli_query($conexion, "SELECT * FROM users WHERE username='$username' ");

    if(mysqli_num_rows($verificar_usuario) > 0){
        echo '
            <script>
                alert("Este usuario ya está registrado, intenta con otro diferente");
                window.location = "http://localhost:3000";
            </script>
        ';
        exit();
    }

    $ejecutar = mysqli_query($conexion, $query);

    if($ejecutar){
        echo '
            <script>
                alert("Usuario almacenado exitosamente");
                window.location = "http://localhost:3000";
            </script>
        ';
    }else{
        echo '
            <script>
                alert("Inténtalo de nuevo, usuario no almacenado");
                window.location = "http://localhost:3000";
            </script>
        ';
    }

    mysqli_close($conexion);