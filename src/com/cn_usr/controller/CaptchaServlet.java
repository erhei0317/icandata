package com.cn_usr.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.cn_usr.captcha.VerifyCodeUtils;
@SuppressWarnings("serial")
@WebServlet(name="CaptchaServlet",urlPatterns="/captcha")
public class CaptchaServlet extends HttpServlet {
	
	private String codeLength="4";
	private String width="100";
	private String height="40";

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// 设置
		response.setDateHeader("Expires", 0);
		// Set standard HTTP/1.1 no-cache headers.
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		// Set IE extended HTTP/1.1 no-cache headers (use addHeader).
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		// Set standard HTTP/1.0 no-cache header.
		response.setHeader("Pragma", "no-cache");
		// return a jpeg
		response.setContentType("image/jpeg");
		
		String verifyCode = VerifyCodeUtils.generateVerifyCode(Integer.parseInt(codeLength));
		
		request.getSession().setAttribute("validateCode", verifyCode);
		
		VerifyCodeUtils.outputImage(Integer.parseInt(width), Integer.parseInt(height), response.getOutputStream(), verifyCode);

	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

			this.doGet(request,response);
	}

}
