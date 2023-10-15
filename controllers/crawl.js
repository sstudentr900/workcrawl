const { dbQuery,dbInsert,dbUpdata,dbDelete,timeFn } = require('../tools/db')
async function search(req, res) {
  let date = await timeFn({day:'-5'})
  date= date['date']
  const rows = await dbQuery( 'SELECT cu.id,cu.storename,cu.storeurl,cu.keyword,cu.nokeyword,(SELECT COUNT(id) FROM work WHERE work.crawlerurl_id = cu.id) AS total,(SELECT COUNT(id) FROM work WHERE work.crawlerurl_id = cu.id AND work.time >= ?) AS amount FROM crawlerurl cu where deletes= ?',[date,'n'])
  res.render('crawl',{
    'active': 'crawl',
    'data': {
      'rows': rows,
    },
  })
}
async function isValue(req, res) {
  const storename = req.body.storename
  const storeurl = req.body.storeurl
  const keyword = req.body.keyword
  const nokeyword = req.body.nokeyword
  // console.log(params,storename,storeurl,keyword,nokeyword)
  if(!storename || !storeurl || !keyword || !nokeyword){
    // console.log(`來源資料錯誤:${storename}-${storeurl}-${keyword}-${nokeyword}`)
    res.json({result:'false',message:'來源資料錯誤'})
    return false;
  }
  const crawlerurlNumber = await dbQuery('SELECT id from crawlerurl WHERE storename = ? OR storeurl = ? ',[storename,storeurl])
  // console.log(`stocknoArray,${stocknoArray.length}`)
  if(crawlerurlNumber.length){
    console.log('false,資料重複')
    res.json({result:'false',message:'資料重複'})
    return false;
  }
}
async function add(req, res) {
  const params = req.body
  // const storename = req.body.storename
  // const storeurl = req.body.storeurl
  // const keyword = req.body.keyword
  // const nokeyword = req.body.nokeyword
  // // console.log(params,storename,storeurl,keyword,nokeyword)
  // if(!storename || !storeurl || !keyword || !nokeyword){
  //   // console.log(`來源資料錯誤:${storename}-${storeurl}-${keyword}-${nokeyword}`)
  //   res.json({result:'false',message:'來源資料錯誤'})
  //   return false;
  // }
  // const crawlerurlNumber = await dbQuery('SELECT id from crawlerurl WHERE storename = ? OR storeurl = ? ',[storename,storeurl])
  // // console.log(`stocknoArray,${stocknoArray.length}`)
  // if(crawlerurlNumber.length){
  //   console.log('false,資料重複')
  //   res.json({result:'false',message:'資料重複'})
  //   return false;
  // }
  await isValue(req, res)
  await dbInsert('crawlerurl',params)
  res.json({result:'true',message: '新增成功' })
}
async function delet(req, res) {
  const id = req.params.id
  // console.log(`id:${id}`)
  if(!id){
    // console.log(`來源資料錯誤:${params}`)
    res.json({result:'false',message:'來源資料錯誤'})
    return false;
  }
  // const rows = await dbDelete('crawlerurl',id)
  const rows = await dbUpdata('crawlerurl',{'deletes':'y'},id)
  if(rows){
    res.json({result:'true',message:'刪除成功'})
  }else{
    res.json({result:'false',message:'刪除失敗'})
  }
}
async function put(req, res) {
  const id = req.params.id
  const params = req.body
  // const storename = req.body.storename
  // const storeurl = req.body.storeurl
  // const keyword = req.body.keyword
  // const nokeyword = req.body.nokeyword
  // if(!storename || !storeurl || !keyword || !nokeyword || !id){
  //   res.json({result:'false',message: '資料錯誤'})
  // }
  await isValue(req, res)
  await dbUpdata('crawlerurl',params,id)
  res.json({result:'true',message: '修改成功'})
}
module.exports = { 
  search,
  add,
  delet,
  put
}