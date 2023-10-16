window.onload=async function(){
  // console.log(pageJson)
  // if(!pageJson){
  //   alert('找不到資料')
  //   window.location = './';
  //   return false;
  // }
  // function tableDivFlexRemove(){
  //   this.closest('.tableDiv').querySelectorAll('.flex').forEach(o=>{
  //     o.classList.remove('active')
  //   })
  // }
  function isTableDivActive(){
    // console.log(document.querySelector('.tableDiv').querySelectorAll('.flex.active').length)
    return document.querySelector('.tableDiv').querySelectorAll('.flex.active').length
  }
  const tableDiv = document.querySelector('.tableDiv')
  console.log(tableDiv.querySelector('.add'))
  tableDiv.querySelector('.add').addEventListener('click',function(){
    // tableDivFlexRemove.call(this)
    console.log('add')
    if(isTableDivActive()){return false;}
    document.querySelector('.publicPop').classList.add('active')
  })
  tableDiv.querySelectorAll('.cancel').forEach(o=>{
    o.addEventListener('click',function(){
      window.location.reload();
      // o.closest('.tableDiv').querySelectorAll('.flex').forEach(o=>{
      //   o.classList.remove('active')
      // })
    })
  })
  tableDiv.querySelectorAll('.edit').forEach(o=>{
    o.addEventListener('click',function(){
      // tableDivFlexRemove.call(o)
      if(isTableDivActive()){return false;}
      this.closest('.flex').classList.add('active')
    })
  })
  tableDiv.querySelectorAll('.ok').forEach(o=>{
    o.addEventListener('click',function(){
      const flex = this.closest('.flex')
      // console.log(flex)
      const inputs = flex.querySelectorAll('input');
      // console.log(input)
      const objs = publicFormInputValue(inputs)
      if(Object.values(objs).some(x => x == '')){return false};
      // console.log('36',objs)
      getJSON({
        'url': './crawl/'+o.dataset.id,
        'method': 'POST',
        'body': objs
      }).then(function (json) {
        // console.log(json)
        if(json['result']=='false'){
          // alert(json['message'])
          publicFormError.call(flex.querySelector(`input[name="${json['name']}"]`),json['message'])
        }else{
          // o.closest('.publicBox').remove();
          // publicPop.classList.remove('active')
          // publicPopClose.call(this)
          // alert(json['message'])
          // tableDivFlexRemove.call(o)
          window.location.reload();
        }
      });
    })
  })
  tableDiv.querySelectorAll('.delete').forEach(o=>{
    o.addEventListener('click',function(){
      if(isTableDivActive()){return false;}
      if(confirm('你確定你要刪除')){
        // tableDivFlexRemove.call(this)
        getJSON({
          'url': `./crawl/${this.dataset.id}`,
          'method': 'delete',
        }).then(function (json) {
          // console.log(json)
          if(json['result']=='false'){
            // alert(json['message'])
          }else{
            // alert(json['message'])
            window.location.reload();
          }
        });
      }
    })
  })
}