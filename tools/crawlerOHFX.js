require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./initDrive.js");
const { By, until,Select } = require('selenium-webdriver') // 從套件中取出需要用到的功能
const { dbQuery,dbInsert,dbUpdata,dbDelete,timeFn } = require('./db.js')
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
async function showData(driver,date){
  //console.log(`手動載入`)
  const button = await driver.findElements(By.css('button.b-btn.b-btn--link.js-more-page'))
  if(button.length>0){
    await driver.executeScript("arguments[0].click();", button[0]);
    await driver.sleep(3000)
  }
  //console.log(`抓最後一筆`)
  const lis = await driver.findElements(By.css('#js-job-content article'))
  const lisLast = lis[lis.length-1]
  //console.log(`滾動到要抓取位置`)
  await driver.actions().scroll(0, 0, 0, 0, lisLast).perform()
  await driver.sleep(1000)
  //console.log(`判斷日期`)
  const time = await lisLast.findElement(By.css('h2.b-tit span')).getAttribute("innerHTML")
  console.log(`今天日期:${date}-來源日期:${time}`)
  if(!(date<=time)){
    return true;
  }else{
    await showData(driver,date)
  }
}
async function getTrace(driver,row) {
  // console.log(`跳到該頁`)
  console.log(`getTrace`,row)

  //關鍵字
  const ikeywordInput = await driver.wait(until.elementLocated(By.css('.input-group.input-group--search input.form-control')), 3000)
  ikeywordInput.sendKeys(row['keyword'].replaceAll(',',' '))
  //職務類別
  const jobInput = await driver.wait(until.elementLocated(By.css('.input-group-append+.input-group-append button')), 3000)
  await driver.executeScript("arguments[0].click();", jobInput);
  //資訊
  const informationBtn = await driver.wait(until.elementLocated(By.css('.category-picker__modal-body li:nth-child(7) a')),3000)
  await driver.executeScript("arguments[0].click();", informationBtn);
  await driver.sleep(2000)
  const informationBtn2 = await driver.wait(until.elementLocated(By.css('.category-item.category-item--title input.checkbox-input')),3000)
  await driver.executeScript("arguments[0].click();", informationBtn2);
  //設計
  const designBtn = await driver.wait(until.elementLocated(By.css('.category-picker__modal-body li:nth-child(11) a')),3000)
  await driver.executeScript("arguments[0].click();", designBtn);
  await driver.sleep(2000)
  const designBtn2 = await driver.wait(until.elementLocated(By.css('.category-item.category-item--title input.checkbox-input')),3000)
  await driver.executeScript("arguments[0].click();", designBtn2);
  //確定
  const jobBtn = await driver.wait(until.elementLocated(By.css('.category-picker-btn-primary')),3000)
  await driver.executeScript("arguments[0].click();", jobBtn);
  await driver.sleep(2000)
  //搜尋
  const ikeywordBtn = await driver.wait(until.elementLocated(By.css('button.btn.btn-secondary.btn-block.btn-lg')), 3000)
  await driver.executeScript("arguments[0].click();", ikeywordBtn);
  await driver.sleep(3000)
  //選日期排序
  const selectInput = await driver.wait(until.elementLocated(By.xpath(`//*[@id="js-sort"]`)), 3000)
  const selects = new Select(selectInput)
  await selects.selectByIndex(1)
  await driver.sleep(3000)
  //抓取今天日期
  let date = await timeFn()
  const year = `${date['year']}`
  date = `${date['month']}/${date['day']}`
  //顯示要抓取內容
  await showData(driver,date)
  //抓取內容
  const lis = await driver.findElements(By.css('#js-job-content article'))
  console.log(`抓取104內容數量:${ lis.length }`)
  for (let li of lis) {
    const obj = {}
    // let time = await li.findElement(By.css('h2.b-tit span')).getText()
    const time = await li.findElement(By.css('h2.b-tit span')).getAttribute("innerHTML")
    console.log(`判斷日期:${ date }-${ time }`)
    if(!(date<= time)){console.log(`***日期小於今天跳出***`);break;}
    obj.time = `${year}-${time.replaceAll('/','-')}`

    // console.log(`滾動到要抓取位置`)
    await driver.actions().scroll(0, 0, 0, 0, li).perform()
    await driver.sleep(1000)

    //來源ID
    obj.crawlerurl_id = row['id']
    obj.name = await li.getAttribute('data-job-name')
    obj.namehref = await li.findElement(By.css('h2.b-tit a')).getAttribute('href')
    //文章
    let articles = await li.findElements(By.css('.job-list-item__info.b-clearfix.b-content'))
    if(articles.length>0){
      articles = await articles[0].getText()
      articles += '，'
      articles += await li.findElement(By.css('.job-list-tag.b-content')).getText()
      obj.articles = articles
    }

    console.log('目前抓取資料',obj)

    //判斷標題
    if(row['nokeyword'].split(',').find(item=>obj.name.includes(item))){
      console.log(`標題(${row['nokeyword']})跳出本循環`)
      continue;
    }else if(row['keyword'].split(',').find(item=>obj.name.includes(item))){
      console.log(`標題(${row['keyword']})抓取`)
    }else{
      console.log(`標題(其他)跳出`)
      continue;
    }
  
    //判斷標題
    const nameValue = await dbQuery( 'SELECT * from work where name = ?',[obj.name])
    if(nameValue.length>0){console.log(`***標題重複跳出***`);continue;}

    //save
    await dbInsert('work',obj)
    console.log('end----------------------------------')
  }
}
async function crawlerOHF(row) {    
  const driver = await initDrive();
  await driver.manage().window().setRect({ width: 1420, height: 1200 });
  await login(driver)
  await getTrace(driver,row)
  driver.quit();
}
exports.crawlerOHF = crawlerOHF;//讓其他程式在引入時可以使用這個函式
// module.exports={
//   crawler,
// }
