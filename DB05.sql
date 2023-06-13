-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: madang
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `bookid` int NOT NULL,
  `bookname` varchar(40) DEFAULT NULL,
  `publisher` varchar(40) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`bookid`),
  KEY `ix_Book` (`bookname`),
  KEY `ix_Book2` (`publisher`,`price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'축구의 역사','굿스포츠',7000),(2,'축구아는 여자','나무수',13000),(3,'축구의 이해','대한미디어',22000),(4,'골프 바이블','대한미디어',35000),(5,'피겨 교본','굿스포츠',8000),(6,'역도 단계별기술','굿스포츠',6000),(7,'야구의 추억','이상미디어',20000),(8,'야구를 부탁해','이상미디어',13000),(9,'올림픽 이야기','삼성당',7500),(10,'Olympic Champions','Pearson',13000);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `custid` int NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`custid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'박지성','영국 맨체스타','000-5000-0001'),(2,'김연아','대한민국 서울','000-6000-0001'),(3,'장미란','대한민국 강원도','000-7000-0001'),(4,'추신수','미국 클리블랜드','000-8000-0001'),(5,'박세리','대한민국 대전',NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `highorders`
--

DROP TABLE IF EXISTS `highorders`;
/*!50001 DROP VIEW IF EXISTS `highorders`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `highorders` AS SELECT 
 1 AS `bookid`,
 1 AS `bookname`,
 1 AS `publisher`,
 1 AS `name`,
 1 AS `custid`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `imported_book`
--

DROP TABLE IF EXISTS `imported_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imported_book` (
  `bookid` int DEFAULT NULL,
  `bookname` varchar(40) DEFAULT NULL,
  `publisher` varchar(40) DEFAULT NULL,
  `price` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imported_book`
--

LOCK TABLES `imported_book` WRITE;
/*!40000 ALTER TABLE `imported_book` DISABLE KEYS */;
INSERT INTO `imported_book` VALUES (21,'Zen Golf','Pearson',12000),(22,'Soccer Skills','Human Kinetics',15000);
/*!40000 ALTER TABLE `imported_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lotteria`
--

DROP TABLE IF EXISTS `lotteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lotteria` (
  `id` int NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `address` varchar(40) DEFAULT NULL,
  `openinghours` varchar(40) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `lati` double DEFAULT NULL,
  `longi` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lotteria`
--

LOCK TABLES `lotteria` WRITE;
/*!40000 ALTER TABLE `lotteria` DISABLE KEYS */;
INSERT INTO `lotteria` VALUES (1,'롯데리아 대전역사점','대전광역시 동구 정동 1-1','08:00~21:00','042-242-1051',36.331925,127.433715),(2,'롯데리아 대전중동점','대전광역시 동구 중동 26-18','10:00~22:00','042-256-9696',36.330547,127.430278),(3,'롯데리아 대동점','대전광역시 동구 대동 180-26','10:00~24:00','042-628-5500',36.32946,127.443369),(4,'롯데리아 대전은행점','대전광역시 중구 은행동 55-3','10:00~22:30','042-256-2800',36.329413,127.428605),(5,'롯데리아 대전대사점','대전광역시 중구 계룡로920번길 36','08:00~24:00',' 042-242-2013',36.3187294,127.4151931),(6,'롯데리아 대전가오점','대전광역시 동구 가오동 647','10:00~23:00','042-285-8296',36.3061685,127.4561249),(7,'롯데리아 비래점','대전광역시 대덕구 비래동 비래동로 13','09:00~24:00','042-623-4545',36.355203,127.4495629),(8,'롯데리아 대전동부점','대전광역시 동구 동서대로1695번길','xxxxxx','042-628-1479',36.3516542,127.4372022),(9,'롯데리아 대전갈마점','대전광역시 서구 갈마1동 378-15','10:00~24:00','042-526-5889',36.3466343,127.3692432),(10,'롯데리아 대전용운','대전광역시 동구 용운로 148','09:00~23:00','042-286-8903',36.3279481,127.4587673),(11,'롯데리아 대전산성점','대전광역시 중구 산성동 117-6','10:00~23:00','042-586-0985',36.3047954,127.3857453),(12,'롯데리아 월평점','대전광역시 서구 월평로 54 1층','10:00~24:00','042-486-1100',36.355969,127.3630544),(13,'롯데리아 대전정림점','대전광역시 서구 정림로 71','10:00~22:00','042-585-8006',36.3065475,127.3647233),(14,'롯데리아 대전터미널점','대전광역시 동구 용전동 63-3','xxxxxxxx','042-634-1233',36.349813,127.4365903),(15,'롯데리아 대전사무실','대전광역시 서구 용문동 589-12','xxxxxxx','042-531-0675',36.338969,127.3919079),(16,'롯데리아 대전오정점','대전광역시 대덕구 한밭대로 1019 A동 1층','xxxxxxx','042-627-2223',36.3586123,127.4116799),(17,'롯데리아 대전중앙점','대전광역시 중구 선화동 3-3','10:00~23:00','042-256-1357',36.3285819,127.4250162),(18,'롯데리아 대전산내낭월점','대전광역시 동구 낭월동 335','10:00~22:00','042-285-2366',36.2829676,127.4664271),(19,'롯데리아 충남대점','대전광역시 유성구 궁동로18번길 6','08:00~24:00','042-825-1456',36.3626572,127.3476624),(20,'롯데리아 복수점','대전광역시 서구 복수동로 62','10:00~22:30','042-584-8777',36.2987579,127.3782373),(21,'롯데리아 대전 도안점','대전광역시 유성구 월드컵대로 294','xxxxxxx','xxxxxxxxx',36.3482379,127.3326604),(22,'롯데리아 대전카이스트점','대전광역시 유성구 대학로 291번길 학생회관 1층','08:00~22:00','042-863-8944',36.3731722,127.3605021),(23,'롯데리아','대전광역시 유성구 덕명동','09:00~22:40','042-826-9213',36.348724,127.297155),(24,'LOTTERIA','대전광역시 유성구 죽동로279번길 16','09:30~22:00','xxxxxxxxxx',36.37112108,127.33880469),(25,'롯데리아 대전둔산점','대전광역시 서구 청사서로 42','08:00~24:00','042-484-7900',36.361521,127.3769272),(26,'롯데리아 대전도안디티점','대전광역시 서구 도안동','xxxxxxxxx','042-541-8889',36.3241268,127.3481023),(27,'롯데리아 대전중촌','대전광역시 중구 중촌동 412-1','09:00~24:00','042-222-6446',36.3360252,127.411545),(28,'ロッテリア','대전광역시 동구 용전동 68-2','10:00~22:00','042-628-1479',36.3514816,127.4375193),(29,'롯데리아 대전타임월드','대전광역시 서구 둔산동 1074','09:00~23:30','042-488-5225',36.3514142,127.3760084),(30,'롯데리아 패션아일랜드점','가오동 557번지 1층 패션아일랜드 동구 대전광역시 KR','xxxxxxxxx','042-283-2016',36.3069634,127.4579836),(31,'롯데리아 대전가장','대전광역시 서구 가장동 55','10:00~24:00','042-368-7000',36.3328584,127.382909),(32,'롯데리아 롯데마트대덕테크노밸리','대전광역시 유성구 관평동 887','10:00~21:30','042-930-2590',36.4269583,127.3869616),(33,'롯데리아 대전도마점','대전광역시 서구 도마1동 142-38','09:00~22:00','042-535-7942',36.3134996,127.3805208),(34,'ロッテリア','대전광역시 서구 가수원동 1058','09:00~23:00','042-546-7778',36.3053508,127.3523138),(35,'롯데리아 홈플러스유성점','대전광역시 유성구 한밭대로 502','10:00~23:00','042-825-6227',36.3584437,127.3542548),(36,'롯데리아 유성점','대전광역시 유성구 봉명동 466-4','24시간영업','042-822-9358',36.3547717,127.3372738),(37,'롯데리아 대전노은','대전광역시 유성구 지족동 902-3','10:00~22:30','042-476-0358',36.3745318,127.3188948),(38,'롯데리아 대전신성','대전광역시 유성구 신성동 216-7','10:00~23:00','042-867-7777',36.3865458,127.349994),(39,'롯데리아 대전송촌','xxxxxxxxxxx','08:00~24:00','042-638-3333',36.3658333,127.4397222),(40,'롯데리아 신탄진점','대전광역시 대덕구 신탄진동 144-24','10:00~22:00','042-931-7011',36.450484,127.4292346),(41,'롯데리아 대전반석','대전광역시 유성구 반석동 640-1','09:00~23:00','042-824-3636',36.3914613,127.3135529),(42,'롯데리아 가수원점','대전광역시 서구 계백로 1161','09:00~22:30','042-546-7778',36.3051435,127.3522447),(43,'롯데리아 대전송강','대전광역시 유성구 송강동 24-1','08:00~21:00','042-936-8989',36.435415,127.3859514),(44,'롯데리아 대전관저','xxxxxxxxxxxx','24시간영업','042-542-8944',36.3008892,127.3354144);
/*!40000 ALTER TABLE `lotteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `name` varchar(40) NOT NULL,
  `price` varchar(40) DEFAULT NULL,
  `set_price` varchar(40) DEFAULT NULL,
  `event_price` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES ('123','123','123','123'),('T-Rex버거','4,700','SET:6,900','5,800'),('더블 데리버거','4,500','SET:6,700','X'),('더블 치킨버거','5,500','SET:7,600','X'),('더블 클래식치즈버거','6,900','SET:8,800','X'),('더블 한우불고기','12,400','SET:14,200, COMBO:13,600','X'),('더블X2','6,800','SET:8,700','X'),('데리버거','3,300','SET:5,600','4,500'),('마라로드 비프','6,900','SET:8,800','X'),('마라로드 새우','5,400','SET:7,500','X'),('마라로드 치킨','5,400','SET:7,500','X'),('모짜렐라 인 더 버거 베이컨','7,400','SET:9,300','8,000'),('불고기버거','4,700','SET:6,900','X'),('사각새우더블버거','5,700','SET:7,800','6,600'),('새우버거','4,700','SET:6,900','X'),('원조 빅불','7,100','SET:9,000','X'),('치킨버거','4,000','SET:6,300','4,900'),('클래식치즈버거','5,200','SET:7,300','X'),('한우 트러플머쉬룸','9,700','SET:11,500, COMBO:10,900','X'),('한우불고기버거','8,400','SET:10,200, COMBO:9,600','X'),('핫 크리스피버거','5,900','SET:7,800','6,600'),('힙&핫치킨버거','6,500','SET:8,300','7,100');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderid` int NOT NULL,
  `custid` int DEFAULT NULL,
  `bookid` int DEFAULT NULL,
  `saleprice` int DEFAULT NULL,
  `orderdate` date DEFAULT NULL,
  PRIMARY KEY (`orderid`),
  KEY `custid` (`custid`),
  KEY `bookid` (`bookid`),
  KEY `od_idex` (`orderid`,`orderdate`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`custid`) REFERENCES `customer` (`custid`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`bookid`) REFERENCES `book` (`bookid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,6000,'2014-07-01'),(2,1,3,21000,'2014-07-03'),(3,2,5,8000,'2014-07-03'),(4,3,6,6000,'2014-07-04'),(5,4,7,20000,'2014-07-05'),(6,1,2,12000,'2014-07-07'),(7,4,8,13000,'2014-07-07'),(8,3,10,12000,'2014-07-08'),(9,2,10,7000,'2014-07-09'),(10,3,8,13000,'2014-07-10');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(20) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('jisung','박지성',41,'qkrwltjd'),('kim123','김문기',25,'rladyd15'),('test01','손흥민',31,'111111'),('test02','이강인',23,'222222'),('wpsldm','이루루',25,'rladyd15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_customer`
--

DROP TABLE IF EXISTS `vw_customer`;
/*!50001 DROP VIEW IF EXISTS `vw_customer`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_customer` AS SELECT 
 1 AS `custid`,
 1 AS `name`,
 1 AS `address`,
 1 AS `phone`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_orders`
--

DROP TABLE IF EXISTS `vw_orders`;
/*!50001 DROP VIEW IF EXISTS `vw_orders`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_orders` AS SELECT 
 1 AS `orderid`,
 1 AS `custid`,
 1 AS `name`,
 1 AS `bookid`,
 1 AS `bookname`,
 1 AS `saleprice`,
 1 AS `orderdate`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `highorders`
--

/*!50001 DROP VIEW IF EXISTS `highorders`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `highorders` (`bookid`,`bookname`,`publisher`,`name`,`custid`) AS select `od`.`bookid` AS `bookid`,`bk`.`bookname` AS `bookname`,`bk`.`publisher` AS `publisher`,`cs`.`name` AS `name`,`cs`.`custid` AS `custid` from ((`orders` `od` join `book` `bk`) join `customer` `cs`) where ((`bk`.`price` >= 20000) and (`od`.`bookid` = `bk`.`bookid`) and (`od`.`custid` = `cs`.`custid`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_customer`
--

/*!50001 DROP VIEW IF EXISTS `vw_customer`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_customer` AS select `customer`.`custid` AS `custid`,`customer`.`name` AS `name`,`customer`.`address` AS `address`,`customer`.`phone` AS `phone` from `customer` where (`customer`.`address` like '%영국%') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_orders`
--

/*!50001 DROP VIEW IF EXISTS `vw_orders`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_orders` (`orderid`,`custid`,`name`,`bookid`,`bookname`,`saleprice`,`orderdate`) AS select `od`.`orderid` AS `orderid`,`od`.`custid` AS `custid`,`cs`.`name` AS `name`,`od`.`bookid` AS `bookid`,`bk`.`bookname` AS `bookname`,`od`.`saleprice` AS `saleprice`,`od`.`orderdate` AS `orderdate` from ((`orders` `od` join `customer` `cs`) join `book` `bk`) where ((`od`.`custid` = `cs`.`custid`) and (`od`.`bookid` = `bk`.`bookid`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-13 13:57:35
