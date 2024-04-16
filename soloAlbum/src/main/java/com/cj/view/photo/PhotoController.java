package com.cj.view.photo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.cj.soloAlbum.album.AlbumVO;
import com.cj.soloAlbum.photo.PhotoVO;
import com.cj.soloAlbum.photo.impl.PhotoService;

@Controller
@SessionAttributes("photo")
public class PhotoController {
	@Autowired
	private PhotoService photoService;

	// @RequestMapping(value = "/index", method = RequestMethod.GET)
	@RequestMapping("/home.do")
	public String photoHome() {
		return "photoHome";
	}

	// 사진 등록
	@SuppressWarnings("null")
	@RequestMapping(value = "/insertPhotos.do", method = RequestMethod.POST)
	public String insertPhotos(@RequestParam("uploadFile") List<MultipartFile> multiFileList,
			HttpServletRequest request) throws IllegalStateException, IOException {
		@SuppressWarnings("unchecked")
		// js에서 dict 형태로 들어온 데이터 json으로 변환하기 위한 클래스
		Map<String, String> imgAlbumDic = new ObjectMapper().readValue(request.getParameter("imgAlbumDic"),
				HashMap.class);
//		for (int i = 0; i < multiFileList.size(); i++) {
//			System.out.println(multiFileList.get(i).getOriginalFilename());
//		}
		PhotoVO vo = new PhotoVO();
		AlbumVO albumVO = new AlbumVO(); 
		// 앨범 등록
		String albumNum = "0";	
		if(photoService.getAllAlbum().size() != 0) {		
			albumNum = String.valueOf(photoService.getMaxAlbum()+1);
		}
		System.out.println(albumNum);
		albumVO.setId(albumNum);
		albumVO.setUserid(getCookie(request, "userType"));
		photoService.insertAlbum(albumVO);
		
		String path = "C:\\Users\\cndwn\\Desktop\\testUploads";
		String root = path + "\\uploadFiles";

		File file = new File(root);

		// 만약 uploadFiles 폴더가 없으면 생성해라 라는뜻
		if (!file.exists())
			file.mkdirs();

		List<MultipartFile> fileNameList = new ArrayList<MultipartFile>();
		List<Map<String, String>> fileList = new ArrayList<Map<String, String>>();

		for (int i = 0; i < multiFileList.size(); i++) {
			// 업로드할 폴더 설정
			String originFile = multiFileList.get(i).getOriginalFilename();
			if (!originFile.equals("blob") && originFile != null) {
				String ext = originFile.substring(originFile.lastIndexOf("."));
				String changeFile = UUID.randomUUID().toString() + ext;

				Map<String, String> map = new HashMap();
				map.put("originFile", originFile);
				map.put("changeFile", changeFile);

				fileList.add(map);
				// blob 인 이미지 제외한 정상 이미지만 새 list에 담기
				fileNameList.add(multiFileList.get(i));
			} else {
				Map<String, String> map = new HashMap<String, String>();
				map.put("originFile", "");
				map.put("changeFile", "");
				fileList.add(map);
			}
		}

		// 파일업로드
		try {
			for (int i = 0; i < fileNameList.size(); i++) {
				String changeFile = fileList.get(i).get("changeFile");
				File uploadFile = new File(root + "\\" + changeFile);
				System.out.println(uploadFile);
				fileNameList.get(i).transferTo(uploadFile);
				vo.setName(changeFile);
				vo.setOrder_num(Integer.parseInt(imgAlbumDic.get(fileNameList.get(i).getOriginalFilename())));
				System.out.println(albumNum);
				vo.setAlbumId(albumNum);
				photoService.insertPhoto(vo);
			}
			System.out.println("다중 파일 업로드 성공");
			// 앨범 등록

			return "photoHome";
		} catch (Exception e) {
			e.printStackTrace();
			// 만약 업로드 실패하면 파일 삭제
			for (int i = 0; i < multiFileList.size(); i++) {
				System.out.println("다중 파일 업로드 실패");
				new File(root + "\\" + fileList.get(i).get("changeFile")).delete();
			}
		}
		return "redirect:index.jsp";
	}

	@RequestMapping(value = "/showPhotos.do", method = RequestMethod.GET)
	public String insertPhotos(HttpServletRequest request, Model model) {
		String user = getCookie(request, "user");
		
		String albumNum = String.valueOf(photoService.getMaxAlbum());
		List<PhotoVO> resultVO = photoService.getPhoto(albumNum);
		System.out.println(resultVO);
		model.addAttribute("photosInfo", resultVO);
		return ("showPhotos");
	}

	// 쿠키 가져오기
	public String getCookie(HttpServletRequest request, String sName) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (int i = 0; i < cookies.length; i++) {
				String name = cookies[i].getName();
				if (name != null && name.equals(sName)) {
					return cookies[i].getValue();
				}
			}
		}
		return null;
	}
}
