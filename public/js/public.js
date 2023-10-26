async function getJSON({url,method,headers,body}){
  if(method=='POST'){
    headers = {
      "Content-Type": "application/json",//POST with body 必帶
      "Accept": "application/json",//我是用哪種資料型態來
    }
  }
  const response = await fetch(
    url,
    {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    }
  );
  return await response.json();
}
function publicFormInputValue(inputs){
  const objs = {}
  document.querySelectorAll('span.error').forEach(o=>o.remove('active'))
  inputs.forEach(o=>{
    if(!o.value){
      // publicFormError(o,'不能為空')
      publicFormError.call(o,'不能為空')
    }
    objs[o.name] = o.value
    // console.log(o.value)
  })
  // console.log(objs)
  return objs;
}
function deletFn(o){
  const url = o.url?o.url:false
  const method = o.method?o.method:'POST'
  const body = o.body?o.body:false
  // console.log('9',id)
  getJSON({
    'url': url,
    'method': method,
    'body': body
  }).then(function (json) {
    if(json['result']=='false'){
      // alert(json['message'])
    }else{
      // o.closest('.publicBox').remove();
      // alert(json['message'])
      window.location.reload();
    }
  });
}
//使用範例
// getJSON({
//   'url': 'src',
//   'method': 'POST', //DELETE,POST
//   'body': {'id': id}
// }).then(function (json) {
//   console.log(json)
// });

// function getJSON2(url,obj){
//   fetch(url,obj)
//   .then((response)=>response.json())
//   .then(function (myJson) {
//     console.log(myJson);
//   });
// }