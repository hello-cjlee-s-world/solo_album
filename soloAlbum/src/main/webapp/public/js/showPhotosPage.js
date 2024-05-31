const prevArea = document.querySelector('.prev_page');
const nextArea = document.querySelector('.next_page');
const frontCover = document.querySelector('#front_cover');
const backCover = document.querySelector('#back_cover');
let rightPage = frontCover;
let leftPage = document.querySelector('.page0');

nextArea.addEventListener('click', () => {
	// 다음장이 표지도 아니며 존재하지 않는 상태면 동작 안함
	if(backCover.classList.contains('left')) return;
		
	leftPaperFlip(rightPage, -6, -174);
	// 클릭한것이 앞표지라면
	if(frontCover.classList.contains('right')) {
		leftPaperFlip(leftPage, 174, 6);
		rightPage = document.querySelector('.page1');
		frontCover.classList.remove('right');
		
	// 클릭한것이 앞표지가 아니라면
	} else {
		const next = Number(rightPage.classList[2].slice(-1)) + 1;
		const nextPage = document.querySelector('.page' + (next));

		// 다음장이 뒷표지라면
		if(nextPage === null || nextPage === undefined){
			leftPage = backCover;
			backCover.classList.add('left');
			leftPaperFlip(leftPage, 174, 6);
			
		// 다음장이 앨범이라면
		} else {
			leftPage = nextPage;	
			rightPage = document.querySelector(`.page${next+1}`);
			leftPaperFlip(leftPage, 174, 6);
		}

	}
});

prevArea.addEventListener('click', () => {
	// 이전장이 표지도 아니며 존재하지 않는 상태면 동작 안함
	if(frontCover.classList.contains('right')) return;
		
	rightPaperFlip(leftPage, 6, 174);
	const prev = Number(leftPage.classList[2].slice(-1)) - 1;
	
	// 클릭한것이 뒷표지라면
	if(backCover.classList.contains('left')) {
		rightPaperFlip(rightPage, -174, -6);
		const left = Number(rightPage.classList[2].slice(-1)) - 1;
		leftPage = document.querySelector('.page' + (left));
		backCover.classList.remove('left');	
		
	// 클릭한것이 뒷표지가 아니라면
	} else {
		const prevPage = document.querySelector('.page' + (prev));


		// 이전장이 앞표지라면
		if(prev < 0){
			rightPage = frontCover;
			frontCover.classList.add('right');
			rightPaperFlip(rightPage, -174, -6);
			
		// 이전장이 앨범이라면
		} else {
			rightPage = prevPage;	
			leftPage = document.querySelector(`.page${prev-1}`);
			rightPaperFlip(rightPage, -174, -6);
		}

	}
});


const leftPaperFlip = (item, startDegree, endDegree) => {
	item.animate(
            [
                { transform: 'rotateX(15deg) rotateY(' + startDegree +'deg)'},
                { transform: 'rotateX(15deg) rotateY(' + endDegree +'deg)'},
            ],
            {
                duration: 2000,
                easing: "ease-in-out",
                fill: "forwards",
            },
        );
}
const rightPaperFlip = (item, startDegree, endDegree) => {
	item.animate(
            [
                { transform: 'rotateX(15deg) rotateY(' + startDegree +'deg)'},
                { transform: 'rotateX(15deg) rotateY(' + endDegree +'deg)'},
            ],
            {
                duration: 2000,
                easing: "ease-in-out",
                fill: "forwards",
            },
        );
}