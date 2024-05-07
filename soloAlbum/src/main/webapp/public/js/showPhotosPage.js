// 다음 버튼을 누르면
buttonNext.addEventListener('click', () => {
	if(currentPage < totalPage){
		// 다음 page앨범구역 불러오기
		const albumBoxNext = document.querySelectorAll(`.page_${currentPage+1}`);
		const albumBoxCurrent = document.querySelectorAll('.album_box');

		// 페이지 변경
		for(let i=0; i<albumBoxCurrent.length; i++){
		//	기존 앨범구역 제거
			albumBoxCurrent[i].removeAttribute('id');
			albumBoxCurrent[i].classList.add('rest_box');
			albumBoxCurrent[i].classList.remove('album_box');
			restBoxs.appendChild(albumBoxCurrent[i]);
		}
		for(let i=0; i<albumBoxNext.length; i++){
		//	albumBox1 ~ 4 id 로 주기
			albumBoxNext[i].classList.add('album_box');
			albumBoxNext[i].classList.remove('rest_box');
			albumBoxNext[i].setAttribute('id', `album_box_${i+1}`);	
		// 좌, 우 나눠서 표출
			if(i < 2){
				pages[0].appendChild(albumBoxNext[i]);
			} else {
				pages[1].appendChild(albumBoxNext[i]);
			}
		}
	
		currentPage++;
		if(currentPage > 1){
			buttonPrevious.classList.remove('rest_button');
		}
		if(currentPage == totalPage){
			buttonNext.classList.add('rest_button'); 
		}
		// 페이지 순서 표출
		currentPageNum.innerText  = currentPage;
	
	} else if(currentPage == totalPage) {
		alert('마지막 페이지입니다.');
	}
	
	
});


// 이전 버튼을 누르면
buttonPrevious.addEventListener('click', () => {
	if(currentPage > 1){
	// 이전 page앨범구역 불러오기 
		const albumBoxPrevious = document.querySelectorAll(`.page_${currentPage-1}`);
		const albumBoxCurrent = document.querySelectorAll('.album_box');
		
		// 페이지 변경
		for(let i=0; i<albumBoxCurrent.length; i++){
		//	기존 앨범구역 제거
			albumBoxCurrent[i].removeAttribute('id');
			albumBoxCurrent[i].classList.add(`page_${currentPage}`);
			albumBoxCurrent[i].classList.remove('album_box')
			restBoxs.appendChild(albumBoxCurrent[i]);
		}
		for(let i=0; i<albumBoxPrevious.length; i++){
			//	albumBox1 ~ 4 id 로 주기
			albumBoxPrevious[i].classList.add('album_box');
			albumBoxPrevious[i].classList.remove('rest_box');
			albumBoxPrevious[i].setAttribute('id', `album_box_${i+1}`);	
			// 좌, 우 나눠서 표출
			if(i < 2){
				pages[0].appendChild(albumBoxPrevious[i]);
			} else {
				pages[1].appendChild(albumBoxPrevious[i]);
			}
		}
	
		currentPage--;
		if(currentPage == 1){
			buttonPrevious.classList.add('rest_button'); 
		}
		if(currentPage < totalPage){
			buttonNext.classList.remove('rest_button');
		}
		// 페이지 표출
		currentPageNum.innerText  = currentPage;
	}
});
