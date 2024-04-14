const mainContainer = document.querySelector('#mainContainer');
const pages = document.querySelectorAll('.pages');
const restBoxs = document.querySelector('#restBoxs');
const buttonNext = document.getElementById('buttonNext');
const buttonPrevious = document.querySelector('#buttonPrevious');
const currentPageNum = document.querySelector('#currentPageNum');
const totalPageNum = document.querySelector('#totalPageNum');
let page = 1;
let albumnum = 4;
let currentPage = 1;

// 다음 버튼을 누르면
buttonNext.addEventListener('click', () => {
	// 다음 페이지가 이미 생성되어 있다면
	if(page > currentPage && page <= 10){
		// 다음 page앨범구역 불러오기 
		const albumBoxNext = document.querySelectorAll(`.page${currentPage+1}`);
		// 페이지 변경
		for(let i=0; i<4; i++){
		//	기존 앨범구역 제거
			const albumBoxCurrent = document.querySelector(`#albumBox${i+1}`);
			albumBoxCurrent.removeAttribute('id');
			albumBoxCurrent.classList.add('restBox');
			albumBoxCurrent.classList.remove('albumBox');
			restBoxs.appendChild(albumBoxCurrent);
		// leftPage, rightPage 나눠서 표출
		//	albumBox1 ~ 4 id 로 주기
			albumBoxNext[i].setAttribute('id', `albumBox${i+1}`);	
			albumBoxNext[i].classList.add('albumBox');
			albumBoxNext[i].classList.remove('restBox');
			
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
		if(currentPage == 10){
			buttonNext.classList.add('restButton'); 
		}
		// 페이지 표출
		currentPageNum.innerText  = currentPage;
	// 다음페이지가 없다면 생성	
	} else if (page == currentPage && page < 10) {
		for(let i=0; i<4; i++){
			//	기존 앨범구역 제거 후, id 변경, class 변경
				const albumBoxPrevious = document.querySelector(`#albumBox${i+1}`);
				albumBoxPrevious.removeAttribute('id');
				albumBoxPrevious.classList.add('restBox');
				albumBoxPrevious.classList.add(`page${currentPage}`);
				albumBoxPrevious.classList.remove('albumBox');
				restBoxs.appendChild(albumBoxPrevious);
			// 새 앨범구역 생성 후 id, class, data-albumnum 세팅, mainContainer에 추가
				const albumBox = document.createElement('div');
				albumBox.classList.add('albumBox');
				albumBox.setAttribute('data-albumnum', albumnum); albumnum++;
				albumBox.id = `albumBox${i+1}`;
				if(i < 2){
					pages[0].appendChild(albumBox);
				} else {
					pages[1].appendChild(albumBox);
				}
			}
			page++;  
			currentPage++;
			if(currentPage > 1){
				buttonPrevious.classList.remove('restButton');
			}
			if(currentPage == 10){
				buttonNext.classList.add('restButton'); 
			}
			// 페이지 표출
			totalPageNum.innerText  = page;
			currentPageNum.innerText  = currentPage;
	} else if(currentPage == 10) {
		console.log('최대 페이지는 10입니다.');
	}
	
	
});


// 이전 버튼을 누르면
buttonPrevious.addEventListener('click', () => {
	if(currentPage > 1){
	// 이전 page앨범구역 불러오기 
		const albumBoxPrevious = document.querySelectorAll(`.page${currentPage-1}`);
		// 페이지 변경
		for(let i=0; i<4; i++){
		//	기존 앨범구역 제거
			const albumBoxCurrent = document.querySelector(`#albumBox${i+1}`);
			albumBoxCurrent.removeAttribute('id');
			albumBoxCurrent.classList.add(`page${currentPage}`);
			albumBoxCurrent.classList.remove('albumBox')
			restBoxs.appendChild(albumBoxCurrent);
		// leftPage, rightPage 나눠서 표출
		//	albumBox1 ~ 4 id 로 주기
			albumBoxPrevious[i].setAttribute('id', `albumBox${i+1}`);	
			albumBoxPrevious[i].classList.add('albumBox');
			albumBoxPrevious[i].classList.remove('restBox');
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
		if(currentPage < page){
			buttonNext.classList.remove('restButton');
		}
		// 페이지 표출
		currentPageNum.innerText  = currentPage;
	}
});
