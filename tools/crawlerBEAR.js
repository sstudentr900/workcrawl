require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./initDrive.js");
const { By, until,Select } = require('selenium-webdriver') // 從套件中取出需要用到的功能
const { dbQuery,dbInsert,dbUpdata,dbDelete,timeFn } = require('./db.js')
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
  const lis = await driver.findElements(By.css('#listContent .all_job_hover'))
  const lisLast = lis[lis.length-1]
  //console.log(`滾動到要抓取位置`)
  await driver.actions().scroll(0, 0, 0, 0, lisLast).perform()
  await driver.sleep(1000)
  //console.log(`判斷日期`)
  const time = await lisLast.findElement(By.css('span.job__date')).getText()
  // console.log(`今天日期:${date}-來源日期:${time}-${!(Number(date.replaceAll('/',''))<=Number(time.replaceAll('/','')))}`)
  console.log(`今天日期:${date}-來源日期:${time}-${!(date<=time)}`)
  if(!(date<=time) || date<time){
    return true;
  }else{
    await showData(driver,date)
  }
}
async function getTrace(driver,row) {
  // console.log(`跳到該頁`)
  console.log(`getTrace`,row)
  if(row['keyword']=='論件'){
    //找論件計酬
    await driver.get(`https://www.518.com.tw/job-index-P-1.html?gtm_ls=1&ab=2027001,2027003,2027004,2024001,2024002&orderType=1&orderField=8&ak=86`)
  }else{
    //找關鍵字(外包,遠端)
    // await driver.get(`https://www.518.com.tw/job-index-P-1.html?gtm_ls=1&ab=2027001,2027003,2027004,2024001,2024002&orderType=1&orderField=8&ad=${row['keyword']}`)
    await driver.get(`https://www.518.com.tw/job-index-P-1.html?gtm_ls=1&ab=2027001,2027003,2027004,2024001,2024002&orderType=1&orderField=8&ad=外包%20遠端`)
  }



  //抓取今天日期
  let date = await timeFn()
  const year = `${date['year']}`
  date = `${date['month']}/${date['day']}`
  //顯示要抓取內容
  await showData(driver,date)
  //抓取內容
  const lis = await driver.findElements(By.css('#listContent .all_job_hover'))
  console.log(`error抓取內容數量:${ lis.length }`)
  for (let li of lis) {
    const obj = {}
    // let time = await li.findElement(By.css('span.job__date')).getText()
    let time = await li.findElements(By.css('span.job__date'))
    if(time.length<=0){continue;}
    time = await time[0].getText()
    console.log(`判斷日期:${ date }-${ time }`)
    if(!(date<=time) || date<time){console.log(`***日期小於今天跳出***`);break;}
    obj.time = `${year}-${time.replaceAll('/','-')}`


    // console.log(`滾動到要抓取位置`)
    await driver.actions().scroll(0, 0, 0, 0, li).perform()
    await driver.sleep(1000)

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
    if(row['keyword'].split(',').find(item=>obj.name.includes(item))){
      console.log(`標題(${row['keyword']})抓取`)
    }else if(row['nokeyword'].split(',').find(item=>obj.name.includes(item))){
      console.log(`標題(${row['nokeyword']})跳出`)
      continue;
    }else{
      console.log(`標題(其他)跳出`)
      continue;
    }
  
    //判斷標題
    const nameValue = await dbQuery( 'SELECT * from work where name = ?',[obj.name])
    if(nameValue.length>0){console.log(`標題重複跳出`);continue;}

    //save
    await dbInsert('work',obj)
    console.log('end----------------------------------')
  }
}
async function crawlerBEAR(row) {    
  const driver = await initDrive()
  await driver.manage().window().setRect({ width: 1420, height: 1200 });
  // await login(driver)
  await getTrace(driver,row)
  driver.quit();
}
exports.crawlerBEAR = crawlerBEAR;//讓其他程式在引入時可以使用這個函式

