// const CronJob = require('cron').CronJob;
// const crawlerFB = require("./tools/crawlerFB.js"); //爬蟲股票
// new CronJob({
//   cronTime: '1 34 11 * * *',//時段(秒/分/時)
//   onTick: async function () { //執行程式
//       console.log(`開始執行爬蟲排程作業： ${new Date()}`);
//       await crawlerFB()
//       console.log('排程作業執行完畢！');
//   },
//   start: true, //自動
//   timeZone: 'Asia/Taipei',//時區
// });


// const {crawlerFB} = require("./tools/crawlerFB.js"); //爬蟲股票
// async function aa() { //執行程式
//   console.log(`開始執行爬蟲排程作業： ${new Date()}`);
//   await crawlerFB()
//   console.log('排程作業執行完畢！');
// }
// aa()


const { dbQuery,dbInsert,dbUpdata,dbDelete } = require('./tools/db')
const {crawlerFB} = require("./tools/crawlerFB.js"); //爬蟲FB
const {crawlerOHF} = require("./tools/crawlerOHF.js"); //爬蟲104
async function aa() { //執行程式
  console.log(`開始執行爬蟲排程作業： ${new Date()}`);
  const rows = await dbQuery( 'SELECT * from crawlerurl where deletes = ?',['n'])
  // console.log(rows.length)
  if(!rows.length){console.log(`cronJob_rows沒有資料跳出`);return false;}
  for (const row of rows) {
    if(row['storeurl'].includes('facebook')){
      await crawlerFB(row)
    }else if(row['storeurl'].includes('104')){
      await crawlerOHF(row)
    }else{
      console.log('cronJob_storeurl沒有資料跳出 error')
    }
  }
  console.log('排程作業執行完畢！');
}
aa()