window.onload=async function(){
  // console.log(pageJson)
  // if(!pageJson){
  //   alert('找不到資料')
  //   window.location = './';
  //   return false;
  // }
  // function deletFn(id){
  //   // console.log('9',id)
  //   getJSON({
  //     'url': `./home`,
  //     'method': 'POST',
  //     'body': { 'id': id }
  //   }).then(function (json) {
  //     if(json['result']=='false'){
  //       // alert(json['message'])
  //     }else{
  //       // o.closest('.publicBox').remove();
  //       // alert(json['message'])
  //       window.location.reload();
  //     }
  //   });
  // }
  document.querySelectorAll('.publicBox').forEach(o=>{
    o.addEventListener('click',function(){
      // console.log('click')
      o.classList.toggle('active')
    })
  })
  document.querySelectorAll('.publicBoxs .delete').forEach(o=>{
    o.addEventListener('click',function(e){
      e.stopPropagation()
      if(confirm('你確定你要刪除')){
        let id = [...document.querySelectorAll('.publicBox.active .delete')].map(i=>i.dataset.id).join(',')
        if(!id){id = o.dataset.id}
        // console.log('id',id)
        deletFn({
          'url':'./home',
          'method':'POST',
          'body': { 'id': id },
        })
        // deletFn(id)
      }
    })
  })
}