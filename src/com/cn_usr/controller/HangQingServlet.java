package com.cn_usr.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
@WebServlet(name="HangQingServlet",urlPatterns="/hangqing/bbs")
public class HangQingServlet extends HttpServlet {
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String validateCode;
		response.setContentType("text/html;utf-8");
		PrintWriter out = response.getWriter();
		validateCode=(String) request.getSession().getAttribute("validateCode");
		out.print("/hangqing/bbs/"+validateCode);
	}


}
