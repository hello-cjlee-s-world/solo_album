package com.cj.soloAlbum.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Common {
	Cyper cp = new Cyper();
	// 쿠키 설정
	public void setCookie(HttpServletResponse response, String sName, String sValue) {
		Cookie c = new Cookie( sName, sValue );
		c.setMaxAge(24*60*60);
		c.setPath( "/" );
		// 필요에 따라 쿠키의 옵션값을 추가한다.
		response.addCookie(c);
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
	
	public boolean verifySession (HttpServletRequest request) {
		String username = (String) request.getSession().getAttribute("username");
		System.out.println("username : " + username);
		if(username == null || username.isEmpty() || username.equals("")) {
			System.out.println("user name is null");
			return true;
		}
		return false;
	}
	
	//필요없어졌음
//	// 쿠키에서 세션ID 가져와서 아이디 검증하기 
//	public String getSessionId(HttpServletRequest request) throws Exception {
//		HttpSession session = request.getSession();
//		String userTypeCookie = getCookie(request, "userType");
//		String sessionIdCookie = getCookie(request, "sessionId");
//		System.out.println("userType : " + userTypeCookie);
//		System.out.println("sessionId : " + sessionIdCookie);
//		System.out.println("sessionIdDEcrypted : " + cp.decrypt(sessionIdCookie));
//		System.out.println(session.getAttribute("username"));
//		
//		return (String) session.getAttribute(cp.decrypt(sessionIdCookie));
//	}
}
