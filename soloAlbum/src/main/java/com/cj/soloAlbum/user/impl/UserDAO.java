package com.cj.soloAlbum.user.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cj.soloAlbum.user.UserVO;

@Repository
public class UserDAO {
	@Autowired
	private SqlSessionTemplate mybatis;
	
	public UserVO login(UserVO vo) {
		return mybatis.selectOne("UserDAO.login", vo);
	}
	
	//DBtest
//	public void testInsert() {
//		System.out.println("DAO 실행");
//		mybatis.insert("testInsert");
//	}
}
