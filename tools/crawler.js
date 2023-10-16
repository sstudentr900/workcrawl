const CronJob = require('cron').CronJob;
const {crawlerFB} = require("./crawlerFB.js"); //爬蟲股票
const { dbQuery,dbInsert,dbUpdata,dbDelete } = require('./db')
new CronJob({
  cronTime: '1 28 13 * * *',//時段(秒/分/時)
  onTick: async function () { //執行程式
    console.log(`開始執行爬蟲排程作業： ${new Date()}`);
    const rows = await dbQuery( 'SELECT * from crawlerurl where deletes = ?',['n'])
    if(!rows){console.log(`cronJob_rows沒有資料跳出`);return false;}
    for (const row of rows) {
      if(row['storeurl'].includes('facebook')){
        await crawlerFB(row)
      }else{
        console.log('cronJob_storeurl沒有資料跳出 error')
      }
    }
    console.log('排程作業執行完畢！');
  },
  start: true, //自動
  timeZone: 'Asia/Taipei',//時區
});
