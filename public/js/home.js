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
const publicBoxsHtml = (r)=>{
  return creatHtml({
    'tage':'div',
    'cl':'publicBox',
    'attr':{'style':'visibility:hidden;opacity: 0;'},
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
                // console.log(this.closest('.publicBox '))
                e.stopPropagation()
                if(confirm('你確定你要刪除')){
                  const deletBtn = this
                  let id = [...document.querySelectorAll('.publicBox.active .delete')].map(i=>i.dataset.id).join(',')
                  if(!id){id = this.dataset.id}
                  // console.log('id',id)
                  getJSON({
                    'url': './home/delet',
                    'method': 'POST',
                    'body': { 'id': id }
                  }).then(function (json) {
                    if(json['result']=='false'){
                      alert(json['message'])
                    }else{
                      // o.closest('.publicBox').remove();
                      // alert(json['message'])
                      // window.location.reload();
                      deletBtn.closest('.publicBox').remove()
                      document.querySelectorAll('.publicBox.active').forEach(i=>i.remove())
                      // cascadeDisplay()
                      search(1)
                    }
                  });
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
const cascadeDisplay = async (number)=>{
  const gap = 12
  const photosContainer= document.querySelector('.publicBoxs')
  const photos = photosContainer.querySelectorAll('.publicBox')
  const photosContainerWidth = photosContainer.offsetWidth
  const photoWidth = photos[0].offsetWidth
  // 計算一列最多有幾欄
  const columnsCount = parseInt((photosContainerWidth) / ( photoWidth + gap ))
  const fistRowPhotosHeightArray = []
  const heightArraay = []
  const loadImage = async (imageUrl)=>{
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = resolve; // 让加载失败的图片也算作成功
      image.src = imageUrl;
    });
  }
  // 進行照片排序
  // console.log(184,number)
  // for (let i = number; i < photos.length; i++) {
  for (let i = 0; i < photos.length; i++) {
    //等圖片載入
    // console.log(187,photos[i])
    const photoImgs = photos[i].querySelectorAll('img')
    const photoImgsNumber = photoImgs.length
    if(photoImgsNumber){
      for (const photoImg of photoImgs) {
        await loadImage(photoImg.getAttribute('src'));
        // try {
        //   const image = await loadImage(photoImg.getAttribute('src'));
        //   // imageContainer.appendChild(image);
        //   // totalHeight += image.height;
        // } catch (error) {
        //   // 忽略加载失败的图片
        // }
      }
    }
    // 放上第一列的照片
    // if (i < (columnsCount+number)) {
    if (i < columnsCount) {
      photos[i].style.top = 0
      photos[i].style.left = (photoWidth + gap) * i + 'px'
      // 紀錄第一列的照片高
      fistRowPhotosHeightArray.push(photos[i].offsetHeight)
    } else {
      // 放上第二列開始的照片
      // 找出第一列的最小高度
      const minHeight = Math.min(...fistRowPhotosHeightArray)
      // 紀錄最小高度的index，以取得對應到第一列的位置，來決定left要移動多少
      // console.log(fistRowPhotosHeightArray,minHeight)
      const index = fistRowPhotosHeightArray.indexOf(minHeight)
      // 調整接續的photo位置，放到目前最小高度的地方
      photos[i].style.top = minHeight + gap + 'px'
      // 取得對應到第一列photo的left位置
      // console.log(index,photos[index])
      photos[i].style.left = photos[index].offsetLeft + 'px'
      // 最後!!再把原本儲存在陣列裡面為最小高度的值，更新上最新的高度(原本的高度+新的高度+間隔)
      fistRowPhotosHeightArray[index] = fistRowPhotosHeightArray[index] + photos[i].offsetHeight + gap
    }
    //顯示
    photos[i].style.visibility = 'visible'
    photos[i].style.opacity = '1'

    //抓最後6筆比對高度
    if(i>=(photos.length-6)){
      heightArraay.push(photos[i].offsetHeight + photos[i].offsetTop + gap)
    }
  }
  //外框最大高度
  const maxHeight = Math.max(...heightArraay)
  // console.log('外框最大高度',maxHeight)
  photosContainer.style.height = maxHeight + 'px'
}
const search = (page)=>{
  // console.log(page)
  const publicWidth = document.querySelector('.publicContent .publicWidth')
  // let afterNumber = publicWidth.querySelectorAll('.publicBox').length
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
      // afterNumber = 0
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }
    // console.log( 179,page,json['pageTotle'], page<=json['pageTotle'])
    if(page>1 && page <= json['pageTotle']){
      // console.log(300,json['rows'])
      json['rows'].map(r=>{
        publicWidth.querySelector('.publicBoxs').append(publicBoxsHtml(r))
      })
      // afterNumber = afterNumber-4
    }
    // cascadeDisplay(afterNumber)
    cascadeDisplay()
    console.log('當前數量',publicWidth.querySelectorAll('.publicBox').length)
  });
}
const scroll=()=>{
  let throttleTimer;
  window.addEventListener("scroll", function(){
    // console.log('scroll')
    const publicWidth = document.querySelector('.publicContent .publicWidth')
    const publicBoxs = publicWidth.querySelector(".publicBoxs");
    console.log('publicBoxs',publicBoxs.dataset)
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
      // console.log(window.innerHeight + window.scrollY)
      // if (window.innerHeight + window.scrollY >= document.body.offsetHeight ) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - (window.innerHeight*1.5)) {
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
    }, 500);
  });
}
window.onload = function(){
  search(1)
  scroll()
}