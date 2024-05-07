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
			<div class="pages left_page"></div>
			<div class="pages rightPage"></div>
		</div>
		<div id="button_page_container">
			<div id="button_box">
				<button type="button" id=button_previous class='rest_button'>이전
					장</button>
				<button type="button" id="button_next">다음 장</button>
			</div>
			<div id="page_box">
				<div>
					<span id="current_page_num">1</span>/<span id="total_page_num"></span>
				</div>
			</div>
		</div>
	</div>
	<div id="rest_boxs"></div>
</div>
</body>

<script type="text/javascript">

// jstl 이 js보다 먼저 렌더링 되기 때문에 미리 url 가져오기
let num = 0;
const imgSrc = '<c:url value="/imageResponse?fileName=" />';
const pwdButton = document.querySelector('#pwd_button');
const imgAlbumDic = {};
const pages = document.querySelectorAll('.pages');
const restBoxs = document.querySelector('#rest_boxs');
// 페이징 관련 변수
const mainContainer = document.querySelector('#main_container');
const buttonNext = document.querySelector('#button_next');
const buttonPrevious = document.querySelector('#button_previous');
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
					makeBoxs(imgAlbumDic);
				});
		})
		.catch((err) => {
				console.error(err);
		});
	});

} else {
	document.querySelector('#pwd_container').style.opacity = '0';
	document.querySelector('#main_container').style.opacity = '1';
	makeBoxs(imgAlbumDic);
	
}


// 앨범 가져오는 함수   // 순서:파일명 객체
function makeBoxs (imgAlbumDic){
	// 앨범이 한페이지에 4장이므로 4의 배수 맞추기 위한 수
	const maxNum = Math.max(...Object.keys(imgAlbumDic)) + 1;
	const plusNum = 4 - (maxNum % 4 == 0 ? 4 : maxNum % 4);

	for(let i=0; i<(maxNum+plusNum); i++) {	
		const albumBox = document.createElement('div');
		const img = document.createElement('img');
		let boxNum = i % 4;
		if(boxNum == 0 && i != 0){
			pageNum++;
		}
		
		// 4번째 사진까지는 화면에 표출, 나머지 사진은 restboxs구역에서 대기
		if(i < 4){
			albumBox.setAttribute('id', 'album_box_'+(boxNum+1));
			albumBox.classList.add('album_box');
			albumBox.classList.add('page_' + String(pageNum));
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
			albumBox.classList.add('rest_box');
			albumBox.classList.add('page_' + String(pageNum));
			if(Object.keys(imgAlbumDic).includes(String(i))) 
				img.src=imgSrc + imgAlbumDic[i];
			else img.src='./public/img/deletedPhoto.png';
			albumBox.appendChild(img);
			restBoxs.appendChild(albumBox);
		}
	}
	// 전체 페이지 표시
	totalPage = pageNum;
	totalPageNum.innerText = totalPage;
}



	
</script>
<!-- page의 갯수가 onload될때 정해지기 때문에 이 script 아래로 와야한다. -->
<script src="./public/js/showPhotosPage.js" charset="utf-8"></script>
</html>