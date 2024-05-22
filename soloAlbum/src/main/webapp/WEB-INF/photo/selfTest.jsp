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
		<c:forEach items="${photosInfo}" var="info" varStatus="i">
			<div class="page page${i.index}">
				<h1>${i.index}</h1><br>
				<h2>${info.name}</h2>
			</div>
		</c:forEach>
	</div>
</body>
	<script>
		const items = document.querySelectorAll('.page');
		for(let i=0; i<items.length; i++) {
				setTimeout(()=>{
					items[i].animate(
			                [
			                    { transform: 'rotateX(15deg) rotateY(6deg)' },
			                    { transform: 'rotateX(15deg) rotateY(174deg)'},
			                ],
			                {
			                    duration: 8000,
			                    easing: "ease-in-out",
			                    iterations: Infinity,
			                }
			            );
				}, (i+1)*1000);
		}
		//console.log(${photosInfo.size()});		
	</script>
</html>