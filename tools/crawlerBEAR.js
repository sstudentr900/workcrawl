//518
require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./initDrive.js");
const { By, until,Select } = require('selenium-webdriver') // 從套件中取出需要用到的功能
const { dbQuery,dbInsert,dbUpdata,dbDelete,timeFn } = require('./db.js')
const itemsClassName = '#listContent .all_job_hover';//欄
const dataClaccName = 'span.job__date';//日期
const titleClaccName = 'h2.job__title__inner a';//日期
async function login(driver) {
  const username = process.env.BEAR_USERNAME
  const userpass = process.env.BEAR_PASSWORD
  const web = 'https://www.518.com.tw/member-login.html?backUrl=https%3A%2F%2Fwww.518.com.tw%2Fjob-index.html';
  await driver.get(web)

  //填入登入資訊
  const accountInput = await driver.wait(until.elementLocated(By.xpath(`//*[@id="account"]`)), 3000);
  accountInput.sendKeys( username )
  const passwordInput = await driver.wait(until.elementLocated(By.xpath(`//*[@id="password"]`)), 3000);
  passwordInput.sendKeys( userpass )

  //抓到登入按鈕然後點擊
  const login_elem = await driver.wait(until.elementLocated(By.xpath(`//*[@id="login"]`)), 3000)
  login_elem.click()
  await driver.sleep(3000)
}
async function showData(driver,date){
  //console.log(`手動載入`)
  // const button = await driver.findElements(By.css('button.b-btn.b-btn--link.js-more-page'))
  // if(button.length>0){
  //   await driver.executeScript("arguments[0].click();", button[0]);
  //   await driver.sleep(3000)
  // }
  //console.log(`抓最後一筆`)
  const lis = await driver.findElements(By.css(itemsClassName))
  const lisLast = lis[lis.length-1]
  // console.log(`滾動到要抓取位置`,lisLast)
  await driver.actions().scroll(0, 0, 0, 200, lisLast).perform()
  await driver.sleep(2000)
  //console.log(`showData 判斷日期`,await lisLast.getText())
  let time = await lisLast.findElements(By.css(dataClaccName))
  if(time.length<=0){return true;}else{ time = time[0].getText(); }
  const title = await lisLast.findElement(By.css(titleClaccName)).getText()
  console.log(`今天日期:${date}-來源日期:${time}-日期判斷${time && !(date<=time)}-標題:${title}`)
  if(!(date<=time) || date<time){
    return true;
  }else{
    await showData(driver,date)
  }
}
async function getTrace(driver,row) {
  console.log('start,518,執行內容',row)
  await driver.get(row.storeurl)

  //抓取今天日期
  let date = await timeFn()
  const year = `${date['year']}`
  date = `${date['month']}/${date['day']}`

  //顯示要抓取內容
  await showData(driver,date)

  //抓取內容
  const lis = await driver.findElements(By.css('#listContent .all_job_hover'))
  console.log(`抓取518內容數量:${ lis.length }`)
  for (const [index,li] of lis.entries()) {
    const obj = {}
    // let time = await li.findElement(By.css('span.job__date')).getText()
    let time = await li.findElements(By.css(dataClaccName))
    if(time.length<=0){continue;}
    time = await time[0].getText()
    console.log(`start,518,index:${index}---------------`)
    console.log('今天日期',date,'來源日期',time)
    if(time && !(date<=time)){
      console.log(`end,日期小於今天跳出---------------`);
      break;
    }else if(!time){
      console.log(`來源日期沒有繼續..`);
    }
    obj.time = `${year}-${time.replaceAll('/','-')}`


    // console.log(`滾動到要抓取位置`)
    await driver.actions().scroll(0, 0, 0, 200, li).perform()
    await driver.sleep(4000)

    //來源ID
    obj.crawlerurl_id = row['id']
    obj.name = await li.findElement(By.css('h2.job__title__inner a')).getText()
    obj.namehref = await li.findElement(By.css('h2.job__title__inner a')).getAttribute('href')
    //文章
    let articles = await li.findElements(By.css('p.job__intro'))
    if(articles.length>0){
      articles = await articles[0].getText()
      articles += '，'
      articles += await li.findElement(By.css('p.job__salary')).getText()
      obj.articles = articles
    }

    console.log('目前抓取資料',obj)

    //判斷標題
    const titleKeyWord = row['nokeyword'].split(',').find(item=>obj.name.includes(item))
    if(titleKeyWord){
      console.log(`end,標題排除(${titleKeyWord})跳出----------------`)
      continue;
    }

  
    //判斷標題
    const nameValue = await dbQuery( 'SELECT * from work where name = ?',[obj.name])
    if(nameValue.length>0){
      console.log(`end,標題重複跳出----------------`);
    }else{
      //save
      await dbInsert('work',obj)
      console.log('end,儲存資料庫----------------')
    }
  }
}
async function crawlerBEAR(row) {    
  const driver = await initDrive()
  await driver.manage().window().setRect({ width: 1420, height: 1000 });
  // await login(driver)
  await getTrace(driver,row)
  driver.quit();
}
exports.crawlerBEAR = crawlerBEAR;//讓其他程式在引入時可以使用這個函式

