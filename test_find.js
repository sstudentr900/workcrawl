const { dbQuery,dbInsert,dbUpdata,dbDelete,timeFn } = require('./tools/db')
async function aa(){
  const str = 'aa,bfdgb,cc'.split(',').find(item=>"fdgdfgaxgfdgbfdgbgghfd".includes(item))
  console.log(str)
}
aa()