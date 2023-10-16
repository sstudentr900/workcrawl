const CronJob = require('cron').CronJob;
const {crawlerFB} = require("./crawlerFB.js"); //爬蟲股票
new CronJob({
  cronTime: '1 28 13 * * *',//時段(秒/分/時)
  onTick: async function () { //執行程式
      console.log(`開始執行爬蟲排程作業： ${new Date()}`);
      await crawlerFB()
      console.log('排程作業執行完畢！');
  },
  start: true, //自動
  timeZone: 'Asia/Taipei',//時區
});
