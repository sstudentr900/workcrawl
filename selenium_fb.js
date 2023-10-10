require('dotenv').config(); //載入.env環境檔
const webdriver = require('selenium-webdriver') // 加入虛擬網頁套件
const chrome = require('selenium-webdriver/chrome');
By = webdriver.By,//你想要透過什麼方式來抓取元件，通常使用xpath、css
until = webdriver.until;//直到抓到元件才進入下一步(可設定等待時間)
const path = require('path');//用於處理文件路徑的小工具
const fs = require("fs");//讀取檔案用
const fb_username = process.env.FB_USERNAME
const fb_userpass = process.env.FB_PASSWORD

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


    //因為登入這件事情要等server回應，你直接跳轉粉絲專頁會導致登入失敗
    //以登入後才會出現的元件作為判斷登入與否的依據
    await driver.wait(until.elementLocated(By.xpath(`//*[contains(@id,":R6kmpaj9emhpapd5aq:")]`)))


    //登入成功後要前往粉專頁面
    const fanpage = "https://www.facebook.com/groups/1230482576964177"
    await driver.get(fanpage)
    //瀏覽器前往粉專頁面3秒後再進行爬蟲
    await driver.sleep(3000)


    //資料類別名
    const itemsCssName = '.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z';
    const itemTimeCssName = '.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv.xo1l8bm';

  
    async function getTime(obj,itemTimeCssName){
      let timeLink = await obj.findElements(By.css(`${itemTimeCssName} use`))
      if(timeLink.length>0){
        let timeId= await timeLink[0].getAttribute("xlink:href");
        // await driver.sleep(1000)
        // timeId = await driver.findElement(By.css(`${timeId} use`)).getAttribute("xlink:href");
        // await driver.sleep(1000)
        let timeText = await driver.findElement(By.css(`${timeId}`)).getAttribute("innerHTML");
        console.log(`顯示可抓資料(svg):${timeText}`)
        return timeText;
      }else{
        let timeText = await obj.findElement(By.css(`${itemTimeCssName}`)).getText()
        console.log(`顯示可抓資料(text):${timeText}`)
        return timeText;
      }
    }
    async function showTodayData(number,itemsCssName,itemTimeCssName){
      const itemFirst = await driver.findElement(By.css(itemsCssName))
      const itemFirstY = Math.round((await itemFirst.getRect()).y) //該DIV的高
      const scrollHeight = itemFirstY+number
      // console.log(scrollHeight)
      await driver.actions().scroll(0, 0, 0, scrollHeight).perform()
      await driver.sleep(2000)
      
      //抓最後一筆
      const item = await driver.findElements(By.css(itemsCssName))
      const itemLast = item[item.length-1]
      //抓最後一筆時間
      // const timeLink=  await itemLast.findElement(By.css(`${itemTimeCssName} use`))
      // let timeId= await timeLink.getAttribute("xlink:href");
      // await driver.sleep(1000)
      // timeId = await driver.findElement(By.css(`${timeId} use`)).getAttribute("xlink:href");
      // // await driver.sleep(1000)
      // let timeText = await driver.findElement(By.css(`${timeId}`)).getAttribute("innerHTML");
      // console.log(`timeText:${timeText},${timeText.includes('日')},${timeText.includes('天')}`)
      // if(timeText.includes('日') || timeText.includes('天')){
      const timeText = await getTime(itemLast,itemTimeCssName)
      // console.log(`timeText:${timeText},${timeText.includes('日')},${timeText.includes('天')}`)
      if(timeText.includes('日') || timeText.includes('天')){
        return 'ok';
      }else{
        await showTodayData(number,itemsCssName,itemTimeCssName)
      }
    }
    await showTodayData(200,itemsCssName,itemTimeCssName)

    console.log(`抓取資料`)
    const arrays = []
    const items = await driver.findElements(By.css(itemsCssName))
    for (const item of items) {
      const obj = {}

      console.log(`一定滾動到要抓取位置---------------------------`)
      // const itemY = Math.round((await item.getRect()).y) //該DIV的高
      await driver.actions().scroll(0, 0, 0, 0, item).perform()
      await driver.sleep(4000)

      const timeText = await getTime(item,itemTimeCssName)
      if(timeText.includes('日') || timeText.includes('天')){ console.log(`時間為日或天跳出:${timeText}`);break;}

      //console.log(`文章`)
      let articlesTexts=''
      const articlesObjs = await item.findElements(By.css('.x1iorvi4.x1pi30zi'))
      if(articlesObjs.length > 0){
        // console.log(`文章A:${articlesObjs.length}`)
        const articlesMore = await articlesObjs[0].findElements(By.xpath("//div[contains(text(),'顯示更多')]"))
        if(articlesMore.length>0){
          // console.log(`文章A_顯示更多:${articlesMore.length}`)
          await driver.executeScript("arguments[0].click();", articlesMore[0]);
        }
        const articlesMore2 = await articlesObjs[0].findElements(By.xpath("//div[contains(text(),'查看更多')]"))
        if(articlesMore2.length>0){
          // console.log(`文章A_查看更多:${articlesMore2.length}`)
          await driver.executeScript("arguments[0].click();", articlesMore2[0]);
        }
        // await driver.sleep(3000)
        articlesTexts = await articlesObjs[0].getText()
      }
      const articlesObjs2 = await item.findElements(By.css('.x5yr21d.xyqdw3p'))
      if(articlesObjs2.length > 0){
        // console.log(`文章B:${articlesObjs2.length}`)
        articlesTexts = await item.findElement(By.css('.x5yr21d.xyqdw3p')).getText()
      }
      //console.log(`文章抓取發案,誠徵`)
      if(articlesTexts.includes('發案') || articlesTexts.includes('誠徵')){
        obj.articles = articlesTexts
        console.log(`文章_發案,誠徵文字抓取:${obj.articles}`)
        // console.log(`文章_有發案,誠徵文字出`)
        // continue;
      }else if(articlesTexts.includes('接案')){
        console.log(`文章_接案文字跳出`)
        continue;
        // obj.articles = articlesTexts
        // console.log(`文章_有接案文字抓取:${obj.articles}`)
      }else{
        obj.articles = articlesTexts
        console.log(`文章_其他抓取:${obj.articles}`)
      }


      // console.log(`名子`)
      const nameObj= await item.findElement(By.css('.xt0psk2 .x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f'));
      obj.name= await nameObj.findElement(By.css('strong span')).getText();
      obj.namehref= await nameObj.getAttribute('href');
      console.log(`名子:${JSON.stringify(obj.name)}`)
      console.log(`名子href:${obj.namehref}`)


      // console.log(`時間`)
      const timeLink= await item.findElement(By.css(itemTimeCssName))
      // const time= await timeLink.getText()
      obj.timeurl= await timeLink.getAttribute("href");
      const dt= new Date();
      obj.time= `${dt.getFullYear()}-${('0'+(dt.getMonth()+1)).slice(-2)}-${('0'+dt.getDate()).slice(-2)}`
      console.log(`時間:${obj.time}`)
      console.log(`時間_url:${obj.timeurl}`)
  

      // console.log(`圖片`)
      const imgsrcdivs= await item.findElements(By.css('img.x1ey2m1c.xds687c.x5yr21d.x10l6tqk.x17qophe.x13vifvy.xh8yej3'));
      if(imgsrcdivs.length > 0){
        const img = [];
        for (const imgsrcdiv of imgsrcdivs) {
          img.push(await imgsrcdiv.getAttribute("src"))
        }
        obj.imgsrc= img
        console.log(`圖片:${obj.imgsrc}`)
      }
    

      // console.log(`頭圖`)
      const headimgsrc= await item.findElement(By.css('svg.x3ajldb image')).getAttribute("xlink:href");
      console.log(`頭圖:${headimgsrc}`)
      obj.headimg= headimgsrc

      //push arrays
      arrays.push(obj)
    }

    console.log(`arrays:${JSON.stringify(arrays)}`)

    // driver.quit();
}
openCrawlerWeb()//打開爬蟲網頁
