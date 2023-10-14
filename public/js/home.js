window.onload=async function(){
  // console.log(pageJson)
  // if(!pageJson){
  //   alert('找不到資料')
  //   window.location = './';
  //   return false;
  // }
  document.querySelectorAll('.publicBoxs .delete').forEach(o=>{
    o.addEventListener('click',function(){
      // console.log('dataset',o,o.dataset.id)
      getJSON({
        'url': `./home/${o.dataset.id}`,
        'method': 'DELETE'
      }).then(function (json) {
        if(json['result']=='false'){
          alert(json['message'])
        }else{
          // o.closest('.publicBox').remove();
          alert(json['message'])
          window.location.reload();
        }
      });
    })
  })
}