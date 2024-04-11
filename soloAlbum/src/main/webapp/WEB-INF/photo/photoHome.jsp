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
			<div id="left_page" class="pages">
				<div id="AlbumBox1" class="AlbumBox"></div>
				<div id="AlbumBox2" class="AlbumBox"></div>
			</div>
			<div id="rightPage" class="pages">
				<div id="AlbumBox3" class="AlbumBox"></div>
				<div id="AlbumBox4" class="AlbumBox"></div>
			</div>
			
			
		</div>
	</form>
</body>
<script src="./public/js/main.js"></script>
<script type="text/javascript">
let page = 0;
	
</script>
</html>