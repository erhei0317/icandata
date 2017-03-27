<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
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
	function refreshCode() {
		$("#verifyCode").hide();
		$("#verifyCode").remove();
		var code = $("<img title=\"点击刷新验证码\" id=\"verifyCode\" " + "onclick=\"refreshCode();\" src=\"" + "${pageContext.request.contextPath}/captcha?" + Math.floor(Math.random() * 100) + "\" >");
		$(".controlsVerifyCode").append(code);
		code.fadeIn();
	}

	//用户登录

	function cibtnlogin() {
		//遍历登录表单中的字段
		validateCode();
		var forms = getFldNamesAndVals($(".ciloginForm"));
		var citblwhecls = forms.fldnames[0] + " = \'" + forms.fldvals[0] + "\' AND " + forms.fldnames[1] + " = \'" + forms.fldvals[1] + "\'";
		//	 console.log(citblwhecls);
		var msg = {
			clientcmd : "G",
			cipagesize : "1",
			cipageindex : "0",
			citableid : "",
			citblrowid : "-1",
			citblselcls : "*",
			citblfrmcls : "cn_user",
			citblwhecls : citblwhecls
		};

		ciQueryDataRows(msg, function(data) {
			var result = data.cirows.length;
			if (result > 0) {
				showMessage("登录成功", 3500, "red");
				console.log(data.cirows[0].USERNAME);
				setServerSession("username", data.cirows[0].USERNAME);
				setServerSession("userid", data.cirows[0].TRID);
				window.location.href = document.referrer;
			}

		});
	}

	//校验验证码
function validateCode(){
	var ciVcode=$(".row3 .ciVcode").val();
	var validateCode="";
	getServerSession("validateCode", function(data) {
		validateCode=data.result.sessionVal;
	});
	if(ciVcode!=validateCode){
			showMessage("验证码错了",1600);
			$("#verifyCode").hide();
			$("#verifyCode").remove();
			var code = $("<img title=\"点击刷新验证码\" id=\"verifyCode\" " + "onclick=\"refreshCode();\" src=\"" + "${pageContext.request.contextPath}/captcha?" + Math.floor(Math.random() * 100) + "\" >");
			$(".controlsVerifyCode").append(code);
			code.fadeIn();
	}
}
	
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
				<a href="/index/login.jsp" >登录</a>
				<a href="/index/reg.jsp" >注册</a>
			</div>
	   </div>
</div>
	<div class="container">
		<div class="ciloginForm">
			<div data-cinote="标题" class="cititle">欢迎${ username}光临!</div>

			<table class="table table-bordered text-center">
				<tr class="row1">
					<td class="col-sm-2 bgc fldtitle">用户名：</td>
					<td colspan="3" class="col-sm-10 text-left"><input class="cifield" cifldname="USERNAME" type="text"></td>
			</tr>
				<tr class="row2">
					<td class="col-sm-2 bgc fldtitle">密&nbsp;码：</td>
					<td class="col-sm-10 text-left" colspan="3"><input class="cifield" cifldname="PASSWORD" type="text">
				</td>
			</tr>


				<tr class="row3">
					<td class="col-sm-2 bgc fldtitle">验证码：</td>
					<td class="col-sm-4 text-left"><input class="ciVcode" onblur="validateCode()" name="validateCode" type="text">
				</td>
					<td class="col-sm-2 bgc fldtitle"></td>
					<td class="col-sm-4 text-left controlsVerifyCode">
						<img src="${pageContext.request.contextPath}/captcha?" + Math.floor(Math.random()*100)  onclick="refreshCode();" id="verifyCode"
						title="点击刷新验证码">
						<span><span>
				</td>
			</tr>
		</table>

			<div data-cinote="工具栏" class="text-center citoolbar"><input type="button" class="cibtnsubmit text-center" onclick="cibtnlogin()" value="确认" /> <input type="button"
				class="cibtncancel text-center" onclick="window.location.href = document.referrer;"  value="返回" /></div></div></div>

</body>
</html>