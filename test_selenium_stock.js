// require('dotenv').config(); //載入.env環境檔
const webdriver = require('selenium-webdriver') // 加入虛擬網頁套件
const chrome = require('selenium-webdriver/chrome');
By = webdriver.By,//你想要透過什麼方式來抓取元件，通常使用xpath、css
until = webdriver.until;//直到抓到元件才進入下一步(可設定等待時間)
const startUrl = 'https://www.wantgoo.com/futures/retail-anti-indicator'
// const path = require('path');//用於處理文件路徑的小工具
// const fs = require("fs");//讀取檔案用
// const fb_username = process.env.FB_USERNAME
// const fb_userpass = process.env.FB_PASSWORD

async function openCrawlerWeb() {
    // 建立這個browser的類型
    const options = new chrome.Options();
    //會有notifications干擾到爬蟲，所以要先把它關閉
    options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });
    const driver = await new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();
    await driver.get(startUrl)//在這裡要用await確保打開完網頁後才能繼續動作

    await driver.sleep(1000)

    const trs = await driver.findElements(By.css('#tbody tr'))
    console.log(await trs.getText());
}
openCrawlerWeb()//打開爬蟲網頁
