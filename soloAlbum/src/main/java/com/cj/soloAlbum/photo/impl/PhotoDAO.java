package com.cj.soloAlbum.photo.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cj.soloAlbum.album.AlbumVO;
import com.cj.soloAlbum.photo.PhotoVO;

@Repository
public class PhotoDAO {
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public void insertPhoto(PhotoVO vo) {
		mybatis.insert("PhotoDAO.insertPhoto", vo);
	}
	
	public PhotoVO getAllPhoto(PhotoVO vo) {
		return (PhotoVO) mybatis.selectOne("getAllPhoto.getPhoto", vo);
	}
	public List<PhotoVO> getPhoto(String albumId) {
		return mybatis.selectList("PhotoDAO.getPhoto", albumId);
	}
	public void insertAlbum(AlbumVO vo) {
		mybatis.insert("PhotoDAO.insertAlbum", vo);
	}
	public List<AlbumVO> getAllAlbum(){
		return mybatis.selectList("PhotoDAO.getAllAlbum");
	}
	public int getMaxAlbum() {
		return mybatis.selectOne("PhotoDAO.getMaxAlbum");
	}
	//DBtest
//	public void testInsert() {
//		System.out.println("DAO 실행");
//		mybatis.insert("testInsert");
//	}
}
