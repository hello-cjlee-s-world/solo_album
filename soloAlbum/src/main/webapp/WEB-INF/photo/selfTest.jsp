<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<link rel="stylesheet" href="./public/css/selfTest.css">
<title>Insert title here</title>
</head>
<body>
	<div id="container">
		<div id="page">
			<h2>hello</h2>
		</div>
	</div>
</body>
	<script>
	<c:forEach items="${photosInfo}" var="info" varStatus="i">
		console.log(${photosInfo.size()});		
	</c:forEach>
	</script>
</html>