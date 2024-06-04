const prevArea = document.querySelector('.prev_page');
const nextArea = document.querySelector('.next_page');
const frontCover = document.querySelector('.front_cover');
const backCover = document.querySelector('.back_cover');
const pages = document.querySelectorAll('.pages'); // 앨범 페이지들
const duration = 2000; // 애니메이션 수행 시간

// 뒤로 넘기기
nextArea.addEventListener('click', () => {
	// 다음장이 표지도 아니며 존재하지 않는 상태면 동작 안함
	if(currentPage == totalPage) return;
	
	// 클릭한것이 앞표지라면
	if(currentPage == 1) {
		// 0번째 페이지와 커버를 넘긴다.
		paperFlip(frontCover, -10, -170);
		paperFlip(document.querySelector('.page0'), 170, 10);
		
	// 앨범 마지막 페이지라면
	} else if (currentPage + 1 == totalPage){
		paperFlip(document.querySelector('.page' + ((totalPage-2)*2-1)), -10, -170);
		paperFlip(backCover, 170, 10);
		
	// 다음장이 앨범이라면
	} else {
		const backPageNum = (currentPage - 1) * 2;
		paperFlip(document.querySelector('.page' + (backPageNum-1)) , -10, -170);
		paperFlip(document.querySelector('.page' + backPageNum), 170, 10);	
	}
	currentPage++;
	currentPageNum.innerText = currentPage;
	
	// 페이지 z-index 정렬
	pagefilp('right');
	
	// 페이지 넘어가는 동안에는 페이지 버튼 눌리지 않도록 설정
	buttonControll();
});

// 앞으로 넘기기
prevArea.addEventListener('click', () => {
	// 이전장이 표지도 아니며 존재하지 않는 상태면 동작 안함
	if(currentPage == 1) return;

	// 클릭한것이 뒷표지라면
	if(currentPage == totalPage) {
		// 뒷 커버와 마지막 장을 펼친다
		paperFlip(backCover, 10, 170);
		paperFlip(document.querySelector('.page' + ((totalPage-2)*2-1)), -170, -10);
		
	// 앨범 첫번째 페이지라면
	} else if (currentPage == 2){
		paperFlip(document.querySelector('.page0'), 10, 170);
		paperFlip(frontCover, -170, -10);
				
	// 이전장이 앨범이라면
	} else {
		const frontPage = (currentPage - 2) * 2;
		paperFlip(document.querySelector('.page' + frontPage) , 10, 170);
		paperFlip(document.querySelector('.page' + (frontPage -1)), -170, -10);
	}
	currentPage--;
	currentPageNum.innerText = currentPage;
	
	// 페이지 z-index 정렬
	pagefilp('left');
	
	// 페이지 넘어가는 동안에는 페이지 버튼 눌리지 않도록 설정
	buttonControll();
});


const paperFlip = (item, startDegree, endDegree) => {
	item.animate(
            [
                { transform: 'rotateX(15deg) rotateY(' + startDegree +'deg)'},
                { transform: 'rotateX(15deg) rotateY(' + endDegree +'deg)'},
            ],
            {
                duration: duration,
                easing: "ease-in-out",
                fill: "forwards",
            },
        );
}

const buttonControll = () => {
	nextArea.style.display = 'none'
	prevArea.style.display = 'none'
	setTimeout(() => {
		nextArea.style.display = 'block';
		prevArea.style.display = 'block';
	} , duration - 500);
}
/*const pagefilp = () => {
	let z = 0;
	let trigger = 0;
	if(currentPage == 1 || currentPage == totalPage) return;
	// 페이지가 넘어가는 순간에 바꾸기 위해
	setTimeout(() => {
		pages.forEach(page => {
			// 현재 페이지 번호
			const currentL = (currentPage - 2) * 2;
			const currentR = currentL + 1;
			
			// z index 부여
			// 왼쪽 페이지
			if(trigger <= 0){
				page.style.zIndex = String(z);
				z++;
				// 현재 페이지를 만나면 trigger를 바꾼다.
				if(page.classList.contains('page' + currentL)) {
					trigger++;
				}
			// 오른쪽 페이지
			} else {
				page.style.zIndex = String(z);
				z--;
			}
		});
	} , duration/2)
}*/

/*
let lIndex = 0;
let rIndex = totalPage;
const pagefilp = (direction) => {
	if(currentPage == totalPage || currentPage == 1) return;
	
	const currentL = (currentPage - 2) * 2;
	const currentR = currentL + 1;
	
	if(direction == 'left') {
		if (currentPage != (totalPage - 1)) {
			document.querySelector('.page'+currentL).style.zIndex = lIndex-1;
			document.querySelector('.page'+currentR).style.zIndex = rIndex+1;
			document.querySelector('.page'+(currentR+1)).style.zIndex = lIndex;
			document.querySelector('.page'+(currentR+2)).style.zIndex = rIndex;
		} else {
			document.querySelector('.page'+currentL).style.zIndex = lIndex;
			document.querySelector('.page'+currentR).style.zIndex = rIndex;
		}
		lIndex--;
		rIndex++;
	}
	else if(direction == 'right') {	
		if (currentPage != 2) {
			document.querySelector('.page'+currentL).style.zIndex = lIndex+1;
			document.querySelector('.page'+currentR).style.zIndex = rIndex-1;
			document.querySelector('.page'+(currentL-1)).style.zIndex = rIndex;
			document.querySelector('.page'+(currentL-2)).style.zIndex = lIndex;
		} else {
			document.querySelector('.page'+currentL).style.zIndex = lIndex;
			document.querySelector('.page'+currentR).style.zIndex = rIndex;
		}
		lIndex++;
		rIndex--;
	}

} /*