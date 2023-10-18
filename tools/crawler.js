const CronJob = require('cron').CronJob;
const { dbQuery,dbInsert,dbUpdata,dbDelete } = require('./db')
const {crawlerFB} = require("./tools/crawlerFB.js"); //爬蟲FB
const {crawlerOHF} = require("./tools/crawlerOHF.js"); //爬蟲104
const {crawlerBEAR} = require("./tools/crawlerBEAR.js"); //爬蟲518
const {crawlerOTE} = require("./tools/crawlerOTE.js"); //爬蟲1111
new CronJob({
  cronTime: '1 28 13 * * *',//時段(秒/分/時)
  onTick: async function () { //執行程式
    console.log(`開始執行爬蟲排程作業： ${new Date()}`);
    const rows = await dbQuery( 'SELECT * from crawlerurl where deletes = ?',['n'])
    if(!rows){console.log(`cronJob_rows沒有資料跳出`);return false;}
    for (const row of rows) {
      if(row['storeurl'].includes('facebook')){
        await crawlerFB(row)
      }else if(row['storeurl'].includes('104')){
        await crawlerOHF(row)
      }else if(row['storeurl'].includes('518')){
        await crawlerBEAR(row)
      }else if(row['storeurl'].includes('1111')){
        await crawlerOTE(row)
      }else{
        console.log('cronJob_storeurl沒有資料跳出 error')
      }
    }
    console.log('排程作業執行完畢！');
  },
  start: true, //自動
  timeZone: 'Asia/Taipei',//時區
});
