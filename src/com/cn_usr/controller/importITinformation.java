package com.cn_usr.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.cn_usr.dbUtils.ItInformation;
import com.cn_usr.dbUtils.JsoupSpider;
@WebServlet(name="importITinformation",urlPatterns="/import/it")
@SuppressWarnings("serial")
public class importITinformation extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=UTF-8"); 
		response.addHeader("cache-control", "no-cache");
		
		//http://weixin.sogou.com/weixin?query=Java编程&type=2&page=2
		//http://zhihu.sogou.com/zhihu?query=编程
		String url=request.getParameter("url");
		
		//String q = new String(request.getParameter("q").getBytes("iso-8859-1"), "utf-8"); 
		String q = new String(request.getParameter("q").getBytes("iso-8859-1"), "utf-8");
		int page=Integer.parseInt(request.getParameter("page"));//抓几页
		int count=0; 
		JSONArray jsonArry=new JSONArray();
		JSONObject jsonObj=new JSONObject();
		for(int i=0;i<page;i++){
			String defVal=url+"?"+"type=2"+"&query="+q+"&page="+i;
			List<ItInformation> list= JsoupSpider.parserByUrlforIt(defVal);
			jsonArry.add(i, list);
			int min =JsoupSpider.importModelbyIt(list);
			count=count+min;
		}
		
		jsonObj.put("count", count);
		jsonObj.put("result", jsonArry);
		response.getWriter().print(jsonObj.toString());
		request.getSession().setAttribute("itcount", count);
		
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}
		
	
	
	
	public static void main(String[] args) {
		
			int count=0; 
			JSONArray jsonArry=new JSONArray();
			JSONObject jsonObj=new JSONObject();
			for(int i=0;i<1;i++){
				String defVal="http://weixin.sogou.com/weixin?query=quartz&type=2&page="+i;
				List<ItInformation> list= JsoupSpider.parserByUrlforIt(defVal);
				jsonArry.add(i, list);
				int min =JsoupSpider.importModelbyIt(list);
				count=count+min;
			}
			
			jsonObj.put("count", count);
			jsonObj.put("result", jsonArry);
			System.out.println(jsonObj.toString());
		}
}
