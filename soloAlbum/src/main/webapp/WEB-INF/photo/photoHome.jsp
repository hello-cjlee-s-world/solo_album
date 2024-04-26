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
		enctype="multipart/form-data" id="insertPhotosForm">
		<div id="photoContainer">
			<div id="imgBox">
				<div>
					<div onclick="handleClick()" id="photoButton">
						<img src="./public/img/addIcon.png">
					</div>
					<input type="file" id="files" name="uploadFile" accept="image/*"
						multiple onchange="fileChange(this)">
				</div>
			</div>
		</div>


		<!-- 앨범 구역 -->
		<div id="mainContainer">
			<div id="pageContainer">
				<div class="pages left_page">
					<div id="albumBox1" class="albumBox page1" data-albumnum="0"></div>
					<div id="albumBox2" class="albumBox page1" data-albumnum="1"></div>
				</div>
				<div class="pages rightPage">
					<div id="albumBox3" class="albumBox page1" data-albumnum="2"></div>
					<div id="albumBox4" class="albumBox page1" data-albumnum="3"></div>
				</div>
			</div>
			<div id="informationContainer">
				<div id="buttonBox">
					<button type="button" id="buttonPrevious" class='restButton'>이전 페이지</button>
					<button type="button" id="buttonNext">다음 페이지</button>
						
				</div>
				<div id="pageBox">
					<div>
						<span id="currentPageNum">1</span>/<span id="totalPageNum">1</span>
					</div>
				</div>
				<div id="pwdBox">
					<span>앨범 비밀번호</span>
					<div id="radioBox">
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
					<input type="text" name="albumName" id="albumName" placeholder="제목을 입력해 주세요." >
					<button type="button" id="submitButton">보내기</button>
				</div>
			</div>

		</div>
		<div id="restBoxs"></div>
	</form>
</body>
<script src="./public/js/setPhotosTouched.js" charset="utf-8"></script>
<script src="./public/js/setPhotosMain.js" charset="utf-8"></script>
<script src="./public/js/setPhotosPage.js" charset="utf-8"></script>
<script type="text/javascript">
	
</script>
</html>