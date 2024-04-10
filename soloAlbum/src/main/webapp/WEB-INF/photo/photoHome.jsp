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
		enctype="multipart/form-data">
		<div id="photo_container">
			<div id="imgBox">
				<div>
					<div onclick="handleClick()" id="photoButton">
						<span>+</span>
					</div>
					<input type="file" id="files" name="uploadFile" accept="image/*"
						multiple onchange="fileChange(this)">
				</div>
			</div>
			<div>
			<div colspan="2" align="center">
				<input type="submit" value="보내기" style="display:none;">
			</div>
		</div>
		</div>
		
		<div id="main_container">
				<div id="test_box">
				
				</div>
		</div>
	</form>
</body>
<script src="./public/js/main.js"></script>
<script type="text/javascript">
	
	
	
	
</script>
</html>