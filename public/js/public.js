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
function creatHtml(o) {
  let tage = o.tage || '';
  let text = o.text || '';
  let cl = o.cl || '';
  let attr = o.attr || '';
  let addHtml = o.addHtml || '';
  let method = o.method || 'click';
  let handler = o.handler || '';
  let handler2 = o.handler2 || '';
  let method2 = o.method2 || method;
  let html = document.createElement(tage);
  if (text) {
    html.innerHTML = text;
  }
  if (cl) {
    html.className = cl;
  }
  if (attr) {
    attr = Array.isArray(attr) ? attr : [attr];
    attr.forEach(function (element) {
      Object.keys(element).forEach(function (item, i) {
        html.setAttribute(item, element[item]);
      });
    }); // for(var i=0;i<attr.length;i++){
    //     html.setAttribute(attr[i]['n'],attr[i]['v'])
    // }
  }
  if (addHtml) {
    addHtml = Array.isArray(addHtml) ? addHtml : [addHtml]; // console.log(addHtml)

    addHtml.forEach(function (element) {
      return html.append(element);
    });
  }
  if (handler) {
    html.addEventListener(method, handler.bind(html), false);
  }
  if (handler2) {
    window.addEventListener(method2, handler2, false);
  }
  return html;
}
