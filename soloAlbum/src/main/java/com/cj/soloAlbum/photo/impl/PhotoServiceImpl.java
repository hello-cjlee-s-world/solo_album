package com.cj.soloAlbum.photo.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cj.soloAlbum.album.AlbumVO;
import com.cj.soloAlbum.photo.PhotoVO;

@Service("PhotoService")
public class PhotoServiceImpl implements PhotoService {
	@Autowired
	private PhotoDAO photoDAO;
	@Override
	public void insertPhoto(PhotoVO vo) {
		photoDAO.insertPhoto(vo);
	}
	@Override
	public PhotoVO getAllPhoto(PhotoVO vo) {
		return photoDAO.getAllPhoto(vo);
	}
	@Override
	public List<PhotoVO> getPhoto(String albumId) {
		return photoDAO.getPhoto(albumId);
	}
	
	public void insertAlbum(AlbumVO vo) {
		photoDAO.insertAlbum(vo);
	}
	@Override
	public List<AlbumVO> getAllAlbum() {
		return photoDAO.getAllAlbum();
	}
	@Override
	public int getMaxAlbum() {
		return photoDAO.getMaxAlbum();
	}
	@Override
	public String getPagePerImage(String albumid) {
		return photoDAO.getPagePerImage(albumid);
	}
	// DBtest
//	@Override
//	public void testInsert() {
//		photoDAO.testInsert();
//	}
}
