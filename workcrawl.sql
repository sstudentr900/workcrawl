-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-10-27 08:53:52
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
(1, 'https://www.104.com.tw/', '104', '外包,遠端,兼職', '不適合遠端,不適合外包,部分遠端,視訊打字,節目主持人,直播,演員,服飾銷售,門市人員', 'n'),
(2, 'https://www.1111.com.tw/login/index?ReturnUrl=https%3A%2F%2Fwww.1111.com.tw%2Fsearch%2Fjob', '1111', '外包', '非外包,人員,安裝,駐廠,師傅,水電,體力,行銷,清潔,貨車,生管,課長,技師,作業員,司機,運送', 'n'),
(3, 'https://www.518.com.tw/job-index.html', '518', '外包,遠端,兼職', '不適合遠端,不適合外包,部分遠端,平台', 'y'),
(5, 'https://www.facebook.com/groups/836547183156386', '設計者~歡迎發包接案', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(6, 'https://www.facebook.com/groups/2553682591549795/', 'SOHO接案坊 - 外包 / SOHO族接案 / 平面設計 / UIUX設計 / 動畫設計 / 影片剪輯 / 音樂音效', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(7, 'https://www.facebook.com/groups/1335691586521825', 'App系列找工作集散地【找開發工程師（iOS、Android、Unity、H5）、設計師（UI/UX）、專案管理、 接案、外包、就業、海外、合作夥伴】', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(32, 'https://www.facebook.com/groups/222022773375029/', 'Logo設計/Logo製作/商標設計/標誌設計-💰500臺幣/120港幣', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(33, 'https://www.facebook.com/groups/1012387455455379', '部落客社團(接案、交流、分享)', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(34, 'https://www.facebook.com/groups/287751611741834', 'TeSA電商/數位行銷⋯⋯接案/發案社團', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(35, 'https://www.facebook.com/groups/706885799804902', '找專家 - 接案 / 發案 / 外包 / 徵才 / SOHO / Freelancer', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(36, 'https://www.facebook.com/groups/1686432621633958', '【外包網】程式外包Software Outsourcing、軟體外包、Mobile APP、PC Software、Web', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(37, 'https://www.facebook.com/groups/162484814270527', 'Designer 設計人 (自由交流)', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(38, 'https://www.facebook.com/groups/TheSohoCafe?sorting_setting=CHRONOLOGICAL', '【SOHO/外包】交流|人脈|接案|發案 咖啡館', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(39, 'https://www.facebook.com/groups/FreeLancer.taiwan', '🤟 自由工作者 FreeLancer 技術工作交流平台 - 發案/外包/接案', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(40, 'https://www.facebook.com/groups/1418868921741092', '網站設計、App設計、程式設計、電子商務～外包、接案、求才平台 / 求職/找工作/找人才/工程師/設計師/網路行銷/網頁設計/物聯網/AI人工智慧', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(41, 'https://www.facebook.com/groups/390742911421457', 'soho bar 接案酒吧｜全台最大發案及接案社群 / 網站設計 / 平面 / UI / UX / 程式 / 攝影 / 文案 / 行銷 / 工業設計', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(43, 'https://www.facebook.com/groups/1230482576964177', '★⟪平面設計、影音製作⟫外包菁英集散地★', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(45, 'https://www.facebook.com/groups/164843387045745', '外包達人-發案/接案/', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(46, 'https://www.facebook.com/groups/flycan.webdesign', '網頁設計交流討論區', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n'),
(48, 'https://www.facebook.com/groups/239168157628070', '繪圖委託/交流/繪友社', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'y'),
(49, 'https://www.facebook.com/groups/350911771626253', '影視．演藝．幕前幕後．工作媒合．外包發案', '發案,誠徵,徵委託', '我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'y'),
(50, 'https://www.facebook.com/groups/503784380859579', 'DayinUP｜外包｜接案｜發案｜委託｜斜槓｜兼職｜組合型自由工作者｜SOHO｜Freelancer｜技能交流｜作品分享', '發案,誠徵,徵委託,求', '需要的老闆,二手,體驗產品,新開幕,新品上市,小紅書,平價,我要接案,提供的項目,我們是製作,投放廣告,平台主播,徵友,接案,接委,無償,換圖,服務項目,提供以下服務,公告,投票,無酬,歡迎新成員', 'n');

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
(538, '【全遠端｜月薪 5-9 萬】網頁前端工程師｜Web Engineer｜視訊面試 線上面試｜長期招募中', 'https://www.104.com.tw/job/7hvv2?jobsource=n_my104_search', '2023-10-26', NULL, NULL, NULL, '悉 Material UI / Ant Design 等 UI Framework - 有 SEO 相關經驗 ＊薪資範圍上限非絕對，依實力向上調整 ＊(Remote Only) 為了提供對工作形式期待不同的人才有更加彈性的選擇，開放此「全遠端」職，月薪50,000~90,000元遠端工作', 1),
(539, '【全遠端｜年薪 100-170 萬】資深網頁前端工程師｜Senior Web Engineer｜視訊面試 線上面試｜長期招募中', 'https://www.104.com.tw/job/7opzl?jobsource=n_my104_search', '2023-10-26', NULL, NULL, NULL, '的選擇，開放此「全遠端」職缺。此職僅開放全部遠端，並無提供部分遠端。，年薪1,000,000~1,700,000元遠端工作', 1),
(540, '外包3D動畫設計師', 'https://www.104.com.tw/job/839cb?jobsource=n_my104_search', '2023-10-26', NULL, NULL, NULL, '工作內容 。與開發團隊合作，製作符合遊戲基調的高品質過場演出動畫 。依照任務需求配合參與遠端或現場會議 。長期、短期合作皆可 工作條件 。對動態的韻律與節奏緩急高度敏銳 。熟悉動畫法則、人體力學、物理運動、鏡頭語言 。熟悉Cinematic，論件計酬3,000~20,000元員工20人遠端工作距捷運中山站約260公尺', 1),
(542, '【全遠端｜年薪 100-170 萬】資深後端工程師｜Senior Backend Engineer｜視訊面試 線上面試｜長期招募中', 'https://www.104.com.tw/job/7mx7g?jobsource=n_my104_search', '2023-10-26', NULL, NULL, NULL, '具大型網站後台實戰經驗佳 ＊薪資範圍上限非絕對，依實力向上調整 ＊(Remote Only) 為了提供對工作形式期待不同的人才有更加彈性的選擇，開放此「全遠端」職缺。此職僅開放全部遠端，並無提供部分遠端。，年薪1,000,000~1,700,000元遠端工作', 1),
(545, '【全遠端｜月薪 5-9 萬】後端工程師 Backend Engineer｜視訊面試 線上面試｜長期招募中', 'https://www.104.com.tw/job/7hvx5?jobsource=n_my104_search', '2023-10-26', NULL, NULL, NULL, '＊薪資範圍上限非絕對，依實力向上調整 ＊(Remote Only) 為了提供對工作形式期待不同的人才有更加彈性的選擇，開放此「全遠端」職缺。此職僅開放全部遠端，並無提供部分遠端。，月薪50,000~90,000元遠端工作', 1),
(615, '林亞璇', 'https://www.facebook.com/groups/2553682591549795/user/100000264605199/?__cft__[0]=AZWrUmMBGhVwZ9xjnxN1CzE9XkL7d8ye-IaAsdZuFlGs_ktvnNS2QIICn9QI7lAnmCdR_AYlr9hubXQV3BXLkFHWbG7jCoOfBsZwPoceh7oXQFr9GUQq3FKw5PlDdNMPNJdv-EFDRd2rasSnQgCC9wolwWcbijbuBczO_owlCKpJwFkrZ4LOVFYK4jA94J_YIZ8&__tn__=-UC%2CP-R', '2023-10-26', 'https://www.facebook.com/groups/2553682591549795?sorting_setting=CHRONOLOGICAL#', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t1.6435-1/153456940_4131132246905555_6470833724069977503_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=105&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=B7yrbtCvgH8AX8NF6F1&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfBnvEnM-zJSUVuNW2yxW41T-ZKuQNrsYYo4uGdbnSov9g&oe=65617627', NULL, '#我要發案\n想徵求短影音製作，影片特效、動畫\n【需求】大量、快速且保有品質，\n【預算】請私訊單支/包月/或包量的報價\n【時間】長期合作\n【地點】不拘\n請務必提供「作品與報價」\n有意者直接加line id:london3899', 6),
(622, '林芳琳', 'https://www.facebook.com/groups/2553682591549795/user/100004346349623/?__cft__[0]=AZXO1z4AqRm3lnVK52yE3-hl3BbInoha0XPyM8sra-i6cZzp9M4hKgFRPvxsDXEK5ZdNiRpA1ZZIsYzuWHj9l1iYXCFL6DWdb9BlmeLtXCev5FwbThizib1alehbufc_5T9-ghZGnaVGuZ8sSL5v9Efpw8_npajg56vngyM3pGE845glJ9QSLwrJggdFgyt5RxQ&__tn__=-UC%2CP-R', '2023-10-26', 'https://www.facebook.com/groups/2553682591549795?sorting_setting=CHRONOLOGICAL#', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t1.6435-1/64742517_1271808269640706_4002631790106771456_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=102&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=qnjCZiL4O_MAX9fNdf0&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfB02LJsUCbaoQOI2QdU4kE_ofnEoqbiShcaHY4xi0ijDg&oe=65618C33', NULL, '#我要發案\n徵長期合作【短影音剪輯】\n1 影片需求主要發布於Tiktok, IG reels\n2 每部影片3分鐘以內，須上字幕與特效 …… 查看更多', 6),
(623, 'Kitty Hsu', 'https://www.facebook.com/groups/2553682591549795/user/100000105867960/?__cft__[0]=AZU5NC8pBCCvMM26g5FCal-vgkFPvn3ke1ujSPm46Z896Pnr9s9G0Fz7Gan1kF7KDiX-rH5IMG3SiGNj2KUcPHGRRTMIHiEz7SBdXA58-9gmt1E-nt_Y0uCErAhfadETorLB5wlUPoKtELGLIqEvnT-b8bZ7BFbnSQZ7sZkAkDXseb1zaZbOZ45mtXlDUpeHXUQ&__tn__=-UC%2CP-R', '2023-10-26', 'https://www.facebook.com/groups/2553682591549795?sorting_setting=CHRONOLOGICAL#', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t31.18172-1/1397589_760244223989099_247957879_o.jpg?stp=c7.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=105&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=txUP3Vo4qU4AX-ZzD2w&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfBxWNQ04xoz9Bk49sYm5Z_nu0NtPaERq2UXLi5Qp6ydCQ&oe=65617495', NULL, '我要發案 \n◆商品影片拍攝｜動態影像｜後製剪輯\n◆電商產品短片…… 查看更多', 6),
(627, 'Edward Lai', 'https://www.facebook.com/groups/2553682591549795/user/797194128/?__cft__[0]=AZUlGqtL9-vad97r-c8gDLnCdLWPbi6daPn3sNCvu02t7CUawSo6qLOPYRfEFCAVMN6u-M6r0bS4kW9_PGGjR1xwplV5fqVFWHDBG1RzMf9ir5pzeoqmU6s4woeeY6pi6n-MVgBomnRm4xDMcKu8NoW6UI801dQyeOuEn-xpnJc7GKLIQZfMJJUN2T-RQOdaEdo&__tn__=-UC%2CP-R', '2023-10-26', 'https://www.facebook.com/groups/2553682591549795?sorting_setting=CHRONOLOGICAL#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-1/243671545_10161755902654129_4593442952371370833_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Nkq3F0qkHRoAX-e894x&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfDZJJ7PYpECN_PWDdBPDpWGg-D5BqvFl6EGMc1wvdWwVQ&oe=653ED425', NULL, '#我要發案\n【發文身份】公司發案\n【徵求對象】品牌/包裝設計師 （希望以後可長期合作）\n【需求大綱】品牌設計, 品牌規範手冊(brand guideline) , 五款同品牌包裝設計 (不同類別的產品)\n【產品類別】汽車材料\n【時間】即日起\n【地點】台北市\n【報名方式】請將作品集/網站FB私訊 或者 E-mail: herfay2804@gmail.com\n【錄取通知】將以FB私訊聯繫、通知\n如有與包裝設計和外貿/工廠合作經驗者佳', 6),
(665, 'Sabrina Cheng', 'https://www.facebook.com/groups/164843387045745/user/648697412/?__cft__[0]=AZWfq3QyPoHre1dUjpMU1xbPGkokvSChdrbfLiAMGR-e8Uwo5E-CXeDxiLfDcjdbOnRX0Fxvy7EK96645D2Ag_3PgyjWEv_78kZeUtWLXag312HjY6jjKYXPlL1GtdFNlPFpUIjurI6iS219gacs1gcl1p4AH-l6Cs_SUk-ibFMjwYBtvqVDe4cSICg_Fc2RnC4&__tn__=-UC%2CP-R', '2023-10-26', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t1.6435-1/62013712_10156113101467413_6920582599064682496_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=110&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=4nVBu5FagDcAX9woURf&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfDbKV2eol4Qh0V0TsgA4Tk43mI3aioGAVfqohvOsnqiRA&oe=656177F0', NULL, '＃我要發案\n徵求FB、IG經營小編、社群行銷 （包月）\n【案件類型】：香氛產品社群小編\n【案件說明】：：\n＊貼文/圖文、文案主題發想\n＊質感、簡約清晰美編設計為主\n＊FB/IG 社群經營，每週２篇 (內容同步 )\n【合作對象】：個人接案、工作室\n＊須有1-2年社團經營經驗\n【聯絡方式】：有興趣接案者，歡迎直接私訊\n＊請提供 個人作品集＆服務內容＆收費方式', 45);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `work`
--
ALTER TABLE `work`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=677;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
