require('dotenv').config(); //載入.env環境檔
const webdriver = require('selenium-webdriver') // 加入虛擬網頁套件
const chrome = require('selenium-webdriver/chrome');
By = webdriver.By,//你想要透過什麼方式來抓取元件，通常使用xpath、css
until = webdriver.until;//直到抓到元件才進入下一步(可設定等待時間)
const path = require('path');//用於處理文件路徑的小工具
const fs = require("fs");//讀取檔案用

async function openCrawlerWeb() {
    // 建立這個browser的類型
    const options = new chrome.Options();
    //因為FB會有notifications干擾到爬蟲，所以要先把它關閉
    options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });
    let driver = await new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();
    const web = 'https://ithelp.ithome.com.tw/users/20150652/ironman/5050?page=3';//我們要前往FB
    await driver.get(web)//在這裡要用await確保打開完網頁後才能繼續動作


    //查找該元素------------------------------------------
    const obj = await driver.findElements(By.css('.qa-list__title-link'))
    if(obj.length > 0)
    {
      console.log(await obj[0].getText());
    }else{
      console.log('no');
    }

    //單個------------------------------------------
    // const obj = await driver.findElement(By.css('.qa-list__title-link'))
    ////文字
    // const title = await obj.getText()
    // console.log(title)
    // //href
    // const href = await obj.getAttribute('href')
    // console.log(href)


    //多個------------------------------------------
    // const objs = await driver.findElements(By.css('.qa-list.profile-list.ir-profile-list'))
    // for(let e of objs) {
    //   const item = await e.findElement(By.css('.qa-list__title-link'))
    //   //文字
    //   const title = await item.getText()
    //   console.log(title)
    //   //href
    //   const href = await item.getAttribute('href')
    //   console.log(href)
    // }

    //最後一個------------------------------------------
    // let obj2s = await driver.findElements(By.css('.qa-list.profile-list.ir-profile-list'))
    // obj2s = obj2s[obj2s.length-1]
    // const item2 = await obj2s.findElement(By.css('.qa-list__title-link'))
    // //文字
    // const title2 = await item2.getText()
    // console.log(title2)
    // //href
    // const href2 = await item2.getAttribute('href')
    // console.log(href2)

    //滾動
    // const obj3 = await driver.findElement(By.css('.qa-list.profile-list.ir-profile-list'))
    // // console.log(await obj3.getRect())
    // const obj3Y = Math.round((await obj3.getRect()).y) //該DIV的高
    // // console.log(obj3Y)
    // await driver.actions().scroll(0, 0, 0, obj3Y).perform()


    // driver.quit();
}
openCrawlerWeb()//打開爬蟲網頁
