package com.cj.view.photo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.cj.soloAlbum.photo.PhotoVO;
import com.cj.soloAlbum.photo.impl.PhotoService;

@Controller
@SessionAttributes("photo")
public class PhotoController {
	@Autowired 
	private PhotoService photoService;
	
	//@RequestMapping(value = "/index", method = RequestMethod.GET)
	@RequestMapping("/home.do")
	public String photoHome() {
		//System.out.println("=================================잉?=================================");
		return "photoHome";
	}

	// 사진 등록
	@RequestMapping(value="/insertPhotos.do", method = RequestMethod.POST)
	public String insertPhotos(PhotoVO vo, HttpServletRequest request) throws IllegalStateException, IOException {
		System.out.println("사진 등록 처리");
		
		List<MultipartFile> multiFileList = vo.getUploadFile();

		String path = "C:\\Users\\cndwn\\Desktop\\testUploads";
		System.out.println("path : " + path);
		String root = path + "\\uploadFiles" ;
		
		File file = new File(root);
		
		// 만약 uploadFiles 폴더가 없으면 생성해라 라는뜻
		if(!file.exists()) file.mkdirs();
		
		List<Map<String, String>> fileList = new ArrayList();
		
		for(int i = 0; i < multiFileList.size(); i++) {
			// 업로드할 폴더 설정
			String originFile  = multiFileList.get(i).getOriginalFilename();
			String ext = originFile.substring(originFile.lastIndexOf("."));
			String changeFile  = UUID.randomUUID().toString() + ext;
			
			Map<String, String> map = new HashMap();
			map.put("originFile", originFile);
			map.put("changeFile", changeFile);
			
			fileList.add(map);
		}
		
		// 파일업로드
		try {
			for(int i = 0; i < multiFileList.size(); i++) {
				System.out.println(multiFileList.size());
				String changeFile = fileList.get(i).get("changeFile");
				File uploadFile = new File(root + "\\" + changeFile);
				multiFileList.get(i).transferTo(uploadFile);
				vo.setName(changeFile);
				photoService.insertPhoto(vo);
				//throw new Exception();
			}
			System.out.println("다중 파일 업로드 성공");
			return "photoHome";
		} catch (Exception e) {
			e.printStackTrace();
			// 만약 업로드 실패하면 파일 삭제
			for(int i = 0; i < multiFileList.size(); i++) {
				System.out.println("다중 파일 업로드 실패");
				new File(root + "\\" + fileList.get(i).get("changeFile")).delete();
				
			}
		}
		return "redirect:index.jsp";
	}
	
	
}
