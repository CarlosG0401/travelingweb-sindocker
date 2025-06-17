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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_cliente`
--

LOCK TABLES `datos_cliente` WRITE;
/*!40000 ALTER TABLE `datos_cliente` DISABLE KEYS */;
INSERT INTO `datos_cliente` VALUES (1,1,'Carlos','Galindo','2002-01-04','carlosgalindote4@gmail.com','933144485','Chileno','Sí','123456789','2022-02-07','2031-10-14','123456789','2022-06-07','2030-11-21',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,'Sí','Sí'),(2,1,'Raúl Alejandro','Galindo Martínez','2000-05-09','galindoraul18@gmail.com','24156535543','Chileno','Sí','123456789','2022-06-07','2030-07-10','1246743743','2020-02-21','2031-06-21',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,'Sí','Sí'),(3,1,'Jose','Alfredo','2002-06-05','jalfredo@gmail.com','933144485','Chileno','Sí','123456789','2024-03-17','2030-11-13','123456789','2023-02-01','2028-07-05',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'123456789','2022-07-07','2029-07-17','Sí','Sí'),(4,1,'Pedro Raul','Galindo Torres','1999-06-17','raulgalindote@gmail.com','9999999999','Chileno','Sí','989798979','2021-07-17','2030-11-13','232345678','2023-07-06','2029-08-17',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'234345656','2021-03-10','2027-07-17','Sí','Sí'),(5,1,'Carlos','Cruz','2004-02-11','c.galindomartinez1@uandresbello.edu','566567858','Chileno','Sí','989098975','2021-07-17','2030-11-13','495687696','2019-03-07','2025-06-28',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'656789898','2018-07-17','2025-06-28','Sí','Sí'),(6,1,'Maraia','Tovar','2002-11-14','mtovar@gmail.com','256678786','Chileno','Sí','548898909','2022-07-12','2029-11-17','676756789','2022-03-03','2029-07-12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'545678989','2021-07-08','2025-06-28','Sí','Sí'),(7,1,'Manuel','Fernaad','2001-07-19','jmanuel@gmail.com','454647478','Chileno','Sí','232765666','2021-11-11','2025-12-25','564356789','2020-02-18','2025-06-28',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'456786786','2025-02-05','2030-07-18','Sí','Sí'),(8,1,'JH','DELACRUZ','2000-07-06','jhdelacruz@gmail.com','6796797965','Chileno','Sí','295687679','2022-06-17','2028-11-17','456787890','2025-02-26','2028-11-17',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'232345678','2021-03-17','2028-08-11','Sí','Sí'),(9,1,'Luis','Delgado','1994-10-11','jluisdelgado@gmail.com','79896967','Chileno','Sí','123456780','2022-03-10','2029-08-17','694567856','2022-02-17','2029-11-17',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'989778787','2023-03-17','2029-07-17','Sí','Sí');
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

-- Dump completed on 2025-06-17 16:32:47
