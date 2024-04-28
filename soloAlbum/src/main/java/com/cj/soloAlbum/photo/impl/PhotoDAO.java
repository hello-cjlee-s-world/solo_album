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

// 	Album 관련
	public void insertAlbum(AlbumVO vo) {
		mybatis.insert("PhotoDAO.insertAlbum", vo);
	}

	public AlbumVO getAlbum(String albumId) {
		return mybatis.selectOne("PhotoDAO.getAlbum", albumId);
	}

	public List<AlbumVO> getAllAlbum(AlbumVO vo) {
		return mybatis.selectList("PhotoDAO.getAllAlbum", vo);
	}

	public int getMaxAlbum() {
		return mybatis.selectOne("PhotoDAO.getMaxAlbum");
	}

//	public String getAlbumPwd(String albumId) {
//		return mybatis.selectOne("PhotoDAO.getAlbumPwd", albumId);
//	}

	public String getPagePerImage(String albumId) {
		return mybatis.selectOne("PhotoDAO.getPagePerImage", albumId);
	}
	// DBtest
//	public void testInsert() {
//		System.out.println("DAO 실행");
//		mybatis.insert("testInsert");
//	}
}
