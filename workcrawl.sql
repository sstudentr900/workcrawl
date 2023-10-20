-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-10-20 12:39:28
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
-- 資料表結構 `crawlerurl`
--

CREATE TABLE `crawlerurl` (
  `id` int(10) UNSIGNED NOT NULL,
  `storeurl` varchar(500) NOT NULL,
  `storename` varchar(255) NOT NULL,
  `keyword` varchar(255) DEFAULT NULL COMMENT '關鍵字',
  `nokeyword` varchar(255) DEFAULT NULL COMMENT '排除',
  `deletes` enum('y','n') NOT NULL DEFAULT 'n' COMMENT '刪除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `crawlerurl`
--

INSERT INTO `crawlerurl` (`id`, `storeurl`, `storename`, `keyword`, `nokeyword`, `deletes`) VALUES
(1, 'https://www.104.com.tw/', '104', '外包,遠端,兼職', '不適合遠端,不適合外包,部分遠端', 'y'),
(2, 'https://www.1111.com.tw/login/index?ReturnUrl=https%3A%2F%2Fwww.1111.com.tw%2Fsearch%2Fjob', '1111', '外包', '非外包,人員,安裝,駐廠,師傅,水電,體力,行銷,清潔,貨車,生管,課長,技師,作業員,司機,運送', 'y'),
(3, 'https://www.518.com.tw/job-index.html', '518', '外包,遠端,兼職', '不適合遠端,不適合外包,部分遠端,平台', 'y'),
(5, 'https://www.facebook.com/groups/836547183156386', '設計者~歡迎發包接案', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(6, 'https://www.facebook.com/groups/2553682591549795/', 'SOHO接案坊 - 外包 / SOHO族接案 / 平面設計 / UIUX設計 / 動畫設計 / 影片剪輯 / 音樂音效', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(7, 'https://www.facebook.com/groups/1335691586521825', 'App系列找工作集散地【找開發工程師（iOS、Android、Unity、H5）、設計師（UI/UX）、專案管理、 接案、外包、就業、海外、合作夥伴】', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(32, 'https://www.facebook.com/groups/222022773375029/', 'Logo設計/Logo製作/商標設計/標誌設計-💰500臺幣/120港幣', '發案,誠徵,徵委託,求', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(33, 'https://www.facebook.com/groups/1012387455455379', '部落客社團(接案、交流、分享)', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(34, 'https://www.facebook.com/groups/287751611741834', 'TeSA電商/數位行銷⋯⋯接案/發案社團', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(35, 'https://www.facebook.com/groups/706885799804902', '找專家 - 接案 / 發案 / 外包 / 徵才 / SOHO / Freelancer', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(36, 'https://www.facebook.com/groups/1686432621633958', '【外包網】程式外包Software Outsourcing、軟體外包、Mobile APP、PC Software、Web', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(37, 'https://www.facebook.com/groups/162484814270527', 'Designer 設計人 (自由交流)', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(38, 'https://www.facebook.com/groups/TheSohoCafe?sorting_setting=CHRONOLOGICAL', '【SOHO/外包】交流|人脈|接案|發案 咖啡館', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(39, 'https://www.facebook.com/groups/FreeLancer.taiwan', '🤟 自由工作者 FreeLancer 技術工作交流平台 - 發案/外包/接案', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(40, 'https://www.facebook.com/groups/1418868921741092', '網站設計、App設計、程式設計、電子商務～外包、接案、求才平台 / 求職/找工作/找人才/工程師/設計師/網路行銷/網頁設計/物聯網/AI人工智慧', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(41, 'https://www.facebook.com/groups/390742911421457', 'soho bar 接案酒吧｜全台最大發案及接案社群 / 網站設計 / 平面 / UI / UX / 程式 / 攝影 / 文案 / 行銷 / 工業設計', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(43, 'https://www.facebook.com/groups/1230482576964177', '★⟪平面設計、影音製作⟫外包菁英集散地★', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'y'),
(45, 'https://www.facebook.com/groups/164843387045745', '外包達人-發案/接案/', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬', 'n'),
(46, 'https://www.facebook.com/groups/flycan.webdesign', '網頁設計交流討論區', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,為您服務,老闆', 'n');

-- --------------------------------------------------------

--
-- 資料表結構 `work`
--

CREATE TABLE `work` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '名子',
  `namehref` varchar(500) DEFAULT NULL COMMENT '名子路徑',
  `time` varchar(255) DEFAULT NULL COMMENT '時間',
  `timeurl` varchar(500) DEFAULT NULL COMMENT '時間路徑',
  `headimgsrc` varchar(500) DEFAULT NULL COMMENT '頭圖',
  `imgsrc` varchar(1000) DEFAULT NULL COMMENT '圖片',
  `articles` varchar(1000) DEFAULT NULL COMMENT '文章',
  `crawlerurl_id` int(10) UNSIGNED NOT NULL COMMENT '來源'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `work`
--

INSERT INTO `work` (`id`, `name`, `namehref`, `time`, `timeurl`, `headimgsrc`, `imgsrc`, `articles`, `crawlerurl_id`) VALUES
(459, '衡傳霖', 'https://www.facebook.com/groups/164843387045745/user/100000404053032/?__cft__[0]=AZUqyAFEbjkEekRv_TH5g4uS6VopHXmTvtWKmoZmmvM6mJwh11WvwhCg6G7rnlSJ379iep7OYFOFY7x9pmbKPlINGTsPzMfP8pw7s_Q-9LhTbXoUCSxrmBHHLr_ahgbYUJXgcPJdJlhnyRwFSTLeOD-xAttk6wIPrZULakkHJHZhevtCWNDOrvnO1X7-I6hSMSc&__tn__=-UC%2CP-R', '2023-10-19', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-1/334215988_1067600431299886_8201490631170851158_n.jpg?stp=c0.11.40.40a_cp0_dst-jpg_p40x40&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dnaiK7Qs2T0AX8Tp8BO&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfBKbzvZQ9FbstrEdlXXDyb2fSin2K9YDjyzjtwHEwbq4Q&oe=65360911', NULL, '#我要發案\n※徵求YouTube接案剪輯師，若初期合作順利未來希望可以長期配合接案！\n【案件說明】:\n1.字卡、綜藝特效、音效、音樂、情境畫面素材\n2.動圖動畫與字卡排版，綜藝效果音效需要一定經驗!\n3.限PR剪輯，專案結束請打包\n4.ACOPY、BCOPY剪輯完畢，請務必檢查後再繳交!\n5.有經驗者佳\n【案件內容】：醫美&醫師解惑&美容保養\n【案件報酬】：6000-8000\n可接受以上條件、報酬意者，請來信提供↓\n1.報價詳細收費方式\n2.與YTB合作相關作品\ndr.shine.art3@gmail.com\n若風格符合需求，會主動回覆，謝謝', 45),
(466, 'Virginia Chang', 'https://www.facebook.com/groups/164843387045745/user/100003086454028/?__cft__[0]=AZWe7ojWHwyvtaX2WwLVKQXJXol6_hYuQJauEO0gIRMDPiwNejl6wnE672tKGYnvRvwayAwF4IuOkQqKGGrr9vd0_6RB8vVvi_b0TTeLEElyGSj4r-qPS8xSbxm0SsxrpUuGtulYaOZg_-yUIPASeOGfG2J6XbX0DxRaTmv3HMusr6OvEav7RGPgsH4KM9wXXlM&__tn__=-UC%2CP-R', '2023-10-19', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-1/333296567_5918251888267721_3202178442532790944_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=caAEEGg6fO0AX8v7C0v&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfDBntwcWu-5lEJKpXU9uiUeKBd1e-OjHVYfWrBn1DLcmQ&oe=6536E838', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t39.30808-6/393752182_6578697258909757_4241010174480778036_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TGGNbWYRA3MAX_VwKvI&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfAdKjKcDfGJnaqi87bIxAfOZXG6vbY0wVW9PSgJEHsAnw&oe=65366FE5,https://scontent.fkhh1-1.fna.fbcdn.net/v/t39.30808-6/393700608_6578697268909756_4583831263886985049_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KjGnV_PA5vQAX8Uh1kL&_nc_oc=AQlKtARXaclhyr1x7ZPNYId7_DVkLorbZ2mqWJs-DaAGcuT0f4Z4joWH8d7o7yZyfXA&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfBlN0-WNTELdqJDRKHzZkdzUrcSjttvw13JbLzing0dcw&oe=65366287,https://scontent.fkhh1-1.fna.fbcdn.net/v/t39.30808-6/393728650_6578697278909755_5264983536032962974_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3Rei_Ys8rVEAX8UMmZ4&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfAsBPdDgDwj8VIR_9-svc_VVA4GCKDHgoJ3opmogvEnMQ&oe=65357179', '#我要發案\n需求 ｌ 單色系插畫\n風格 ｌ 溫暖日系插畫風格佳（如圖），希望呈現是筆觸可愛＋有路人緣的\n說明ｌ插畫已有大概雛形，需要優化，確認後會大概需要出10個動作左右\n煩請提供作品集與大概報價 : reginaatwork0117@gmail.com\n私訊或留言會漏看，麻煩一律寄到信箱唷！\n感謝大家', 45),
(472, NULL, NULL, '2023-10-19', 'https://www.facebook.com/groups/164843387045745/user/100001042066985/?__cft__[0]=AZUXXoY6a-VXVDM9fNUm7wdMlmUw0swlwKmfM8sgTMh4xcBRKNEkuiDQ0uDF2JmQ9D0Pry_cQkpXyQzK0l5sZTuGd2tuamqzi2nwEXBb7-FZCtCSvZr0wNI3pE342VnVryUc7QySqzyezE1JiZTDbThURppINuXBwMPCBV9t79_NySrkdfMbs2aVRBcKXGaldI8dvLXSFE0OmsEeW4C4CTLd&__cft__[1]=AZUXXoY6a-VXVDM9fNUm7wdMlmUw0swlwKmfM8sgTMh4xcBRKNEkuiDQ0uDF2JmQ9D0Pry_cQkpXyQzK0l5sZTuGd2tuamqzi2nwEXBb7-FZCtCSvZr0wNI3pE342VnVryUc7QySqzyezE1JiZTDbThURppINuXBwMPCBV9t79_NySrkdfMbs2aVRBcKXGa', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-6/361377402_1466273647251157_5485270835870450065_n.png?stp=cp0_dst-png_p50x50&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_hszIgySMRsAX-RAAK4&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfBUWDgM3YNcJ64HpJGbsPBnumY3HUHlAX9yxMdD46cVnw&oe=6536227C', NULL, '', 45);

--
-- 已傾印資料表的索引
--

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
-- 使用資料表自動遞增(AUTO_INCREMENT) `crawlerurl`
--
ALTER TABLE `crawlerurl`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `work`
--
ALTER TABLE `work`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=480;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
