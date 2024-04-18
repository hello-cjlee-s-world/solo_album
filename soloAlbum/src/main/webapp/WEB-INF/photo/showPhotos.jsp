<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ include file="../common/common.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="./public/css/showPhotosMain.css">
<title>Album For You</title>
</head>
<body>
<%-- <img src="<c:url value='soloAlbum/imageResponse?fileName=${fileUrls[0]}' />" /> --%>

		<!-- 앨범 구역 -->
	<div id="mainContainer">
		<div class="pages left_page"></div>
		<div class="pages rightPage"></div>

		<div id="buttonPageContainer">
			<div id="buttonBox">
				<button type="button" id="buttonPrevious" class='restButton'>이전
					장</button>
				<button type="button" id="buttonNext">다음 장</button>
			</div>
			<div id="pageBox">
				<div>
					<span id="currentPageNum">1</span>/<span id="totalPageNum"></span>
				</div>
			</div>
		</div>

	</div>
	<div id="restBoxs"></div>
</body>

<script type="text/javascript">
let num = 0;
const imgAlbumDic = {};
const pages = document.querySelectorAll('.pages');
const restBoxs = document.querySelector('#restBoxs');
// 페이지당 이미지 개수
const pagePerImage = ${pagePerImage};
console.log(pagePerImage);
// jstl 이 js보다 먼저 렌더링 되기 때문에 미리 url 가져오기
const imgSrc = '<c:url value="/imageResponse?fileName=" />';
let pageNum = 1;

// photosInfo에서 사진 순서(order_num)과 사진 이름(name) 매치 시키기 
<c:forEach items="${photosInfo}" var="info">
	imgAlbumDic[Number(${info.order_num})] = "${info.name}";
</c:forEach>

// 앨범이 한페이지에 4장이므로 4의 배수 맞추기 위한 수
const plusNum = Math.max.apply(null, Object.keys(imgAlbumDic)) % 4;
//for(let i=0; i<Object.keys(imgAlbumDic).length; i++){
for(let i=0; i<(Math.max.apply(null, Object.keys(imgAlbumDic))+plusNum); i++) {
	const albumBox = document.createElement('div');
	const img = document.createElement('img');

	let boxNum = i % 4;
	if(boxNum == 0 && i != 0){
		pageNum++;
	}
	
	// 4번째 사진까지는 화면에 표출, 나머지 사진은 restboxs구역에서 대기
	if(i < 4){
		albumBox.setAttribute('id', 'albumBox'+(boxNum+1));
		albumBox.classList.add('albumBox');
		albumBox.classList.add('page' + String(pageNum));
		if(Object.keys(imgAlbumDic).includes(String(i))) 
			img.src=imgSrc + imgAlbumDic[i];
		else img.src='./public/img/deletedPhoto.png';
		albumBox.appendChild(img);
		if(boxNum < 2){
			pages[0].appendChild(albumBox);
		} else {
			pages[1].appendChild(albumBox);
		}
	} else {
		albumBox.classList.add('restBox');
		albumBox.classList.add('page' + String(pageNum));
		if(Object.keys(imgAlbumDic).includes(String(i))) 
			img.src=imgSrc + imgAlbumDic[i];
		else img.src='./public/img/deletedPhoto.png';
		albumBox.appendChild(img);
		restBoxs.appendChild(albumBox);
	}
}
	
</script>
<!-- page의 갯수가 onload될때 정해지기 때문에 이 script 아래로 와야한다. -->
<script src="./public/js/showPhotosPage.js" charset="utf-8"></script>
</html>