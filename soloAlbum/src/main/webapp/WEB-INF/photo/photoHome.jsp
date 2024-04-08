<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>file test</title>
</head>
<body>
	<h1>file test</h1>
	<form action="insertPhotos.do" method="post" enctype="multipart/form-data">
		<div>
			<div bgcolor="orange" width="70">업로드</div>
			<div>
				<input type="file" name="uploadFile" multiple>
			</div>
		</div>
		<div>
			<div colspan="2" align="center">
				<input type="submit" value="사진 업로드">
			</div>
		</div>
	</form>
</body>
</html>