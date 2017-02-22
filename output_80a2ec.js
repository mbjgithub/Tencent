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
	var event=__webpack_require__(5);
	var videoPlayer=__webpack_require__(9);

	// module.exports=function(){
	// 	$(document).ready(function(){
	// 	//这里需要我手动创建script标签把'//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js'加载到页面中吗
	// 	loadPlayer();   //预先把视频播放器加载到页面先
	// 	var script=$("<script type='text/javascript'></script>");
	// 	script.attr("src","//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js");
	// 	$("head").append(script);
	//     event();        //给
	//    });
	// }

	    //用法：直接require进来就行了
		module.exports=$(document).ready(function(){
		//这里需要我手动创建script标签把'//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js'加载到页面中吗
		loadPlayer();   //预先把视频播放器加载到页面先
		// var script=$("<script type='text/javascript'></script>");
		// script.attr("src","//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js");
		// $("head").append(script);
		// $(document).on('TxPlayerJSBrageReady', function(){

	 //    });
	    var script=document.createElement("script");
		script.src="https://vm.gtimg.cn/tencentvideo/txp/js/txplayer.js";
		var READY_STATE_RE = /^(?:loaded|complete|undefined)$/;
		script.onload=function() {
			      if (READY_STATE_RE.test(script.readyState)) {
			        // Ensure only run once and handle memory leak in IE
			        script.onload = null;
			        // Dereference the script
			        script = null;
			        var t=videoPlayer();
	                event(t);
			      }
			    };
		document.getElementsByTagName("body")[0].append(script);     
	   });

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var style=__webpack_require__(3);
	var tool=__webpack_require__(4);
	// 标准的16:9版播放器，会有黑边
	function setCss(video_container){
	  var clientWidth=tool.getClientWidth(),
	      tempWidthCount=Math.round(clientWidth/2/16),   //本来是以clientWidth/2作为video的width的，但是要尽量满足16：9
	      width=tempWidthCount*16,
	      height=tempWidthCount*9,   //16:9
	      left=parseInt((clientWidth-width)/2),
	      top=parseInt((tool.getClientHeight()-height)/3);
	      video_container.css({left:left,top:top});
	  video_container.find(".video_container_header").css({width:width});                
	  video_container.find("#video_container_body").css({width:width,height:height});
	}

	module.exports=function(){   //document ready的时候就执行这个函数，把视频播放器预先加载到页面
		var video_container=$("<div class='video_container'></div>");
	  video_container.append("<div class='video_container_header'><div class='video_container_header_title'></div><div class='video_container_header_close'>X</div></div>");
	  video_container.append("<div id='video_container_body'></div>");
	  
	  video_container.css(style.video_container);
	  video_container.find(".video_container_header").css(style.video_container_header);
	  video_container.find(".video_container_header_title").css(style.video_container_header_title);
	  video_container.find(".video_container_header_close").css(style.video_container_header_close);                 
	  video_container.find("#video_container_body").css(style.video_container_body);
	  setCss(video_container);   //这里必须要先设置好width和height，到时候加载视频的时候，就不需要等很久

	  // $(window).on("resize",function(){
	  //   setCss($(".video_container"));
	  // });

	  $("body").append(video_container);
	  video_container.mousedown(function(e){
	    var pageX=e.pageX,
	        pageY=e.pageY,
	        that=this,
	        left=$(that).position().left,
	        top=$(that).position().top;
	        
	    $(document).mousemove(function(e){
	         var x=e.pageX-pageX,y=e.pageY-pageY;
	         $(that).css({left:left+x,top:top+y});
	    });
	  }).mouseup(function(e){
	    $(document).unbind("mousemove");
	  });
	}



/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports={
	video_container:{
		position: "fixed",
		display:"none",
	  "zIndex":9999
	},
	video_container_header:{
	  	height: "30px",
	  	overflow: "hidden",
	  	// width: "100%",
	  	fontSize: "18px",
	  	backgroundColor: "#000",
	  	color: "#fff",
	    opacity:0.7,
	    paddingTop:"5px"
	  },
	video_container_header_title:{
	  	float:"left",
	  	marginLeft: "5px",
	  },
	video_container_header_close:{
	  	float: "right",
	  	marginRight:"6px",
	    color:"#fff",
	    cursor:"pointer",
	    padding:"0px 2px 2px 2px"
	  },
	video_container_body:{
		// width: "100%"
	 }
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

	module.exports={
		getClientWidth:getClientWidth,
		getClientHeight:getClientHeight
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var parse=__webpack_require__(6);
	var button=__webpack_require__(8);


	module.exports=function(player){
	  $("body").on("mouseover",function(e){
	      var count=10,temp=$(e.target),vid,
	          btn=button();
	      while(temp.length>0&&count--){
	        if(temp[0].nodeName.toLowerCase()==="a"&&(vid=parse(temp.attr("href")))&&temp.find("img").length>0){
	          temp.css({position:"relative",display:"inline-block"}).append(btn).on("mouseover",function(e){
	             var tempBtn=$(this).find("button");
	             tempBtn.css("display","block");
	             e.stopPropagation();
	          });
	          temp.on("mouseout",function(e){
	             var tempBtn=$(this).find("button");
	             tempBtn.css("display","none");
	             e.stopPropagation();
	          });
	          temp.find("button").on("click",function(e){
	               //make video player available
	               console.log(111111);
	               $(".video_container_header_title").text($(this).parent().attr("title")||$(this).parent().find("img").attr("alt")||"腾讯视频");
	               $(".video_container").css("display","block");  //在播放完当前视频后，广告也算是当前视频的？
	               if(player.getVid&&player.getVid()===vid&&player.getPlayerState()===2){  //当前视频被暂停的
	                  player.play();    //继续播放原来暂停的
	               }else{
	                  player.play({vid:vid,autoplay:true});  //播放新视频
	                  console.log(222222);
	                  console.log(player);
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
	  $(".video_container_header_close").on("click",function(e){
	                         $(".video_container").css("display","none");
	                         player.pause();   //关闭当前视频，就先暂停
	                         e.stopPropagation();
	                     });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// var path = require('path');
	var reg=__webpack_require__(7);

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
/* 7 */
/***/ function(module, exports) {

	module.exports={
		vidReg:/^[\w]{11}$/
	}


/***/ },
/* 8 */
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
/* 9 */
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
	function setCss(w,h){
	  var video_container=$(".video_container"),
	      clientWidth=tool.getClientWidth(),
	      width=Math.round(clientWidth/2),   
	      height=(width/w)*h,   
	      left=parseInt((clientWidth-width)/2),
	      top=parseInt((tool.getClientHeight()-height)/3);
	      video_container.css({left:left,top:top});
	  video_container.find(".video_container_header").css({width:width});                
	  video_container.find("#video_container_body").css({width:width,height:height});
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
	//这里在火狐和chrome插件下拿不到正确的player
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
	        'HdPlayerControl',
	        'UiPoster',
	        'UiControl'
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
	  showOpenVIPGuide:(function(player){
	         return function(){
	              var temp=$("#mod_head_notice_trigger");
	              if(temp.attr("alt")==="未登陆"||temp.find("img").attr("src").indexOf("?")===-1){
	                 //说明没有登陆
	                 temp.trigger("click");  //登陆了之后应该调到http://v.qq.com/u/hlw/hlw_index.html，可以监听登陆成功事件
	              }else{
	              window.open("http://v.qq.com/u/hlw/hlw_index.html");
	             }
	             player.trigger('1080pVipGuideClose',{action:'closeSkipAd'});
	         }
	  })(player)
	});
	//播放的视频改变,playStateChange:播放的状态改变
	player.on("vidChange",function(data){   //拿到这个视频需要的时间可能比较的久，造成很大的延时
	      //player.autoResize();
	      var videoSize=player.getVideoSize();
	      setCss(videoSize.width,videoSize.height);
	});

	$(window).on("resize",function(){
	      var videoSize=player.getVideoSize();
	      setCss(videoSize.width,videoSize.height);
	});

	return player;
	};



/***/ }
/******/ ]);