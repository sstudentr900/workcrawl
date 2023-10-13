const { dbQuery,dbInsert,dbUpdata,dbDelete } = require('../tools/db')
async function search(req, res) {
  // let rows = await dbQuery( 'SELECT * from work' )
  // if(!rows.length){console.log(`serch,dbQuery失敗跳出`)}
  // for (const row of rows) {
  // }
  // console.log(rows[0])
  res.render('crawl',{
    'active': 'crawl',
    // 'data': rows[0],
  })
}
async function add(req, res) {}
async function delet(req, res) {}
module.exports = { 
  search,
  add,
  delet
}