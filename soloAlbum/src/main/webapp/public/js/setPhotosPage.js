const mainContainer = document.querySelector('#main_container');
const pages = document.querySelectorAll('.pages');
const restBoxs = document.querySelector('#rest_boxs');
const buttonNext = document.getElementById('button_next');
const buttonPrevious = document.querySelector('#button_previous');
const currentPageNum = document.querySelector('#currentPageNum');
const totalPageNum = document.querySelector('#totalPageNum');
let albumnum = 4;
let currentPage = 1;

// 다음 버튼을 누르면
buttonNext.addEventListener('click', () => {
	// 다음 페이지가 이미 생성되어 있다면
	if(page > currentPage && page <= 10){
		for(let i=0; i<4; i++){
		//	기존 앨범구역 제거
			const albumBoxCurrent = document.querySelector(`#album_box_${i+1}`);
			albumBoxCurrent.removeAttribute('id');
			albumBoxCurrent.classList.add('rest_box');
			restBoxs.appendChild(albumBoxCurrent);
			
		// 다음 page앨범구역 불러오기 
		const albumBoxNext = document.querySelectorAll(`.page_${currentPage+1}`);
		// leftPage, rightPage 나눠서 표출
		//	albumBox1 ~ 4 id 로 주기
			albumBoxNext[i].setAttribute('id', `album_box_${i+1}`);	
			albumBoxNext[i].classList.remove('rest_box');
			
			if(i < 2){
				pages[0].appendChild(albumBoxNext[i]);
			} else {
				pages[1].appendChild(albumBoxNext[i]);
			}
		}
		
		// 페이지 관련 변수 변화
		currentPage++;
		if(currentPage > 1){
			buttonPrevious.classList.remove('rest_button');
		}
		if(currentPage == 10){
			buttonNext.classList.add('rest_button'); 
		}
		// 페이지 표출
		currentPageNum.innerText  = currentPage;
		
	// 다음페이지가 없다면 생성	
	} else if (page == currentPage && page < 10) {
		for(let i=0; i<4; i++){
			//	기존 앨범구역 제거 후, id 변경, class 변경
			const albumBoxCurrent = document.querySelector(`#album_box_${i+1}`);
			albumBoxCurrent.removeAttribute('id');
			albumBoxCurrent.classList.add('rest_box');
			restBoxs.appendChild(albumBoxCurrent);
			
			// 새 앨범구역 생성 후 id, class, data-albumnum 세팅, mainContainer에 추가
				const albumBox = document.createElement('div');
				albumBox.classList.add('album_box');
				albumBox.classList.add(`page_${page+1}`);
				albumBox.setAttribute('data-albumnum', albumnum); albumnum++;
				albumBox.id = `album_box_${i+1}`;
				if(i < 2){
					pages[0].appendChild(albumBox);
				} else {
					pages[1].appendChild(albumBox);
				}
			}
			
			// 페이지 관련 변수 변화
			page++;  
			currentPage++;
			if(currentPage > 1){
				buttonPrevious.classList.remove('rest_button');
			}
			if(currentPage == 10){
				buttonNext.classList.add('rest_button'); 
			}
			// 페이지 표출
			totalPageNum.innerText  = page;
			currentPageNum.innerText  = currentPage;
	} 
	//else if(currentPage == 10) {
	//	alert('최대 페이지는 10장입니다.');
	//}
	
	
});


// 이전 버튼을 누르면
buttonPrevious.addEventListener('click', () => {
	if(currentPage > 1){
		// 페이지 변경
		for(let i=0; i<4; i++){
		//	기존 앨범구역 제거
		const albumBoxCurrent = document.querySelector(`#album_box_${i+1}`);
		albumBoxCurrent.removeAttribute('id');
		albumBoxCurrent.classList.add(`page_${currentPage}`);
		albumBoxCurrent.classList.add('rest_box');
		restBoxs.appendChild(albumBoxCurrent);
			
		// 이전 page앨범구역 불러오기 
		const albumBoxPrevious = document.querySelectorAll(`.page_${currentPage-1}`);
		// leftPage, rightPage 나눠서 표출
		//	albumBox1 ~ 4 id 로 주기
		albumBoxPrevious[i].setAttribute('id', `album_box_${i+1}`);	
		albumBoxPrevious[i].classList.remove('rest_box');
		
		if(i < 2){
			pages[0].appendChild(albumBoxPrevious[i]);
		} else {
			pages[1].appendChild(albumBoxPrevious[i]);
		}
	}
		
		// 페이지 관련 변수 변화
		currentPage--;
		if(currentPage == 1){
			buttonPrevious.classList.add('rest_button'); 
		}
		if(currentPage < page){
			buttonNext.classList.remove('rest_button');
		}
		// 페이지 표출
		currentPageNum.innerText  = currentPage;
	}
});
