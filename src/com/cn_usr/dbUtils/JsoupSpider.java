package com.cn_usr.dbUtils;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONObject;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class JsoupSpider {

	// 通过爬虫获取dome模型对象
	public static List<Info> parserByUrl(String url) {
		Document document = null;
		try {
			document = Jsoup.connect(url).get();
			Elements bodys = document.getElementsByClass("news_body").select("dl");
			StockMarketInfo marketInfo = new StockMarketInfo();
			marketInfo.setCount(bodys.size());

			List<Info> infolist = new ArrayList<Info>();
			// System.out.println(bodys.get(0));
			for (Element body : bodys) {
				Info info = new Info();
				info.setCreatetime(body.getElementsByClass("time").get(0).text());
				info.setSource(body.getElementsByTag("a").get(0).text());
				info.setViewpoint(body.html());
				info.setImage(body.select("img").attr("src"));
				infolist.add(info);
			}

			return infolist;
		} catch (IOException e) {
			System.out.println("url抓取连接出现错误");
		}
		return null;
	}

	// 跟据模型存储数据库,插入了几条数据
	public static int importModel(List<Info> list) {
		DbUtils db = new DbUtils();
		Connection conn = db.getConn();
		String sql = "insert into cn_market (SOURCE, VIEWPOINT, IMAGE, STOCKS,STOCKSCODE,CREATETIME) values (?,?,?,?,?,?)";
		PreparedStatement pspt;
		try {
			pspt = conn.prepareStatement(sql);
			int count = 0;
			for (Info info : list) {
				pspt.setString(1, info.getSource());
				pspt.setString(2, info.getViewpoint());
				pspt.setString(3, info.getImage());
				pspt.setString(4, info.getStocks());
				pspt.setString(5, info.getStockscode());
				Date date = new Date();
				SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
				String format = dateformat.format(date);
				pspt.setString(6, format);
				int i = pspt.executeUpdate();
				count++;
			}
			return count;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

	@SuppressWarnings("null")
	public static List<ItInformation> parserByUrlforIt(String url) {
		Document document = null;
		List<ItInformation> infolist = new ArrayList<ItInformation>();
		JSONObject JSONResult = new JSONObject();
		try {
			document = Jsoup.connect(url).get();
			Elements elements = document.select(".news-list li");

			JSONResult.put("count", elements.size());
			for (Element element : elements) {
				ItInformation info = new ItInformation();
				Elements select = element.select(".txt-box").eq(0);
				String titilelink = select.select("h3 a").attr("href");
				String title = select.select("h3 a").html();
				String summary = select.select("p").text();
				String author = select.select(".s-p a").text();
				String createDate = select.select(".s-p .s2").text();
				info.setTitlelink(titilelink);
				info.setAuthor(author);
				info.setSummary(summary);
				info.setTitle(title);
				info.setCreateDate(createDate);
				infolist.add(info);
			}
			return infolist;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;

	}

	// 跟据模型存储数据库,插入了几条数据
	public static int importModelbyIt(List<ItInformation> list) {
		DbUtils db = new DbUtils();
		Connection conn = db.getConn();
		String sql = "insert into cn_information (AUTHOR, SUMMARY, TITLE,TITLELINK,CREATEDATE) values (?,?,?,?,?)";
		PreparedStatement pspt;
		int count = 0;
		try {
			pspt = conn.prepareStatement(sql);
			for (ItInformation info : list) {
				pspt.setString(1, info.getAuthor());
				pspt.setString(2, info.getSummary());
				pspt.setString(3, info.getTitle());
				pspt.setString(4, info.getTitlelink());
				Date date = new Date();
				SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
				String format = dateformat.format(date);
				pspt.setString(5, format);
				int i = pspt.executeUpdate();
				count++;
			}
			return count;
		} catch (SQLException e) {
			System.out.println("获取sql语句异常");
			e.printStackTrace();
		}

		return count;

	}

}
