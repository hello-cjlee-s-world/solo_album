<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ include file="../common/common.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="../../public/css/main.css">
<title>Album For You</title>
</head>
<body>
	<%-- <c:forEach items="${photosInfo}" var="info">
				${info.name}
				<br>
				${info.order_num}
				<br>
				<br>
	</c:forEach> --%>
	<c:forEach var="url" items="${fileUrls}">
				${url}
				<div>
					<img src="<c:url value='/image-manual-response?fileName=${url}'/>" style="width:150px">
					<%-- <img src="<c:url value="/images/${url}"/>"> --%>
					<%-- <img src="<spring:url value='/image/${url}}' />" style="width:250px;"> --%>
					<%-- <img src="<c:url value='/image/${url}}' />" style="width:250px;"> --%>
				</div>
				<br>
				<br>
	</c:forEach>

		<!-- 앨범 구역 -->
	<div id="mainContainer">
		<div class="pages left_page">
			<div id="albumBox1" class="albumBox" data-albumnum="0"></div>
			<div id="albumBox2" class="albumBox" data-albumnum="1"></div>
		</div>
		<div class="pages rightPage">
			<div id="albumBox3" class="albumBox" data-albumnum="2"></div>
			<div id="albumBox4" class="albumBox" data-albumnum="3"></div>
		</div>

		<div id="buttonPageContainer">
			<div id="buttonBox">
				<button type="button" id="buttonPrevious" class='restButton'>이전
					장</button>
				<button type="button" id="buttonNext">다음 장</button>
			</div>
			<div id="pageBox">
				<div>
					<span id="currentPageNum">1</span>/<span id="totalPageNum">1</span>
				</div>
			</div>
		</div>

	</div>
	<div id="restBoxs"></div>
</body>
<script type="text/javascript">
	
</script>
</html>