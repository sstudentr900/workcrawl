//yes
require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./initDrive.js");
const { By, until,Select } = require('selenium-webdriver') // 從套件中取出需要用到的功能
const { dbQuery,dbInsert,dbUpdata,dbDelete,timeFn } = require('./db.js')
const itemsClassName = '.job_refer_list .Job_opening';//欄
const dateClaccName = '.Job_opening_item_date .d-flex div+div';//日期
const titleClaccName = '.Job_opening_item_title h5 a';//標題
const articlesClaccName = '.Job_opening_item_title h6 a';//內容
let limit = 0 
async function showData(driver,date){
  const lis = await driver.findElements(By.css(itemsClassName))
  const lisLast = lis[lis.length-1]
  // console.log(`滾動到要抓取位置`,lisLast)
  await driver.actions().scroll(0, 0, 0, 200, lisLast).perform()
  await driver.sleep(2000)

  let time = await lisLast.findElement(By.css(dateClaccName)).getText()
  time = time.replace(".", "/")
  const title = await lisLast.findElement(By.css(titleClaccName)).getText()
  console.log(`今天日期:${date}-來源日期:${time}-日期判斷${time && !(date<=time)}-標題:${title}`)
  if(!(date<=time)){
    if(limit>=2){
      return true;
    }else{
      limit++;
      await showData(driver,date)
    }
  }else{
    await showData(driver,date)
  }
}
async function getTrace(driver,row) {
  console.log('start,yes,執行內容',row)
  await driver.get(row.storeurl)

  //抓取今天日期
  let date = await timeFn()
  const year = `${date['year']}`
  date = `${date['month']}/${date['day']}`

  //顯示要抓取內容
  await showData(driver,date)

  //抓取內容
  limit = 0
  const lis = await driver.findElements(By.css(itemsClassName))
  console.log(`抓取yes內容數量:${ lis.length }`)
  for (const [index,li] of lis.entries()) {
    const obj = {}

    // console.log(`滾動到要抓取位置`)
    await driver.actions().scroll(0, 0, 0, 200, li).perform()
    await driver.sleep(4000)

    //日期
    let time = await li.findElements(By.css(dateClaccName))
    if(time.length<=0){continue;}
    time = await time[0].getText()
    time = time.replace(".", "/")
    console.log('start,yes,index:',index,'今天日期',date,'來源日期',time,'---------------')
    if(!(date<=time)){
      if(limit>=2){
        console.log(`end,日期小於今天跳出---------------`);
        break;
      }else{
        limit++;
      }
    }
    obj.time = `${year}-${time.replaceAll('/','-')}`

    //來源ID
    obj.crawlerurl_id = row['id']

    //標題
    obj.name = await li.findElement(By.css(titleClaccName)).getText()
    obj.namehref = await li.findElement(By.css(titleClaccName)).getAttribute('href')

    //文章
    obj.articles = await li.findElement(By.css(articlesClaccName)).getText()

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
async function crawlerYES(row) {    
  const driver = await initDrive()
  await driver.manage().window().setRect({ width: 1420, height: 1000 });
  // await login(driver)
  await getTrace(driver,row)
  driver.quit();
}
exports.crawlerYES = crawlerYES;//讓其他程式在引入時可以使用這個函式

