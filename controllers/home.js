const { dbQuery,dbInsert,dbUpdata,dbDelete,pageFn,timeFn } = require('../tools/db')
async function search(req, res) {
  //總數
  console.log('4',req.params.id,!isNaN(Number(req.params.id)))
  const pageNow = !isNaN(Number(req.params.id))?req.params.id:1;//當前頁碼且判斷是數字  
  console.log('6',pageNow)
  const pageShow = 8;//顯示數量
  const pageCount = await dbQuery( 'SELECT COUNT(*) as number from work INNER JOIN crawlerurl ON work.crawlerurl_id=crawlerurl.id' )
  // console.log('count',pageCount[0]['number'])
  const pageObj = await pageFn(Number(pageCount[0]['number']),pageShow,Number(pageNow))
  //工作
  const rows = await dbQuery( 'SELECT * from work INNER JOIN crawlerurl ON work.crawlerurl_id=crawlerurl.id LIMIT ?,?',[pageObj['startValue'],pageObj['endValue']] )
  if(!rows.length){console.log(`serch,rows失敗`)}
  // console.log(rows)
  //總數量
  const rows1 = await dbQuery( 'SELECT crawlerurl.storename,crawlerurl.storeurl,COUNT(crawlerurl_id) as number from crawlerurl INNER JOIN work ON crawlerurl.id=work.crawlerurl_id GROUP BY work.crawlerurl_id')
  if(!rows1.length){console.log(`serch,rows1失敗`)}
  //周數量
  let date = await timeFn({day:'-5'})
  date = date['date']
  // console.log('date',date)
  const rows2 = await dbQuery( 'SELECT crawlerurl.storename,crawlerurl.storeurl,work.crawlerurl_id,COUNT(crawlerurl_id) as number from crawlerurl INNER JOIN work ON crawlerurl.id=work.crawlerurl_id where work.time>=? GROUP BY work.crawlerurl_id',[date])
  if(!rows2.length){console.log(`serch,rows2失敗`)}
  res.render('home',{
    'active': 'home',
    'data': {
      'pageStart': pageObj['pageStart'],
      'pageTotle': pageObj['pageTotle'],
      // 'pageShow': pageShow,
      'pageNow': pageNow,
      'rows': rows,
      'rows1': rows1,
      'rows2': rows2,
    },
  })
}
module.exports = { 
  search
}