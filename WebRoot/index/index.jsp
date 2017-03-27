<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta content="sOXHPLeTT9" name="baidu-site-verification" />
    <title> 编程 | 股市信息挖掘 | 路由器 | 小极客 </title>
    <meta content="" name="description" />
    <meta content="" name="keywords" />
    <meta charset="utf-8" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <link href="../css/bootstrap.min.css" rel="stylesheet" />
    <link href="../css/font-awesome.min.css" rel="stylesheet" />
    <link href="../css/landing-page.css" rel="stylesheet" />
    <link href="../css/animate.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
    	function validateuser(){
    		var usrid="";
    		getServerSession("userid",function(data){
    			usrid=data.result.sessionVal;
    		});
	    	if(usrid>0){
	    		location="${pageContext.request.contextPath}/topic/topics/topics.html";
	    	}else{
	    	 	showMessage("您当前没有登录，需要登录之后，才可以查看更多内容！");
	    	}; 
    	
    	}
    	
    	function gotomanager(){
    		$.ajax({
    		    type : "POST",
    			url:"${pageContext.request.contextPath }/usrmanager",
    			dataType : "jsonp",
    			jsonp:"callback",
    			cache : false,
				async : false,
				success :function(data){
					console.log(data);
				    var m=data.msg;
				    console.log(m);
					if(m=="ok"){
					 location="${pageContext.request.contextPath}/manager/index.jsp";
					}else{
					 showMessage("<a href='${pageContext.request.contextPath}/index/login.jsp'>你没有登录，点击登录！</a>",6000);
					}
				}
    		});
    	}
    	
    	
    </script>
</head>
<body style="background-color: #ffffff;">
<!-- Navigation -->
<nav class="navbar navbar-default navbar-fixed-top codekids-nav affix-top" id="mainNav" role="navigation">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button class="navbar-toggle" data-target="#bs-example-navbar-collapse-1" data-toggle="collapse" type="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <i> <a class="navbar-brand topnav" href="/"><font class="logo_montserrat_p">CN</font><font class="logo_montserrat_i">USR</font></a></i>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="javascript:void(0);" onclick="gotomanager();" target="_blank">后台管理</a>
                </li>
                <li>
                    <a href="javascript:void(0);" onclick="validateuser();" target="_blank">论坛</a>
                </li>
                <li>
                    <a href="${pageContext.request.contextPath}/index/login.jsp">${username }登录</a>
                </li>
                <li>
                    <a href="javascript:void(0);"  onclick="location='${pageContext.request.contextPath}/index/reg.jsp'" style="opacity: 1;border: 0px solid #fff;color: #fff;background-color: #5cb85c;border-color: #4cae4c;margin-top: 10px;margin-bottom: 2px;margin-right: 15px;margin-left: 15px;padding-top: 5px;padding-bottom: 5px;border-radius: 3px;">注册</a>
                </li>
            </ul>
        </div>
    </div>
</nav>


<!-- Header -->
<a name="about"></a>
<div class="intro-header">
    <div class="container">

        <div class="row">
            <div class="col-lg-12">
                <div class="intro-message span3 wow flipInX center" style="visibility: visible; animation-name: flipInX;">
                    <h1><i style="text-shadow: 4px 4px 3px #222;"><font class="logo_montserrat_p">CN_</font><font class="logo_montserrat_i">USR</font></i></h1>
                    <h3 style="text-shadow: 4px 4px 3px #222;">在「我学编程的世界里」里炒股，开发自己的应用插件！</h3>
                    <hr class="intro-divider" />
                    <ul class="list-inline intro-social-buttons">
                        <li>
                            <a class=" btn btn-primary btn-xl" href="${pageContext.request.contextPath}/hangqing/market.html">
                                <i class="fa fa-shield  fa-fw fa-lg"></i>
                                <span class="network-name">班门弄股</span></a>
                        </li>
                        <li>
                            <a class=" btn btn-primary btn-xl" href="${pageContext.request.contextPath}/it_information/index.html">
                                <i class="fa fa-shield  fa-fw fa-lg"></i>
                                <span class="network-name">编程世界</span></a>
                        </li>
                        <li>
                            <a class=" btn btn-primary btn-xl" href="#">
                                <i class="fa fa-shield  fa-fw fa-lg"></i>
                                <span class="network-name">硬件路由</span></a>
                        </li>
                    </ul>
                    <hr class="intro-divider" />
                    <a href="${pageContext.request.contextPath }/search/soso.jsp"><h3 style="text-shadow: 4px 4px 4px #red;"><font class="logo_montserrat_i">本站检索</font></h3></a>
                    <hr class="intro-divider" />
                </div>
            </div>
        </div>

    </div>
    <!-- /.container -->
</div>
<!-- /.intro-header -->

<!-- Page Content -->

<a name="services"></a>
<div class="content-section-a" style="background-color: #ffffff;">

    <div class="container">
        <div align="center" class="row">
            <img alt="" class="img-responsive" src="../picture/yunvs.png" />
        </div>
    </div>
</div>
<div class="content-section-a" style="background-color: #ffffff;">

    <div class="container">
        <div align="center" class="row">
            <img alt="" class="img-responsive" src="../picture/tushare.png" />
        </div>
    </div>
</div>

<div class="content-section-a" style="background-color: #ffffff;">

    <div class="container">
        <div align="center" class="row">
            <img alt="" class="img-responsive" src="../picture/nlp.png" />
        </div>
    </div>
</div>

<div class="content-section-a" style="background-color: #ffffff;">

    <div class="container">
        <div align="center" class="row">
            <img alt="" class="img-responsive" src="../picture/cover_4.png" />
        </div>
    </div>
</div>
<div class="content-section-a" style="background-color: #ffffff;">

    <div class="container">
        <div align="center" class="row">
            <img alt="" class="img-responsive" src="../picture/nas.png" />
        </div>
    </div>
</div>

<a name="contact"></a>
<div class="banner">

    <div class="container">

        <div class="row">
            <div class="col-lg-6">
                <h2>联系我们</h2>
            </div>
            <div class="col-lg-6">
                <ul class="list-inline banner-social-buttons">
                    <li>
                        <a class="btn btn-default btn-lg" href="#" target="_blank"><i class="fa fa fa-qq fa-fw"></i> <span class="network-name"> QQ </span></a>
                    </li>
                    <li>
                        <a class="btn btn-default btn-lg" href="mailto:hnerhei@qq.com"><i class="fa fa-envelope fa-fw"></i> <span class="network-name"> 邮箱</span></a>
                    </li>

                </ul>
            </div>
        </div>

    </div>
    <!-- /.container -->
</div>
<!-- /.banner -->

<!-- Footer -->
<footer>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="list-inline">
                    &copy;<i><font class="logo_montserrat_p">CN</font><font class="logo_montserrat_i">USR</font></i> 2016-2017 · <a href="#" target="_blank"> 豫ICP备16004599号-1 </a>· QQ 675786148

                    <a href="W" target="_blank">  </a>
                </ul>

            </div>
        </div>
    </div>
</footer>
<div>
    <script src="../js/bloall.js"></script>
    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/clipboard.min.js"></script>
    <script src="../js/all-20170215080346.js"></script>
    <script src="../js/wow.min.js"></script>
    <script type="text/javascript" src="../json/v13/jsonsvr13.js"></script>
</div>
<script>
    (function ($) {
        "use strict"; // Start of use strict
        // Offset for Main Navigation
        $('#mainNav').affix({
            offset: {
                top: 200
            }
        });
    })(jQuery);
    new WOW().init();
</script>
<script>
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?74e6ff6bc68f1aa7d428df098c622bf6";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
    
</script>


</body></html>