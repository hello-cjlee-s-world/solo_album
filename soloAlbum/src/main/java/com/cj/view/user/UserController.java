package com.cj.view.user;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.cj.soloAlbum.user.UserVO;
import com.cj.soloAlbum.user.impl.UserService;
import com.cj.soloAlbum.util.Common;
import com.cj.soloAlbum.util.Cypher;

@Controller
@SessionAttributes("user")
public class UserController {
	@Autowired
	private UserService userService;
	Cypher cp = new Cypher(); 
	
	// @RequestMapping(value = "/index", method = RequestMethod.GET)
	@RequestMapping("/login.do")
	public String login(UserVO vo, HttpServletResponse response, HttpSession session) {
		Common common = new Common();
		try {
			// 여기서는 안 쓰인다.
			UserVO userVO = userService.login(vo);
			
			// admin or guest일 경우
			if (vo.getId().equals("admin") && vo.getPwd().equals("1234")) {
				// id 세션에 저장
				session.setAttribute("username", "admin");
				// cookie 설정
				common.setCookie(response, "userType", "admin");
				return "redirect:albumList.do";
			} else if(vo.getId().equals("guest") && vo.getPwd().equals("ghkdekgml")){
				// id 세션에 저장
				session.setAttribute("username", "guest");
				// cookie 설정
				common.setCookie(response, "userType", "guest");
				return "redirect:showPhotos.do";
			} else {
				// id 세션에 저장
				session.setAttribute("username", vo.getId());
				// cookie 설정
				common.setCookie(response, "userType", "user");
				return "redirect:albumList.do";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:index.jsp";
	}
	
	@RequestMapping("/logout.do")
	public String logout() {
		return "redirect:index.jsp";
	}
	
	

}
