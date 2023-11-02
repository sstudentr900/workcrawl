const { dbQuery,dbInsert,dbUpdata,dbDelete,pageFn,timeFn } = require('../tools/db')
async function workData(pageNow) {
  //總數
  const pageShow = 36;//顯示數量
  const pageCount = await dbQuery( 'SELECT COUNT(*) as number from work' )
  let obj = {}
  //判斷總數
  if(pageCount.length==0){
    // obj['pageStart']=0;
    // obj['pageTotle']=0;
    // obj['pageNow']=0;
    obj['rows']= [];
    return obj;
  }
  obj = await pageFn(Number(pageCount[0]['number']),Number(pageShow),Number(pageNow))
  // console.log('obj',pageNow,obj['pageTotle'])
  // {
  //   'pageStart': pageStart,
  //   'pageTotle': pageTotle,
  //   'startValue': startValue,
  //   'endValue': pageShow,
  // }
  //來源頁碼大於總頁數跳轉第1頁
  if( pageNow > obj['pageTotle'] ){
    obj['pageNow'] = 1;
    obj['startValue'] = 0;
  }
  //工作
  obj['rows'] = await dbQuery( 'SELECT * FROM work ORDER BY time DESC LIMIT ?,?',[obj['startValue'],obj['endValue']] )
  obj['pageNow'] = pageNow;
  return obj;
}
async function searchget(req, res) {
  res.render('home',{
    'active': 'home',
  })
}
async function searchpost(req, res) {
  // console.log(34,req)
  const page = req.body.page
  // console.log(35,page)
  const obj = await workData(page)
  // console.log(37,obj)
  if(!obj['rows'].length){
    res.json({result:'false',message:'目前沒有資料'})
  }else{
    res.json({
      result:'true',
      rows: obj['rows'],
      pageNow: obj['pageNow'],
      pageTotle: obj['pageTotle'],
    })
  }
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
  searchget,
  searchpost,
  delet,
}