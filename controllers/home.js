const { dbQuery,dbInsert,dbUpdata,dbDelete,pageFn,timeFn } = require('../tools/db')
async function search(req, res) {
  //總數
  const pageNow = !isNaN(Number(req.params.id))?req.params.id:1;//當前頁碼且判斷是數字  
  const pageShow = 24;//顯示數量
  const pageCount = await dbQuery( 'SELECT COUNT(*) as number from work' )
  //判斷總數
  if(pageCount.length==0){
    res.render('home',{
      'active': 'home',
      'data': {
        'pageStart': 0,
        'pageTotle': 0,
        'pageNow': 0,
        'rows': 0,
      },
    })
    return false;
  }
  const pageObj = await pageFn(Number(pageCount[0]['number']),pageShow,Number(pageNow))
  // console.log('pageObj',pageNow,pageObj['pageTotle'])
  //來源頁碼大於總頁數跳轉第1頁
  if( pageNow > pageObj['pageTotle'] ){
    res.redirect('./1');
    return false;
  }
  //工作
  const rows = await dbQuery( 'SELECT * from work LIMIT ?,?',[pageObj['startValue'],pageObj['endValue']] )
  // console.log('工作',rows.length)
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
  // console.log(`req`,req)
  // const id = req.params.id
  const id = req.body.id
  // console.log(`id`,id)
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