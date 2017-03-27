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

import com.cn_usr.dbUtils.Info;
import com.cn_usr.dbUtils.JsoupSpider;

@SuppressWarnings("serial")
@WebServlet(name="ImportMarketData",urlPatterns="/import/market")
public class ImportMarketData extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html;charset=UTF-8");
		
		String url=request.getParameter("url");
		String page=request.getParameter("page");
		if(page.isEmpty()||page==null){
			url="http://hangqing.55188.com/index/talklist";
		}
		int count=0; 
		JSONArray jsonArry=new JSONArray();
		JSONObject jsonObj=new JSONObject();
		for(int i=0;i<Integer.parseInt(page);i++){
			url=url+"?"+"page="+i;
			List<Info> list=JsoupSpider.parserByUrl(url);;
			jsonArry.add(i, list);
			int min=JsoupSpider.importModel(list);;
			count=count+min;
		}
		jsonObj.put("count", count);
		jsonObj.put("result", jsonArry);
		response.getWriter().print(jsonObj.toString());
		request.getSession().setAttribute("marketcount", count);
		
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

}
