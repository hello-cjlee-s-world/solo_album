<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<link rel="stylesheet" href="./public/css/selfTest.css">
<title>Insert title here</title>
</head>
<body>
	<div id="container">
		<div class="cover">
			<h1>COVER</h1>
		</div>
		
	</div>
</body>
	<script>
		const container = document.querySelector('#container');
		const photoName = [];
		<c:forEach items="${photosInfo}" var="info" varStatus="i">
			photoName.push('${info.name}');
		</c:forEach>
		for(let i=0; i<photoName.length; i++){
			const page = document.createElement('div');
			const h1 = document.createElement('h1');
			const h2 = document.createElement('h2');
			h1.innerText = photoName[i];
			h2.innerText = i;
			if(i%2 == 0) page.classList.add('reversePage');
			else page.classList.add('forwardPage');
			
			page.classList.add('page'+i);
			page.classList.add('page');
			
			page.appendChild(h2);
			page.appendChild(h1);
			container.appendChild(page);
		}
		
		const items = document.querySelectorAll('.page');
		const p = 1;
		for(let i=1; i<items.length; i+=2) {
				setTimeout(()=>{
					// 앞장
		            paperFlip(items[i], -6, -174);
					// 뒷장, 사진 리스트 사이즈보다 작을 경우에만 실행
					if(i+1 < items.length){						
			            paperFlip(items[i+1], 174, 6);
					}
				}, (i+1)*500);
		}
		
		// 책장 넘기는 애니메이션 함수
		const paperFlip = (item, startDegree, endDegree) => {
			item.animate(
	                [
	                    { transform: 'rotateX(15deg) rotateY(' + startDegree +'deg)'},
	                    { transform: 'rotateX(15deg) rotateY(' + endDegree +'deg)'},
	                ],
	                {
	                    duration: 5000,
	                    easing: "ease-in-out",
	                    iterations: Infinity,
	                },
	            );
		}
		paperFlip(items[0], 174, 6);
		paperFlip(document.querySelector('.cover'), '-6', '-174');
		
		
	</script>
</html>