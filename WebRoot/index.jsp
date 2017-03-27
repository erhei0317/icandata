<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<% 
response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY); 
String newLocn = "index/"; 
response.setHeader("Location",newLocn); 
%>
