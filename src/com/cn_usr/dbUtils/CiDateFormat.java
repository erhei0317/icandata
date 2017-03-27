package com.cn_usr.dbUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CiDateFormat {
	//將  03月14日  20:54 的字符串 格式为 2017-03-14  20:54:00的字符 
	public static String parseDate(String s) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("MM月dd日  HH:mm");
		Date date= format.parse(s);
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd  HH:mm");
		return dateformat.format(date);
	}
	
	public static void main(String[] args) throws ParseException {
		Date date=new Date();
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
		String format = dateformat.format(date);
		System.out.println(format);
	}
}
