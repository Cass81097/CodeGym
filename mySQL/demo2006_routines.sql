-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: demo2006
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Temporary view structure for view `mg2`
--

DROP TABLE IF EXISTS `mg2`;
/*!50001 DROP VIEW IF EXISTS `mg2`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `mg2` AS SELECT 
 1 AS `id`,
 1 AS `time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `tl`
--

DROP TABLE IF EXISTS `tl`;
/*!50001 DROP VIEW IF EXISTS `tl`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tl` AS SELECT 
 1 AS `id`,
 1 AS `time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `tl1`
--

DROP TABLE IF EXISTS `tl1`;
/*!50001 DROP VIEW IF EXISTS `tl1`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tl1` AS SELECT 
 1 AS `id`,
 1 AS `time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `mg1`
--

DROP TABLE IF EXISTS `mg1`;
/*!50001 DROP VIEW IF EXISTS `mg1`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `mg1` AS SELECT 
 1 AS `id`,
 1 AS `time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `top3p`
--

DROP TABLE IF EXISTS `top3p`;
/*!50001 DROP VIEW IF EXISTS `top3p`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `top3p` AS SELECT 
 1 AS `price`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `mg3`
--

DROP TABLE IF EXISTS `mg3`;
/*!50001 DROP VIEW IF EXISTS `mg3`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `mg3` AS SELECT 
 1 AS `id`,
 1 AS `time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `tl3`
--

DROP TABLE IF EXISTS `tl3`;
/*!50001 DROP VIEW IF EXISTS `tl3`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tl3` AS SELECT 
 1 AS `id`,
 1 AS `time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `mg`
--

DROP TABLE IF EXISTS `mg`;
/*!50001 DROP VIEW IF EXISTS `mg`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `mg` AS SELECT 
 1 AS `id`,
 1 AS `time`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `mg2`
--

/*!50001 DROP VIEW IF EXISTS `mg2`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `mg2` AS select `o`.`id` AS `id`,`o`.`time` AS `time` from ((`orderdetail` `od` join `product` `p`) join `order` `o`) where ((`od`.`productId` = `p`.`id`) and (`o`.`id` = `od`.`orderId`) and (`p`.`name` like 'Máy Giặt') and (`od`.`quantity` > 10) and (`od`.`quantity` < 20)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tl`
--

/*!50001 DROP VIEW IF EXISTS `tl`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tl` AS select `o`.`id` AS `id`,`o`.`time` AS `time` from ((`orderdetail` `od` join `product` `p`) join `order` `o`) where ((`od`.`productId` = `p`.`id`) and (`o`.`id` = `od`.`orderId`) and (`p`.`name` like 'Tủ Lạnh')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tl1`
--

/*!50001 DROP VIEW IF EXISTS `tl1`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tl1` AS select `o`.`id` AS `id`,`o`.`time` AS `time` from ((`orderdetail` `od` join `product` `p`) join `order` `o`) where ((`od`.`productId` = `p`.`id`) and (`o`.`id` = `od`.`orderId`) and (`p`.`name` like 'Tủ Lạnh') and (`od`.`quantity` > 10) and (`od`.`quantity` < 20)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `mg1`
--

/*!50001 DROP VIEW IF EXISTS `mg1`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `mg1` AS select `o`.`id` AS `id`,`o`.`time` AS `time` from ((`orderdetail` `od` join `product` `p`) join `order` `o`) where ((`od`.`productId` = `p`.`id`) and (`o`.`id` = `od`.`orderId`) and (`p`.`name` like 'Máy Giặt')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `top3p`
--

/*!50001 DROP VIEW IF EXISTS `top3p`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `top3p` AS select `product`.`price` AS `price` from `product` group by `product`.`price` order by `product`.`price` desc limit 3 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `mg3`
--

/*!50001 DROP VIEW IF EXISTS `mg3`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `mg3` AS select `o`.`id` AS `id`,`o`.`time` AS `time` from ((`orderdetail` `od` join `product` `p`) join `order` `o`) where ((`od`.`productId` = `p`.`id`) and (`o`.`id` = `od`.`orderId`) and (`p`.`name` like 'Máy Giặt') and (`od`.`quantity` >= 10) and (`od`.`quantity` <= 20)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tl3`
--

/*!50001 DROP VIEW IF EXISTS `tl3`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tl3` AS select `o`.`id` AS `id`,`o`.`time` AS `time` from ((`orderdetail` `od` join `product` `p`) join `order` `o`) where ((`od`.`productId` = `p`.`id`) and (`o`.`id` = `od`.`orderId`) and (`p`.`name` like 'Tủ Lạnh') and (`od`.`quantity` >= 10) and (`od`.`quantity` <= 20)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `mg`
--

/*!50001 DROP VIEW IF EXISTS `mg`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `mg` AS select `o`.`id` AS `id`,`o`.`time` AS `time` from ((`orderdetail` `od` join `product` `p`) join `order` `o`) where ((`od`.`productId` = `p`.`id`) and (`o`.`id` = `od`.`orderId`) and (`p`.`name` like 'Máy Giặt')) */;
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

-- Dump completed on 2023-07-05 19:57:28
