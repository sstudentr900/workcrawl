require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./initDrive.js");
const { By, until,Key,Select } = require('selenium-webdriver') // 從套件中取出需要用到的功能
const { dbQuery,dbInsert,dbUpdata,dbDelete,timeFn } = require('./db.js')
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
async function showData(driver,date){
  //console.log(`抓最後一筆`)
  const lis = await driver.findElements(By.css('.item__job.job_item'))
  const lisLast = lis[lis.length-1]
  //console.log(`滾動到要抓取位置`)
  await driver.actions().scroll(0, 0, 0, 0, lisLast).perform()
  await driver.sleep(1000)
  //console.log(`判斷日期`)
  const time = await lisLast.findElement(By.css('.item_data small.text-muted.job_item_date')).getText()
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

  //搜尋
  const serch = await driver.wait(until.elementLocated(By.css('.notification-topbar-button.d-flex')), 3000)
  await driver.executeScript("arguments[0].click();", serch);
  //關鍵字
  const ikeywordInput = await driver.wait(until.elementLocated(By.css('._job_ks.UISearchbarInput')), 3000)
  //關鍵字確定
  // ikeywordInput.sendKeys(row['keyword'],Key.RETURN)
  ikeywordInput.sendKeys('外包',Key.RETURN)
  await driver.sleep(2000)
  //進階搜尋
  const notifiBtn = await driver.wait(until.elementLocated(By.css('.config .notification-topbar-button.d-flex a')), 3000)
  await driver.executeScript("arguments[0].click();", notifiBtn);
  //職務
  const jobInput = await driver.wait(until.elementLocated(By.css('input.fm-ct._job_d0')), 3000)
  await driver.executeScript("arguments[0].click();", jobInput);
  //資訊
  const informationBtn = await driver.wait(until.elementLocated(By.css('.tcode-col-1.tcode-md-3.tcode__panel-item:nth-child(5)')),3000)
  await driver.executeScript("arguments[0].click();", informationBtn);
  await driver.sleep(2000)
  const informationBtn2s = await driver.findElements(By.css('.tcode__panel.tcode__panel--active .tcode__panel-item.m100'))
  for (let informationBtn2 of informationBtn2s) {
    const input = informationBtn2.findElement(By.css('input'))
    await driver.executeScript("arguments[0].click();", input);
    await driver.sleep(2000)
  }
  //設計
  const designBtn = await driver.wait(until.elementLocated(By.css('.tcode-col-1.tcode-md-3.tcode__panel-item:nth-child(14)')),3000)
  await driver.executeScript("arguments[0].click();", designBtn);
  await driver.sleep(2000)
  const designBtn2s = await driver.findElements(By.css('.tcode__panel.tcode__panel--active .tcode__panel-item.m100'))
  for (let designBtn2 of designBtn2s) {
    const input = designBtn2.findElement(By.css('input'))
    await driver.executeScript("arguments[0].click();", input);
    await driver.sleep(2000)
  }

  //確定
  const jobBtn = await driver.wait(until.elementLocated(By.css('.tcode__btn.tcode__btn-outline-primary.tcode__btn-enter.tcode__btn--active')),3000)
  await driver.executeScript("arguments[0].click();", jobBtn);
  await driver.sleep(2000)
  const jobBtn2 = await driver.wait(until.elementLocated(By.css('.fm-bt.bt-oli-pm.condition-btn.CustomDialog__footer-btn-search')),3000)
  await driver.executeScript("arguments[0].click();", jobBtn2);
  await driver.sleep(4000)
  //抓取今天日期
  let date = await timeFn()
  date = date['date'].replaceAll('-','/')
  //顯示要抓取內容
  await showData(driver,date)
  //抓取內容
  const lis = await driver.findElements(By.css('.item__job.job_item'))
  console.log(`抓取1111內容數量:${ lis.length }`)
  for (let li of lis) {
    const obj = {}
    const time = await li.findElement(By.css('.item_data small.text-muted.job_item_date')).getText()
    console.log(`判斷日期:${ date }-${ time }`)
    if(!(date<= time)){console.log(`***日期小於今天跳出***`);break;}
    obj.time = time.replaceAll('/','-')

    // console.log(`滾動到要抓取位置`)
    await driver.actions().scroll(0, 0, 0, 0, li).perform()
    await driver.sleep(1000)

    //來源ID
    obj.crawlerurl_id = row['id']
    obj.name = await li.findElement(By.css('.job_item_info h5.card-title.title_6')).getText()
    // let namehref = 'https://www.1111.com.tw'
    obj.namehref = await li.findElement(By.css('.job_item_info>a')).getAttribute('href')
    // obj.namehref = namehref
    //文章
    let articles = await li.findElements(By.css('p.card-text.job_item_description.body_4'))
    if(articles.length>0){
      articles = await articles[0].getText()
      articles += '，'
      articles += await li.findElement(By.css('div.job_item_detail.d-flex.body_4')).getText()
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
    if(nameValue.length>0){console.log(`標題重複跳出`);continue;}

    //save
    await dbInsert('work',obj)
    console.log('end----------------------------------')
  }
}
async function crawler(row) {    
  const driver = await initDrive()
  await driver.manage().window().setRect({width: 1200, height: 880});
  await login(driver)
  await getTrace(driver,row)
  driver.quit();
}
exports.crawlerOTE = crawler;//讓其他程式在引入時可以使用這個函式

