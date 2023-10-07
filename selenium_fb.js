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
    const fanpage = "https://www.facebook.com/groups/1230482576964177"
    await driver.get(fanpage)
    //瀏覽器前往粉專頁面3秒後再進行爬蟲
    await driver.sleep(3000)


    async function showTodayData(number,itemsCssName,itemTimeCssName){
      const itemFirst = await driver.findElement(By.css(itemsCssName))
      const itemFirstY = Math.round((await itemFirst.getRect()).y) //該DIV的高
      const scrollHeight = itemFirstY+number
      // console.log(scrollHeight)
      await driver.actions().scroll(0, 0, 0, scrollHeight).perform()

      //抓最後一筆
      await driver.sleep(1000)
      const item = await driver.findElements(By.css(CssName))
      const itemLast = item[item.length-1]
      //抓最後一筆時間
      const timeLink=  await itemLast.findElement(By.css(`${itemTimeCssName} use`))
      let timeId= await timeLink.getAttribute("xlink:href");
      timeId = await driver.findElement(By.css(`${timeId} use`)).getAttribute("xlink:href");
      let timeText = await driver.findElement(By.css(`${timeId}`)).getAttribute("innerHTML");
      console.log(timeText)
      if(!timeText.includes('日')){
        showTodayData(number,itemsCssName,itemTimeCssName)
      }else{
        return 'ok';
      }
    }

    //資料類別名
    const itemsCssName = '.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z';
    const itemTimeCssName = '.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv.xo1l8bm';
    const arrays = []

    //顯示今天資料
    await showTodayData(200,itemsCssName,itemTimeCssName)
    console.log(obj);

    //抓取資料
    const items = await driver.findElement(By.css(itemsCssName))
    for (const item of items) {
      const obj = {}
      //時間
      const timeLink= await item.findElement(By.css(itemTimeCssName))
      // const time= await timeLink.getText()
      obj.timeurl= await timeLink.getAttribute("href");
      const dt=new Date();
      obj.time= `${dt.getFullYear()}${('0'+(dt.getMonth()+1)).slice(-2)}${('0'+dt.getDate()).slice(-2)}`
      console.log(time,timeurl)

      //圖片
      const imgsrc= await item.findElement(By.css('.x1ey2m1c.xds687c.x5yr21d.x10l6tqk.x17qophe.x13vifvy.xh8yej3.xl1xv1r')).getAttribute("src");
      console.log(imgsrc)
    
      //名子
      const nameObj= await item.findElement(By.css('a.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f'));
      obj.name= await nameObj.findElement(By.css('strong span')).getText();
      obj.namehref= await nameObj.getAttribute('href');
      console.log(name,namehref)
  
      //文章
      const articlesObj = await item.findElement(By.css('.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xo1l8bm.xzsf02u.x1yc453h'))
      const articles = articlesObj.getText()
      console.log(articles)
    }

    // driver.quit();
}
openCrawlerWeb()//打開爬蟲網頁
