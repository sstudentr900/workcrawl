//104
require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./initDrive.js");
const { By, until,Select } = require('selenium-webdriver') // 從套件中取出需要用到的功能
const { dbQuery,dbInsert,dbUpdata,dbDelete,timeFn } = require('./db.js')
const lisClassName = '.job .job-summary'
const dateClassName = '.date-container'
const titleClassName = '.info-job a'
const articlesClassName = 'div.info-description'
let nowTitle = '';
let misse = 0;
const misseMax = 4;
let nowdate = '';
let nowYear = '';
async function login(driver) {
  const OHF_username = process.env.OHF_USERNAME
  const OHF_userpass = process.env.OHF_PASSWORD
  const web = 'https://www.104.com.tw/';
  // try {
  await driver.get(web)

  //選登入
  const login = await driver.wait(until.elementLocated(By.css('.js-header_member-menu_item-login.active')), 3000);
  await driver.executeScript("arguments[0].click();", login);
  // await driver.sleep(3000)

  //填入登入資訊
  const OHF_email_ele = await driver.wait(until.elementLocated(By.xpath(`//*[@id="username"]`)), 3000);
  OHF_email_ele.sendKeys( OHF_username )
  const OHF_pass_ele = await driver.wait(until.elementLocated(By.xpath(`//*[@id="password"]`)), 3000);
  OHF_pass_ele.sendKeys( OHF_userpass )

  //抓到登入按鈕然後點擊
  const login_elem = await driver.wait(until.elementLocated(By.xpath(`//*[@id="submitBtn"]`)), 3000)
  login_elem.click()


  //信箱驗證 等30秒
  await driver.sleep(30000)
  // const emailInput = await driver.wait(until.elementLocated(By.css('.BaseInput.appearance-none.block.w-full.border.border-gray-200.rounded.py-8.px-12.h-44.focus:border-orange-400.focus:outline-none.gray-input')), 3000);
  // emailInput.send_keys(shoujicode)
  const emailBtn = await driver.wait(until.elementLocated(By.css('.btn.btn-primary.btn-size-large.mt-32.block.w-full')), 3000);
  await driver.executeScript("arguments[0].click();", emailBtn);
  await driver.sleep(2000)

  //因為登入這件事情要等server回應，你直接跳轉粉絲專頁會導致登入失敗
  //以登入後才會出現的元件作為判斷登入與否的依據
  // await driver.wait(until.elementLocated(By.xpath(`//*[contains(@id,":R6kmpaj9emhpapd5aq:")]`)), 5000)

  // return true;
  // } catch (e) {
  //   console.error('登入失敗',e)
  //   return false;
  // }
}
async function nowDateFn() { 
  //今天日期在減3天
  const date = await timeFn({day:-3})
  nowYear = String(date['year'])
  nowdate = `${String(date['month']).padStart(2,'0')}/${String(date['day']).padStart(2,'0')}`
  console.log(`今天日期:${nowdate}`)
}
async function showData(driver,row){
  //console.log(`手動載入`)
  // const button = await driver.findElements(By.css('button.b-btn.b-btn--link.js-more-page'))
  // if(button.length>0){
  //   await driver.executeScript("arguments[0].click();", button[0]);
  //   await driver.sleep(3000)
  // }
  //console.log(`抓最後一筆`)
  const lis = await driver.findElements(By.css(lisClassName))
  if(!(lis.length>0)){ 
    if(misse>misseMax){
      misse++
      console.log(`找不到lis-下一個`)
      return true;
    }else{
      console.log(`找不到lis-getTrace`)
      getTrace(driver,row)
    }
  }

  //await driver.sleep(2000)
  const lisLast = lis[lis.length-1]

  //console.log(`滾動到要抓取位置`)
  await driver.actions().scroll(0, 0, 0, 200, lisLast).perform()
  await driver.sleep(3000)

  // if(!lisLast){
  //   console.log(`找不到lisLast-下一個`)
  //   await showData(driver,date)
  // }
  //console.log(`判斷lisLast`,lis)
  //let time = ''
  // try {
  //   time = await lisLast.findElements(By.css(dateClassName))
  //   if(!(time.length > 0)){ 
  //     if(misse>4){
  //       misse++
  //       console.log(`找不到time-下一個`)
  //       return true;
  //     }else{
  //       console.log(`找不到time-getTrace,${time.length}`)
  //       getTrace(driver,row)
  //     }
  //   }else{
  //     time = await time[0].getText() 
  //   }
  // }catch (error){
  //   if(misse>4){
  //     misse++
  //     console.log(`錯誤找不到lis-下一個`)
  //     return true;
  //   }else{
  //     console.log(`錯誤找不到time-getTrace`)
  //     getTrace(driver,row)
  //   }
  // }
  let time = await lisLast.findElements(By.css(dateClassName))
  if(!(time.length > 0)){ 
    if(misse>misseMax){
      misse++
      console.log(`找不到time-下一個`)
      return true;
    }else{
      console.log(`找不到time-getTrace`)
      getTrace(driver,row)
    }
  }else{
    time = await time[0].getText() 
  }


  //console.log(`標題`)
  const title = await lisLast.findElement(By.css(titleClassName)).getText()

  //判斷結束
  if(nowdate<=time){
    if( nowTitle == title){
      console.log(`來源日期:${time}-日期判斷:${nowdate<=time}-上個標題:${nowTitle}-標題:${title}-標題一-跳出`)
      nowTitle = ''
      // await driver.navigate().refresh();
      // await driver.sleep(3000)
      return true;
    }else{
      nowTitle = title
      console.log(`來源日期:${time}-日期判斷:${nowdate<=time}-標題:${title}-下一個`)
    }
    await showData(driver,nowdate)
  }else{
    console.log(`來源日期:${time}-日期判斷:${nowdate<=time}-標題:${title}-跳出`)
    nowTitle = ''
    return true;
  }
}
async function getTrace(driver,row) {
  console.log('104,頁面抓取內容',row)
  await driver.get(row.storeurl)
  await driver.sleep(6000)

  //顯示要抓取內容
  await showData(driver,row)

  //開始抓取內容
  const lis = await driver.findElements(By.css(lisClassName))
  console.log(`lis數:${ lis.length-1 }筆`)
  //nowTitle = ''
  for (const [index,li] of lis.entries()) {
    console.log(`start,104,li:${lis.length-1},index:${index}-------------------`);
    const obj = {}

    // console.log(`滾動到要抓取位置`)
    await driver.actions().scroll(0, 0, 0, 200, li).perform()
    await driver.sleep(3000)

    //console.log('日期')
    //const time = await li.findElement(By.css(dateClassName)).getText()
    let time = await li.findElements(By.css(dateClassName))
    // if(time.length>0){
    time = await time[0].getText()
    const time1 = new Date(nowdate)
    const time2 = new Date(time)
    if(isNaN(time2.getTime())){
      //obj.time = ''
      console.log(`end,無效日期-${time2}-下一個-------------------`)
      continue;
    }
    if(time1>time2){
      console.log(`end,日期小於-${nowdate}-跳出-------------------`);
      break;
    }
    //else if(!time){
      //console.log(`來源日期有錯但繼續執行..`);
    //}
    obj.time = time?`${nowYear}-${time.replaceAll('/','-')}`:`${nowYear}-${nowdate.replaceAll('/','-')}`
    console.log('抓取內容，今天日期',time1,'來源日期',time2)
    // }else{
    //   //obj.time = ''
    //   console.log(`end,找不到時間-下一個-------------------`)
    //   continue;
    // }

    //console.log('標題')
    const title = await li.findElement(By.css(titleClassName)).getText()
    if(!title){
      console.log(`end,找不到標題-下一個-------------------`)
      continue;
    }
    // if(nowTitle==title){
    //   console.log(`end,標題一樣${nowTitle},${title}-跳出-------------------`)
    //   break;
    // }
    // nowTitle = title
    obj.name = title
    obj.namehref = await li.findElement(By.css(titleClassName)).getAttribute('href')
    //來源ID
    obj.crawlerurl_id = row['id']
    //文章
    let articles = await li.findElements(By.css(articlesClassName))
    if(articles.length>0){
      // articles = await articles[0].getText()
      // articles += '，'
      // articles += await li.findElement(By.css('.job-list-tag.b-content')).getText()
      obj.articles = await articles[0].getText()
    }
    //類別
    //const classlist = await li.findElement(By.css('.job-list-tag.b-content')).getText()
    console.log('目前抓取資料',obj)

    //判斷關鍵字
    const titleKeyWord = row['nokeyword'].split(',').find(item=>obj.name.includes(item))
    if(titleKeyWord){
      console.log(`end,標題排除(${titleKeyWord})-下一個-------------------`)
      continue;
    }

    //判斷標題
    const nameValue = await dbQuery( 'SELECT * from work where name = ?',[obj.name])
    if(nameValue.length>0){
      console.log(`end,標題重複-下一個-------------------`);
      continue;
    }else{
      //save
      await dbInsert('work',obj)
      console.log('end,儲存資料庫-------------------')
    }
  }
}
async function crawlerOHF(driver,row) {    
  //const driver = await initDrive();
  //await driver.manage().window().setRect({ width: 1420, height: 1000 });
  // await login(driver)
  await nowDateFn()
  await getTrace(driver,row)
  //driver.quit();
}
exports.crawlerOHF = crawlerOHF;//讓其他程式在引入時可以使用這個函式
// module.exports={
//   crawler,
// }
