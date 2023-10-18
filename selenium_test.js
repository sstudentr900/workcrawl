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
    let driver = await new webdriver.Builder().forBrowser("chrome").withCapabilities(
      options,
      { acceptSslCerts: true, acceptInsecureCerts: true }//解決跨網域問題
    ).build();
    const web = 'https://ithelp.ithome.com.tw/users/20150652/ironman/5050?page=3';//我們要前往FB
    await driver.get(web)//在這裡要用await確保打開完網頁後才能繼續動作
    await driver.sleep(1000)

   

    //屬性查找 element by attribute------------------------------------------
    //https://www.lambdatest.com/blog/how-to-find-element-by-text-in-selenium/
    //const obj5 = await driver.findElement(By.xpath("//a[@rel='prev']"))
    // console.log(obj5);

    // const obj4 = await driver.findElement(By.css('a[title="2022-10-06 11:43:36"]'))
    // console.log(await obj4.getText());


    //字元查找 element by contains------------------------------------------
    //https://www.lambdatest.com/blog/how-to-find-element-by-text-in-selenium/
    // const obj6 = await driver.findElements(By.xpath("//button[contains(text(),'展開')]"))
    // if(obj6.length > 0)
    // {
    //   obj6[0].click()
    // }else{
    //   console.log('no');
    // }
    // console.log(obj6);

    //css查找------------------------------------------
    // const obj4 = await driver.findElements(By.css('.qa-list__title-link'))
    // if(obj4.length > 0)
    // {
    //   console.log(await obj4[0].getText());
    // }else{
    //   console.log('no');
    // }


    //抓取getAttribute------------------------------------------
    // const obj = await driver.findElement(By.css('.qa-list__title-link'))
    //href
    // const href = await obj.getAttribute('href')
    // console.log(href)

    //data-id
    // const id = await obj.getAttribute('data-id')
    // console.log(id)


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

    
    //透過 Selenium 操作下拉式選單 (Select)------------------------------------------
    //https://www.selenium.dev/zh-cn/documentation/webdriver/support_features/select_lists/
    // <select name="multi" id="multi" multiple="multiple">
    //   <option selected="selected" value="eggs">Eggs</option>
    //   <option value="ham">Ham</option>
    //   <option selected="selected" value="sausages">Sausages</option>
    //   <option value="onion gravy">Onion gravy</option>
    // </select>
    // const {Select} = require('selenium-webdriver')
    // const selectElement = await driver.findElement(By.name('selectomatic'))
    // const select = new Select(selectElement)
    // await selects.selectByIndex(2)

    //視窗大小------------------------------------------
    //https://www.selenium.dev/zh-cn/documentation/webdriver/interactions/windows/
    // await driver.manage().window().setRect({width: 1024, height: 768});


    //gettext error------------------------------------------
    // <a href=https://stackoverflow.com/questions/16705165/unable-to-extract-the-text-using-gettext-in-selenium-webdriver-and-also-unable-t">gettext</a>
    // getAttribute("innerHTML")
    // getAttribute("textContent")

    //點擊錯誤------------------------------------------
    // <a href="https://stackoverflow.com/questions/58218032/selenium-element-click-is-not-clickable-at-point-52-346-other-element-would">點擊錯誤</a>

    //滾動------------------------------------------
    //https://www.selenium.dev/documentation/webdriver/actions_api/wheel/
    // const obj3 = await driver.findElement(By.css('.qa-list.profile-list.ir-profile-list'))
    // // console.log(await obj3.getRect())
    // const obj3Y = Math.round((await obj3.getRect()).y) //該DIV的高
    // // console.log(obj3Y)
    // await driver.actions().scroll(0, 0, 0, obj3Y).perform()

    //關閉------------------------------------------
    // driver.quit();
}
openCrawlerWeb()//打開爬蟲網頁
