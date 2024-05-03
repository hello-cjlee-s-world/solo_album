package com.cj.soloAlbum.album;

import java.sql.Date;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class AlbumVO {
	String id;
	String userid;
	String pagePerImage;
	char pwdRequired;
	String pwd;
	String albumName;
	Timestamp create_timestamp;
	Date create_time;
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
	@JsonIgnore
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
		System.out.println(albumName);
	}
	public Timestamp getCreate_timestamp() {
		return create_timestamp;
	}
	public void setCreate_timestamp(Timestamp create_timestamp) {
		this.create_timestamp = create_timestamp;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	@Override
	public String toString() {
		return "AlbumVO [id=" + id 
				+ ", userid=" + userid 
				+ ", pagePerImage=" + pagePerImage 
				+ ", pwdRequired=" + pwdRequired 
				+ ", pwd=" + pwd 
				+ ", albumName="+ albumName
				+ ", create_timestamp=" + create_timestamp.toString()
				+ ", create_time=" + create_time.toString() + "]";
	}
}
