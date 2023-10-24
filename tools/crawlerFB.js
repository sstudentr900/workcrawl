require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./initDrive.js");
const { By, until } = require('selenium-webdriver') // 從套件中取出需要用到的功能
const { dbQuery,dbInsert,dbUpdata,dbDelete } = require('./db')
async function fbLogin(driver) {
  const fb_username = process.env.FB_USERNAME
  const fb_userpass = process.env.FB_PASSWORD
  const web = 'https://www.facebook.com/login';//我們要前往FB
  try {
    //在這裡要用await確保打開完網頁後才能繼續動作
    await driver.get(web)

    //填入fb登入資訊
    const fb_email_ele = await driver.wait(until.elementLocated(By.xpath(`//*[@id="email"]`)), 3000);
    fb_email_ele.sendKeys(fb_username)
    const fb_pass_ele = await driver.wait(until.elementLocated(By.xpath(`//*[@id="pass"]`)), 3000);
    fb_pass_ele.sendKeys(fb_userpass)

    //抓到登入按鈕然後點擊
    const login_elem = await driver.wait(until.elementLocated(By.xpath(`//*[@id="loginbutton"]`)), 3000)
    login_elem.click()

    //因為登入這件事情要等server回應，你直接跳轉粉絲專頁會導致登入失敗
    //以登入後才會出現的元件作為判斷登入與否的依據
    await driver.wait(until.elementLocated(By.xpath(`//*[contains(@id,":R6kmpaj9emhpapd5aq:")]`)), 5000)
    return true;
  } catch (e) {
    console.error('登入失敗',e)
    return false;
  }
}
async function fbGetTime(driver,obj,itemTimeCssName){
  const timeLink = await obj.findElements(By.css(`${itemTimeCssName} use`))
  let timeText = ''
  if(timeLink.length>0){
    let timeId= await timeLink[0].getAttribute("xlink:href");
    timeText = await driver.findElement(By.css(`${timeId}`)).getAttribute("innerHTML");
    if(timeText.includes('use')){
      timeId = await driver.findElement(By.css(`${timeId} use`)).getAttribute("xlink:href");
      timeText = await driver.findElement(By.css(`${timeId}`)).getAttribute("innerHTML");
    }
    console.log(`顯示可抓資料(svg):${timeText}`)
  }else{
    timeText = await obj.findElement(By.css(`${itemTimeCssName}`)).getText()
    console.log(`顯示可抓資料(text):${timeText}`)
  }
  return timeText;
}
async function fbShowData(driver,number,itemsCssName,itemTimeCssName){
  // console.log(`顯示資料`)
  const itemFirst = await driver.findElement(By.css(itemsCssName))
  const itemFirstY = Math.round((await itemFirst.getRect()).y) //該DIV的高
  const scrollHeight = itemFirstY+number
  // console.log(scrollHeight)
  await driver.actions().scroll(0, 0, 0, scrollHeight).perform()
  await driver.sleep(1000)
  
  //抓最後一筆
  const item = await driver.findElements(By.css(itemsCssName))
  const itemLast = item[item.length-1]
  //抓最後一筆時間
  // const timeLink=  await itemLast.findElement(By.css(`${itemTimeCssName} use`))
  // let timeId= await timeLink.getAttribute("xlink:href");
  // await driver.sleep(1000)
  // timeId = await driver.findElement(By.css(`${timeId} use`)).getAttribute("xlink:href");
  // // await driver.sleep(1000)
  // let timeText = await driver.findElement(By.css(`${timeId}`)).getAttribute("innerHTML");
  // console.log(`timeText:${timeText},${timeText.includes('日')},${timeText.includes('天')}`)
  // if(timeText.includes('日') || timeText.includes('天')){
  const timeText = await fbGetTime(driver,itemLast,itemTimeCssName)
  // console.log(`fbShowData,顯示日期:${timeText},${timeText.includes('日')},${timeText.includes('天')}`)
  console.log(`fbShowData,顯示日期:${timeText}`)
  // if(item.length>5){
  //   console.log('fbShowData_大於5個跳出')
  //   return true;
  // }
  if(timeText.includes('日') || timeText.includes('天')){
    return true;
  }else{
    await fbShowData(driver,number,itemsCssName,itemTimeCssName)
  }
}
async function fbSelectNewPost(driver) {
  // console.log(`選擇新貼文`)
  //選擇相關
  const newBtn = await driver.findElement(By.css('.x19f6ikt.x169t7cy.xsag5q8.x1swvt13 .x9f619.x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.x1qughib.x6s0dn4.xozqiw3.x1q0g3np.xzt5al7'))
  //滾動相關位置
  await driver.actions().scroll(0, 0, 0, 0, newBtn).perform()
  await driver.sleep(1000)
  //點擊相關
  await driver.executeScript("arguments[0].click();", newBtn);
  await driver.sleep(2000)
  //選擇新貼文
  const newPosts = await driver.findElements(By.css('.x78zum5.xdt5ytf.x1iyjqo2.x1n2onr6 .x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.xe8uvvx.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.xjyslct.x9f619.x1ypdohk.x78zum5.x1q0g3np.x2lah0s.xnqzcj9.x1gh759c.xdj266r.xat24cr.x1344otq.x1de53dj.xz9dl7a.xsag5q8.x1n2onr6.x16tdsg8.x1ja2u2z'))
  // console.log('newPosts',newPosts.length)
  if(newPosts.length==4){
    //點擊 新商品動態
    await driver.executeScript("arguments[0].click();", newPosts[1]);
  }else if(newPosts.length==3){
    //點擊新貼文
    await driver.executeScript("arguments[0].click();", newPosts[2]);
  }
  await driver.sleep(2000)
}
async function fbGetData(driver,itemsCssName,itemTimeCssName,json) {
  // console.log(`抓取fb資料`)
  const arrays = []
  const items = await driver.findElements(By.css(itemsCssName))
  for (const item of items) {
    const obj = {}
    console.log(`一定滾動到要抓取位置---------------------------`)
    await driver.actions().scroll(0, 0, 0, 0, item).perform()
    await driver.sleep(2000)

     //console.log(`時間為日或天跳出`)
    const timeText = await fbGetTime(driver,item,itemTimeCssName)
    if(timeText.includes('日') || timeText.includes('天')){ console.log(`時間為日或天跳出:${timeText}`);break;}

    // console.log(`名子`)
    const nameObj= await item.findElements(By.css('h3.x1heor9g.x1qlqyl8.x1pd3egz.x1a2a7pz.x1gslohp.x1yc453h .x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f'));
    if(nameObj.length>0){
      obj.name= await nameObj[0].getText();
      // obj.name= await nameObj.findElement(By.css('strong span')).getText();
      obj.namehref= await nameObj[0].getAttribute('href');
      console.log(`名子:${JSON.stringify(obj.name)}`)
      console.log(`名子href:${obj.namehref}`)
    }else{
      console.log(`找不到名子跳出`)
    }

    // console.log(`時間`)
    const timeLink= await item.findElement(By.css(itemTimeCssName))
    // const time= await timeLink.getText()
    obj.timeurl= await timeLink.getAttribute("href");
    const dt= new Date();
    obj.time= `${dt.getFullYear()}-${('0'+(dt.getMonth()+1)).slice(-2)}-${('0'+dt.getDate()).slice(-2)}`
    console.log(`時間:${obj.time}`)
    console.log(`時間_url:${obj.timeurl}`)

    // console.log(`圖片`)
    // x1ey2m1c xds687c x5yr21d x10l6tqk x17qophe x13vifvy xh8yej3
    // x1ey2m1c xds687c x5yr21d x10l6tqk x17qophe x13vifvy xh8yej3 xl1xv1r
    const imgsrcdivs= await item.findElements(By.css('img.x1ey2m1c.xds687c.x5yr21d.x10l6tqk.x17qophe.x13vifvy.xh8yej3'));
    if(imgsrcdivs.length > 0){
      const img = [];
      for (const imgsrcdiv of imgsrcdivs) {
        img.push(await imgsrcdiv.getAttribute("src"))
      }
      obj.imgsrc= img.join(',')
      console.log(`圖片:${obj.imgsrc}`)
    }

    // console.log(`頭圖`)
    const headimgsrc= await item.findElement(By.css('svg.x3ajldb image')).getAttribute("xlink:href");
    console.log(`頭圖:${headimgsrc}`)
    obj.headimgsrc= headimgsrc

    //console.log(`文章`)
    let articlesTexts=''
    //<div class="" dir="auto">
    // x1iorvi4 x1pi30zi x1swvt13 xjkvuk6
    // x1swvt13 x1pi30zi xexx8yu x18d9i69
    // x1swvt13 x1pi30zi xexx8yu x18d9i69
    const articlesObjs = await item.findElements(By.css('.x1iorvi4.x1pi30zi'))
    if(!articlesTexts && articlesObjs.length > 0){
      // console.log(`文章A:${articlesObjs.length}`)
      const articlesMore = await articlesObjs[0].findElements(By.xpath("//div[contains(text(),'顯示更多')]"))
      if(articlesMore.length>0){
        // console.log(`文章A_顯示更多:${articlesMore.length}`)
        await driver.executeScript("arguments[0].click();", articlesMore[0]);
      }
      const articlesMore2 = await articlesObjs[0].findElements(By.xpath("//div[contains(text(),'查看更多')]"))
      if(articlesMore2.length>0){
        // console.log(`文章A_查看更多:${articlesMore2.length}`)
        await driver.executeScript("arguments[0].click();", articlesMore2[0]);
      }
      // await driver.sleep(3000)
      articlesTexts = await articlesObjs[0].getText()
    }
    // x1swvt13 x1pi30zi
    const articlesObjs2 = await item.findElements(By.css('.x1swvt13.x1pi30zi.xexx8yu.x18d9i69'))
    if( !articlesTexts && articlesObjs2.length > 0){
      // console.log(`文章B:${articlesObjs2.length}`)
      articlesTexts = await item.findElement(By.css('.x1swvt13.x1pi30zi.xexx8yu.x18d9i69')).getText()
    }
    const articlesObjs3 = await item.findElements(By.css('.x5yr21d.xyqdw3p'))
    if(!articlesTexts && articlesObjs3.length > 0){
      // console.log(`文章B:${articlesObjs3.length}`)
      articlesTexts = await item.findElement(By.css('.x5yr21d.xyqdw3p')).getText()
    }
    obj.articles = articlesTexts
    console.log(`文章:${obj.articles}`)
    //console.log(`文章抓取發案,誠徵`)

  
    // if(articlesTexts.includes('發案') || articlesTexts.includes('誠徵') || articlesTexts.includes('徵委託')){
    if(json['keyword'].split(',').find(item=>articlesTexts.includes(item))){
      console.log(`文章(${json['keyword']})抓取`)
    // }else if(!articlesTexts || articlesTexts.includes('徵友') || articlesTexts.includes('接案') || articlesTexts.includes('接委') || articlesTexts.includes('無償') || articlesTexts.includes('換圖') || articlesTexts.includes('公告')){
    }else if(json['nokeyword'].split(',').find(item=>articlesTexts.includes(item))){
      console.log(`文章(${json['nokeyword']})跳出`)
      continue;
    }else{
      console.log(`文章(其他)抓取`)
      // continue;
    }


    //push arrays
    // if(arrays.length>5){
    //   console.log('fbGetData_大於5個跳出')
    //   break;
    // }
    arrays.push(obj)
  }
  // console.log('fbGetData_array',arrays)
  return arrays;
}
async function fbGetTrace(driver,row) {
  // console.log(`跳到該頁`)
  console.log(`fbGetTrace,row`,row)
  //來源ID
  const crawlerurl_id = row['id']
  // console.log(`類別名`)
  const itemsCssName = '.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z';
  // x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g xt0b8zv xo1l8bm
  const itemTimeCssName = '.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv.xo1l8bm';

  await driver.get(row['storeurl'])
  // const url = 'https://www.facebook.com/groups/239168157628070'
  // await driver.get(url)
  await driver.sleep(2000)
  // console.log(`選擇新貼文`)
  await fbSelectNewPost(driver)
  // console.log(`顯示fb資料`)
  await fbShowData(driver,200,itemsCssName,itemTimeCssName)
  // console.log(`抓取fb資料`)
  const arrays = await fbGetData(driver,itemsCssName,itemTimeCssName,row)
  console.log('fbGetTrace_抓取資料數量',arrays.length)
  if(!arrays.length){return false;}
  // console.log(`存fb資料`)
  for (const array of arrays) {
    if(array['articles']){
      const articles = await dbQuery( 'SELECT * from work where articles = ?',[array['articles']])
      if(articles.length>0){
        // console.log(`fbGetTrace文章重複跳出`);
        continue;
      }
    }
    array['crawlerurl_id'] = crawlerurl_id
    await dbInsert('work',array)
  }
}
async function crawlerFB(row) {    
  const driver = await initDrive();
  await fbLogin(driver)
  await fbGetTrace(driver,row)
  // const rows = await dbQuery( 'SELECT * from crawlerurl where deletes = ?',['n'])
  // if(!rows){console.log(`crawlerFB沒有資料跳出`);return false;}
  // for (const row of rows) {
  //   if(row['storeurl'].includes('facebook')){
  //     await fbGetTrace(driver,row)
  //   }else{
  //     console.log('crawlerFB_url error',row)
  //   }
  // }
  // await fbGetTrace(driver,rows[0])
  driver.quit();
}
exports.crawlerFB = crawlerFB;//讓其他程式在引入時可以使用這個函式
// module.exports={
//   crawlerFB,
// }
