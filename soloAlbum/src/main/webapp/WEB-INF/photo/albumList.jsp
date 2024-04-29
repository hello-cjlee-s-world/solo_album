<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Album List</title>
<link rel="stylesheet" href="./public/css/albumList.css">
</head>
<body>
	<header><h2>${voList[0].userid}���� ����</h2></header>
	<main>

		<ul id="albumList">
			<li id="listHead">
				<span class="listHeadName">�ٹ� ����</span>
				<span class="listHeadDate">���� ��¥</span>
				<span class="listHeadpwd">��� �ٹ�</span>
			</li>
		<c:forEach items="${voList}" var="vo">
			<a href="showPhotos.do?albumId=${vo.id}">
			<li class="AlbumlistLi">
				<div class="AlbumlistDiv">
					<span class="AlbumName">${vo.albumName}</span>
					<span class="AlbumDate">${vo.create_time}</span>
					<span class="AlbumPwd">${vo.pwdRequired}</span>
				</div>
			</li>
			</a>		
		</c:forEach>
		</ul>
	</main>
</body>
</html>