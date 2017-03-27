package com.cn_usr.dbUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DbUtils {

	private  String driver;
	private  String url;
	private  String uname;
	private  String passwd;

	public  Connection getConn() {
		try {
			Class.forName(driver);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(url, uname, passwd);
			return conn;
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return conn ;
	}

	public DbUtils() {
		Properties prop = new Properties();
		URL input = Thread.currentThread().getContextClassLoader().getResource("sqlconf.properties");
		try {
			prop.load(input.openStream());
		} catch (IOException e) {
			System.out.println("加载配置文件出现异常");
			e.printStackTrace();
		}
		driver = prop.getProperty("DefClassForName");
		url = prop.getProperty("DefConnString");
		uname = prop.getProperty("DefUserName");
		passwd = prop.getProperty("DefPassword");
	}
}
