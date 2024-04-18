package com.cj.soloAlbum.photo.impl;

import java.util.List;

import com.cj.soloAlbum.album.AlbumVO;
import com.cj.soloAlbum.photo.PhotoVO;

public interface PhotoService {
	void insertPhoto(PhotoVO vo);
	PhotoVO getAllPhoto(PhotoVO vo);
	List<PhotoVO> getPhoto(String albumId);
	
	void insertAlbum(AlbumVO vo);
	List<AlbumVO> getAllAlbum();
	int getMaxAlbum();
	String getPagePerImage(String albumid);
	//DBtest
	//void testInsert();
}
