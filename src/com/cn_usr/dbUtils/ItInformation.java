package com.cn_usr.dbUtils;

public class ItInformation {
	private String title;  
	private String author ; 
	private String summary ; 
	private String createDate;  
	private String content ;
	private String keywords ;
	private String hits ;
	private String more ;
	private String titlelink;
	
	public String getTitlelink() {
		return titlelink;
	}
	public void setTitlelink(String titlelink) {
		this.titlelink = titlelink;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		createDate = createDate;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getKeywords() {
		return keywords;
	}
	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}
	public String getHits() {
		return hits;
	}
	public void setHits(String hits) {
		this.hits = hits;
	}
	public String getMore() {
		return more;
	}
	public void setMore(String more) {
		this.more = more;
	}
	@Override
	public String toString() {
		return "ItInformation [title=" + title + ", author=" + author + ", summary=" + summary + ", createDate=" + createDate + ", content=" + content + ", keywords=" + keywords + ", hits=" + hits + ", more=" + more + ", titlelink=" + titlelink + "]";
	}
	

}
