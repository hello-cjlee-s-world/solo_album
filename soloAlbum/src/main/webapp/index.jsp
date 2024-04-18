<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ include file="./WEB-INF/common/common.jsp" %>   
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
<h1>Album Project</h1>
<form action="login.do" method="post">
	<div id="loginBOx">
		<label for="id">아이디</label>
		<input type="text" name="id" id="id" autofocus="autofocus">
		<br>
		<label for="pwd">비밀번호</label>
		<input type="password" name="pwd" id="pwd">
		<br>
		<button type="submit">로그인</button>
	</div>
</form>
</body>
</html>