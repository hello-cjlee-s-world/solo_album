const mainContainer = document.querySelector('#mainContainer');
const buttonNext = document.getElementById('buttonNext');
const buttonPrevious = document.querySelector('#buttonPrevious');
const currentPageNum = document.querySelector('#currentPageNum');
const totalPageNum = document.querySelector('#totalPageNum');
let albumnum = 4;
let currentPage = 1;
const totalPage = pageNum;
totalPageNum.innerText = totalPage;

// 다음 버튼을 누르면
buttonNext.addEventListener('click', () => {
	if(currentPage < totalPage){
		// 다음 page앨범구역 불러오기
		const albumBoxNext = document.querySelectorAll(`.page${currentPage+1}`);
		const albumBoxCurrent = document.querySelectorAll('.albumBox');

		// 페이지 변경
		for(let i=0; i<albumBoxCurrent.length; i++){
		//	기존 앨범구역 제거
			albumBoxCurrent[i].removeAttribute('id');
			albumBoxCurrent[i].classList.add('restBox');
			albumBoxCurrent[i].classList.remove('albumBox');
			restBoxs.appendChild(albumBoxCurrent[i]);
		}
		for(let i=0; i<albumBoxNext.length; i++){
		//	albumBox1 ~ 4 id 로 주기
			albumBoxNext[i].classList.add('albumBox');
			albumBoxNext[i].classList.remove('restBox');
			albumBoxNext[i].setAttribute('id', `albumBox${i+1}`);	
		// 좌, 우 나눠서 표출
			if(i < 2){
				pages[0].appendChild(albumBoxNext[i]);
			} else {
				pages[1].appendChild(albumBoxNext[i]);
			}
		}
	
		currentPage++;
		if(currentPage > 1){
			buttonPrevious.classList.remove('restButton');
		}
		if(currentPage == totalPage){
			buttonNext.classList.add('restButton'); 
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
		const albumBoxPrevious = document.querySelectorAll(`.page${currentPage-1}`);
		const albumBoxCurrent = document.querySelectorAll('.albumBox');
		
		// 페이지 변경
		for(let i=0; i<albumBoxCurrent.length; i++){
		//	기존 앨범구역 제거
			albumBoxCurrent[i].removeAttribute('id');
			albumBoxCurrent[i].classList.add(`page${currentPage}`);
			albumBoxCurrent[i].classList.remove('albumBox')
			restBoxs.appendChild(albumBoxCurrent[i]);
		}
		for(let i=0; i<albumBoxPrevious.length; i++){
			//	albumBox1 ~ 4 id 로 주기
			albumBoxPrevious[i].classList.add('albumBox');
			albumBoxPrevious[i].classList.remove('restBox');
			albumBoxPrevious[i].setAttribute('id', `albumBox${i+1}`);	
			// 좌, 우 나눠서 표출
			if(i < 2){
				pages[0].appendChild(albumBoxPrevious[i]);
			} else {
				pages[1].appendChild(albumBoxPrevious[i]);
			}
		}
	
		currentPage--;
		if(currentPage == 1){
			buttonPrevious.classList.add('restButton'); 
		}
		if(currentPage < totalPage){
			buttonNext.classList.remove('restButton');
		}
		// 페이지 표출
		currentPageNum.innerText  = currentPage;
	}
});
