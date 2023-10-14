const { dbQuery,dbInsert,dbUpdata,dbDelete,pageFn,timeFn } = require('../tools/db')
async function search(req, res) {
  // //總數
  // const pageNow = !isNaN(Number(req.params.id))?req.params.id:1;//當前頁碼且判斷是數字  
  // const pageShow = 8;//顯示數量
  // const pageCount = await dbQuery( 'SELECT COUNT(*) as number from work INNER JOIN crawlerurl ON work.crawlerurl_id=crawlerurl.id' )
  // // console.log('count',pageCount[0]['number'])
  // const pageObj = await pageFn(Number(pageCount[0]['number']),pageShow,Number(pageNow))
  // //工作
  // const rows = await dbQuery( 'SELECT crawlerurl.storeurl,crawlerurl.storename,crawlerurl.storename from work INNER JOIN crawlerurl ON work.crawlerurl_id=crawlerurl.id LIMIT ?,?',[pageObj['startValue'],pageObj['endValue']] )
  // if(!rows.length){console.log(`serch,rows失敗`)}
  // console.log(rows)
  // //總數量
  // const rows1 = await dbQuery( 'SELECT crawlerurl.storename,crawlerurl.storeurl,COUNT(crawlerurl_id) as number from crawlerurl INNER JOIN work ON crawlerurl.id=work.crawlerurl_id GROUP BY work.crawlerurl_id')
  // if(!rows1.length){console.log(`serch,rows1失敗`)}
  // //周數量
  // let date = await timeFn({day:'-5'})
  // date = date['date']
  // // console.log('date',date)
  // const rows2 = await dbQuery( 'SELECT crawlerurl.storename,crawlerurl.storeurl,work.crawlerurl_id,COUNT(crawlerurl_id) as number from crawlerurl INNER JOIN work ON crawlerurl.id=work.crawlerurl_id where work.time>=? GROUP BY work.crawlerurl_id',[date])
  // if(!rows2.length){console.log(`serch,rows2失敗`)}
  //總數
  const pageNow = !isNaN(Number(req.params.id))?req.params.id:1;//當前頁碼且判斷是數字  
  const pageShow = 8;//顯示數量
  const pageCount = await dbQuery( 'SELECT COUNT(*) as number from work' )
  // console.log('count',pageCount[0]['number'])
  const pageObj = await pageFn(Number(pageCount[0]['number']),pageShow,Number(pageNow))
  //工作
  const rows = await dbQuery( 'SELECT * from work LIMIT ?,?',[pageObj['startValue'],pageObj['endValue']] )
  // console.log(rows)
  if(!rows.length){console.log(`serch,rows失敗`)}
  res.render('home',{
    'active': 'home',
    'data': {
      'pageStart': pageObj['pageStart'],
      'pageTotle': pageObj['pageTotle'],
      'pageNow': pageNow,
      'rows': rows,
    },
  })
}
async function delet(req, res) {
  const id = req.params.id
  console.log(`delet_id:${id}`)
  if(!id){
    // console.log(`來源資料錯誤:${params}`)
    res.json({result:'false',message:'來源資料錯誤'})
    return false;
  }
  const rows = await dbDelete('work',id)
  if(rows){
    res.json({result:'true',message:'刪除成功'})
  }else{
    res.json({result:'false',message:'刪除失敗'})
  }
}
module.exports = { 
  search,
  delet,
}