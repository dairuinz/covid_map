DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `mail` varchar(30) NOT NULL
  PRIMARY KEY (`username`,`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` VALUES ('orestis_m','roheyan22','ormaraziotis@gmail.com')
,('dairuinz','yeet22','dairuinz@gmail.com')
,('roheyan','aneswad','roheyan@gmail.com');
