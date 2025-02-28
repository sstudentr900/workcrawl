const CronJob = require('cron').CronJob;
const { initDrive } = require("./initDrive.js");
const { dbQuery,timeFn,dbUpdata,dbDelete } = require('./db')
const {crawlerFB} = require("./crawlerFB.js"); //爬蟲FB
const {crawlerOHF} = require("./crawlerOHF.js"); //爬蟲104
const {crawlerBEAR} = require("./crawlerBEAR.js"); //爬蟲518
const {crawlerOTE} = require("./crawlerOTE.js"); //爬蟲1111
const {crawlerYES} = require("./crawlerYES.js"); //爬蟲yes123

new CronJob({
  cronTime: '1 30 17 * * *',//時段(秒/分/時)
  onTick: async function () { //執行程式
    console.log(`開始執行爬蟲排程作業： ${new Date()}`);
    const rows = await dbQuery( 'SELECT * from crawlerurl where deletes = ?',['n'])
    // console.log(rows.length)
    if(!rows.length){console.log(`cronJob_rows沒有資料跳出`);return false;}

    //open drive
    const driver = await initDrive();
    await driver.manage().window().setRect({ width: 1420, height: 1000 });   //螢幕寬度
    for (const row of rows) {
      if(row['storeurl'].includes('facebook')){
        await crawlerFB(driver,row)
      }else if(row['storeurl'].includes('104')){
        // let week = await timeFn()
        // week = week['week']
        // if(week!=0 || week!=6){
        //   await crawlerOHF(row)
        // }
        await crawlerOHF(driver,row)
      }else if(row['storeurl'].includes('yes123')){
        await crawlerYES(driver,row)
      }else if(row['storeurl'].includes('518')){
        await crawlerBEAR(driver,row)
      }else if(row['storeurl'].includes('1111')){
        await crawlerOTE(driver,row)
      }else{
        console.log('cronJob_storeurl沒有資料跳出 error')
      }
    }
    driver.quit();
    console.log(`排程作業執行完畢！ ${new Date()}`);
  },
  start: true, //自動
  timeZone: 'Asia/Taipei',//時區
});
