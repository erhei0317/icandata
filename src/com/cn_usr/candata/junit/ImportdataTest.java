package com.cn_usr.candata.junit;

import java.util.List;

import com.cn_usr.dbUtils.Info;
import com.cn_usr.dbUtils.ItInformation;
import com.cn_usr.dbUtils.JsoupSpider;

public class ImportdataTest {

	public static void main(String[] args) throws Exception {

		/** int count = 0;
		int x = 0;
		for (int i = 1; i < 10; i++) {
			List<Info> source = JsoupSpider.parserByUrl("http://hangqing.55188.com/index/talklist?&page=" + i);
			count = JsoupSpider.importModel(source);
			x++;
		}
		System.out.println(count * x);**/

		// http://weixin.sogou.com/weixin?query=Java%E7%BC%96%E7%A8%8B&type=2&page=2
		
		List<ItInformation> list = JsoupSpider.parserByUrlforIt("http://weixin.sogou.com/weixin?type=2&query=quartz"); 
		 int count = JsoupSpider.importModelbyIt(list); 
		 System.out.println(count);
	}
}
