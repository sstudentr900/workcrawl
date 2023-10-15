window.onload=async function(){
  // console.log(pageJson)
  // if(!pageJson){
  //   alert('找不到資料')
  //   window.location = './';
  //   return false;
  // }
  function tableDivFlexRemove(){
    this.closest('.tableDiv').querySelectorAll('.flex').forEach(o=>{
      o.classList.remove('active')
    })
  }
  const tableDiv = document.querySelector('.tableDiv')
  tableDiv.querySelector('.add').addEventListener('click',function(){
    tableDivFlexRemove.call(this)
    document.querySelector('.publicPop').classList.add('active')
  })
  tableDiv.querySelectorAll('.cancel').forEach(o=>{
    o.addEventListener('click',tableDivFlexRemove)
  })
  tableDiv.querySelectorAll('.edit').forEach(o=>{
    o.addEventListener('click',function(){
      tableDivFlexRemove.call(o)
      this.closest('.flex').classList.add('active')
    })
  })
  tableDiv.querySelectorAll('.ok').forEach(o=>{
    o.addEventListener('click',function(){
      tableDivFlexRemove.call(o)
      const flex = this.closest('.flex')
      // console.log(flex)
      const input = flex.querySelectorAll('input');
      // console.log(input)
      const objs = publicFormInputValue(input)
      if(Object.values(objs).some(x => x == '')){return false};
      console.log('36',objs)
      getJSON({
        'url': './crawl/'+o.dataset.id,
        'method': 'POST',
        'body': objs
      }).then(function (json) {
        // console.log(json)
        if(json['result']=='false'){
          alert(json['message'])
        }else{
          // o.closest('.publicBox').remove();
          // publicPop.classList.remove('active')
          // publicPopClose.call(this)
          alert(json['message'])
          window.location.reload();
        }
      });
      // getJSON({
      //   'url': `./crawl/${o.dataset.id}`,
      //   'method': 'post',
      //   'body': objs
      // }).then(function (json) {
      //   console.log(json)
      //   if(json['result']=='false'){
      //     alert(json['message'])
      //   }else{
      //     alert(json['message'])
      //     window.location.reload();
      //   }
      // });
    })
  })
  tableDiv.querySelectorAll('.delete').forEach(o=>{
    o.addEventListener('click',function(){
      tableDivFlexRemove.call(this)
      getJSON({
        'url': `./crawl/${this.dataset.id}`,
        'method': 'delete',
      }).then(function (json) {
        console.log(json)
        if(json['result']=='false'){
          alert(json['message'])
        }else{
          alert(json['message'])
          window.location.reload();
        }
      });
    })
  })
}