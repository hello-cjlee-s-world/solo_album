package com.cj.soloAlbum.photo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class PhotoVO {
	String id;
	String name;
	int order_num;
	int create_time;
	String albumId;
	// soloAlbum 프로젝트에서는 쓸 일 없음
	private List<MultipartFile> uploadFile;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getOrder_num() {
		return order_num;
	}
	public void setOrder_num(int order_num) {
		this.order_num = order_num;
	}
	public int getCreate_time() {
		return create_time;
	}
	public void setCreate_time(int create_time) {
		this.create_time = create_time;
	}
	@JsonIgnore
	public List<MultipartFile>getUploadFile() {
		return uploadFile;
	}
	public void setUploadFile(List<MultipartFile> uploadFile) {
		this.uploadFile = uploadFile;
	}
	public String getAlbumId() {
		return albumId;
	}
	public void setAlbumId(String albumId) {
		this.albumId = albumId;
	}
	@Override
	public String toString() {
		return "PhotoVO [id="+id+", name="+name+", order_num="+order_num+", "
				+ "create_time="+create_time+"]";
	}
	
}
