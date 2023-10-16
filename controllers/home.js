const { dbQuery,dbInsert,dbUpdata,dbDelete,pageFn,timeFn } = require('../tools/db')
async function search(req, res) {
  //總數
  const pageNow = !isNaN(Number(req.params.id))?req.params.id:1;//當前頁碼且判斷是數字  
  const pageShow = 8;//顯示數量
  const pageCount = await dbQuery( 'SELECT COUNT(*) as number from work' )
  //判斷有值
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
  //工作
  const rows = await dbQuery( 'SELECT * from work LIMIT ?,?',[pageObj['startValue'],pageObj['endValue']] )
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
  // console.log(`delet_id:${id}`)
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