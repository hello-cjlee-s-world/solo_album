<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<link rel="stylesheet" href="./public/css/main.css">
<title>file test</title>
</head>
<body>
	<form action="insertPhotos.do" method="post"
		enctype="multipart/form-data" id="insertPhotosForm" name="insertPhotosForm">
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
				<div colspan="2" align="center">
					<input type="submit" value="보내기" >
				</div>
			</div>
		</div>

		<div id="mainContainer">
			<div class="pages left_page">
				<div id="albumBox1" class="albumBox" data-albumnum="1"></div>
				<div id="albumBox2" class="albumBox" data-albumnum="2"></div>
			</div>
			<div class="pages rightPage">
				<div id="albumBox3" class="albumBox" data-albumnum="3"></div>
				<div id="albumBox4" class="albumBox" data-albumnum="4"></div>
			</div>
			
			<button type="button" id="buttonPrevious" class='restButton'>이전 장</button>			
			<button type="button" id="buttonNext">다음 장(추가)</button>
		</div>
		<div id="restBoxs"></div>
	</form>
</body>
<script src="./public/js/touched.js"></script>
<script src="./public/js/main.js"></script>
<script src="./public/js/page.js"></script>
<script type="text/javascript">
	
</script>
</html>