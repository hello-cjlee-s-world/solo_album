package com.cj.soloAlbum.photo.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public PhotoVO getPhoto(PhotoVO vo) {
		return photoDAO.getPhoto(vo);
	}
}
