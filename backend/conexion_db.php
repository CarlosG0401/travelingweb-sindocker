<?php

    $conexion = mysqli_connect("localhost", "root", "root", "travelingweb");

    if (!$conexion) {
        die("Connection failed: " . mysqli_connect_error());
    }