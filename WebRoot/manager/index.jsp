<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
    <head><meta charset="utf-8">
	<link rel="Shortcut Icon" href="/favicon.ico">
	<link rel="Bookmark" href="/favicon.ico"> 
	<title>CN_USR管理页面</title>
	<script src="../json/jquery-1.11.3.js"></script>
	<script src="../hangqing/js/common.js" charset="utf-8"></script>
	<script src="../hangqing/js/hangqing_public.js"></script>
	<script src="../hangqing/js/jquery.fancybox.pack.js"></script>
	<script src="../json/v13/jsonsvr13.js"></script>
	<link rel="stylesheet" href="../hangqing/css/jquery.fancybox.css" type="text/css" media="screen" />
	<link href="../hangqing/css/hangqing_public.css" rel="stylesheet">
	<link rel="stylesheet" href="../json/v13/jsonsvr13.css" type="text/css"></link>
    <link href="../it_information/css/main.css" rel="stylesheet" type="text/css" /> 
  <style>
    pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    .string { color: green; }
    .number { color: darkorange; }
    .boolean { color: blue; }
    .null { color: magenta; }
    .key { color: red; }
</style>
<script type="text/javascript">

</script>
  
</head>
  <body>
  	<div id="topic_nav_box">
	   <div id="topic_nav">
		  <div class="fl">
			  <a href="/" target="_blank">首页</a>
			  <a href="/hangqing/bbs" target="_blank">论坛</a>
			  <a href="#" target="_blank">股市</a>
		  </div>
		  	<div class="fr">
				<a href="/index/login.jsp" >${username }登录</a>
				<a href="/index/reg.jsp" >注册</a>
			</div>
	   </div>
    
    
 <table class="table table-bordered text-center">
			<tr class="row1">
				<td class="col-sm-2 bgc fldtitle">导入知乎微信数据：</td>
				<td colspan="2" class="col-sm-10 text-left">
					查询网址:<input class="cifield" value="http://weixin.sogou.com/weixin" placeholder="http:weixin.sogou.com/weixin" type="text"/>
				</td>
				<td colspan="2" class="col-sm-10 text-left">
					相关字段：<input class="cifield" placeholder="solr索引" type="text"/>
				</td>
				<td colspan="2" class="col-sm-10 text-left">
					索引几页：<input class="cifield" placeholder="3,不建议大与3，否则有异常" type="text"/>
				</td>
				
				<td  colspan="2" class="col-sm-2 bgc fldtitle">
				<input class="cibutton" defval="${pageContext.request.contextPath }/import/it" 
						type="button" value="提交" >
				</td>
				<td  colspan="2" class="col-sm-2 bgc fldtitle">
				响应数据：<input class="cibutton" type="button" value="${itcount }条" >
				</td>
			</tr>
</table> 

 <table class="table table-bordered text-center">
			<tr class="row2">
				<td class="col-sm-2 bgc fldtitle">导入股票市场数据：</td>
				<td colspan="2" class="col-sm-10 text-left">
					查询网址:<input class="cifield" value="http://hangqing.55188.com/index/talklist" placeholder="http://hangqing.55188.com/index/talklist" type="text"/>
				</td>
				<!-- http://hangqing.55188.com/index/talklist?&page=2 -->
				<td colspan="2" class="col-sm-10 text-left">
					索引几页：<input class="cifield" placeholder="3,不建议大与3，否则有异常" type="text"/>
				</td>
				<td  colspan="2" class="col-sm-2 bgc fldtitle">
				<input class="cibutton" defval="${pageContext.request.contextPath }/import/market" 
						type="button" value="提交" >
				</td>
				<td  colspan="2" class="col-sm-2 bgc fldtitle">
				响应数据：<input class="cibutton" type="button" value="${marketcount }条" >
				</td>
			</tr>
</table> 

<pre id="result" style="display:none"></pre>

</div>	

	
    <script type="text/javascript">
    	$(function(){
    		$("table .row2").find("input[type='button']").each(function(){
    			$(this).bind("click",function(){
    				$("table .row1").hide();
    				var defval=$(this).attr("defval"); ///import/market?url=""&page=""
    			 	var url=$("table .row2").find("input[type='text']").eq(0).val();
    			 	var page=$("table .row2").find("input[type='text']").eq(1).val();
    			 	var requestPath=defval+"?"+"url="+url+"&page="+page;
    			 	
    			 	$.ajax({
						url: requestPath,
						type: "GET",
						cache: false,
						async: false,
						dataType: "json",
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						success: function (data) {
							console.log(data);
							$('#result').html(syntaxHighlight(data));
							$('#result').show();
						},
						error: function (xhr, error, settings, errorType) {
					//		console.log(data);
						}
					});
    			
    			});
    		});
    	
    	
    	
    	
    		$("table .row1").find("input[type='button']").each(function(){
    			
    			$(this).bind("click",function(){
    			 $("table .row2").hide();
    			 var defval=$(this).attr("defval"); ///import?url=""&q=""&page=""
    			 var url=$("table .row1").find("input[type='text']").eq(0).val();
    			 var q=$("table .row1").find("input[type='text']").eq(1).val();
    			 var page=$("table .row1").find("input[type='text']").eq(2).val();

    			 var requestPath=defval+"?"+"url="+url+"&q="+q+"&page="+page;
    			 $.ajax({
						url: requestPath,
						type: "GET",
						cache: false,
						async: false,
						dataType: "json",
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						success: function (data) {
							console.log(data);
							$('#result').html(syntaxHighlight(data));
							$('#result').show();
						},
						error: function (xhr, error, settings, errorType) {
					//		console.log(data);
						}
					});
    			});
    		
    		});
    		
    		
    		
    		
    		
    		
    	});
    </script>
    
    
  </body>
</html>
