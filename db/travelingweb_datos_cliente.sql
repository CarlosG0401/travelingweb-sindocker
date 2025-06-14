-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: travelingweb
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `datos_cliente`
--

DROP TABLE IF EXISTS `datos_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datos_cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `correo` varchar(150) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `nacionalidad_tipo` enum('Chileno','Extranjero') NOT NULL,
  `tiene_rut` enum('Sí','No') DEFAULT NULL,
  `rut_numero` varchar(20) DEFAULT NULL,
  `rut_fecha_emision` date DEFAULT NULL,
  `rut_fecha_expiracion` date DEFAULT NULL,
  `pasaporte_numero` varchar(30) DEFAULT NULL,
  `pasaporte_fecha_emision` date DEFAULT NULL,
  `pasaporte_fecha_expiracion` date DEFAULT NULL,
  `visado_tipo` enum('Temporal','Definitivo','Estudiante') DEFAULT NULL,
  `visa_fecha_emision` date DEFAULT NULL,
  `visa_fecha_expiracion` date DEFAULT NULL,
  `nacionalidad_nombre` varchar(100) DEFAULT NULL,
  `visa_turista_numero` varchar(30) DEFAULT NULL,
  `visa_turista_fecha_emision` date DEFAULT NULL,
  `visa_turista_fecha_expiracion` date DEFAULT NULL,
  `visa_waiver_numero` varchar(30) DEFAULT NULL,
  `visa_waiver_fecha_emision` date DEFAULT NULL,
  `visa_waiver_fecha_expiracion` date DEFAULT NULL,
  `requiere_pasaporte` enum('Sí','No') DEFAULT NULL,
  `consejos_viaje` enum('Sí','No') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `datos_cliente_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_cliente`
--

LOCK TABLES `datos_cliente` WRITE;
/*!40000 ALTER TABLE `datos_cliente` DISABLE KEYS */;
INSERT INTO `datos_cliente` VALUES (1,1,'Carlos','Galindo','2002-01-04','carlosgalindote4@gmail.com','933144485','Chileno','Sí','123456789','2022-02-07','2031-10-14','123456789','2022-06-07','2030-11-21',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,'Sí','Sí'),(2,1,'Raúl Alejandro','Galindo Martínez','2000-05-09','galindoraul18@gmail.com','24156535543','Chileno','Sí','123456789','2022-06-07','2030-07-10','1246743743','2020-02-21','2031-06-21',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,'Sí','Sí');
/*!40000 ALTER TABLE `datos_cliente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-14 16:37:31
