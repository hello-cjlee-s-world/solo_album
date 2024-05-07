package com.cj.view.photo;

import java.io.File;
import java.io.FileInputStream;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.cj.soloAlbum.album.AlbumVO;
import com.cj.soloAlbum.photo.PhotoVO;
import com.cj.soloAlbum.photo.impl.PhotoService;
import com.cj.soloAlbum.util.Common;
import com.cj.soloAlbum.util.Cypher;

@CrossOrigin(origins = "http://localhost:8080")
@Controller
@SessionAttributes("photo")
public class PhotoController {
	@Autowired
	private PhotoService photoService;
	private Common common = new Common();
	private Cypher cp = new Cypher();
	
	// @RequestMapping(value = "/index", method = RequestMethod.GET)
	@RequestMapping("/setPhotos.do")
	public String photoHome(HttpServletRequest request) throws Exception {
		if(common.verifySession(request)) {
			return "redirect:index.jsp";
		}
		return "setPhotos";
	}

	// 사진 등록
	@SuppressWarnings({ "null", "rawtypes" })
	@RequestMapping(value = "/insertPhotos", method = RequestMethod.POST)
	public ResponseEntity insertPhotos(@RequestParam("uploadFile") List<MultipartFile> multiFileList,
			HttpServletRequest request, AlbumVO albumVO, HttpServletResponse response) throws IllegalStateException, IOException, NoSuchAlgorithmException {
		if(common.verifySession(request)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Your Session is expired or broken");
		}
		PhotoVO vo = new PhotoVO();
		String message = "";
		String redirectUrl = "";
        Map<String, String> responseMap = new HashMap();
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
		if (photoService.getAllAlbum(albumVO).size() != 0) {
			albumNum = String.valueOf(photoService.getMaxAlbum() + 1);
		}
		albumVO.setId(albumNum);
		albumVO.setUserid(common.getCookie(request, "userType"));
		albumVO.setPagePerImage(pagePerImageString);
		albumVO.setCreate_timestamp(new Timestamp(System.currentTimeMillis()));
		albumVO.setCreate_time(new java.sql.Date(System.currentTimeMillis()));
		if(!albumVO.getPwd().equals("") 
			|| !albumVO.getPwd().isEmpty() 
			|| albumVO.getPwd() != null 
			|| "null".equals(albumVO.getPwd())) {
				albumVO.setPwd(cp.makePassword(0, "1", albumVO.getPwd()));
			}
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
				// 파일명이 blob 인 이미지 제외한 정상 이미지만 새 list에 담기
				fileNameList.add(multiFileList.get(i));
			}
		}

		// 파일업로드
		try {
			for (int i = 0; i < fileNameList.size(); i++) {
				String changeFile = fileList.get(i).get("changeFile");
				File uploadFile = new File(root + "\\" + changeFile);
				fileNameList.get(i).transferTo(uploadFile);
				vo.setName(changeFile);
				vo.setOrder_num(Integer.parseInt(imgAlbumDic.get(fileNameList.get(i).getOriginalFilename())));
				vo.setAlbumId(albumNum);
				photoService.insertPhoto(vo);
			}
	        message = "File uploaded successfully";
	        redirectUrl = "/albumList.do";
			responseMap.put("message", message);
			responseMap.put("redirectUrl", redirectUrl);
			System.out.println(message);
	        //return ResponseEntity.ok().body(responseMap);
			return ResponseEntity.ok().body("albumList.do");
			//return 200;
		} catch (Exception e) {
			e.printStackTrace();
			// 만약 업로드 실패하면 파일 삭제
			for (int i = 0; i < multiFileList.size(); i++) {
				System.out.println("다중 파일 업로드 실패");
				new File(root + "\\" + fileList.get(i).get("changeFile")).delete();
			}
			message = "File upload failed: " + e.getMessage();
			responseMap.put("message", message);
			System.out.println(message);
			//return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail");
		}
	}

	// 앨범 목록 표출
	@RequestMapping(value="/albumList.do", method = RequestMethod.GET)
	public String showAlbumList(HttpServletRequest request, Model model) {
		if(common.verifySession(request)) {
			return "redirect:index.jsp";
		}
		AlbumVO vo = new AlbumVO();
		vo.setUserid(common.getCookie(request, "userType"));
		List<AlbumVO> voList = photoService.getAllAlbum(vo);
		model.addAttribute("voList", voList);
		return "albumList";
	}
	
	// 앨범 표출 
	@RequestMapping(value = "/showPhotos.do", method = RequestMethod.GET)
	public String insertPhotos(HttpServletRequest request, Model model) throws IOException {
		String user = common.getCookie(request, "user");
		// patameter로(query String) 넘어오는 albumId
		String albumId = request.getParameter("albumId");
		System.out.println(albumId);
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
			@RequestParam("pwd") String pwd) throws JsonProcessingException, NoSuchAlgorithmException {
		Map<String, Object> resultMap = new HashMap();
		AlbumVO albumvo = photoService.getAlbum(albumId);
									// encoded password 
		if(albumvo.getPwd().equals(cp.makePassword(0, "1", pwd))) {
			// 페이지당 사진 수 가져와서 dict 형태로 변환
			List<PhotoVO> resultVO = photoService.getPhoto(albumId);
			String[] pagePerImageList = albumvo.getPagePerImage().split("");
			Map<Integer, Integer> pagePerImageMap = new HashMap<Integer, Integer>();
			for(int i=0; i<pagePerImageList.length; i+=2) {
				pagePerImageMap.put(Integer.parseInt(pagePerImageList[i]), 
									Integer.parseInt(pagePerImageList[i+1]));
			}
            resultMap.put("photosInfo", resultVO);
            resultMap.put("pagePerImageMap", pagePerImageMap);
            resultMap.put("albumName", albumvo.getAlbumName());
			String Json = new ObjectMapper().writeValueAsString(resultMap);
			return Json;
		} else {	
            resultMap.put("message", "password not correct.");
			String Json = new ObjectMapper().writeValueAsString(resultMap);
			System.out.println("Json : "+Json);
			return Json;
		}
	}

	
	
}
