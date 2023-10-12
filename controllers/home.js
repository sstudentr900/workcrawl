const { dbQuery,dbInsert,dbUpdata,dbDelete } = require('../tools/db')
async function search(req, res) {
  // let rows = await dbQuery( 'SELECT * from work' )
  // if(!rows.length){console.log(`serch,dbQuery失敗跳出`)}
  // for (const row of rows) {
  //    //加權指數
  //   const data = JSON.parse(row['twii'])
  //   // const twii = data.slice(-132)
  //   const twii = data
  //   row['twii_date'] = twii.map(item=>item.date)
  //   row['twii_price'] = twii.map(item=>[item.open,item.close,item.low,item.high])
  //   row['twii_vol'] = twii.map(item=>item.volume)
  //   row['wii_ma5'] = getMa(5,twii)
  //   row['wii_ma10'] = getMa(10,twii)
  //   row['wii_ma20'] = getMa(20,twii)
  //   //時間
  //   row['date'] = getNowTimeObj({'date':row['updated_at']})['date']
  //   //上市三大法人排名
  //   row['ranking'] = getSort({obj:row['ranking'],number:18})
  //   //3大法人_買賣超融資卷
  //   row['threecargofinancing'] = getSort({obj:row['threecargo'],number:10})
  //   const threecargo = JSON.parse(row['threecargo'])
  //   //3大法人_日期
  //   row['threecargo_date'] = threecargo.map(({date})=>date)
  //   //3大法人_合計累加
  //   row['threecargo_data'] = getAccumulate({obj:threecargo.map(({total})=>Number(total))})
  //   // row['threecargo_data'] = threecargo.map(({total})=>Number(total))
  //   //3大法人_融資
  //   row['threecargo_data_financing'] = threecargo.map(({financing})=>financing.split(',').join(''))
  //   //3大法人_加權指數
  //   row['threecargo_market'] = threecargo.map(({date})=>{
  //     const obj = data.find(obj=>date==obj.date)
  //     return obj?Number(obj.close):0
  //   })
  //   //期貨買賣超
  //   const threefutures = JSON.parse(row['threefutures'])
  //   row['threefutures'] = getSort({obj:row['threefutures'],number:10})
  //   //期貨買賣超_日期
  //   row['threefutures_date'] = threefutures.map(({date})=>date)
  //   //期貨買賣超_資料
  //   row['threefutures_data'] = threefutures.map(({foreign,letter,proprietor})=>(Number(foreign)+Number(letter)+Number(proprietor)).toFixed(2))
  
  //   // row['threefutures_data'] = getAccumulate({obj:threefutures_data})
  //   // row['threefutures_data'] = threefutures.map(({foreign})=>foreign)
  //   //期貨買賣超_加權指數
  //   row['threefutures_market'] = threefutures.map(({date})=>{
  //     let number = 0
  //     const obj = data.find((obj,index)=>{
  //       number = index;
  //       return date==obj.date
  //     })
  //     return obj?Number(obj.close):Number(data[number].close)
  //   })
  //   //上下跌家數
  //   const updownnumber = JSON.parse(row['updownnumber'])
  //   row['updownnumber'] = getSort({obj:row['updownnumber'],number:10})
  //   //上下跌家數_日期
  //   row['updownnumber_date'] = updownnumber.map(({date})=>date)
  //   //上下跌家數_資料
  //   row['updownnumber_data'] = updownnumber.map(({Diffhome})=>Number(Diffhome))
  //   //上下跌家數__加權指數
  //   row['updownnumber_market'] = updownnumber.map(({date})=>{
  //     let number = 0
  //     const obj = data.find((obj,index)=>{
  //       number = index;
  //       return date==obj.date
  //     })
  //     return obj?Number(obj.close):Number(data[number].close)
  //   })
  //   //上市類股漲跌
  //   row['listed'] = getSort({obj:row['listed'],number:54})
  //   //除息股票
  //   row['exdividend'] = getSort({obj:row['exdividend'],number:54}).filter((item,index)=>{
  //     console.log()
  //     const date = item.ex_date.split('/').join('-')
  //     if(date>=getNowTimeObj()['date']){
  //       return item;
  //     }
  //   })
  //   //大股東增減
  //   row['holder'] = getSort({obj:row['holder'],number:20})
  //   //羊群增減
  //   row['retail'] = getSort({obj:row['retail'],number:20})
  //   //恐慌指數
  //   if(row['vix']){
  //     const vix = JSON.parse(row['vix'])
  //     //恐慌指數日期
  //     row['vix_date'] = vix.map(({date})=>date)
  //     //恐慌指數資料
  //     row['vix_data'] = vix.map(({number})=>Number(number))
  //     //恐慌指數_加權指數
  //     // row['vix_market'] = vix.map(({date})=>{
  //     //   const obj = data.find(obj=>date==obj.date)
  //     //   return obj?Number(obj.close):0
  //     // })
  //     row['vix_market'] = vix.map(({date})=>{
  //       let number = 0
  //       const obj = data.find((obj,index)=>{
  //         number = index;
  //         return date==obj.date
  //       })
  //       return obj?Number(obj.close):Number(data[number].close)
  //     })
  //     delete row.vix
  //   }
  //   //貪婪指數
  //   if(row['greedy']){
  //     const greedy = JSON.parse(row['greedy'])
  //     //貪婪指數日期
  //     row['greedy_date'] = greedy.map(({date})=>date)
  //     //貪婪指數資料
  //     row['greedy_data'] = greedy.map(({data})=>Number(data))
  //     //貪婪指數_加權指數
  //     row['greedy_market'] = greedy.map(({date})=>{
  //       let number = 0
  //       const obj = data.find((obj,index)=>{
  //         number = index;
  //         return date==obj.date
  //       })
  //       return obj?Number(obj.close):Number(data[number].close)
  //     })
  //     delete row.greedy
  //   }
  //   //景氣對策信號
  //   if(row['prosperity']){
  //     const prosperity =  JSON.parse(row['prosperity']).slice(-100)
  //     //日期
  //     // row['prosperity_date'] = prosperity.map(({date})=>`${date.split('-')[0].slice(-2)}-${date.split('-')[1]}`)
  //     row['prosperity_date'] = prosperity.map(({date})=>date)
  //     //景氣對策信號
  //     row['prosperity_data'] = prosperity.map(({point})=>point)
  //     //景氣對策信號_加權指數
  //     row['prosperity_market'] = prosperity.map(({date})=>{
  //       const obj = data.find(obj=>{
  //         return (date.split('-')[0]+'-'+date.split('-')[1])==(obj.date.split('-')[0]+'-'+obj.date.split('-')[1])
  //       })
  //       return obj?Number(obj.close):0
  //     })
  //   }
  //   //美金
  //   if(row['dollars']){
  //     // const dollars = getMonthly({ year:'2018',json:JSON.parse(row['dollars']) })
  //     const dollars = JSON.parse(row['dollars']) 
  //     //日期
  //     // row['dollars_date'] = dollars.map(({date})=>`${date.split('-')[0].slice(-2)}-${date.split('-')[1]}`)
  //     row['dollars_date'] = dollars.map(({date})=>date)
  //     //美金資料
  //     row['dollars_data'] = dollars.map(({dollars})=>Number(dollars))
  //     //美金_加權指數
  //     row['dollars_market'] = dollars.map(({date})=>{
  //       // const obj = data.find(obj=>date==obj.date)
  //       // return obj?Number(obj.close):0
  //       let number = 0
  //       const obj = data.find((obj,index)=>{
  //         number = index;
  //         return date==obj.date
  //       })
  //       return obj?Number(obj.close):Number(data[number].close)
  //     })
  //   }


  //   //移除不需要的值和值沒有轉JSON.parse
  //   // delete row.ranking
  //   delete row.threecargo
  //   delete row.prosperity
  //   delete row.dollars
  //   delete row.twii
  //   delete row.id
  //   delete row.updated_at
  // }
  // console.log(rows[0])
  res.render('home',{
    'active': 'home',
    // 'data': rows[0],
  })
}
module.exports = { 
  search
}