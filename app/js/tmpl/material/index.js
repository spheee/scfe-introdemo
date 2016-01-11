define('app/modules/tmpl/material/index', function(require, exports, module) {

  var tpl = {};
  tpl.List = $["list"]=function(it) {
  var out='';var arr1=it;if(arr1){var list,i1=-1,l1=arr1.length-1;while(i1<l1){list=arr1[i1+=1];out+=' <!--内容卡片--> <article class="card"> <!--头部--> <header> <!--头像--> <a class="card_avatar" href="javascript:;"> <div class="media-main"> <img alt="测试头像" src="'+(list.imgSrc)+'"> </div> </a> <!--文字--> <div class="card_brief"> <a href="'+(list.url)+'" class="brief_title"><span>'+(list.title)+'</span> </a> <div class="brief_content"><span class="time">创建时间:</span> <!--<span class="from">2015-12-15&nbsp;&nbsp;21:12</span></div>--> <span class="from">'+(list.time)+'</span></div> </div> </header> <!--内容--> <section class="card_detail"> <!--基础内容部分--> <p class="default_content"> '+(list.textContent)+' ';if(list.videoLink){out+=' <a class="link" href="'+(list.videoLink)+'">视频链接</a> ';}out+=' </p> <!--扩展内容部分--> ';if(list.trans.imgList.length!==0){out+=' <div class="extend_content"> <div class="inner"> <p class=""> <a class="link" href="javascript:;">@南京市中级人民法院：</a>一审开庭直播，欢迎大家收看是世界各国普遍设立的国家机关。主要通过审判活动惩纠纷，维护公平正义。人民法院是中华人民共和国 </p> <div class="pic_list"> <ul> ';var arr2=list.trans.imgList;if(arr2){var img,i2=-1,l2=arr2.length-1;while(i2<l2){img=arr2[i2+=1];out+=' <li><img alt="'+(img.img.alt)+'" src="'+(img.img.src)+'"></li> ';} } out+=' </ul> </div> </div> </div> ';}out+=' </section> <!--动作条--> <footer class="card_handlebar line_top" data-materialId='+(list.materialId)+'> <a href="javascript:;" class=""><i class="handlebar_use"></i>采用</a> <a href="javascript:;" class=""><i class="handlebar_favorite"></i>收藏</a> <!--<a href="javascript:;" class=""><i class="handlebar_collection"></i>36</a>--> </footer> </article>';} } return out;
  };
  tpl.Cat = $["category"]=function(it) {
  var out=' <!--滑动条框体--> ';var arr1=it;if(arr1){var cat,i1=-1,l1=arr1.length-1;while(i1<l1){cat=arr1[i1+=1];out+=' <!--滑动块--> <li class="bar_slider ';if(it.indexOf(cat)==0){out+='selected';}out+='" data-category="'+(cat.categoryid)+'"> '+(cat.categoryTitle)+'</li> ';} } return out;
  };
  module.exports = tpl;
  

});
