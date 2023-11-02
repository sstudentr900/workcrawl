const publicBoxsHtml = (r)=>{
  return creatHtml({
    'tage':'div',
    'cl':'publicBox',
    'addHtml': [
      creatHtml({
        'tage':'div',
        'cl':'topDiv',
        'addHtml': [
          creatHtml({
            'tage':'div',
            'cl':'left',
            'addHtml': [
              creatHtml({
                'tage':'div',
                'cl':'img',
                'addHtml': r.headimgsrc?creatHtml({
                  'tage':'img',
                  'attr': {'src':r.headimgsrc},
                }):'',
              }),
              creatHtml({
                'tage':'div',
                'cl':'text',
                'addHtml': [
                  creatHtml({
                    'tage':'a',
                    'cl':'name',
                    'attr': {'href':r.namehref,'target':'_blank'},
                    'text': r.name
                  }),
                  creatHtml({
                    'tage':'a',
                    'cl':'date',
                    'attr': {'href':r.timeurl,'target':'_blank'},
                    'text': r.time
                  }),
                ]
              }),
            ]
          }),
          creatHtml({
            'tage':'div',
            'cl':'deleteDiv',
            'addHtml':creatHtml({
              'tage':'a',
              'cl':'delete',
              'attr': {'data-id': r.id},
              'text': '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill-rule="nonzero"/></svg>',
              'handler': function(e){
                // console.log(this)
                e.stopPropagation()
                if(confirm('你確定你要刪除')){
                  let id = [...document.querySelectorAll('.publicBox.active .delete')].map(i=>i.dataset.id).join(',')
                  if(!id){id = this.dataset.id}
                  // console.log('id',id)
                  deletFn({
                    'url':'./home/delet',
                    'method':'POST',
                    'body': { 'id': id },
                  })
                }
              },
            }),
          }),
        ]
      }),
      creatHtml({
        'tage':'div',
        'cl':'textDiv',
        'addHtml': creatHtml({
          'tage':'p',
          'text': r.articles,
        }),
      }),
      r.imgsrc? creatHtml({
          'tage':'div',
          'cl':'imgDiv',
          'addHtml': r.imgsrc.split(',').map(i=>{
            return creatHtml({
              'tage':'div',
              'cl':'img',
              'addHtml':creatHtml({
                'tage':'img',
                'attr': {'src': i},
              })
            })
          })
      }):'',
      creatHtml({
        'tage':'div',
        'cl':'buttonDiv',
        'addHtml': creatHtml({
          'tage':'a',
          'attr': {'target':'_blank','href':r.namehref},
          'text':'瞭解詳情',
        }),
      })
    ],
    'handler': function(){
      this.classList.toggle('active')
    },
    'method2':'dblclick',
    'handler2': function(){
      document.querySelectorAll('.publicBox').forEach(o=>{
        o.classList.remove('active')
      })
    }
  })
}
const search = (page)=>{
  // console.log(page)
  const publicWidth = document.querySelector('.publicContent .publicWidth')
  getJSON({
    'url':'./home',
    'method':'POST',
    'body': {'page':page}
  }).then(function (json) {
    if(json['result']=='false'){
      publicWidth.append(creatHtml({
        'tage':'div',
        'cl':'publicNoData',
        'text': json['message']
      }))
      return false;
    }
    if(page==1){
      // console.log(json)
      publicWidth.append(creatHtml({
        'tage':'div',
        'cl':'publicBoxs',
        'attr':{
          'data-pagenow':json['pageNow'],
          'data-pagetotle':json['pageTotle'],
        },
        'addHtml': json['rows'].map(r=>publicBoxsHtml(r))
      }))
    }
    // console.log( 179,page,json['pageTotle'], page<=json['pageTotle'])
    if(page>1 && page <= json['pageTotle']){
      // console.log(300,json['rows'])
      json['rows'].map(r=>{
        publicWidth.querySelector('.publicBoxs').append(publicBoxsHtml(r))
      })
    }
    console.log('當前數量',publicWidth.querySelectorAll('.publicBox').length)
  });
}
const scroll=()=>{
  let throttleTimer;
  window.addEventListener("scroll", function(){
    // console.log('scroll')
    const publicWidth = document.querySelector('.publicContent .publicWidth')
    const publicBoxs = publicWidth.querySelector(".publicBoxs");
    const pageCount = publicBoxs.dataset.pagetotle;
    let currentPage = publicBoxs.dataset.pagenow;
    const throttle = (callback, time) => {
      if (throttleTimer) return;
      throttleTimer = true;
      setTimeout(() => {
        callback();
        throttleTimer = false;
      }, time);
    };
    const addCards = (pageIndex) => {
      // currentPage = pageIndex;
      publicBoxs.dataset.pagenow = pageIndex
      // console.log(141,pageIndex)
      // console.log(142,publicBoxs.dataset.pagenow)
      search(pageIndex)
    };
    throttle(() => {
      // console.log('throttle')
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - (window.innerHeight/2)) {
        currentPage = currentPage*1 + 1
        if (currentPage > pageCount) {
          console.log('最後一頁',currentPage,'總頁碼',pageCount,currentPage > pageCount)
          // removeInfiniteScroll();
          // publicBoxs.dataset.pagenow = pageCount
          // currentPage = pageCount
          return false;
        }else{
          console.log('當前頁碼',currentPage,'總頁碼',pageCount,currentPage > pageCount)
          addCards(currentPage);
        }
      }
    }, 1000);
  });
}
window.onload = function(){
  search(1)
  scroll()
}