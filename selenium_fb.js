require('dotenv').config(); //載入.env環境檔
const webdriver = require('selenium-webdriver') // 加入虛擬網頁套件
const chrome = require('selenium-webdriver/chrome');
By = webdriver.By,//你想要透過什麼方式來抓取元件，通常使用xpath、css
until = webdriver.until;//直到抓到元件才進入下一步(可設定等待時間)
const path = require('path');//用於處理文件路徑的小工具
const fs = require("fs");//讀取檔案用
const fb_username = process.env.FB_USERNAME
const fb_userpass = process.env.FB_PASSWORD

function getCrawlerPath () {
  if (process.env.FB_VERSION === 'new') {//如果是新版FB
      return {
          "fb_head_path": `//*[contains(@class,"fzdkajry")]`
      }
  } else {//如果為設定皆默認為舊版
      return {
          "fb_head_path": `//*[contains(@class,"_1vp5")]`
      }
  }
}

async function openCrawlerWeb() {
    // 建立這個browser的類型
    const options = new chrome.Options();
    //因為FB會有notifications干擾到爬蟲，所以要先把它關閉
    options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });
    let driver = await new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();
    const web = 'https://www.facebook.com/login';//我們要前往FB
    await driver.get(web)//在這裡要用await確保打開完網頁後才能繼續動作
    // console.log(fb_username,fb_userpass)
    //填入fb登入資訊
    //使用until是要求直到網頁顯示了這個元件才能執行下一步
    const fb_email_ele = await driver.
        wait(until.elementLocated(By.xpath(`//*[@id="email"]`)));//找出填寫email的元件
    fb_email_ele.sendKeys(fb_username)//將使用者的資訊填入

    const fb_pass_ele = await driver.
        wait(until.elementLocated(By.xpath(`//*[@id="pass"]`)));
    fb_pass_ele.sendKeys(fb_userpass)

    // //抓到登入按鈕然後點擊
    const login_elem = await driver.
        wait(until.elementLocated(By.xpath(`//*[@id="loginbutton"]`)))
    login_elem.click()


    // FB有經典版以及新版的區分，兩者的爬蟲路徑不同，我們藉由函式取得各自的路徑
    // const { fb_head_path } = getCrawlerPath();

    //因為登入這件事情要等server回應，你直接跳轉粉絲專頁會導致登入失敗
    //以登入後才會出現的元件作為判斷登入與否的依據
    await driver.wait(until.elementLocated(By.xpath(`//*[contains(@id,":R6kmpaj9emhpapd5aq:")]`)))

    //登入成功後要前往粉專頁面
    const fanpage = "https://www.facebook.com/baobaonevertell/"
    await driver.get(fanpage)

    //瀏覽器前往粉專頁面3秒後再進行爬蟲
    await driver.sleep(3000)
    let fb_post = [];//這是紀錄FB追蹤人數
    //因為考慮到登入之後每個粉專顯示追蹤人數的位置都不一樣，所以就採用全抓在分析
    const fb_trace_path =`//div[@class='xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs x126k92a']`
    const fb_trace_eles = await driver.wait(until.elementsLocated(By.xpath(fb_trace_path)))
    for (const fb_trace_ele of fb_trace_eles) {
      const fb_text = await fb_trace_ele.getText()
      fb_post.push(fb_text)
      // if (fb_text.includes('人在追蹤')) {
      //   break;
      // }
    }
    console.log(`fb_post: ${fb_post}`)

    driver.quit();
}
openCrawlerWeb()//打開爬蟲網頁
