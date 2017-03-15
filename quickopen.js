/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var loadPlayer=__webpack_require__(2);
	var event=__webpack_require__(6);
	var videoPlayer=__webpack_require__(12);
	var windowEvent=__webpack_require__(13);

		var link=document.createElement("link")
		link.href="//mbjgithub.github.io/Tencent/quick_open_float.css"
		link.type="text/css"
		link.rel="stylesheet"     //忘记加这个搞了我好久
		document.getElementsByTagName("head")[0].append(link)
	    //用法：直接require进来就行了
		module.exports=$(document).ready(function(){
		loadPlayer();   //预先把视频播放器加载到页面先

	    var script=document.createElement("script");
		script.src="//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js";
		var READY_STATE_RE = /^(?:loaded|complete|undefined)$/;
		script.onload=function() {
			      if (READY_STATE_RE.test(script.readyState)) {
			        // Ensure only run once and handle memory leak in IE
			        script.onload = null;
			        // Dereference the script
			        script = null;
			        var t=videoPlayer();
	                event(t);
	                windowEvent(t);
			      }
			    };
		document.getElementsByTagName("body")[0].append(script);     
	   });

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var style=__webpack_require__(3);
	var tool=__webpack_require__(4);
	var container=__webpack_require__(5)

	// 标准的16:9版播放器，会有黑边
	function setCss(video_container){
	  var clientWidth=tool.getClientWidth(),
	      tempWidthCount=Math.round(clientWidth/2/16),   //本来是以clientWidth/2作为video的width的，但是要尽量满足16：9
	      width=tempWidthCount*16,
	      height=tempWidthCount*9;   //16:9                
	     video_container.find("#video_container_body").css({width:width,height:height});
	}

	module.exports=function(){   //document ready的时候就执行这个函数，把视频播放器预先加载到页面
		var video_container=$("<div class='video_container'></div>");
	  video_container.append(container.body);
	  
	  video_container.css(style.video_container);
	  setCss(video_container)
	  $("body").append(video_container);

	}



/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports={
	video_container:{
		position: "fixed",
		display:"none",
		zIndex:9999,
		width:'100%',
		height:'100%',
		left:0,
	    top:0
	 },

	}



/***/ },
/* 4 */
/***/ function(module, exports) {

	function getClientWidth () {
		if (document.compatMode == 'BackCompat') {
			return document.body.clientWidth
		} else {
			return document.documentElement.clientWidth
		}
	}

	function getClientHeight () {
		if (document.compatMode == 'BackCompat') {
			return document.body.clientHeight
		} else {
			return document.documentElement.clientHeight
		}
	}

	function loadScript(url,callback){
	    var script=document.createElement("script");
		script.src=url;
		var READY_STATE_RE = /^(?:loaded|complete|undefined)$/;
		script.onload=script.onreadystatechange=function() {
			      if (READY_STATE_RE.test(script.readyState)) {
			        // Ensure only run once and handle memory leak in IE
			        script.onload=script.onreadystatechange = null;
			        // Dereference the script
			        script = null;
			        callback()
			      }
			    };
		document.getElementsByTagName("body")[0].append(script);  
	}

	function formateTime(s){  //传入的是秒
	   var h=parseInt(s/3600)
	   s=s-h*3600
	   var m=parseInt(s/60)
	   s=s-m*60
	   h=h<=0?"":h<10?"0"+h:h
	   m=m<10?"0"+m:m
	   s=s<10?"0"+s:s
	   return h!=""?(h+":"+m+":"+s):(m+":"+s)
	}

	function formateDate(str){
		var temp=["年","月","日"],i=0;
	    str=str.replace(/\s+[\w:]*$/,"-");
		return str.replace(/-/g,function(){
	        console.log(temp[i])
			return temp[i++] 
		})
	}

	module.exports={
		getClientWidth:getClientWidth,
		getClientHeight:getClientHeight,
		loadScript:loadScript,
		formateDate:formateDate,
		formateTime:formateTime
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports={
		body:'<div class="poplayer_quickplay">  <!-- svg sprite -->  <svg class="svg_sprite" display="none" version="1.1" xmlns="http://www.w3.org/2000/svg">   <symbol id="svg_qp_icon_prev" viewBox="0 0 22 43">    <path d="M21.842 0.16a.9.9 0 0 1-.2 1.21l-19.909 20.13 19.909 20.13a.9.9 0 0 1 .2 1.21.861.861 0 0 1-1.191-.21l-20.4-20.63a.628.628 0 0 1 0-1l20.4-20.63a.861.861 0 0 1 1.191-.21z"></path>   </symbol>   <symbol id="svg_qp_icon_next" viewBox="0 0 22 43">    <path d="M0.19 0.16a.9.9 0 0 0 .2 1.21l19.91 20.13-19.91 20.13a.9.9 0 0 0-.2 1.21.86.86 0 0 0 1.19-.21l20.4-20.63a.627.627 0 0 0 0-1l-20.4-20.63a.86.86 0 0 0-1.19-.21z"></path>   </symbol>   <symbol id="svg_qp_icon_close" viewBox="0 0 38 38">    <path d="M0.39 36.69a.864.864 0 0 0-.2 1.18.887.887 0 0 0 1.19-.2l17.65-17.66 17.65 17.66a.887.887 0 0 0 1.19.2.864.864 0 0 0-.2-1.18l-17.66-17.66 17.66-17.66a.864.864 0 0 0 .2-1.18.876.876 0 0 0-1.19.2l-17.65 17.65-17.65-17.65a.876.876 0 0 0-1.19-.2.864.864 0 0 0 .2 1.18l17.65 17.66z"></path>   </symbol>  </svg>   <div class="quickplay_container">   <div class="quickplay_player" id="video_container_body">    <!-- 插入播放器 -->   </div>   <div style="height:70px;" class="quickplay_headline">    <h1 class="qp_video_title"><a>科技三分钟</a></h1>    <a class="qp_user_info"><img class="qp_user_avatar"><span class="qp_user_name">QM工作室</span></a>    <div class="qp_video_meta">     <a class="qp_comments">122条评论</a>     <span class="qp_date">2017年10月2日发布</span>    </div>   </div>  </div>  <div class="quickplay_foot">   <div class="qp_figures_scroll">    <div class="qp_mod_figures">     <ul class="qp_figures_list">      </ul>    </div>   </div>  </div>     <a href="javascript:void(0);" class="qp_btn_prev qp_btn_disabled" title="上一个">   <svg class="svg_icon" viewBox="0 0 22 43" width="22" height="43"><use xlink:href="#svg_qp_icon_prev"></use></svg>   <span class="qp_btn_text">精彩马上呈现</span>  </a>  <a href="javascript:void(0);" class="qp_btn_next" title="下一个">   <span class="qp_btn_text">精彩马上呈现</span>   <svg class="svg_icon" viewBox="0 0 22 43" width="22" height="43"><use xlink:href="#svg_qp_icon_next"></use></svg>  </a>   <a href="javascript:void(0);" class="qp_pop_close"><svg class="svg_icon" viewBox="0 0 38 38" width="38" height="38"><use xlink:href="#svg_qp_icon_close"></use></svg></a>     </div> ',
	    item:'<li class="qp_list_item">'+
							'<a href="javascript:void(0);" class="qp_figure" tabindex="-1">'+
								'<img class="qp_figure_pic">'+
								'<div class="qp_figure_caption">'+
									'<span class="qp_figure_info"></span>'+
								'</div>'+
							'</a>'+
							'<div class="qp_figrue_titles">'+
								'<strong class="qp_figure_title qp_figure_title_two_row"><a></a></strong>'+
							'</div>'+
						'</li>'

	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var parse=__webpack_require__(7);
	var button=__webpack_require__(9);
	var recommend=__webpack_require__(10)
	var setCss=__webpack_require__(11);

	module.exports=function(player){
	  var globalVid;
	  $("body").on("mouseover",function(e){
	      var count=10,temp=$(e.target),vid,btnLeft,
	          btn=button();
	      while(temp.length>0&&count--){
	        if(temp[0].nodeName.toLowerCase()==="a"&&
	                (vid=globalVid=parse(temp.attr("href")))&&
	                (temp.find("img").length>0)){
	          temp.css({position:"relative",display:"inline-block"}).append(btn).on("mouseover",function(e){
	             var tempBtn=$(this).find("button");
	             tempBtn.css("display","block");
	             if(btnLeft){
	              tempBtn.css({right:120,top:120});
	             }
	             e.stopPropagation();
	          });
	          temp.on("mouseout",function(e){
	             var tempBtn=$(this).find("button");
	             tempBtn.css("display","none");
	             e.stopPropagation();
	          });
	          temp.find("button").on("click",function(e){
	               //make video player available
	               // btnLeft? $(".video_container_header_title").text(temp.text()) :
	               $(".video_container").css("display","block");  //在播放完当前视频后，广告也算是当前视频的？
	               if(player.getVid()===vid&&player.getPlayerState()===2){  //当前视频被暂停的
	                  player.play();    //继续播放原来暂停的
	               }else{
	                  player.play({vid:vid,autoplay:true});  //播放新视频
	                  setTimeout(function(){
	                    recommend.loadData(vid);
	                  },0)
	               }
	               e.stopPropagation();
	               e.preventDefault();
	          });
	          break;
	        }
	        temp=temp.parent();
	      }
	      //可以考虑要不要给e.target打标记，下一次在mouseover这个元素的时候，就直接return，连这10此循环都不用做
	  });

	player.on("playStateChange",function(d){   //拿到这个视频需要的时间可能比较的久，造成很大的延时
	      //player.autoResize();
	      if(d.state===0){
	         getVidAndPlay($('.qp_list_item')[0])
	      }else if(player.getVid!=globalVid){
	        var videoSize=player.getVideoSize();
	        setCss(videoSize.width,videoSize.height);
	      }
	      
	});

	function tempStop(e){
	        $(".video_container").css("display","none");
	        player.pause();   //关闭当前视频，就先暂停
	        e.stopPropagation();
	  }
	function getVidAndPlay(dom){
	    var vid=$(dom).data("vid")
	    if(vid){
	       player.play({vid:vid,autoplay:true});  //播放新视频
	                  setTimeout(function(){
	                    recommend.loadData(vid);
	                  },0)
	    }
	}
	  $(".qp_pop_close").on("click",function(e){
	        tempStop(e)
	  });

	  $(".poplayer_quickplay").click(function(e){  
	    if(e.target===this){
	       tempStop(e)
	    } 
	  })

	  $(".qp_btn_next .qp_btn_text").on('click',function(){
	     getVidAndPlay(this)
	  });
	  
	  $('.qp_figures_list').on("click",function(e){
	      if(e.target.nodeName.toLowerCase()=="ul"){
	        return 
	      }
	      var temp=$(e.target)
	      while(temp[0].nodeName.toLowerCase()!="li"){
	          temp=temp.parent()
	      }
	      getVidAndPlay(temp[0])
	  })

	}



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// var path = require('path');
	var reg=__webpack_require__(8);

	function parse(url){
	    // var basename=path.basename(url,".html");
	    if(url==undefined){
	    	return false;
	    }
	    var basename=url.slice(url.lastIndexOf("/")+1);
	    basename=basename.slice(0,basename.lastIndexOf("."));
	    return reg.vidReg.test(basename)&&basename;  //11位的数字和字母混合
	}

	module.exports=parse;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports={
		vidReg:/^[\w]{11}$/
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports=function(){
		var css={
		  width:40,
	    height:20,
	    backgroundColor:"#0D77E6",
	    color:"#FBFDFF",
	    position:"absolute",
	    top:"2px",
	    right:"4px",
	    display:"block",
	    textAlign:"center",
	    border:"1px solid #0D77E6",
	    borderRadius:"3px",
	    fontSize:"14px",
	    cursor:"pointer",
	    overflow:"hidden"
	  } 

	  var btn=$("<button></button>"); 
	  btn.css(css);
	  btn.text("酷开");
	  return btn;
	}



/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var tools=__webpack_require__(4)
	var dom=__webpack_require__(5)

	var LIST_LENGTH=7

	var path="//node.video.qq.com/x/api/quick_open?callback=cb&vid="
	function cb(d){
	   d.upload_qq_info=JSON.parse(d.upload_qq_info)
	   window.data=d
	   console.log(d)
	}
	window.cb=cb
	function loadData(vid){
	    tools.loadScript(path+vid,function(){
	    	$(".qp_video_title a").text(data.title).attr({href:data.url,title:data.title})
	    	$('.qp_user_info').attr('href',data.upload_qq_info.info.urlfull)
	    	$('.qp_user_avatar').attr('src',data.upload_qq_info.info.avatar)
	    	$('.qp_user_name').text(data.upload_qq_info.info.nick||"此英雄没有留下昵称")
	    	$('.qp_comments').text("122条评论").attr('href',"v.qq.com")   //评论的地址
	    	$('.qp_date').text(tools.formateDate(data.publish_date))
	    	var len=data.cover_video.length,
	    	    len=len<7?len:LIST_LENGTH,
	    	    i,rec;
	         $(".qp_figures_list").text('')  //清空
	    	for(i=0;i<len;i++){
	           item=$(dom.item);
	           rec=data.cover_video[i].jsonData;
	           if(i===0){
	           	item.addClass('qp_current')
	           	$('.qp_btn_text').text(rec.title).data("vid",rec.vid)   
	           }
	           item.find('.qp_figure').attr("title",rec.title)
	           item.find('.qp_figure_pic').attr({src:rec.pic_228_128,alt:rec.title})
	           item.find('.qp_figure_info').text(tools.formateTime(rec.duration))
	           item.find('.qp_figure_title a').text(rec.title).attr({href:rec.title,title:rec.title})
	           item.data('vid',rec.vid)
	           $(".qp_figures_list").append(item)
	    	}
	    })
	}

	module.exports={
		loadData:loadData
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var tool=__webpack_require__(4);


	//这里是保证绝对的播放器比例，但是效果还没有下面好
	// function setCss(w,h){
	//   var video_container=$(".video_container"),
	//       clientWidth=tool.getClientWidth(),
	//       tempWidthCount=Math.round(clientWidth/2/w),   //本来是以clientWidth/2作为video的width的，但是要尽量满足16：9
	//       width=tempWidthCount*w,
	//       height=tempWidthCount*h,   //16:9
	//       left=parseInt((clientWidth-width)/2),
	//       top=parseInt((tool.getClientHeight()-height)/3);
	//       video_container.css({left:left,top:top});
	//       console.log(w+" "+h);
	//   video_container.find(".video_container_header").css({width:width});                
	//   video_container.find("#video_container_body").css({width:width,height:height});
	// }

	//这样的效果最好，播放器的width直接是clientWidth/2,然后高度直接采用比例
	// function setCss(w,h){
	//   var video_container_body=$("#video_container_body"), 
	//       height=video_container_body.css("height"),   
	//       width=w*height/h;               
	//       video_container_body.css({width:width});    //我还是得动态拿
	// }
	function setCss(w,h){
	  var quickplay_container=$(".quickplay_container")
	      rule=w/h,
	      clientWidth=tool.getClientWidth(),
	      width=Math.round(clientWidth/2),   
	      height=(rule<1.82&&rule>1.71)?(width/w)*h:width/1.777,   
	      left=parseInt((clientWidth-width)/2);
	      
	      quickplay_container.css({left:left});             
	     $("#video_container_body").css({width:width,height:height});
	}
	//采用的就是播放器的width和height
	// function setCss(width,height){
	//   var video_container=$(".video_container"),
	//       clientWidth=tool.getClientWidth(), 
	//       left=parseInt((clientWidth-width)/2),
	//       top=parseInt((tool.getClientHeight()-height)/3);
	//       video_container.css({left:left,top:top});
	//   video_container.find(".video_container_header").css({width:width});                
	//   video_container.find("#video_container_body").css({width:width,height:height});
	// }


	module.exports=setCss

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var setCss=__webpack_require__(11);
	var tools=__webpack_require__(4);

	function playVideo(player){
	         player.trigger('1080pVipGuideClose',{action: 'close1080p'});
	         player.play();
	}

	function isLogin(temp){
	  var res=true;
	   if(temp.attr("alt")==="未登陆"||temp.find("img").attr("src").indexOf("?")===-1){
	      res=false;
	   }
	   return res;
	}

	function loadVIPIFrame(player){
	  var iframe=$('iframe[src="//film.qq.com/ipay/minipay.shtml?s=minipay&amp;ch=qdqb,kj,weixin&amp;c=txsp&amp;dc=weixin&amp;n=3&amp;u=_self&amp;autopay=0&amp;aid=V0$$2:1000$4:19$1:6$11:8&amp;month=3&amp;cash_param=v%3D1%26_fd_id%3Ddialog_1%26_fd_c%3D3944924559%26_fd_size%3D770%7C575%26_fd_w%3Dleft_sidebar%26_fd_ms%3DmodifyTitle"]');
	  if(iframe.length<=0){
	    div=$('<div class="tvmp_iframe" style="visibility: hidden;display: block; position: fixed; z-index: 10001; left: 50%; top: 50%; width: 770px; height: 575px; margin: -287px 0px 0px -385px;"></div>');
	    iframe=$('<iframe class="cash_dialog_frame" frameborder="no" scrolling="auto" src="//film.qq.com/ipay/minipay.shtml?s=minipay&amp;ch=qdqb,kj,weixin&amp;c=txsp&amp;dc=weixin&amp;n=3&amp;u=_self&amp;autopay=0&amp;aid=V0$$2:1000$4:19$1:6$11:8&amp;month=3&amp;cash_param=v%3D1%26_fd_id%3Ddialog_1%26_fd_c%3D3944924559%26_fd_size%3D770%7C575%26_fd_w%3Dleft_sidebar%26_fd_ms%3DmodifyTitle" style="width: 770px; height: 575px; background: transparent; overflow-x: hidden;"></iframe>');
	    div.append(iframe);
	    $("body").prepend(div);
	    iframe.on("load",function(){
	      var that=$(".cash_dialog_frame");
	      $($(that)[0].contentWindow.document).find("#minipay_close").on("click",function(){
	          $(that).parent().css("visibility","hidden");
	          playVideo(player);
	      })
	    });
	   }
	   div.css("visibility","visible");
	}

	module.exports=function(){
	Txplayer.dataset.H5PlayerStyleUrl['diy'] = '//vm.gtimg.cn/tencentvideo/txp/style/txp_desktop_v2.css';  //添加样式
	var player = new Txplayer({
	  containerId: 'video_container_body',
	  vid: 'r0018hmh1pa',   //先随便填一个，不知道可不可以填一个错的vid
	  width: '100%',
	  height: '100%',
	  playerType: 'diy',
	  autoplay: false,
	  useSVG: true,
	  showLogo: true,
	  enForcePlayerType:true,
	  pluginsMap: {
	    vod: {
	      diy: [
	        'HtmlFrame',
	        'HdPlayer',
	        'HdPlayerHistory',
	        'HdPlayerControl',
	        'UiPoster',
	        'UiControl',
	        'UiLoading'
	      ]
	    }
	  },
	    settings: {
	    UiControl: {
	      subPlugins: [
	        'UiControlPlay',   
	        'UiShowTime',      //显示时间
	        'UiVolume',        //显示音量
	        'UiProgress',     //显示进度条
	        'UiSettings',
	        'UiDefinition',
	        //'UiBrowserFullScreen',  //网页全屏
	        'UiWindowFullScreen',   //浏览器全屏
	        'UiLogo'         //显示腾讯视频logo
	      ]
	    }
	  },
	  showOpenVIPGuide:(function(player){   //点广告的关闭按钮需要执行的函数
	         return function(){
	              var temp=$("#mod_head_notice_trigger");
	              if(!isLogin(temp)){  //说明没有登陆
	                 temp.trigger("click");  //登陆了之后应该调到http://v.qq.com/u/hlw/hlw_index.html，可以监听登陆成功事件
	              }else{
	              window.open("http://v.qq.com/u/hlw/hlw_index.html");
	             }
	             player.trigger('1080pVipGuideClose',{action:'closeSkipAd'});
	         }
	  })(player)
	});
	//播放的视频改变,playStateChange:播放的状态改变


	player.on("showUIVipGuide",function(e){
	  var temp=$("#mod_head_notice_trigger");
	   if(!isLogin(temp)){
	     temp.trigger("click");
	     $($(".iframe_mask")[0].contentWindow.document).find("#login_close").on("click",function(){  //如果用户点击的是关闭按钮
	       player.togglePlayPause()
	     });
	     return;
	   }
	   if(e.switchDefinitionFail){   //表示当前用户不是VIP
	        // 第一种方案，打开一个导向到可以开通VIP的页面
	        // var a=$("a[href='http://film.qq.com']");
	        // if(a.length<=0){
	        //  a=$("<a href='http://film.qq.com'></a>");
	        //  a.css("display","none");
	        //  $("body").append(a);
	        // }
	        // a[0].click();
	        // player.trigger('1080pVipGuideClose',{action: 'close1080p'});
	        // player.play();
	        
	        //第二种方案，弹出一个开通VIP的浮层
	        loadVIPIFrame(player);
	   }else{  //是VIP
	        
	   }
	});




	return player;
	};



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var setCss=__webpack_require__(11);

	module.exports=function(player){

	  $(window).on("resize",function(){
	      var videoSize=player.getVideoSize();
	      setCss(videoSize.width,videoSize.height);
	  }).on("keydown",function(e){
	  	  if($(".video_container").css("display")!=="none"){   //只有在播放器在页面中显示的时候，才响应
	         
	         switch(e.which){
	           case 32:player.togglePlayPause();   //空格
	                   break;
	           case 37:player.seekLeft();
	                   break;//左
	           case 39:player.seekRight();
	                   break;//右
	           case 27:$(".video_container").css("display","none");
	                   player.pause();
	                   break;//esc
	         }
	     }
	     e.preventDefault();
	  })
	 

	}

/***/ }
/******/ ]);