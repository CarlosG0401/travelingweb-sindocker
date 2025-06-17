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
-- Table structure for table `aerolineas`
--

DROP TABLE IF EXISTS `aerolineas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aerolineas` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  `tipo_vuelo` varchar(250) NOT NULL,
  `hora_salida` time NOT NULL,
  `hora_llegada` time NOT NULL,
  `viaje_id` int DEFAULT NULL,
  `logo_nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `viaje_id` (`viaje_id`),
  CONSTRAINT `aerolineas_ibfk_1` FOREIGN KEY (`viaje_id`) REFERENCES `viajes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aerolineas`
--

LOCK TABLES `aerolineas` WRITE;
/*!40000 ALTER TABLE `aerolineas` DISABLE KEYS */;
INSERT INTO `aerolineas` VALUES (1,'LATAM Airlines','Directo','08:00:00','16:00:00',1,'latamairlines.png'),(2,'Delta Airlines','Con escala','10:00:00','20:00:00',1,'deltaairlines.png'),(3,'Iberia','Directo','09:30:00','17:30:00',2,'iberiaairlines.png'),(4,'Air France','Con escala','12:00:00','22:00:00',2,'airfrance.png'),(5,'Air France','Directo','12:00:00','21:00:00',3,'airfrance.png'),(6,'KLM','Con escala','14:00:00','00:30:00',3,'klm.png'),(7,'Sky Airlines','Directo','06:00:00','13:00:00',4,'skyairlines.png'),(8,'LATAM Airlines','Con escala','08:00:00','17:00:00',4,'latamairlines.png'),(9,'Alitalia','Directo','15:00:00','05:00:00',5,'alitalia.png'),(10,'Turkish Airlines','Con escala','17:00:00','08:00:00',5,'turkishairlines.png');
/*!40000 ALTER TABLE `aerolineas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17 16:32:48
