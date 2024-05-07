<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Album List</title>
<link rel="stylesheet" href="./public/css/albumList.css">
</head>
<body>
	<header>
		<h2>${voList[0].userid}님의 서랍</h2>
	</header>
	<main>
		<ul id="album_list">
			<li id="list_head">
				<span class="list_head_name">앨범 제목</span>
				<span class="list_head_date">생성 날짜</span>
				<span class="list_head_pwd">비밀 앨범</span>
			</li>
		<c:forEach items="${voList}" var="vo" varStatus="i">
			<li class="album_list_li">
				<a href="showPhotos.do?albumId=${vo.id}">
					<div class="album_list_div">
						<span class="album_name">${vo.albumName}</span>
						<span class="album_date">
							<fmt:formatDate value="${vo.create_time}" pattern="yy-MM-dd HH:mm" />
						</span>
						<span class="album_pwd">${vo.pwdRequired}</span>
					</div>
				</a>		
			</li>
		</c:forEach>
		</ul>
	<button id="new_album" type="button">새 앨범 만들기</button>
		
	</main>
</body>
<script type="text/javascript">
	document.querySelector('#new_album').addEventListener('click', () => {
		location.href = 'setPhotos.do';
	});
</script>
</html>