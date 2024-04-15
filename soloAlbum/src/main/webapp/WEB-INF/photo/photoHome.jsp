<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./public/css/main.css">
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
			<div>
				<div align="center">
					<button type="button" id="submitButton">보내기</button>
				</div>
			</div>
		</div>


		<!-- 앨범 구역 -->
		<div id="mainContainer">
			<div class="pages left_page">
				<div id="albumBox1" class="albumBox" data-albumnum="0"></div>
				<div id="albumBox2" class="albumBox" data-albumnum="1"></div>
			</div>
			<div class="pages rightPage">
				<div id="albumBox3" class="albumBox" data-albumnum="2"></div>
				<div id="albumBox4" class="albumBox" data-albumnum="3"></div>
			</div>

			<div id="buttonPageContainer">
				<div id="buttonBox">
					<button type="button" id="buttonPrevious" class='restButton'>이전
						장</button>
					<button type="button" id="buttonNext">다음 장(추가)</button>
				</div>
				<div id="pageBox">
					<div>
						<span id="currentPageNum">1</span>/<span id="totalPageNum">1</span>
					</div>
				</div>
			</div>

		</div>
		<div id="restBoxs"></div>
	</form>
</body>
<script src="./public/js/touched.js" charset="utf-8"></script>
<script src="./public/js/main.js" charset="utf-8"></script>
<script src="./public/js/page.js" charset="utf-8"></script>
<script type="text/javascript">
	
</script>
</html>