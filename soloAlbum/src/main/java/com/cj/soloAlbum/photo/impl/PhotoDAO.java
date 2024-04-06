package com.cj.soloAlbum.photo.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cj.soloAlbum.photo.PhotoVO;

@Repository
public class PhotoDAO {
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public void insertPhoto(PhotoVO vo) {
		mybatis.insert("PhotoDAO.insertPhoto", vo);
	}
	
	public PhotoVO getPhoto(PhotoVO vo) {
		return (PhotoVO) mybatis.selectOne("PhotoDAO.getPhoto", vo);
	}
	
	//DBtest
//	public void testInsert() {
//		System.out.println("DAO 실행");
//		mybatis.insert("testInsert");
//	}
}
