<?php

    $conexion = mysqli_connect("mysql_db", "user", "root", "travelingweb");

    if (!$conexion) {
        die("Connection failed: " . mysqli_connect_error());
    }