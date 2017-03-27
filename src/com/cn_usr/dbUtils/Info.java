package com.cn_usr.dbUtils;

import java.util.Date;

public class Info {
	private String createtime;
	private String source  ;
	private String viewpoint ;
	private String image  ;
	private String stocks ;
	
	private String more ;
	private String stockscode;
	private String atag ;
	
	
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getViewpoint() {
		return viewpoint;
	}
	public void setViewpoint(String viewpoint) {
		this.viewpoint = viewpoint;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getStocks() {
		return stocks;
	}
	public void setStocks(String stocks) {
		this.stocks = stocks;
	}
	public String getMore() {
		return more;
	}
	public void setMore(String more) {
		this.more = more;
	}
	public String getStockscode() {
		return stockscode;
	}
	public void setStockscode(String stockscode) {
		this.stockscode = stockscode;
	}
	public String getAtag() {
		return atag;
	}
	public void setAtag(String atag) {
		this.atag = atag;
	}
	
	@Override
	public String toString() {
		return "Info [createtime=" + createtime + ", source=" + source + ", viewpoint=" + viewpoint + ", image=" + image + ", stocks=" + stocks + ", more=" + more + ", stockscode=" + stockscode + ", atag=" + atag + "]";
	}

	
}
