<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="../css/bootstrap.min.css" type="text/css"></link>
<script type="text/javascript" src="../js/bootstrap.min.js"></script>
    <head><meta charset="utf-8">
	<link rel="Shortcut Icon" href="/favicon.ico">
	<link rel="Bookmark" href="/favicon.ico"> 
	<title>CN_USR</title>
	<script src="../json/jquery-1.11.3.js"></script>
	<script src="../hangqing/js/common.js" charset="utf-8"></script>
	<script src="../hangqing/js/hangqing_public.js"></script>
	<script src="../hangqing/js/jquery.fancybox.pack.js"></script>
	<script src="../json/v13/jsonsvr13.js"></script>
	<link rel="stylesheet" href="../hangqing/css/jquery.fancybox.css" type="text/css" media="screen" />
	<link href="../hangqing/css/hangqing_public.css" rel="stylesheet">
	<link rel="stylesheet" href="../json/v13/jsonsvr13.css" type="text/css"></link>
    <link href="../it_information/css/main.css" rel="stylesheet" type="text/css" /> 
<script type="text/javascript">
function cibtnregist(){
	var data = getFldNamesAndVals($(".ciregstform"));
	var fldnames = data.fldnames;
	var fldvals = data.fldvals;		
 	ciUpdateDataRow("", "cn_user", "A", fldnames, fldvals, "TRID<0",function(d){
 		showMessage("您注册的用户名为："+d.cirows[0].USERNAME+"<br>"+"请牢记您的密码");
 	});
 	location="${pageContext.request.contextPath}/index/login.jsp";
}
</script>
<title>CN_USR</title>

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
				<a href="/index/login.jsp" >登录</a>
				<a href="/index/reg.jsp" >注册</a>
			</div>
	   </div>
</div>
  <div class="container">
   <div class="ciregstform">
         <div data-cinote="标题" class="cititle">欢迎注册</div>
         <div data-cinote="工具栏" class="text-center citoolbar">
				<input type="button" class="cibtnsubmit text-center" onclick="cibtnregist()" value="注册" />
				<input type="button" class="cibtncancel text-center" onclick="window.location.href = '${pageContext.request.contextPath }/index/'" value="返回" />
		 </div>

		 <table class="table table-bordered text-center">
			<tr class="row">
				<td class="col-sm-2 bgc fldtitle">用户名：</td>
				<td class="col-sm-4 text-left"><input class="cifield"  cifldname="USERNAME" type="text" >
				</td>
				<td class="col-sm-2 bgc fldtitle">投资风格：</td>
				<td class="col-sm-4 text-left"><input class="cifield"  cifldname="INVESTSTYLE" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})">
				</td>
			</tr>
			<tr class="row">
				<td class="col-sm-2 bgc fldtitle">密码：</td>
				<td class="col-sm-10 text-left" colspan="3"><input class="cifield"  cifldname="PASSWORD" type="text" ></td>
			</tr>
			<tr class="row">
				<td class="col-sm-2 bgc fldtitle">邮箱地址：</td>
				<td class="col-sm-4 text-left"><input class="cifield"  cifldname="EMAIL" type="text" ></td>
				<td class="col-sm-2 bgc fldtitle">QQ号：</td>
				<td class="col-sm-4 text-left">
				<input class="cifield"  cifldname="QQCODE" type="text" >
				</td>
			</tr>	
			<tr class="row">
				<td class="col-sm-2 bgc fldtitle">能力薪水：</td>
				<td class="col-sm-4 text-left"><input class="cifield"  cifldname="SALARY" type="text" >
				</td>
				<td class="col-sm-2 bgc fldtitle">生日日期：</td>
				<td class="col-sm-4 text-left"><input class="cifield"  cifldname="BIRTHDAY" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})">
				</td>
			</tr>
			
		</table>
	</div>
</div>

</body>
</html>