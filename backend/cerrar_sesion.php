<?php
session_start();
session_destroy();

// Eliminar cookies estableciendo tiempo de expiración en el pasado
setcookie("username", "", time() - 3600, "/");
setcookie("usuario_id", "", time() - 3600, "/");

header("Location: http://localhost:3000/");
exit();
