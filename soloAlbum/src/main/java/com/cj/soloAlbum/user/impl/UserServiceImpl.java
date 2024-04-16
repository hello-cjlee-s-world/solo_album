package com.cj.soloAlbum.user.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cj.soloAlbum.user.UserVO;

@Service("UserService")
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDAO userDao;
	@Override
	public UserVO login(UserVO vo) {
		return userDao.login(vo);
	}
}
