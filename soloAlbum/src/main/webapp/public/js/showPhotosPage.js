const prevArea = document.querySelector('.prev_page');
const nextArea = document.querySelector('.next_page');
const frontCover = document.querySelector('#front_cover');
const backCover = document.querySelector('#back_cover');
let rightPage = frontCover;
let leftPage = document.querySelector('.page0');

nextArea.addEventListener('click', () => {
	// 다음장이 표지도 아니며 존재하지 않는 상태면 동작 안함
	if(currentPageNum.innerText == totalPage) return;
	
	// 클릭한것이 앞표지라면
	if(currentPageNum.innerText == '1') {
		// 0번째 페이지와 커버를 넘긴다.
		leftPaperFlip(frontCover, -6, -174);
		leftPaperFlip(document.querySelector('.page0'), 174, 6);
		
	// 앨범 마지막 페이지라면
	} else if (Number(currentPageNum.innerText) + 1 == totalPage){
		leftPaperFlip(document.querySelector('.page' + ((totalPage-2)*2-1)), -6, -174);
		leftPaperFlip(backCover, 174, 6);		
		console.log((totalPage-2)*2-1);
		
	// 다음장이 앨범이라면
	} else {
		const backPage = (Number(currentPageNum.innerText) - 1) * 2;
		leftPaperFlip(document.querySelector('.page' + (backPage-1)) , -6, -174);
		leftPaperFlip(document.querySelector('.page' + backPage), 174, 6);
	}
	currentPageNum.innerText = Number(currentPageNum.innerText) + 1;
});

prevArea.addEventListener('click', () => {
	// 이전장이 표지도 아니며 존재하지 않는 상태면 동작 안함
	if(currentPageNum.innerText == '1') return;

	// 클릭한것이 뒷표지라면
	if(currentPageNum.innerText == String(totalPage)) {
		// 뒷 커버와 마지막 장을 펼친다
		rightPaperFlip(backCover, 6, 174);
		rightPaperFlip(document.querySelector('.page' + ((totalPage-2)*2-1)), -174, -6);
		
	// 앨범 첫번째 페이지라면
	} else if (currentPageNum.innerText == '2'){
		rightPaperFlip(document.querySelector('.page0'), 6, 174);
		rightPaperFlip(frontCover, -174, -6);
				
	// 이전장이 앨범이라면
	} else {
		const frontPage = (Number(currentPageNum.innerText) - 2) * 2;
		rightPaperFlip(document.querySelector('.page' + frontPage) , 6, 174);
		rightPaperFlip(document.querySelector('.page' + (frontPage -1)), -174, -6);
	}
	currentPageNum.innerText = Number(currentPageNum.innerText) - 1;
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