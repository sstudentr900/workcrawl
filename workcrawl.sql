-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-10-15 17:29:37
-- 伺服器版本： 10.4.24-MariaDB
-- PHP 版本： 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `workcrawl`
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
(1, 'https://www.facebook.com/groups/1230482576964177', '★⟪平面設計、影音製作⟫外包菁英集散地★', '1', NULL, 'n'),
(3, 'https://www.facebook.com/groups/164843387045745', '外包達人-發案/接案/', '1', NULL, 'n'),
(4, 'https://www.facebook.com/groups/1335691586521825', 'App系列找工作集散地【找開發工程師（iOS、Android、Unity、H5）、設計師（UI/UX）、專案管理、 接案、外包、就業、海外、合作夥伴】', '1', NULL, 'y'),
(5, 'https://www.facebook.com/groups/836547183156386', '設計者~歡迎發包接案', '1', NULL, 'n'),
(6, 'https://www.facebook.com/groups/2553682591549795/', 'SOHO接案坊 - 外包 / SOHO族接案 / 平面設計 / UIUX設計 / 動畫設計 / 影片剪輯 / 音樂音效', '1', NULL, 'n');

-- --------------------------------------------------------

--
-- 資料表結構 `work`
--

CREATE TABLE `work` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '名子',
  `namehref` varchar(500) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL COMMENT '時間',
  `timeurl` varchar(500) DEFAULT NULL,
  `headimgsrc` varchar(500) DEFAULT NULL COMMENT '頭圖',
  `imgsrc` varchar(1000) DEFAULT NULL COMMENT '圖片',
  `articles` varchar(1000) DEFAULT NULL COMMENT '文章',
  `crawlerurl_id` int(10) UNSIGNED NOT NULL COMMENT '來源'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `work`
--

INSERT INTO `work` (`id`, `name`, `namehref`, `time`, `timeurl`, `headimgsrc`, `imgsrc`, `articles`, `crawlerurl_id`) VALUES
(4, '徐珮瑜', 'https://www.facebook.com/groups/164843387045745/user/100004620330394/?__cft__[0]=AZVjZAFek2SuJv2uZG8dKPvGgIA1B3Tm5-3o3vGAlsF3fIjlulwU3JYK6QPrkejzyRAE_5VwHhncqBJqNQHUVMykU6Btvorwmr2plT5Til8sRYVU_s3PfSc-gFjozzS39GabmJua_KEvV-oDY7y70cerIEd-WU6UZJsxxN9N5wqauN', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t39.30808-1/362917801_2517030638460923_1595968023018704554_n.jpg?stp=c0.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=UQS9Ns-GMCYAX9OPQty&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_Af', NULL, '#我要發案\n徵 社群美編、\n內容：社群小編、美編\n貼文、文宣、影片製作\n類型：美髮\n兼職長期合作佳（需包月）\n提供社群作品\n請訊息我 謝謝', 3),
(5, '黃仁長', 'https://www.facebook.com/groups/164843387045745/user/100035410670020/?__cft__[0]=AZXOm7uJHtaf_bRPafQ2i1Vx8iTVPM3a93hp2tHfHDaaL9J4bSGxAxIjU6DBpv_932A_hlTy6lR-7c3LcExBITf-Vwz6wlJrjKtN9flMsUagDUcnod5uJIkgi1-9cMcQCwuUAA9CouCbHosnxN4pTpFgqgTXUkjEJcjtJZWSK9ZUy-', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t39.30808-1/240521564_4455222524538590_5303297315910899938_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=1hqWaURqbakAX_BYyPX&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfA4NMv4dbhCSouz', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t39.30808-6/387817615_1083652849491727_8836864446894416264_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=fSsxeKKQyPYAX-EXnRc&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfCcufM0uEoYWAbd', '經營者｜企業主｜想要創業  看過來\n【smepass對談活動】高效獲得政府資源關鍵力｜智慧資源媒合 x 一鍵取回\n眾多政府資源，想效率地找到適用的獎補助計畫? \n跟政府申請計畫，各項佐證資料要花好多時間到不同部會申請\n本次活動您能了解\n跨產業經營關鍵\n如何善用數位工具，高效掌握政府資源和補助，助您創業與經營路一臂之力！\n經營晉升之旅即刻開始\n活動地點：線上\n活動詳情與報名https://reurl.cc/x6vxq4', 3),
(6, '杜政霖', 'https://www.facebook.com/groups/164843387045745/user/100003995880256/?__cft__[0]=AZUuKDkoFyQ96vJnDcRERlhXlSb_oTVXHHKn_5ZvbnjHQf9VV06_USOn-TSN1YJv8fleOtOgWM4yTRObgnTvlcwFfOySvGE5sVQjxi2O0qeSrKnj2yC7XYvOrk3ZzRl5r_IGXhrjsfpv9ePctjIdOMcgI7mukimz2AYohbhBdk2Rjb', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t1.6435-1/190967376_2149399785203197_7756688676229065873_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=101&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=uAKjYjLftZ8AX84J0IQ&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfDS1BGr9HQJgr_M', NULL, '我要發案\nApp內的廣告置入橫幅的圖片設計\n（遊戲週邊） (3c商品）\n有蝦皮設計經驗佳！￼', 3),
(7, 'Lin Meng-jun', 'https://www.facebook.com/groups/164843387045745/user/100002650268322/?__cft__[0]=AZVq2j3pjcCCaHXx9X5OxiY9uZeAEqziNYPuwi0RtxeUhCRb2UP_J3cDPa6UGsgHD9BOwcrg2hp14sZO_ZcaykGTUDRCHtiVJjEDc9sHRWSyyonOJJTuc5GjY8bPks83xk74YfutbVNBd55Skqs91InjjIdkOVi-GpA2BlyFoigcMN', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t31.18172-1/12621971_868410803257254_1382455943691519090_o.jpg?stp=c280.120.720.720a_cp0_dst-jpg_s40x40&_nc_cat=110&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=riB3B7ObkVsAX8X2-J3&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=0', NULL, '【演員招募 】\n大家好\n下周兩場拍攝活動，招募的需求資訊為:\n<生醫孕轉手拍攝活動 - 八字篇 ep1>\n演員條件 : 女生1位，年齡約30-40歲\n日期與地點 : 10/20(五)，16:00-17:00\n拍攝內容 : 根據懷孕相關提問，回答問題，總拍攝時長約10分鐘\n出演費用 : 1200元/人\n<生醫孕轉手拍攝 - 龍寶寶篇 ep2>\n演員條件 : 女生1位，年齡約30-40歲\n日期與地點 : 10/20(五)，17:00-18:00\n拍攝內容 : 根據懷孕相關提問，回答問題，總拍攝時長約10分鐘\n', 3),
(8, '陳芊孜', 'https://www.facebook.com/groups/164843387045745/user/100002400160693/?__cft__[0]=AZX_V1P5mPewbjjPEdxvguG87dCySY4A5xuxbVie5diipVga_LI5RuW6kbWZ2aVbnFSPx8k0jfyawpL-DXFq-XXfvR2UGM2hkWhyVooshLkEjYyb29UZVT3-oZUorjgei0cy6MC_Pra5eBk7LN2W7H_ehMfMxt_mvSbuVnXhtk9Mne', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t1.6435-1/131671343_3591923580897612_8387376522998888126_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=100&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=L8moVHCIef0AX8vu1Le&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfAvIB6SsfaBKXLp', NULL, '＃我要發案\n誠徵  動畫師&拍攝團隊\n案子說明\n  誠徵動畫師，可近期產出\n需求：10秒左右動畫影片，內容像航海王哥爾羅傑名言那樣，尋找寶藏的前導。\n費用：請提供作品集、私訊報價！\n  誠徵拍攝團隊\n需求：拍攝訪談短片、商品介紹（有綠棚及專業配音），時間落在11月，此專案需較專業拍攝團隊（有燈光師 助理等），自備器材。\n費用： 請提供作品集、以一班報價給我！\n希望找到工作態度好的夥伴，配合不錯的話能長期配合～～～', 3),
(9, '黃文含', 'https://www.facebook.com/groups/164843387045745/user/100000100254261/?__cft__[0]=AZVcbx8-OuIu-bIA10u4tynUPdxdZYxXLjOGo2smbQchZp7J-bzD0JQGqDHrai6r5ZLMMKPboAXxolDGfiIofdu2TrmnZwDlm1rBudCIUFDD_FQKogBkIYnx5GS3ifzhSAAtLaoZG3yfQA2NC_-c4pZu1eX8wssT2qcE79P7CumucT', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t39.30808-1/365802274_7144016458944958_1445259579689335883_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=J7BbDi9bd5AAX_BpSic&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfBtyWxx623qLL', NULL, '#我要發案\n短期單次Fb貼文廣告及google廣告操作\n預算：15000元（包含工作及廣告費，不需作圖，素材我方提供，可談。提交成效報告及請款單據後一週內匯款）\n內容說明：單篇FB貼文下廣告，google聯播網廣告，時間盡快運作至10/23，對成效不拘，但需討論共識，並於結束後彙整成效報告。可私訊再談細節。\n意者請私訊簡單列舉重要操作經驗，預期成效，可詳談。', 3),
(10, '艾瑞克', 'https://www.facebook.com/groups/164843387045745/user/100033420307918/?__cft__[0]=AZVHVrmbWKxrRiTNjkEnszWw83SVcQl7oeQsjunrJ26K6ffUJ6x4Gln5T-MJ2XbRKszW7-tjbkuB0KsIAEIG8pSAUNQuAdc6_f_JpQvlOCkDt3a4rT1oGju7pnuHG6nYrAtDIg0YFwRY5ncxXkucvPgwKftl7aiNtGOUWGzVoKM9Ic', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-1/335037334_607066197476003_191361187342927644_n.jpg?stp=cp6_dst-jpg_p40x40&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jqXtkJqplnUAX9aYaU_&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfBvRrMt0mvEPXbX', NULL, '＃我要發案\n誠徵  長期配合 剪輯、攝影師\n居家設計、空間規劃的領域\n影片類型：YT影片為主，每部約13～25分鐘左右不一定\n若配合不錯，可試試配合各類教學影片、宣傳影片、Shorts、Reals、小紅書短片等\n期待能偶爾到新竹公司開會討論、剪片，有案場需求到場協助拍攝\n這部分無法也沒關係，算加分\n期待工作態度好、溝通適應力強，對領域有強烈熱忱，責任感強\nLine Id:0981257282周先生', 3),
(11, 'Chiang Yusin', 'https://www.facebook.com/groups/164843387045745/user/100084648575355/?__cft__[0]=AZU8bZsuyOPVTEKKDG2d6-xK-C70GZ53eVlL3JAf-itU4GXMXy2eO135dGE4-l4kDyhjQ_GyjspzEH8UAOU_rJyMW2bs2YLxmngq_lWJ2qtLCmbTHAuJho3Ha3LrulLIHydn3UaHEjcw9xcBop09mpb-fvT6fsGA8HnLhd6wef1UFy', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-1/373676942_270514689113482_2530596093751251745_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3_2dSfZgfo4AX9YcI61&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfBsgUdgRyiNyjq', NULL, '#我要接案\n大家好 我是自由接案者\n有接手繪的logo設計、平面設計、以及各式的水彩畫與代針筆畫\n有興趣可以私訊我 給予作品集參考\n謝謝大家\n也希望能幫助到各位發案者', 3),
(12, 'May Don', 'https://www.facebook.com/groups/164843387045745/user/100037669627802/?__cft__[0]=AZUxffGbFQZTMYzt7g_X_094GvGXU41vibQrGfDNoRLIQ2vlcZ9CwWHuwvRy0fGOPfGa4-VQReaXLQbIysvbi32UmzGHgo0_WRTRJBbkriBifRvk8iILjyek0W8D9HBiGhsg1dsYYd3rhowc-2z1waCUPcqElblEIkpTJNN9-MKluf', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t1.6435-1/62164992_102425984356389_445387125047689216_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=101&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=DIua0z7nDPAAX8ALQN6&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfAl8sgR_TOequk6rPU', NULL, '＃我要發案\n需求：訪談影片拍攝（雙機攝影師）\n拍攝地點：台北市\n拍攝時間：10/20（五） 上午0900-1300\n★請私訊報價及提供相關作品集，謝謝！\n(已收到許多私訊但尚未回覆，先暫停徵求，謝謝！)', 3),
(13, 'Anjxn Lxll', 'https://www.facebook.com/groups/164843387045745/user/100001960393391/?__cft__[0]=AZWm7cHIjGbHEQaY1xHRr9c9kn8FgulvzcI_3JQGqnaPc0Ph-lM_er9W06SCwJKFevJvKrkWSZS96AJJsAD0uZzyRQ4utttRxoAru6KPVdxc8qIdoOKZcAY18bcATzSV1mJJmM-fSRjgookvL9TegfCJWfx1LL_hS9ne1Czvn6NWqZ', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-1/331141523_2992958850999444_3436915511793607865_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0yve_CGr1hYAX9tObmi&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfA4YuXfMLbJTX', NULL, '#我要發案\n項目｜平面設計\n案件｜中高價餐廳酒吧 LOGO / Menu / Branding 設計\n           （全新品牌）\n費用｜煩請提供報價\n           （報價請各品項分開列出）\n煩請附上以往設計作品集寄至 \nsuitedconsulting1@gmail.com\n（不收私訊）\n（只需此案件，不需其他企劃案推薦，謝謝）\n經過評估後會與合適的設計師聯繫，感謝', 3),
(14, '江佳俊', 'https://www.facebook.com/groups/164843387045745/user/100000054910040/?__cft__[0]=AZXeR4t-IbtH5GWfCxK-c7WEYhFNsyrPwobXHJTZNFJv70kY9DgZfFIDpBIj7_jIjjSOm4jAGSFRlKuZNLCjT5OvYMs66Ote5di2y1sH8H8uts9WNwgcs5E8bNhIH3VwhYci2vncAcVro1J1uQi6RshfFPgKH03sKmDnpC1dAvLu1T', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-1/274979635_5286668061344972_1498049895094246614_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_UHCoOpIC_oAX_Do59G&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfA7PeQID5QfcN', NULL, '#我要發案\n發案身份：公司\n公司地區：遠端\n發案類型：網站頁面設計\n發案內容：熟悉wordpress優先\n需求條件：一般案件\n聯繫方式：請私訊我，有合適人選也可以引薦，謝謝', 3),
(15, '鄭明姿', 'https://www.facebook.com/groups/164843387045745/user/100089857571327/?__cft__[0]=AZUo54Und1HFHWU_T1B7ZK99Jp_RnwbpMoN45oVllpQgUW66rn6Qpmmr5_rGdXdB2_jP6z7GEFQgaxOtdnUNh-_57WPgsHB5KOuSof1b3waGofGv6INxbgJpRO_UbFYnPbw5CAUZRu0EB-cVT3I7nZw7JeH1QGgxh8Xk2snc1k9Tku', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-1/327430789_2880088395459485_8290980159931353810_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=egF43_Ci_g0AX9LewPe&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfANrA2FkyfOZg', NULL, '新竹竹北軟體公司徵才技術主管\n薪水年薪百萬以上\n意者直接私訊~\n技術能力\n1.熟悉Java-Based Solution，熟Spring Boot。\n2.熟悉前台Angular/Vue/React框架擇一\n3.對CI/CD機制有相關經驗\n4.對QA/QC自動化測試有實務經驗\n6.熟悉web infra\n7.熟悉資料庫MYSQL，oracle及DB2尤佳\n8.對資安相關的解決方案能提出建議\n有系統架構經驗：系統規劃、技術方案、技術研發與建置，且具採用restful前後台開發分離之產品或專案規劃與開發經驗。\n', 3),
(16, 'Ivo Tsai', 'https://www.facebook.com/groups/164843387045745/user/100000207614897/?__cft__[0]=AZVUhSSUbVpnfvV7CQBWgBbwPwpHnMUx4DDMZLls8HnvSOCaFw_kKtOZ3H5rQBBkCFByXfAglsq3q3vyptrbPj1qpyM9vHjf_beuCYMquovkm4eqL8iaWZQXmkk4mNXdas-Tokf1GMxIS85vSPt9mhN8uZHEVxzjzgTxepQsovOytE', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-1.fna.fbcdn.net/v/t1.18169-1/11836699_1178230298860546_1404534975210847432_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=102&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=JF-G_t9Nl8gAX8Z1wO0&_nc_ht=scontent.fkhh1-1.fna&cb_e2o_trans=t&oh=00_AfBdfqQSVrLgyKbA', NULL, '＃我要發案\n試播集贊助投資推案\n需求：\n已拍攝完成的試播集尋求潛在投資方贊助投資\n需要一名監製推案\n內容：\n1.安排劇本、試播集給投資方當面閱覽\n2.說明投資回饋計畫\n3.擬定名單、安排拜訪行程\n時間：\n長期合作\n地點：\n工作室在桃園 線上討論為主\n★請提供監製過的相關作品\n蔡導\nLine ID : ivo.tsai', 3),
(17, '陳柏亦', 'https://www.facebook.com/groups/164843387045745/user/100024360431480/?__cft__[0]=AZWQGakDig9e04cgTXXKP0fAjDiBJwgYZviWpEokKhawis5Y6p88yqUMFdi8VNvChJppieCU9UldvgRRdHDhORPaTJ1EAHdguzu61Z6SdmRXBKQriS5geYzrHSW_YhxWIhnhr5NxUPnaYwDzNS5CRln81c0Hiywb9ec181ab2o9Zq5', '2023-10-13', 'https://www.facebook.com/groups/164843387045745#', 'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-1/255502293_1033554197466585_6815893578771731806_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pA2vkvLW0lQAX_u39HJ&_nc_ht=scontent.fkhh1-2.fna&cb_e2o_trans=t&oh=00_AfBOiMo2o6Dr5Q', NULL, '#我要發案\n徵一個長期配合的\nPPT美編設計\n/\n發案需求\n能提供想法｜有創意｜好溝通｜好配合\n有意願者私', 3);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `work`
--
ALTER TABLE `work`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
