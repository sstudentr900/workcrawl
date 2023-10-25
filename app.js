const express = require('express');
const home = require('./controllers/home');
const crawl = require('./controllers/crawl');
const app = express(); //載入express模組
const port = 3030;//設定port

//解析json
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
app.use(express.json())

//css 引入
app.use(express.static('public'))

//ejs
app.set('views', './views'); // 讀取 EJS 檔案位置
app.set('view engine', 'ejs');// 用 EJS 引擎跑模板

//監聽 port
app.listen(port,()=>{console.log(`port ${port}`)});


//使用express----------------------------------------- 
//middleware把關後才會進入主要的程式碼 ，可以寫一些安全性的程式邏輯
// app.use((req, res, next) => {
//   console.log("這是 middleware");
//   next();
// });

//home
app.get('/', function(req, res){
  //重新定向
  res.redirect('./home/1');
})
app.get('/home/:id', home.search)
//home刪除
app.post('/home',home.delet)
// app.delete('/home/:id',home.delet)
//項目 crawl
app.get('/crawl', crawl.search)
//增加項目
app.post('/crawl',crawl.add)
//刪除項目
app.delete('/crawl/:id',crawl.delet)
//修改項目
app.post('/crawl/:id',crawl.put)


//home
// app.get('/', function(req, res){
//   console.log(`home`)
//   res.send('home')
// })
//發送文字
// app.get('/test', function(req, res){
//   // console.log(`發送文字`)
//   res.send('send home 文字')
// })
//引入模板
// app.get('/table', function (req, res) {
//   // console.log(`引入模板`)
//   res.render('table')
// })
// //error
// app.get('/error', function (req, res) {
//   notDefined(); // 執行一個沒有定義的函式跳去500
// })
// 404
// app.use((req, res, next) => {
//   res.status(404).send("404 Oops! 找不到網頁！");
// });
// 500
// app.use((err, req, res, next) => {
//   res.status(500).send("500 程式錯誤，請聯繫 IT 人員協助！");
// });
