//1111
require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./initDrive.js");
const { By, until,Key,Select } = require('selenium-webdriver') // 從套件中取出需要用到的功能
const { dbQuery,dbInsert,dbUpdata,dbDelete,timeFn } = require('./db.js')
const itemsClassName = '.search-content .job-card';//欄
const dataClaccName = '.job-card__content .text-gray-600';//日期
const titleClassName = 'h2.job-card__title'
let nowTitle = '';
let nowdate = '';
async function login(driver) {
  const username = process.env.OTE_USERNAME
  const userpass = process.env.OTE_PASSWORD
  const web = 'https://www.1111.com.tw/login/index?ReturnUrl=https%3A%2F%2Fwww.1111.com.tw%2Fsearch%2Fjob';
  await driver.get(web)

  //填入登入資訊
  const accountInput = await driver.wait(until.elementLocated(By.xpath(`//*[@id="id"]`)), 3000);
  accountInput.sendKeys( username )
  const passwordInput = await driver.wait(until.elementLocated(By.xpath(`//*[@id="pass"]`)), 3000);
  passwordInput.sendKeys( userpass )

  //抓到登入按鈕然後點擊
  const login_elem = await driver.wait(until.elementLocated(By.xpath(`//*[@id="smlogin"]`)), 3000)
  login_elem.click()
  await driver.sleep(3000)
}
async function nowDateFn() { 
  //今天日期在減3天
  // const date = await timeFn({day:-3})
  // nowYear = String(date['year'])
  // nowdate = `${String(date['month']).padStart(2,'0')}/${String(date['day']).padStart(2,'0')}`
  // console.log(`今天日期:${nowdate}`)
  const date = await timeFn({day:-3})
  nowdate = date['date'].replaceAll('-','/')
}
async function showData(driver){
  //console.log(`抓最後一筆`)
  const lis = await driver.findElements(By.css(itemsClassName))
  const lisLast = lis[lis.length-1]
  // console.log(`滾動到要抓取位置`,lisLast)
  //以lisLast為目標往下捲動200
  await driver.actions().scroll(0, 0, 0, 200, lisLast).perform()
  await driver.sleep(1000)
  //console.log(`判斷日期`)
  let time = await lisLast.findElement(By.css(dataClaccName)).getText()
  time = time.replace(/\s*\/\s*/g, "/")
  // const title = await lisLast.findElement(By.css('.title h2')).getText()
  // console.log(`今天日期:${date}-來源日期:${time}-日期判斷${time && !(date<=time)}-標題:${title}`)
  // if(time && !(date<=time)){
  //   return true;
  // }else{
  //   await showData(driver,date)
  // }
  const title = await lisLast.findElement(By.css(titleClassName)).getText()
  if(nowdate<=time){
    if( nowTitle == title){
      console.log(`來源日期:${time}-日期判斷:${nowdate<=time}-上個標題:${nowTitle}-標題:${title}-標題一-跳出`)
      nowTitle = ''
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
  // console.log(`跳到該頁`)
  console.log('start,1111,執行內容',row)
  await driver.get(row.storeurl)

  // console.log(`先滾一點`)
  await driver.actions().scroll(0, 100, 0, 500).perform()

  //抓取今天日期
  // let date = await timeFn()
  // date = date['date'].replaceAll('-','/')

  //顯示要抓取內容
  await showData(driver)

  //抓取內容
  const lis = await driver.findElements(By.css(itemsClassName))
  console.log(`lis數量:${ lis.length-1 }`)
  for (const [index,li] of lis.entries()) {
    const obj = {}
    let time = await li.findElement(By.css(dataClaccName)).getText()
    time = time.replace(/\s*\/\s*/g, "/")
    console.log(`start,1111,lis:${ lis.length-1 },index:${index}-----------`)
    console.log('今天日期',nowdate,'來源日期',time)
    if(time && !(nowdate<= time)){
      console.log(`end,日期小於${nowdate}跳出--------------`);
      break;
    }else if(!time){
      console.log(`來源日期沒有繼續..`);
    }
    
    obj.time = time.replaceAll('/','-')

    // console.log(`滾動到要抓取位置`)
    await driver.actions().scroll(0, 0, 0, 0, li).perform()
    await driver.sleep(1000)

    //來源ID
    obj.crawlerurl_id = row['id']
    //標題
    obj.name = await li.findElement(By.css(titleClassName)).getText()
    //路徑
    // obj.namehref = 'https://www.1111.com.tw/'+await li.findElement(By.css('.title a')).getAttribute('href')
    obj.namehref = await li.findElement(By.css('.job-card__content a')).getAttribute('href')
    //文章
    obj.articles = await li.findElement(By.css('.line-clamp-2')).getText()

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
async function crawler(driver,row) {    
  //const driver = await initDrive()
  //await driver.manage().window().setRect({ width: 1420, height: 1000 });
  // await login(driver)
  await nowDateFn()
  await getTrace(driver,row)
  //driver.quit();
}
exports.crawlerOTE = crawler;//讓其他程式在引入時可以使用這個函式

