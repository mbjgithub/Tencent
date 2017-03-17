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
		link.href="//vm.gtimg.cn/tencentvideo/vstyle/web/v4/style/quickplay.css"
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
			        window.t=t
	                event(t);
	                windowEvent(t);
			      }
			    };
		document.getElementsByTagName("body")[0].append(script);     
	   });



		//秒开没有完成的事情，1、第一个视频广告的屏蔽，2、mouseover的时候出现的闪电往当前的页面插入了太多的svg元素，
		//3、评论没有拿到,4、在播放广告的时候，关闭视频，广告还在播放，5、高亮显示的第一个视频不应该是当前视频

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var style=__webpack_require__(3);
	var tools=__webpack_require__(4);
	var container=__webpack_require__(5)



	module.exports=function(){   //document ready的时候就执行这个函数，把视频播放器预先加载到页面
		var poplayer_quickplay=$(container.body);
	  tools.setOriginCss(poplayer_quickplay)    //一定要事先给容纳播放器的div预先设置好width和height
	  $("body").append(poplayer_quickplay);
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
		script.className="quick_open_script"
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
			return temp[i++] 
		})
	}

	function invalidScroll(){
		var cw,
		    fw=$(window).width();
		$("html").css("overflow-y","hidden");
		cw=$(window).width();
		$("html").css("margin-right",cw-fw)
	}

	function validScroll(){
		$("html").css({"margin-right":"","overflow-y":""})
	}

	function showPlayerMask(){
	    $(".poplayer_quickplay").removeClass("none")
	    invalidScroll()
	}

	function hiddenPlayerMask(){
	   $(".poplayer_quickplay").addClass("none")
	   validScroll()
	}


	/**
	  str="page=1&vidNum=7&interveneNum=0"
	*/
	function getPageData(str){
		var m=str.match(/\d+/g)
		return m
	}

	function formatePagecontext(page,vidNum){
		return "page="+page+"&vidNum="+vidNum+"&interveneNum=0"
	}


	// 标准的16:9版播放器，会有黑边
	function setOriginCss(poplayer_quickplay){
		console.log(poplayer_quickplay.find(".quickplay_container").width())
	  var width=getClientWidth()*0.6,   
	      height=width*9/16;   //16:9              
	     poplayer_quickplay.find("#video_container_body").css({width:width,height:height});
	}

	module.exports={
		getClientWidth:getClientWidth,
		getClientHeight:getClientHeight,
		loadScript:loadScript,
		formateDate:formateDate,
		formateTime:formateTime,
		showPlayerMask:showPlayerMask,
		hiddenPlayerMask:hiddenPlayerMask,
		getPageData:getPageData,
		formatePagecontext:formatePagecontext,
		setOriginCss:setOriginCss
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports={
		body:'<div class="poplayer_quickplay none"> 	<svg class="svg_sprite" display="none" version="1.1" xmlns="http://www.w3.org/2000/svg"> 		<symbol id="svg_qp_icon_prev" viewBox="0 0 22 43"> 			<path d="M21.842 0.16a.9.9 0 0 1-.2 1.21l-19.909 20.13 19.909 20.13a.9.9 0 0 1 .2 1.21.861.861 0 0 1-1.191-.21l-20.4-20.63a.628.628 0 0 1 0-1l20.4-20.63a.861.861 0 0 1 1.191-.21z"></path> 		</symbol> 		<symbol id="svg_qp_icon_next" viewBox="0 0 22 43"> 			<path d="M0.19 0.16a.9.9 0 0 0 .2 1.21l19.91 20.13-19.91 20.13a.9.9 0 0 0-.2 1.21.86.86 0 0 0 1.19-.21l20.4-20.63a.627.627 0 0 0 0-1l-20.4-20.63a.86.86 0 0 0-1.19-.21z"></path> 		</symbol> 		<symbol id="svg_qp_icon_close" viewBox="0 0 38 38"> 			<path d="M0.39 36.69a.864.864 0 0 0-.2 1.18.887.887 0 0 0 1.19-.2l17.65-17.66 17.65 17.66a.887.887 0 0 0 1.19.2.864.864 0 0 0-.2-1.18l-17.66-17.66 17.66-17.66a.864.864 0 0 0 .2-1.18.876.876 0 0 0-1.19.2l-17.65 17.65-17.65-17.65a.876.876 0 0 0-1.19-.2.864.864 0 0 0 .2 1.18l17.65 17.66z"></path> 		</symbol> 		<symbol id="svg_qp_icon_prev_sm" viewBox="0 0 14 25"> 			<path d="M0 12.5a.79.79 0 0 0 .26.53l11.51 11.7a1.928 1.928 0 0 0 1.97 0 2.109 2.109 0 0 0 0-2.04l-9.82-10.19 9.82-10.19a2.109 2.109 0 0 0 0-2.04 1.928 1.928 0 0 0-1.97 0l-11.51 11.7a.79.79 0 0 0-.26.53z"></path> 		</symbol> 		<symbol id="svg_qp_icon_next_sm" viewBox="0 0 14 25"> 			<path d="M14 12.5a.79.79 0 0 0-.26-.53l-11.51-11.7a1.928 1.928 0 0 0-1.97 0 2.109 2.109 0 0 0 0 2.04l9.82 10.19-9.82 10.19a2.109 2.109 0 0 0 0 2.04 1.928 1.928 0 0 0 1.97 0l11.51-11.7a.79.79 0 0 0 .26-.53z"></path> 		</symbol> 	</svg> 	<div class="quickplay_container"> 		<div id="video_container_body" class="quickplay_player"> 			<!-- 插入播放器 --> 		</div> 		<div class="quickplay_headline"> 			<h1 class="qp_video_title"><a href="" target="_blank"></a></h1> 			<a href="" class="qp_user_info"><img class="qp_user_avatar"><span class="qp_user_name"></span></a> 			<div class="qp_video_meta"> 				<a href="" class="qp_comments">122条评论</a> 				<span class="qp_date"></span> 			</div> 		</div> 	</div> 	<div class="quickplay_foot"> 		<div class="qp_figures_scroll"> 			<div class="qp_mod_figures"> 				<ul class="qp_figures_list"> 					 				</ul> 			</div>  			<a href="javascript:void(0);" class="qp_figure_btn_prev qp_btn_disabled" title="上一个"> 				<svg class="svg_icon" viewBox="0 0 14 25" width="14" height="25"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_qp_icon_prev_sm"></use></svg> 			</a> 			<a href="javascript:void(0);" class="qp_figure_btn_next" title="下一个"> 				<svg class="svg_icon" viewBox="0 0 14 25" width="14" height="25"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_qp_icon_next_sm"></use></svg> 			</a>  		</div> 	</div> 	  	<a href="javascript:void(0);" class="qp_btn_prev qp_btn_disabled" title="上一个"> 		<svg class="svg_icon" viewBox="0 0 22 43" width="22" height="43"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_qp_icon_prev"></use></svg> 		<span class="qp_btn_text">无论你看了多少遍西游记， 这个镜头你一定没发现</span> 	</a> 	<a href="javascript:void(0);" class="qp_btn_next" title="下一个"> 		<span class="qp_btn_text">无论你看了多少遍西游记， 这个镜头你一定没发现</span> 		<svg class="svg_icon" viewBox="0 0 22 43" width="22" height="43"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_qp_icon_next"></use></svg> 	</a>  	<a href="javascript:void(0);" class="qp_pop_close"><svg class="svg_icon" viewBox="0 0 38 38" width="38" height="38"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_qp_icon_close"></use></svg></a> 			 </div>',
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
						'</li>',
		symbol:'<symbol id="svg_icon_quickplay" viewBox="0 0 14 18">'+
	               '<path d="M5.645 3.625L0 0v18l5-3.215V10H2l3.645-6.375zM6 3.854V8h3l-3.805 6.66L14 9 6 3.854z"></path>'+
	           '</symbol>',

	  icon:'<svg class="svg_icon" viewBox="0 0 14 18" width="14" height="18"><defs><linearGradient id="qpGradient"><stop offset="0%" stop-color="#FF652B"></stop><stop offset="100%" stop-color="#FF5542"></stop></linearGradient></defs><path d="M5.645 3.625L0 0v18l5-3.215V10H2l3.645-6.375zM6 3.854V8h3l-3.805 6.66L14 9 6 3.854z"></path></svg>'

	}


	// <li class="qp_list_item qp_current"> 						<a href="javascript:void(0);" class="qp_figure" tabindex="-1" > 							<img class="qp_figure_pic" > 							<div class="qp_figure_caption"> 								<span class="qp_figure_info"></span> 							</div> 						</a> 						<div class="qp_figure_titles"> 							<strong class="qp_figure_title qp_figure_title_two_row"><a ></a></strong> 								 						</div> 					</li> 					<li class="qp_list_item"> 						<a href="javascript:void(0);" class="qp_figure" tabindex="-1" > 							<img class="qp_figure_pic" > 							<div class="qp_figure_caption"> 								<span class="qp_figure_info"></span> 							</div> 						</a> 						<div class="qp_figure_titles"> 							<strong class="qp_figure_title qp_figure_title_two_row"><a ></a></strong> 								 						</div> 					</li> 					<li class="qp_list_item"> 						<a href="javascript:void(0);" class="qp_figure" tabindex="-1" > 							<img class="qp_figure_pic" > 							<div class="qp_figure_caption"> 								<span class="qp_figure_info"></span> 							</div> 						</a> 						<div class="qp_figure_titles"> 							<strong class="qp_figure_title qp_figure_title_two_row"><a ></a></strong> 								 						</div> 					</li> 					<li class="qp_list_item"> 						<a href="javascript:void(0);" class="qp_figure" tabindex="-1" > 							<img class="qp_figure_pic" > 							<div class="qp_figure_caption"> 								<span class="qp_figure_info"></span> 							</div> 						</a> 						<div class="qp_figure_titles"> 							<strong class="qp_figure_title qp_figure_title_two_row"><a ></a></strong> 								 						</div> 					</li> 					<li class="qp_list_item"> 						<a href="javascript:void(0);" class="qp_figure" tabindex="-1" > 							<img class="qp_figure_pic" > 							<div class="qp_figure_caption"> 								<span class="qp_figure_info"></span> 							</div> 						</a> 						<div class="qp_figure_titles"> 							<strong class="qp_figure_title qp_figure_title_two_row"><a ></a></strong> 								 						</div> 					</li> 					<li class="qp_list_item"> 						<a href="javascript:void(0);" class="qp_figure" tabindex="-1" > 							<img class="qp_figure_pic" > 							<div class="qp_figure_caption"> 								<span class="qp_figure_info"></span> 							</div> 						</a> 						<div class="qp_figure_titles"> 							<strong class="qp_figure_title qp_figure_title_two_row"><a ></a></strong> 								 						</div> 					</li> 					<li class="qp_list_item"> 						<a href="javascript:void(0);" class="qp_figure" tabindex="-1" > 							<img class="qp_figure_pic" > 							<div class="qp_figure_caption"> 								<span class="qp_figure_info"></span> 							</div> 						</a> 						<div class="qp_figure_titles"> 							<strong class="qp_figure_title qp_figure_title_two_row"><a ></a></strong> 								 						</div> 					</li>

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var parse=__webpack_require__(7);
	var button=__webpack_require__(9);
	var recommend=__webpack_require__(10)
	var setCss=__webpack_require__(11);
	var tools=__webpack_require__(4)

	var REC_LIST=7

	module.exports=function(player){
	  $("body").on("mouseover",function(e){
	      var count=10,temp=$(e.target),vid,btnLeft;

	      while(temp.length>0&&count--){
	        if(temp[0].nodeName.toLowerCase()==="a"&&
	                (vid=parse(temp.attr("href")))&&
	                (temp.find("img").length>0)){
	          btn=button()
	          btn.data("vid",vid)
	          temp.css({position:"relative",display:"inline-block"}).append(btn).on("mouseover",function(e){
	             var tempBtn=$(this).find("div");
	             tempBtn.css("display","block");
	             e.stopPropagation();
	          });
	          temp.on("mouseout",function(e){
	             var tempBtn=$(this).find("div");
	             tempBtn.css("display","none");
	             e.stopPropagation();
	          });
	          temp.find("div").on("click",function(e){
	               var currvid=$(this).data("vid")
	               tools.showPlayerMask()  //在播放完当前视频后，广告也算是当前视频的？
	                  $(".qp_figure_btn_next").removeData("isClicked")
	                  player.play({vid:currvid,autoplay:true});  //播放新视频
	                  setTimeout(function(){
	                    recommend.loadData(currvid);
	                  },0)
	               e.stopPropagation();
	               e.preventDefault();
	          });
	          break;
	        }
	        temp=temp.parent();
	      }
	      //可以考虑要不要给e.target打标记，下一次在mouseover这个元素的时候，就直接return，连这10此循环都不用做
	  });

	player.on("adEnd",function(){     
	        var videoSize=player.getVideoSize();
	        setCss(videoSize.width,videoSize.height);
	})

	player.on("playStateChange",function(d){   //拿到这个视频需要的时间可能比较的久，造成很大的延时
	      //player.autoResize();
	      if(d.state===0&&d.reason!=="stop"){    //播放结束
	         getVidAndPlay($('.qp_btn_next'))
	      }
	});

	function tempStop(e){
	        tools.hiddenPlayerMask()
	        player.stop();   //关闭当前视频，就先暂停
	        e.stopPropagation();
	  }
	function getVidAndPlay(dom){
	    var vid=$(dom).data("vid")
	    if(vid){
	      $(".qp_figure_btn_next").removeData("isClicked")
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

	  $(".qp_btn_next").on('click',function(){
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

	$(".qp_figures_list").on("click","li",function(){
	     getVidAndPlay(this)
	}).on("click","a",function(e){
	     e.preventDefault()
	})

	  $(".qp_figure_btn_next").click(function(){
	      //拿底部下一页的数据
	      console.log("next,page:"+data.pageContext)
	      var tempVid=player.getVid()
	      $(this).data("isClicked","yes")
	      if(tempVid){
	        recommend.loadData(tempVid,"&isRec=t&pageContext="+encodeURIComponent(data.pageContext))   //不拿专辑视频
	      }

	  })
	  

	 $(".qp_figure_btn_prev").click(function(){
	    //拿底部上一页的数据
	    console.log("prev,page:"+data.pageContext)
	    var pageData=tools.getPageData(data.pageContext),
	        page=parseInt(pageData[0])-2,
	        vidNum=page*REC_LIST,
	        tempVid=player.getVid(),
	        pageContext;
	    console.log("page:"+page)
	    if(tempVid){
	        if(page){
	          pageContext=tools.formatePagecontext(page,vidNum)
	          recommend.loadData(tempVid,"&isRec=t&pageContext="+encodeURIComponent(pageContext))
	        }else{
	          $(".qp_figure_btn_next").removeData("isClicked")
	          $(this).addClass("qp_btn_disabled")
	          recommend.loadData(tempVid)
	        }
	    }
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
/***/ function(module, exports, __webpack_require__) {

	var dom=__webpack_require__(5)

	module.exports=function(){
		var css={
	    position:"absolute",
	    top:"6px",
	    left:"4px",
	    display:"block",
	    cursor:"pointer",
	    overflow:"hidden"
	  } 

	  var div=$("<div></div>"),
	      icon=$(dom.icon);
	  div.css(css);
	  div.append(icon)
	  return div;
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
	   $(".quick_open_script").remove()    //移除掉加入的script标签
	}
	window.cb=cb
	function loadData(vid,extra){
	    extra=extra||""
	    tools.loadScript(path+vid+extra,function(){
	      if($(".qp_figure_btn_next").data("isClicked")!="yes"){
	         //表明下一个这个按钮没有被点,第一个视频显示当前播放的视频
	         setCurrVideoInfo()
	         addToCoverVideo()
	      }else{
	        $(".qp_figure_btn_prev").removeClass("qp_btn_disabled")
	      }
	    	var len=data.cover_video.length,
	    	    len=len<7?len:LIST_LENGTH,
	    	    i,rec,temp;
	      if(len<7){
	        $(".qp_figure_btn_next").addClass("qp_btn_disabled")
	      }
	      $(".qp_figures_list").text('')  //清空
	    	for(i=0;i<len;i++){
	           item=$(dom.item);
	           rec=data.cover_video[i].jsonData;
	           if(rec.curr){
	           	item.addClass('qp_current')
	            if((temp=data.cover_video[i+1])){
	              $('.qp_btn_text').text(temp.jsonData.title);
	              $('.qp_btn_next').data("vid",temp.jsonData.vid) 
	            }
	           }else if(i===0){
	              $(".qp_btn_text").text(rec.title)
	              $('.qp_btn_next').data("vid",rec.vid)
	              $(".qp_figure_btn_prev").removeClass("qp_btn_disabled")
	           }
	           item.find('.qp_figure').attr({title:rec.title,href:rec.url})
	           item.find('.qp_figure_pic').attr({src:rec.pic_228_128,alt:rec.title})
	           item.find('.qp_figure_info').text(tools.formateTime(rec.duration))
	           item.find('.qp_figure_title a').text(rec.title).attr({href:rec.url,title:rec.title})
	           item.data('vid',rec.vid)
	           $(".qp_figures_list").append(item)
	    	}
	    })
	}

	module.exports={
		loadData:loadData
	}


	function setCurrVideoInfo() {
	      $(".qp_video_title a").text(data.title).attr({href:data.url,title:data.title})
	      $('.qp_user_info').attr('href',data.upload_qq_info.info.urlfull)
	      $('.qp_user_avatar').attr('src',data.upload_qq_info.info.avatar)
	      $('.qp_user_name').text(data.upload_qq_info.info.nick||"此英雄没有留下昵称")
	      $('.qp_comments').text("122条评论").attr('href',"v.qq.com")   //评论的地址
	      $('.qp_date').text(tools.formateDate(data.publish_date))
	}

	function addToCoverVideo() {
	  data.cover_video.unshift({
	          jsonData:{
	             curr:true,
	             vid:data.vid,    //当前视频的vid
	             title:data.title,
	             duration:data.duration,
	             pic_228_128:data.pic_228_128
	          }
	    })
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var tool=__webpack_require__(4);

	function setCss(w,h){
	  var quickplay_container=$(".quickplay_container")
	      rule=w/h,
	      width=quickplay_container.width(),          //display:none的dom元素，如果这个元素的width是百分比形式的，那么这时候是拿不到正确得元素的width的
	      height=(rule<1.82&&rule>1.71)?(width/rule):(width/1.777);             
	     $("#video_container_body").css({width:width,height:height});
	}


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
	var tools=__webpack_require__(4)

	module.exports=function(player){

	  $(window).on("resize",function(){
	      tools.setOriginCss($(".poplayer_quickplay"));
	  }).on("keydown",function(e){
	  	  if(!($(".poplayer_quickplay").hasClass("none"))){   //只有在播放器在页面中显示的时候，才响应
	         
	         switch(e.which){
	           case 32:player.togglePlayPause();   //空格
	                   break;
	           case 37:player.seekLeft();
	                   break;//左
	           case 39:player.seekRight();
	                   break;//右
	           case 27:tools.hiddenPlayerMask();
	                   player.stop();
	                   break;//esc
	         }
	     }
	     e.preventDefault();
	  })
	 

	}

/***/ }
/******/ ]);