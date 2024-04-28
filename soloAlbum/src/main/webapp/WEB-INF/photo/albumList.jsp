<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Album List</title>
<link rel="stylesheet" href="./public/css/albumList.css">
<link >
</head>
<body>
<c:forEach items="${voList}" var="vo">
	<a href="showPhotos.do?albumId=${vo.id}">${vo.albumName}</a>
	<hr>
</c:forEach>
</body>
</html>