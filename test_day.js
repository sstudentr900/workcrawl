const { dbQuery,dbInsert,dbUpdata,dbDelete,timeFn } = require('./tools/db')
async function aa(){
let week = await timeFn()
week = week['week']
console.log( week)
}
aa()