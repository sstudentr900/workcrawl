-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-10-11 11:20:55
-- 伺服器版本： 10.4.21-MariaDB
-- PHP 版本： 7.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `workcrawl`
--

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

CREATE TABLE `category` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'fb');

-- --------------------------------------------------------

--
-- 資料表結構 `crawlerurl`
--

CREATE TABLE `crawlerurl` (
  `id` int(10) UNSIGNED NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category_id` int(10) UNSIGNED NOT NULL COMMENT '類別'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `crawlerurl`
--

INSERT INTO `crawlerurl` (`id`, `url`, `name`, `category_id`) VALUES
(1, 'https://www.facebook.com/groups/1230482576964177', '★⟪平面設計、影音製作⟫外包菁英集散地★', 1),
(2, 'https://www.facebook.com/groups/239168157628070', '繪圖委託/交流/繪友社', 1),
(3, 'https://www.facebook.com/groups/164843387045745', '外包達人-發案/接案/', 1),
(4, 'https://www.facebook.com/groups/1335691586521825', 'App系列找工作集散地【找開發工程師（iOS、Android、Unity、H5）、設計師（UI/UX）、專案管理、 接案、外包、就業、海外、合作夥伴】', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `work`
--

CREATE TABLE `work` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '名子',
  `namehref` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL COMMENT '時間',
  `timeurl` varchar(255) DEFAULT NULL,
  `headimgsrc` varchar(255) DEFAULT NULL COMMENT '頭圖',
  `imgsrcdivs` varchar(255) DEFAULT NULL COMMENT '圖片',
  `crawlerurl_id` int(10) UNSIGNED NOT NULL COMMENT '來源'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `crawlerurl`
--
ALTER TABLE `crawlerurl`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `crawlerurl`
--
ALTER TABLE `crawlerurl`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `work`
--
ALTER TABLE `work`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
