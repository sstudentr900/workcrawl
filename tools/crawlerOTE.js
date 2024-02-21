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
  console.log('getTrace 執行內容',row)
  if(row['keyword']=='論件'){
    // await driver.get(`https://www.1111.com.tw/search/job?col=da&d0=140100%2C140200%2C140300%2C140400%2C140500%2C140600%2C140700%2C140800%2C230100&fks=${row['keyword']}&ks=${row['keyword']}&page=1&sort=desc`)
    await driver.get(`https://www.1111.com.tw/search/job?col=da&d0=140100%2C140200%2C140300%2C140400%2C140500%2C140600%2C140700%2C140800%2C230100&ks=論件&page=1&sort=desc`)
  }else{
    await driver.get(`https://www.1111.com.tw/search/job?col=da&d0=140100%2C140200%2C140300%2C140400%2C140500%2C140600%2C140700%2C140800%2C230100&ks=外包%2C遠端%2C兼職&&page=1&sort=desc`)
  }
  
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
    obj.namehref = await li.findElement(By.css('.job_item_info>a')).getAttribute('href')
    //文章
    let articles = await li.findElements(By.css('p.card-text.job_item_description.body_4'))
    if(articles.length>0){
      articles = await articles[0].getText()
      articles += '，'
      articles += await li.findElement(By.css('div.job_item_detail.d-flex.body_4')).getText()
      obj.articles = articles
    }
    //論件
    const essay = await li.findElement(By.css('.job_item_detail_salary.ml-3.font-weight-style.digit_6')).getText()

    console.log('目前抓取資料',obj)

    //判斷標題
    if(row['nokeyword'].split(',').find(item=>obj.name.includes(item))){
      console.log(`標題排除(${row['nokeyword']})跳出本循環`)
      continue;
    }else if(row['keyword'].split(',').find(item=>obj.name.includes(item) || essay.includes('論件計酬'))){
      console.log(`標題關鍵字有(${row['keyword']})或${essay}是論件計酬抓取`)
    }else{
      console.log(`標題查無關鍵字-跳出`)
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
  await driver.manage().window().setRect({ width: 1420, height: 1200 });
  // await login(driver)
  await getTrace(driver,row)
  driver.quit();
}
exports.crawlerOTE = crawler;//讓其他程式在引入時可以使用這個函式

