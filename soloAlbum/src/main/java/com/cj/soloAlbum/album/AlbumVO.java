package com.cj.soloAlbum.album;

public class AlbumVO {
	String id;
	String userid;
	int create_time;
	String pagePerImage;
	char pwdRequired;
	String pwd;
	String albumName;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public int getCreate_time() {
		return create_time;
	}
	public void setCreate_time(int create_time) {
		this.create_time = create_time;
	}
	public String getPagePerImage() {
		return pagePerImage;
	}
	public void setPagePerImage(String pagePerImage) {
		this.pagePerImage = pagePerImage;
	}
	public char getPwdRequired() {
		return pwdRequired;
	}
	public void setPwdRequired(char pwdRequired) {
		this.pwdRequired = pwdRequired;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getAlbumName() {
		return albumName;
	}
	public void setAlbumName(String albumName) {
		this.albumName = albumName;
	}
	@Override
	public String toString() {
		return "AlbumVO [id=" + id 
				+ ", userid=" + userid 
				+ ", create_time=" + create_time 
				+ ", pagePerImage=" + pagePerImage 
				+ ", pwdRequired=" + pwdRequired 
				+ ", pwd=" + pwd 
				+ ", albumName="+ albumName + "]";
	}
}
