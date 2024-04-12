let imgSwitch=0;
let fileList=[];
let num = 0;
let imgAlbumDic = {};

let startX=0, startY=0, offsetX=0, offsetY=0;
const albumBox1 = document.getElementById('albumBox1');
const albumBox2 = document.getElementById('albumBox2');
const albumBox3 = document.getElementById('albumBox3');
const albumBox4 = document.getElementById('albumBox4');

const albumBoxRect1 = albumBox1.getBoundingClientRect();
const albumBoxRect2 = albumBox2.getBoundingClientRect();
const albumBoxRect3 = albumBox3.getBoundingClientRect();
const albumBoxRect4 = albumBox4.getBoundingClientRect();

let tW1=albumBoxRect1.width, tH1=albumBoxRect1.height, tX1=albumBoxRect1.x, tY1=albumBoxRect1.y
let tW2=albumBoxRect2.width, tH2=albumBoxRect2.height, tX2=albumBoxRect2.x, tY2=albumBoxRect2.y
let tW3=albumBoxRect3.width, tH3=albumBoxRect3.height, tX3=albumBoxRect3.x, tY3=albumBoxRect3.y
let tW4=albumBoxRect4.width, tH4=albumBoxRect4.height, tX4=albumBoxRect4.x, tY4=albumBoxRect4.y

const files = document.querySelector("#files");
// input의 onchange에서 this를 인자로 넣었기 때문에 input은 files.addEventListener("change" (e))의 e.target 과 같다
// 이미지 프리뷰 설정
const fileChange = (input) => {
	if (input.files && input.files[0]) {
		const imgBox = document.querySelector('#imgBox');
	
		for(let i=0; i < input.files.length; i++){
				var reader = new FileReader();
				reader.onload = function(e) {
					const img = document.createElement('img');
					const imgSmallBox = document.createElement('div');
					const newURL = URL.createObjectURL(input.files[i]);
					const xButton = document.createElement('img');
					xButton.src = './public/img/xIcon.png';
					xButton.classList.add('xButton');	
					
					img.src = newURL;
					img.classList.add('preview');
					imgSmallBox.draggable="true";
					imgSmallBox.classList.add('imgSmallBox');
					imgSmallBox.setAttribute('data-num', String(num));
					num += 1
					//console.log(imgSmallBox.dataset.num);
					imgSmallBox.appendChild(img);
					imgSmallBox.appendChild(xButton);
					imgBox.appendChild(imgSmallBox);

// dropImage에서 parentNode 가 쓰이는데, imgSamllBox에 appendChild 된 후에 addEventLinstener 해준다
					xButton.addEventListener("click", (e) => {
					// x 버튼 클릭시 사진 삭제 이벤트
						e.stopPropagation();
						e.preventDefault();
						// blob URL 삭제
						URL.revokeObjectURL(xButton.parentNode.childNodes[0].src);
						xButton.parentNode.parentNode.removeChild(xButton.parentNode);
						// 파일리스트에서 삭제
						delete fileList[imgSmallBox.dataset.num]
						// 이미지 : 앨범구역 dict 에서 삭제
						delete imgAlbumDic[imgSmallBox.dataset.num];
					});
					imgSmallBox.addEventListener('dragstart', (e) => {
						alert('drag test');
					});
					// img 드래그를 위한 코드
					imgSmallBox.addEventListener("mousedown", function(e){
					    // 드래그시 마우스 클릭 동작 방지
					    e.preventDefault();
					    // 이동중이거나 마우스 드래그 상태가 아닐때의 이벤트
					    document.addEventListener("mousemove", startMove);
					    document.addEventListener("mouseup", stopMove);
					    
					    // 드래그 움직이면
					    function startMove(e) {
						    imgSwitch=1;
						    imgSmallBox.style.position = 'absolute';
						    //imgSmallBox.style.boxShadow = '2px 2px 20px 10px grey'
						    const clientRect = imgSmallBox.getBoundingClientRect();
						    // 이미지 드래그시 마우스 위치의 좌표로 이동
						    //const mainContainer = document.querySelector('#mainContainer');
						    //console.log(mainContainer);
						    //mainContainer.appendChild(imgSmallBox);
						    imgSmallBox.style.left = e.clientX - (clientRect.width/2) + 'px';
						    imgSmallBox.style.top = e.clientY - (clientRect.height/2) + 'px';
						    imgSmallBox.style.transition='0s';
						    // 구역 접촉 시 이벤트 구역 1~4번
						    if(touched(clientRect, tX1, tY1, tW1, tH1)){
						    	if(albumBox1.childElementCount < 1){
								    albumBox1.style.border='7px solid blue';
						    	}
						    } else {
						   		 albumBox1.style.border='none'
						    }
						    if(touched(clientRect, tX2, tY2, tW2, tH2)){
						    	if(albumBox2.childElementCount < 1){
									albumBox2.style.border='7px solid blue';
						    	}
							} else {
								 albumBox2.style.border='none'
							}
						    if(touched(clientRect, tX3, tY3, tW3, tH3)){
						    	if(albumBox3.childElementCount < 1){
									albumBox3.style.border='7px solid blue';
						    	}
							} else {
								 albumBox3.style.border='none'
							}							
							if(touched(clientRect, tX4, tY4, tW4, tH4)){
								if(albumBox4.childElementCount < 1){
									albumBox4.style.border='7px solid blue';
								}
							} else {
								 albumBox4.style.border='none'
							}
						    
						}
						
						// 드래그 놓으면
						function stopMove() {
						//imgSmallBox.style.boxShadow = '2px 2px 10px 3px grey';
						// imgSmallBox 원위치
						const clientRect = imgSmallBox.getBoundingClientRect();
						albumBox1.style.border='none'
						albumBox2.style.border='none'
						albumBox3.style.border='none'
						albumBox4.style.border='none'
						    // 구역 안에서 놓았을 경우 이벤트 구역 1 ~ 4
						    if(touched(clientRect, tX1, tY1, tW1, tH1)){
								if(imgSwitch==1 && albumBox1.childElementCount < 1) {
									albumBox1.appendChild(imgSmallBox);
									imgAlbumDic[imgSmallBox.dataset.num] = albumBox1.dataset.albumnum;
									//console.log(imgAlbumDic);
									imgSwitch=0;
								}
							} else if(touched(clientRect, tX2, tY2, tW2, tH2)) {
								if(imgSwitch==1 && albumBox2.childElementCount < 1) {
									albumBox2.appendChild(imgSmallBox);
									imgAlbumDic[imgSmallBox.dataset.num] = albumBox2.dataset.albumnum;
									//console.log(imgAlbumDic);
									imgSwitch=0;
								}
							} else if(touched(clientRect, tX3, tY3, tW3, tH3)) {
								if(imgSwitch==1 && albumBox3.childElementCount < 1) {
									albumBox3.appendChild(imgSmallBox);
									imgAlbumDic[imgSmallBox.dataset.num] = albumBox3.dataset.albumnum;
									//console.log(imgAlbumDic);
									imgSwitch=0;
								}
							} else if(touched(clientRect, tX4, tY4, tW4, tH4)) {
								if(imgSwitch==1 && albumBox4.childElementCount < 1) {
									albumBox4.appendChild(imgSmallBox);
									imgAlbumDic[imgSmallBox.dataset.num] = albumBox4.dataset.albumnum;
									//console.log(imgAlbumDic);
									imgSwitch=0;
								}
							} else { // 구역 바깥에서 놓았을 경우 이벤트
							    if(imgSwitch==1) {
									imgBox.insertBefore(imgSmallBox, imgBox.childNodes[2]);
									delete imgAlbumDic[imgSmallBox.dataset.num];			    
								    imgSwitch=0;
							    }							
							}
							imgSmallBox.style.position = 'relative';
							imgSmallBox.style.left="0";
							imgSmallBox.style.top="0";
							
						    // 드래그 상태가 아니면 모든 이벤트 제거
						    document.removeEventListener("mousemove", startMove);
						    document.removeEventListener("mouseup", stopMove);
						    
						}
					    
					});
				};
				reader.readAsDataURL(input.files[i]);
			}	
			
			// 리스트에 파일 추가
			//console.log(new FormData(document.getElementById('insertPhotosForm')));
			//console.log(new FormData(document.getElementById('insertPhotosForm')).getAll('uploadFile'));
			const formData = new FormData(document.getElementById('insertPhotosForm')).getAll('uploadFile');
			formData.forEach(file => {
				fileList.push(file);
			});
			//console.log(fileList);
	
	  } else {
	    document.getElementById('preview').src = "";
	  }
}

const handleClick = () => {
	files.click();
}



