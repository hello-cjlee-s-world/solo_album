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
<div id="background_container">
	<!-- pwd 검증 -->
	<div id="pwd_container">
		<span>비밀번호를 입력해주세요.</span>
		<input type="password" name="password" id="password">
		<div id="pwd_button"><span>확인</span></div>
	</div>
	<!-- 앨범 구역 -->
	<div id="main_container">
		<div id="page_container">
			<div class="prev_page"></div>
			<div class="cover front_cover"><h1>COVER</h1></div>
			<div class="cover back_cover"></div>
			<div class="next_page"></div>
		</div>
		<div id="page_box">
			<span id="current_page_num">1</span>/<span id="total_page_num"></span>
		</div>
	</div>
</div>
</body>

<script type="text/javascript">

// jstl 이 js보다 먼저 렌더링 되기 때문에 미리 url 가져오기
let num = 0;
const imgSrc = '<c:url value="/imageResponse?fileName=" />';
const pwdButton = document.querySelector('#pwd_button');
const imgAlbumDic = {};
// 페이징 관련 변수
const mainContainer = document.querySelector('#main_container');
const pageContainer = document.querySelector('#page_container');
const currentPageNum = document.querySelector('#current_page_num');
const totalPageNum = document.querySelector('#total_page_num');
let albumnum = 4;
let currentPage = 1;
let pageNum = 1;
let totalPage = 0;


// 페이지당 이미지 개수
<c:if test="${not empty pagePerImage}">
	const pagePerImage = ${pagePerImage};
</c:if>
// photosInfo에서 사진 순서(order_num)과 사진 이름(name) 매치 시키기 
<c:if test="${not empty photosInfo}">
	<c:forEach items="${photosInfo}" var="info">
		imgAlbumDic[Number(${info.order_num})] = "${info.name}";
	</c:forEach>
</c:if>

if('${pwdRequired}' === 'y') {
	pwdButton.addEventListener('click', () => {
		<c:if test="${not empty albumId}">
		const albumId =	${albumId};
		</c:if>
		const data = new URLSearchParams();
		
		data.append('albumId' , albumId)
		data.append('pwd' , document.querySelector('#password').value);
		
		fetch('/soloAlbum/pwdCheck', {
			method: 'POST',
			cache: 'no-cache',
			body: data
		})
		.then((response) => {
				document.querySelector('#password').value = '';
				// response 의 body만을 json 파싱해서 준다.
				response.json().then(data => {
					document.querySelector('#pwd_container').style.opacity = '0';
					document.querySelector('#main_container').style.opacity = '1';

					const photosInfo = data.photosInfo;
					const pagePerImage = data.pagePerImageMap;
					const albumName = data.albumName;
					document.title = albumName;
					
					// photosInfo에서 사진 순서(order_num)과 사진 이름(name) 매치 시키기 
					photosInfo.forEach(info => {
						imgAlbumDic[Number(info.order_num)] = info.name;
					});
					makePages(imgAlbumDic);
				});
		})
		.catch((err) => {
				console.error(err);
		});
	});

} else {
	document.querySelector('#pwd_container').style.opacity = '0';
	document.querySelector('#main_container').style.opacity = '1';
	makePages(imgAlbumDic);
	
}


// 앨범 생성 함수   // 순서:파일명 객체
function makePages(imgAlbumDic){
	// 앨범이 한페이지에 4장이므로 4의 배수 맞추기 위한 수
	const maxNum = Math.max(...Object.keys(imgAlbumDic)) + 1;
	const plusNum = 4 - (maxNum % 4 == 0 ? 4 : maxNum % 4);
	const pageNum = (maxNum+plusNum)/2;
	let n = 0;
	
	for(let i=0; i<pageNum; i++){
		const page = document.createElement('div');
		// 앨범페이지의 위치. 0이라면 뒤집어서 이전장의 뒤에 붙임  
		if(i%2 == 0) page.classList.add('reverse_page');
		else page.classList.add('forward_page');
		page.classList.add('pages');
		page.classList.add('page'+i);

		
		for(let j=0; j<2; j++){
			const albumBox = document.createElement('div');
			const img = document.createElement('img');
			albumBox.classList.add('album_box');
			
			//해당 위치에 사진이 등록되었다면 src를 설정, 아니라면 삭제 페이지 표출 
			if(Object.keys(imgAlbumDic).includes(String(n))){
				img.src=imgSrc + imgAlbumDic[n];
			} else {
				img.src='./public/img/deletedPhoto.png';
			}
			
			albumBox.appendChild(img);
			page.appendChild(albumBox);
			n++;
		}
		pageContainer.appendChild(page);
	}
	
	// zindex 초기화
	let zValue = 0;
	document.querySelectorAll('.pages').forEach(page => {
		page.style.zIndex = String(zValue);	
		zValue--;
	});
	
	// 전체 페이지 표시, 2장이 한면이라서 나누기 2
	totalPage = (pageNum/2) + 2;
	totalPageNum.innerText = totalPage;
}

</script>
<!-- page의 갯수가 onload될때 정해지기 때문에 이 script 아래로 와야한다. -->
<script src="./public/js/showPhotosPage.js" charset="utf-8"></script>
</html>