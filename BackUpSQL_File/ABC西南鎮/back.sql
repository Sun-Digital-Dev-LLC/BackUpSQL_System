-- --------------------------------------------------------
-- 主機:                           10.147.19.251
-- 伺服器版本:                        8.0.40-0ubuntu0.22.04.1 - (Ubuntu)
-- 伺服器作業系統:                      Linux
-- HeidiSQL 版本:                  12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 正在傾印表格  BackUp_base.admin_users 的資料：~0 rows (近似值)
DELETE FROM `admin_users`;
INSERT INTO `admin_users` (`discord_id`, `admin_name`) VALUES
	('985158923717849119', 'Dragon'),
	('726200365590118420', 'XiaoCheng'),
	('718418472283013201', 'Mrbandi'),
	('988669032536363028', 'FishFish');

-- 正在傾印表格  BackUp_base.remote_servers 的資料：~1 rows (近似值)
DELETE FROM `remote_servers`;
INSERT INTO `remote_servers` (`id`, `server_name`, `node_ip`, `db_port`, `db_username`, `db_password`, `backup_db_name`, `discord_id`, `is_active`, `created_at`, `updated_at`) VALUES
	(1, 'WeeRPSB', '10.147.19.251', '3306', 'BackUpRoot', 'BackUpSQL_2025', 'BackUp_base', '985158923717849119', 1, '2024-11-29 16:57:51', '2024-12-01 07:43:14'),
	(3, 'ABC西南鎮', '10.147.19.251', '3306', 'BackUpRoot', 'BackUpSQL_2025', 'BackUp_base', '30687123456', 1, '2024-12-01 07:54:02', '2024-12-01 07:55:08');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
