package com.cj.soloAlbum;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

import com.cj.soloAlbum.photo.impl.PhotoService;

public class testDB {

	public static void main(String[] args) {
		AbstractApplicationContext container = new GenericXmlApplicationContext("applicationContext.xml");
		
		PhotoService photoService = (PhotoService) container.getBean("PhotoService");
		
		System.out.println("testDB 시작");
		try {
			//photoService.testInsert();
		} catch (Exception e) {
			e.printStackTrace();
		}
		container.close();
	}

}
