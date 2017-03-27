package com.cn_usr.dbUtils;

import java.util.List;

public class StockMarketInfo {
	private int count;
	private List<Info> infolist;

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "StockMarketInfo [count=" + count + ", infolist=" + infolist + "]";
	}

	public List<Info> getInfolist() {
		return infolist;
	}

	public void setInfolist(List<Info> infolist) {
		this.infolist = infolist;
	}
}
