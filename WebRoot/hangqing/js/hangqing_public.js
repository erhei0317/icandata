//回顶部
function gototop(){
	scrollTo(0,0);
}
//到页底
function gotobottom(){
	window.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollHeight);
}
//滚动元素的滚动条时 显示回顶部 或 到页底链接
window.onscroll = function(){
	// 页面卷去的高度
	if(document.documentElement&&document.documentElement.scrollTop){
		var scrollTop=document.documentElement.scrollTop;
	}else if(document.body){
		var scrollTop=document.body.scrollTop;
	}
	// 取窗口可视范围的高度
	if(document.body.clientHeight&&document.documentElement.clientHeight){
		var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;        
	}else{
		var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;    
	}
    //取文档内容实际高度
    var docheight = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
	//显示回顶部 或 到页底链接
	if(scrollTop + clientHeight/2 < docheight/2){
		$('#gotobottom').css("display","block");
		$('#gototop').hide();
	}else{
		$('#gotobottom').hide();
		$('#gototop').css("display","block");
	}
}
//导航
function navigation(){
	if($(".navigation a").hasClass("here")){
		var x=$(".navigation a.here").position().left;
	}else{
		var x=0;
	}
	$(".nav_dq").css("left",x+"px");
	var s=$(".navigation li");
	s.mouseover(function(){
		for(var i=0;i<s.length;i++){
			if(s[i] == this){
				$(".nav_dq").animate({left:String(i*100)+'px'},'fast');
			}
		}
    });
	s.parent().mouseleave(function(){
		$(".nav_dq").animate({left:x+"px"},'fast');
    });	
}
//屏幕右下，关注微信
function smweixin(){
	$(".wxgf,.smweixin").mouseover(function(){
		$(".smweixin").show();
		$(".wxgf").css("backgroundPosition","-100px -50px");
	}).mouseout(function(){
		$(".smweixin").hide();
		$(".wxgf").css("backgroundPosition","-100px 0px");
	});
}
//某标签加className,移除
function tag_over(moutag,mouclassname){
  $(moutag).mouseover(function(){
	  $(this).addClass(mouclassname);
  }).mouseout(function(){
	  $(this).removeClass(mouclassname);
  });
}
// 隐藏式标签
function yinc(tag){
	var s=$(tag);
	$(s[0]).addClass("wmbor");
	s.mouseover(function(){
		for(var i=0;i<s.length;i++){
			if(s[i] != this){
				$(s[i]).removeClass("wmbor");
			}else{
				$(s[i]).addClass("wmbor");
			}
		}
    });
}
//鼠标点击or放上去 执行滑动门选项卡************************************
function head_tab(taga,tagb,mouevent){
	$(taga + ":eq(0)").addClass("on")
	$(tagb + ":eq(0)").show()
	var t=$(taga);
	t.bind(mouevent,function(){
		for(var i=0;i<t.length;i++){
			if(t[i] == this){
				$(taga + ":eq("+i+")").addClass("on")
				$(tagb + ":eq("+i+")").show();
			}else{
				$(taga + ":eq("+i+")").removeClass("on")
				$(tagb + ":eq("+i+")").hide();
			}
		}
	});
}
//DOM结构绘制完毕后就执行
$(document).ready(function(){
	navigation();// 导航用
	tag_over(".wxbtn","over");//微信，加className
	smweixin();//屏幕右下，关注微信
	head_tab(".kline_head li",".kline_body .bdnei","click");//k线滑动门
	head_tab(".news_head li",".news_body .bdnei","click");//问股观点滑动门
	head_tab(".stock_head li",".stock_body li","click");//个股涨幅榜 放上去执行滑动门
	if($('.market li').length>0) yinc(".market li");// 实时行情 隐藏式标签
});