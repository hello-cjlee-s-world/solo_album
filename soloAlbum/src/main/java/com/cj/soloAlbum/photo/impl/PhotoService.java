package com.cj.soloAlbum.photo.impl;

import java.util.List;

import com.cj.soloAlbum.album.AlbumVO;
import com.cj.soloAlbum.photo.PhotoVO;

public interface PhotoService {
	void insertPhoto(PhotoVO vo);
	PhotoVO getAllPhoto(PhotoVO vo);
	List<PhotoVO> getPhoto(String albumId);
//	Album 관련
	void insertAlbum(AlbumVO vo);
	AlbumVO getAlbum(String albumid);
	List<AlbumVO> getAllAlbum();
	int getMaxAlbum();
//	String getAlbumPwd(String albumId);
	String getPagePerImage(String albumId);
	//DBtest
	//void testInsert();
}
