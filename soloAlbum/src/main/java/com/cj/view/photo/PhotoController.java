package com.cj.view.photo;

import java.io.File;
import java.io.FileInputStream;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.lang.System.Logger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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
			HttpServletRequest request, AlbumVO albumVO) throws IllegalStateException, IOException {
		PhotoVO vo = new PhotoVO();
		
		@SuppressWarnings("unchecked")
		// js에서 dict 형태로 들어온 데이터 json으로 변환하기 위한 클래스
		// 이미지:앨범 구역 맵핑 정보
		Map<String, String> imgAlbumDic = new ObjectMapper().readValue(request.getParameter("imgAlbumDic"),
				HashMap.class);		
		// 페이지:사진개수 맵핑 정보
		@SuppressWarnings("unchecked")
		Map<String, String> pagePerImage = new ObjectMapper().readValue(request.getParameter("pagePerImage"),
				HashMap.class);
		
		String pagePerImageString ="";
		for(String key : pagePerImage.keySet()) {
			pagePerImageString = pagePerImageString + String.valueOf(key) + String.valueOf(pagePerImage.get(key)); 
		}
		
		// 앨범 정보 등록
		String albumNum = "0";
		if (photoService.getAllAlbum().size() != 0) {
			albumNum = String.valueOf(photoService.getMaxAlbum() + 1);
		}
		albumVO.setId(albumNum);
		albumVO.setUserid(getCookie(request, "userType"));
		albumVO.setPagePerImage(pagePerImageString);
		System.out.println(albumVO.toString());
		photoService.insertAlbum(albumVO);
		
		// 사진 파일 등록할 경로 설정
		String path = "C:\\Users\\cndwn\\Desktop\\testUploads";
		String root = path + "\\uploadFiles";
//		File file = new File(root);
//		if (!file.exists()) file.mkdirs();
		 
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
			}
		}

		// 파일업로드
		try {
			for (int i = 0; i < fileNameList.size(); i++) {
				String changeFile = fileList.get(i).get("changeFile");
				File uploadFile = new File(root + "\\" + changeFile);
				//System.out.println(uploadFile);
				fileNameList.get(i).transferTo(uploadFile);
				vo.setName(changeFile);
				vo.setOrder_num(Integer.parseInt(imgAlbumDic.get(fileNameList.get(i).getOriginalFilename())));
				//System.out.println(albumNum);
				vo.setAlbumId(albumNum);
				photoService.insertPhoto(vo);
			}
			System.out.println("다중 파일 업로드 성공");

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

	// 앨범 표출 
	@RequestMapping(value = "/showPhotos.do", method = RequestMethod.GET)
	public String insertPhotos(HttpServletRequest request, Model model) throws IOException {
		String user = getCookie(request, "user");
		//String path = "C:\\Users\\cndwn\\Desktop\\testUploads\\uploadFiles";
		
		// albumNum 가져오는 방법 추후 구현해야할 듯 함.. 현재는 임의로 가장 최근 앨범 불러오도록 설정
		String albumId = String.valueOf(photoService.getMaxAlbum());
		// 만약 album pwd가 y라면(필요하다면) albumid와 qwdRequired를 보낸다.
		char pwdRequired = photoService.getAlbum(albumId).getPwdRequired();
		if(pwdRequired == 'y') {
			model.addAttribute("pwdRequired", pwdRequired);
			model.addAttribute("albumId", albumId);
			return ("showPhotos");
		// 만약 album pwd가 n이라면 사진 정보 먼저 보낸다.
		} else {
			List<PhotoVO> resultVO = photoService.getPhoto(albumId);
			
			// 페이지당 사진 수 가져와서 dict 형태로 변환
			String[] pagePerImageList = photoService.getPagePerImage(albumId).split("");
			Map<Integer, Integer> pagePerImageMap = new HashMap<Integer, Integer>();
			for(int i=0; i<pagePerImageList.length; i+=2) {
				pagePerImageMap.put(Integer.parseInt(pagePerImageList[i]), 
									Integer.parseInt(pagePerImageList[i+1]));
			}
			
			String pagePerImageJson = new ObjectMapper().writeValueAsString(pagePerImageMap);
			model.addAttribute("pwdRequired", pwdRequired);
			model.addAttribute("pagePerImage", pagePerImageJson);
			model.addAttribute("photosInfo", resultVO);
			System.out.println(resultVO.toString());
			return ("showPhotos");
		}
	}
	
	// 사진 넘기기 https://jh-yoon.tistory.com/22 참고.. 눈물난다
	@RequestMapping(value = "/imageResponse", method = RequestMethod.GET)
	public ResponseEntity<byte[]> getImageAsResponseEntity(@RequestParam("fileName") String fileName) throws IOException {
		HttpHeaders headers = new HttpHeaders();
		String path = "C:\\Users\\cndwn\\Desktop\\testUploads\\uploadFiles";
	    InputStream in = new BufferedInputStream(new FileInputStream(path + File.separator + fileName));
	    byte[] media = IOUtils.toByteArray(in);
	    headers.setCacheControl(CacheControl.noCache().getHeaderValue());
	    
	    ResponseEntity<byte[]> responseEntity = new ResponseEntity(media, headers, HttpStatus.OK);
	    return responseEntity;
	}
	
	// 앨범 pwd 체크 후 데이터 보내기
	@RequestMapping(value = "/pwdCheck", method = RequestMethod.POST)
	@ResponseBody // json 형식으로 데이터 반환하기 위해 붙임
	public String pwdCheck(@RequestParam("albumId") String albumId, 
			@RequestParam("pwd") String pwd) throws JsonProcessingException {
		System.out.println(pwd);
		System.out.println(albumId);
		Map<String, Object> resultMap = new HashMap();
		if(photoService.getAlbum(albumId).getPwd().equals(pwd)) {
			// 페이지당 사진 수 가져와서 dict 형태로 변환
			List<PhotoVO> resultVO = photoService.getPhoto(albumId);
			String[] pagePerImageList = photoService.getPagePerImage(albumId).split("");
			Map<Integer, Integer> pagePerImageMap = new HashMap<Integer, Integer>();
			for(int i=0; i<pagePerImageList.length; i+=2) {
				pagePerImageMap.put(Integer.parseInt(pagePerImageList[i]), 
									Integer.parseInt(pagePerImageList[i+1]));
			}
            resultMap.put("vo1", resultVO);
            resultMap.put("vo2", pagePerImageMap);
			String Json = new ObjectMapper().writeValueAsString(resultMap);
			System.out.println("Json : "+Json);
			return Json;
		} else {	
            resultMap.put("message", "password not correct.");
			String Json = new ObjectMapper().writeValueAsString(resultMap);
			System.out.println("Json : "+Json);
			return Json;
		}
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
