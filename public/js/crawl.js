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
  function updataFn(selects,objs){
    for (let i = 0; i < selects.length; ++i) {
      // console.log(selects[i].querySelector('.ok').dataset.id)
      // console.log('17',i,selects.length,(i+1) == selects.length)
      const id = selects[i].querySelector('.ok').dataset.id
      const inputs = selects[i].querySelectorAll('input');
      // console.log(input)
      let objs2 = publicFormInputValue(inputs)
      if(Object.values(objs2).some(x => x == '')){return false};
      // console.log('21',objs2)
      objs2.keyword = objs.keyword
      objs2.nokeyword = objs.nokeyword
      objs2.id = id;
      // console.log('24',objs2)
      getJSON({
        'url': './crawl/'+id,
        'method': 'POST',
        'body': objs2
      }).then(function (json) {
        // console.log(json)
        if(json['result']=='false'){
          publicFormError.call(flex.querySelector(`input[name="${json['name']}"]`),json['message'])
        }
        if((i+1) == selects.length){
          window.location.reload();
        }
      });
    }
  }
  function isTableDivActive(){
    // console.log(document.querySelector('.tableDiv').querySelectorAll('.flex.active').length)
    return document.querySelector('.tableDiv').querySelectorAll('.flex.active').length
  }
  const tableDiv = document.querySelector('.tableDiv')
  // console.log(tableDiv.querySelector('.add'))
  tableDiv.querySelector('.add').addEventListener('click',function(e){
    e.stopPropagation
    // tableDivFlexRemove.call(this)
    // console.log('add')
    if(isTableDivActive()){return false;}
    document.querySelector('.publicPop').classList.add('active')
  })
  tableDiv.querySelectorAll('.cancel').forEach(o=>{
    o.addEventListener('click',function(e){
      e.stopPropagation()
      window.location.reload();
      // o.closest('.tableDiv').querySelectorAll('.flex').forEach(o=>{
      //   o.classList.remove('active')
      // })
    })
  })
  tableDiv.querySelectorAll('.edit').forEach(o=>{
    o.addEventListener('click',function(e){
      e.stopPropagation()
      // tableDivFlexRemove.call(o)
      if(isTableDivActive()){return false;}
      this.closest('.flex').classList.add('active')
    })
  })
  tableDiv.querySelectorAll('.ok').forEach(o=>{
    o.addEventListener('click',function(e){
      e.stopPropagation()
      const flex = this.closest('.flex')
      // console.log(flex)
      const inputs = flex.querySelectorAll('input');
      // console.log(input)
      const objs = publicFormInputValue(inputs)
      if(Object.values(objs).some(x => x == '')){return false};
      objs.id = o.dataset.id;
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
          // window.location.reload();
          const selects = tableDiv.querySelectorAll('.flex.select')
          // console.log('100',selects.length)
          if(selects.length>0){
            updataFn(selects,objs)
          }else{
            window.location.reload();
          }
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
  tableDiv.querySelectorAll('.tableContent>.flex').forEach(o=>{
    o.addEventListener('click',function(e){
      e.stopPropagation()
      o.classList.toggle('select')
    })
  })

}