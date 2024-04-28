package com.cj.view.user;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.cj.soloAlbum.user.UserVO;
import com.cj.soloAlbum.user.impl.UserService;

@Controller
@SessionAttributes("user")
public class UserController {
	@Autowired
	private UserService userService;
	// @RequestMapping(value = "/index", method = RequestMethod.GET)
	@RequestMapping("/login.do")
	public String login(UserVO vo, HttpServletResponse response) {
		try {
			// 여기서는 안 쓰인다.
			UserVO userVO = userService.login(vo);
			
			// admin or guest일 경우
			if (vo.getId().equals("admin") && vo.getPwd().equals("1234")) {
				// cookie 설정
				setCookie(response, "userType", vo.getId());
				return "redirect:albumList.do";
			} else if(vo.getId().equals("guest") && vo.getPwd().equals("ghkdekgml")){
				// cookie 설정
				setCookie(response, "userType", vo.getId());
				// 다른 controller로 요청 보내려면 redirect:요청명.do 형식으로
				return "redirect:showPhotos.do";
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
	
	
	// 쿠키 설정
	public void setCookie(HttpServletResponse response, String sName, String sValue) {
		Cookie c = new Cookie( sName, sValue );
		c.setMaxAge(24*60*60);
		c.setPath( "/" );
		// 필요에 따라 쿠키의 옵션값을 추가한다.
		response.addCookie(c);
	}
}
