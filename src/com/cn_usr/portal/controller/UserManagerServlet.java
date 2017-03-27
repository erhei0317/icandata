package com.cn_usr.portal.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;



@SuppressWarnings("serial")
@WebServlet(name="UserManagerServlet",urlPatterns="/usrmanager")
public class UserManagerServlet extends HttpServlet {

	@SuppressWarnings("unused")
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html;utf-8");
	
	}

	@SuppressWarnings("unused")
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html;utf-8");
		String name=(String) request.getSession().getAttribute("username");
		String callback=request.getParameter("callback");
		JSONObject jsonObj=new JSONObject();
		if(name!=null){
				jsonObj.put("msg", "ok");
		}else {
				jsonObj.put("msg", "err");
		}
		response.getWriter().print(callback+"("+jsonObj.toString()+")");
	}

}
