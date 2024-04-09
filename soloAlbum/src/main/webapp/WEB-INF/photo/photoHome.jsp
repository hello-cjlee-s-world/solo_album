<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<link rel="stylesheet" href="./public/main.css">
<title>file test</title>
</head>
<body>
	<h1>file test</h1>
	<form action="insertPhotos.do" method="post"
		enctype="multipart/form-data">
		<div>
			<div>
				<label for="files">사진 첨부</label>
				<div onclick="handleClick()" id="photoButton">
					<span>+</span>
				</div>
				<input type="file" id="files" name="uploadFile" accept="image/*"
					multiple onchange="fileChange(this)">
			</div>
			<div id="imgBox"></div>
		</div>
		<div>
			<div colspan="2" align="center">
				<input type="submit" value="보내기">
			</div>
		</div>
	</form>
</body>
<script type="text/javascript">
	let stringfiles = [];
	const files = document.querySelector("#files");
// input의 onchange에서 this를 인자로 넣었기 때문에 input은 files.addEventListener("change" (e))의 e.target 과 같다
	const fileChange = (input) => {
		if (input.files && input.files[0]) {
			const imgBox = document.querySelector('#imgBox');
	
			for(let i=0; i < input.files.length; i++){
					var reader = new FileReader();
					reader.onload = function(e) {
						const img = document.createElement('img');
						const imgSmallBox = document.createElement('div');
						const newURL = URL.createObjectURL(input.files[i]);
						const xSpan = document.createElement('span');
						
						xSpan.innerText = 'x';
						xSpan.classList.add('xspan');	
						img.src = newURL;
						img.classList.add('preview');
						imgSmallBox.classList.add('imgSmallBox');
						imgSmallBox.appendChild(img);
						imgSmallBox.appendChild(xSpan);
						imgBox.appendChild(imgSmallBox);
												
// dropImage에서 parentNode 가 쓰이는데, imgSamllBox에 appendChild 된 후에 addEventLinstener 해준다
						xSpan.addEventListener("click", () => {
							console.log(xSpan);
							console.log(xSpan.parentNode);
							URL.revokeObjectURL(xSpan.parentNode.childNodes[0].src);
							xSpan.parentNode.parentNode.removeChild(xSpan.parentNode);
						});
					};
					reader.readAsDataURL(input.files[i]);
				}	
		
		  } else {
		    document.getElementById('preview').src = "";
		  }
	}
	
	const handleClick = () => {
		files.click();
	}
	
	const dropImage = (e) => {
		
	}
	
</script>
</html>