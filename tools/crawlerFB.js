//fb
require('dotenv').config(); //載入.env環境檔
const { initDrive } = require("./initDrive.js");
const { By, until } = require('selenium-webdriver') // 從套件中取出需要用到的功能
const { dbQuery,dbInsert,dbUpdata,dbDelete } = require('./db')
const { createWorker, OEM, PSM } = require('tesseract.js');  //文本識別
const fs = require('fs');
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
async function fbGetTime(driver,obj,itemTimeCssName){
  const timeLink = await obj.findElements(By.css(`${itemTimeCssName}`))
  const timeLink_use = await obj.findElements(By.css(`${itemTimeCssName} use`))
  const timeLink_canvas = await obj.findElements(By.css(`${itemTimeCssName} canvas`))
  let timeText = ''
  // console.log('fbGetTime_length',timeLink.length)
  // console.log( 'itemTimeCssName',await obj.findElements(By.css(`${itemTimeCssName}`)) )
  if(timeLink_use.length>0){
    let timeId= await timeLink_use[0].getAttribute("xlink:href");
    timeText = await driver.findElement(By.css(`${timeId}`)).getAttribute("innerHTML");
    // console.log(`fbGetTime_length_use:${timeText.includes('use')}`)
    if(timeText.includes('use')){
      timeId = await driver.findElement(By.css(`${timeId} use`)).getAttribute("xlink:href");
      timeText = await driver.findElement(By.css(`${timeId}`)).getAttribute("innerHTML");
    }
    // console.log(`顯示可抓資料(svg):${timeText}`)
  }else if(timeLink_canvas.length>0){
    // 等待元素可见
    // const element = await driver.wait(until.elementIsVisible(driver.findElement(By.css(`${itemTimeCssName} canvas`))), 10000);
    await driver.sleep(1000)
    //获取页面的截图
    const base64CanvasScreenshot = await timeLink_canvas[0].takeScreenshot();
    // 保存 Canvas 的截图为文件
    fs.writeFileSync('date.png', base64CanvasScreenshot, 'base64');
    const worker = await createWorker('chi_sim');
    const ret = await worker.recognize('date.png');
    // console.log(ret.data.text);
    timeText = ret.data.text;
    await worker.terminate();
  }else if(timeLink.length>0){
    timeText = await obj.findElement(By.css(`${itemTimeCssName}`)).getAttribute("textContent");
  }else{
    console.log('fbGetTime,找不到時間')
    timeText = false; 
  }
  return timeText;
}
async function fbShowData(driver,number,itemsCssName,itemTimeCssName){
  // console.log(`顯示資料`)
  // const itemFirst = await driver.findElement(By.css(itemsCssName))
  // const itemFirstY = Math.round((await itemFirst.getRect()).y) //該DIV的高
  // const scrollHeight = itemFirstY+number
  // // console.log(scrollHeight)
  // await driver.actions().scroll(0, 0, 0, scrollHeight).perform()
  // await driver.sleep(1000)
  
  //抓最後一筆
  const item = await driver.findElements(By.css(itemsCssName))
  const itemLast = item[item.length-1]
  if(!itemLast){
    console.log(`fbShowData,抓不到最後一筆:${itemLast}`)
    return true;
  }

  //console.log(`滾動到最後一筆位置`)
  await driver.actions().scroll(0, 0, 0, 50, itemLast).perform()
  await driver.sleep(2000)

  //抓最後一筆時間
  const timeText = await fbGetTime(driver,itemLast,itemTimeCssName)
  console.log(`fbShowData,顯示日期:${timeText}`)

  if(!timeText){
    console.log(`fbShowData,timeText:${timeText}`)
    return true;
  }else if(timeText.includes('日') || timeText.includes('天')){
    console.log(`fbShowData,有日或天:${timeText}`)
    return true;
  }else{
    await fbShowData(driver,number,itemsCssName,itemTimeCssName)
  }
}
async function fbGetData(driver,itemsCssName,itemTimeCssName,json) {
  // console.log(`抓取fb資料`)
  //const arrays = []
  const items = await driver.findElements(By.css(itemsCssName))
  let dayNumber = 0
  console.log(`fbGetData,目前內容數量:${ items.length }`)
  //for (const item of items) {
  for (const [index,item] of items.entries()) {
    const obj = {}
    console.log(`start,fb,id:${json['id']},index:${index},totle:${items.length}----------------------------------------------------`)
    //console.log(`一定滾動到要抓取位置`)
    await driver.actions().scroll(0, 0, 0, 0, item).perform()
    await driver.sleep(4000)


    //console.log(`時間為日或天跳出`)
    const timeText = await fbGetTime(driver,item,itemTimeCssName)
    if(!timeText){
      console.log(`end,找不到日期跳出本循環------------------------------------------------`);
      continue;
    }
    else if(timeText.includes('日') || timeText.includes('天')){ 
      if(dayNumber>1){
        console.log(`end,時間日或天2次以上跳出迴圈:${timeText}-------------------------------------------`);
        break;
      }
      dayNumber++
    }
    console.log(`日期:${timeText}`)


    // console.log(`名子`)
    obj.name= '匿名成員'
    obj.namehref= '';
    const nameObj= await item.findElements(By.css('h2 a'));
    const nameObj2= await item.findElements(By.css('h3 a'));
    if(nameObj.length>0){
      //console.log(await item.findElement(By.css('a.x1i10hfl.xjbqb8w span')).getText())
      obj.name= await nameObj[0].findElement(By.css('span')).getText()
      obj.namehref= await nameObj[0].getAttribute('href');
    }else if(nameObj2.length>0){
      obj.name= await nameObj2[0].findElement(By.css('span')).getText()
      obj.namehref= await nameObj2[0].getAttribute('href');
    }
    console.log(`名子:${obj.name}`)
    console.log(`名子href:${obj.namehref}`)


    // console.log(`時間`)
    obj.time= ''
    obj.timeurl= ''
    const timeLink= await item.findElements(By.css(itemTimeCssName))
    if(timeLink.length > 0){
      obj.timeurl= await timeLink[0].getAttribute("href");
      const dt= new Date();
      obj.time= `${dt.getFullYear()}-${('0'+(dt.getMonth()+1)).slice(-2)}-${('0'+dt.getDate()).slice(-2)}`
    }
    console.log(`時間:${obj.time}`)
    console.log(`時間_url:${obj.timeurl}`)


    // console.log(`圖片`)
    obj.imgsrc=''
    const imgsrcdivs= await item.findElements(By.css('img.x1ey2m1c.xds687c.x5yr21d.x10l6tqk.x17qophe.x13vifvy.xh8yej3'));
    if(imgsrcdivs.length > 0){
      const img = [];
      for (const imgsrcdiv of imgsrcdivs) {
        img.push(await imgsrcdiv.getAttribute("src"))
      }
      obj.imgsrc= img.join(',')
    }
    console.log(`圖片:${obj.imgsrc}`)


    // console.log(`頭圖`)
    obj.headimgsrc=''
    const headimgsrcs= await item.findElements(By.css('svg.x3ajldb image'));
    if(headimgsrcs.length > 0){
      obj.headimgsrc = await headimgsrcs[0].getAttribute("xlink:href");
    } 
    console.log(`頭圖:${obj.headimgsrc}`)

    //console.log(`文章`)
    obj.articles=''
    const articlesObjs = await item.findElements(By.css('.x1iorvi4.x1pi30zi'))
    const articlesObjs2 = await item.findElements(By.css('.x1swvt13.x1pi30zi.xexx8yu.x18d9i69'))
    const articlesObjs3 = await item.findElements(By.css('.x5yr21d.xyqdw3p'))
    if(!obj.articles && articlesObjs.length > 0){
      // console.log(`文章A:${articlesObjs.length}`)
      const articlesMore = await articlesObjs[0].findElements(By.xpath("//div[contains(text(),'顯示更多')]"))
      //console.log('顯示更多',articlesMore.length)
      if(articlesMore.length>0){
        // console.log(`文章A_顯示更多:${articlesMore.length}`)
        await driver.executeScript("arguments[0].click();", articlesMore[0]);
        // articlesMore.forEach(async(element) => {
        //   await driver.executeScript("arguments[0].click();", element);
        //   await driver.sleep(2000)
        // });
      }
      const articlesMore2 = await articlesObjs[0].findElements(By.xpath("//div[contains(text(),'查看更多')]"))
      //console.log('查看更多',articlesMore2.length)
      if(articlesMore2.length>0){
        // console.log(`文章A_查看更多:${articlesMore2.length}`)
        await driver.executeScript("arguments[0].click();", articlesMore2[0]);
      }
      await driver.sleep(2000)
      if(articlesObjs.length>0){
        obj.articles = await articlesObjs[0].getText()
      }else{
        console.log(`end,文章找不到跳出本循環------------------------------------------------`)
        continue;
      }
      //console.log(`文章1:${obj.articles}`)
    }else if( !obj.articles && articlesObjs2.length > 0){
      // console.log(`文章B:${articlesObjs2.length}`)
      obj.articles = await item.findElement(By.css('.x1swvt13.x1pi30zi.xexx8yu.x18d9i69')).getText()
      //console.log(`文章2:${obj.articles}`)
    }else if(!obj.articles && articlesObjs3.length > 0){
      // console.log(`文章B:${articlesObjs3.length}`)
      obj.articles = await item.findElement(By.css('.x5yr21d.xyqdw3p')).getText()
    }
    console.log(`文章:${obj.articles}`)
    

  
    //console.log(`判斷文章`)
    if(obj.articles){
      const nokeyword = json['nokeyword'].split(',').find(value=>obj.articles.includes(value))
      const keyword = json['keyword'].split(',').find(value=>obj.articles.includes(value))
      if(nokeyword){
        console.log(`end,文章有(${nokeyword})跳出本循環------------------------------------------------`)
        continue;
      }else if(keyword){
        console.log(`文章有(${keyword})抓取`)
      }else{
        console.log(`文章(其他)抓取`)
        // continue;
      }
    }


    //驗證文章
    const articles = await dbQuery( 'SELECT * from work where articles = ?',[obj.articles])
    if(articles.length>0){
      console.log(`end,文章重複跳出------------------------------------------------`);
      continue;
    }else{
      obj.crawlerurl_id = json['id']
      await dbInsert('work',obj)
      console.log('end,儲存資料庫---------------------------------------------------')
    }

    //等10秒
    //await driver.sleep(10000)
    //push arrays
    // if(arrays.length>5){
    //   console.log('fb_大於5個跳出')
    //   break;
    // }
    //arrays.push(obj)
  }
  // console.log('fb_array',arrays)
  //return arrays;
}
async function fbGetTrace(driver,row) {
  // console.log(`跳到該頁`)
  console.log(`start,FB,執行內容'`,row)
  //來源ID
  //const crawlerurl_id = row['id']

  // console.log(`類別名`)
  const itemsCssName = '.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z';
  const itemTimeCssName = '.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x676frb.x1nxh6w3.x1sibtaa.xo1l8bm.xi81zsa.x1yc453h a';


  //前往該網址
  await driver.get(row['storeurl'])
  // const url = 'https://www.facebook.com/groups/239168157628070'
  // await driver.get(url)

  //等加載
  await driver.sleep(3000)

  // console.log(`選擇新貼文`)
  // await fbSelectNewPost(driver)

  // console.log(`顯示fb資料`)
  await fbShowData(driver,200,itemsCssName,itemTimeCssName)

  // console.log(`抓取fb資料`)
  await fbGetData(driver,itemsCssName,itemTimeCssName,row)

  //const arrays = await fbGetData(driver,itemsCssName,itemTimeCssName,row)
  //console.log('抓取FB內容數量',arrays.length)
  // if(!arrays.length){return false;}
  // // console.log(`存fb資料`)
  // for (const array of arrays) {
  //   if(array['articles']){
  //     const articles = await dbQuery( 'SELECT * from work where articles = ?',[array['articles']])
  //     if(articles.length>0){
  //       console.log(`end,文章重複跳出------------------------------`);
  //       continue;
  //     }
  //   }
  //   array['crawlerurl_id'] = crawlerurl_id
  //   await dbInsert('work',array)
  // }
}
async function crawlerFB(row) {    
  const driver = await initDrive();
  //螢幕寬度
  await driver.manage().window().setRect({ width: 1420, height: 1000 });
  // await fbLogin(driver)
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
