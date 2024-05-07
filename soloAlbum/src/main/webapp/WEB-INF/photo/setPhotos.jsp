<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/common.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./public/css/setPhotosMain.css">
<title>file test</title>
</head>
<body>
	<!-- 사진 선택 -->
	<form action="insertPhotos.do" method="post"
		enctype="multipart/form-data" id="insert_photos_form">
		<div id="photo_container">
			<div id="img_box">
				<div>
					<div onclick="handleClick()" id="photo_button">
						<img src="./public/img/addIcon.png">
					</div>
					<input type="file" id="files" name="uploadFile" accept="image/*"
						multiple onchange="fileChange(this)">
				</div>
			</div>
		</div>


		<!-- 앨범 구역 -->
		<div id="main_container">
			<div id="page_container">
				<div class="pages left_page">
					<div id="album_box_1" class="album_box page_1" data-albumnum="0"></div>
					<div id="album_box_2" class="album_box page_1" data-albumnum="1"></div>
				</div>
				<div class="pages right_page">
					<div id="album_box_3" class="album_box page_1" data-albumnum="2"></div>
					<div id="album_box_4" class="album_box page_1" data-albumnum="3"></div>
				</div>
			</div>
			<div id="information_container">
				<div id="button_box">
					<button type="button" id="button_previous" class='rest_button'>이전 페이지</button>
					<button type="button" id="button_next">다음 페이지</button>
				</div>
				<div id="page_box">
					<div>
						<span id="currentPageNum">1</span>/<span id="totalPageNum">1</span>
					</div>
				</div>
				<div id="pwd_box">
					<span>앨범 비밀번호</span>
					<div id="radio_box">
						<div>
							<label for="pwdRequired">사용안함</label>
							<input type="radio" value="n"  name="pwdRequired" checked="checked">
						</div>
						<div>
							<label for="pwdRequired">사용함</label>
							<input type="radio" value="y"  name="pwdRequired">
						</div>
					</div>
					<input type="password" name="pwd" id="pwd" placeholder="비밀번호를 입력해 주세요." >
				</div>
				<div id="nameBox">
					<span>앨범 제목</span>
					<input type="text" id="album_name" placeholder="제목을 입력해 주세요." >
					<button type="button" id="submit_button">보내기</button>
				</div>
			</div>

		</div>
		<div id="rest_boxs"></div>
	</form>
</body>
<script src="./public/js/setPhotosTouched.js" charset="utf-8"></script>
<script src="./public/js/setPhotosMain.js" charset="utf-8"></script>
<script src="./public/js/setPhotosPage.js" charset="utf-8"></script>
<script type="text/javascript">
	
</script>
</html>