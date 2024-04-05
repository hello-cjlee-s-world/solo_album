package com.cj.soloAlbum.photo.impl;

import com.cj.soloAlbum.photo.PhotoVO;

public interface PhotoService {
	void insertPhoto(PhotoVO vo);
	PhotoVO getPhoto(PhotoVO vo);
}
