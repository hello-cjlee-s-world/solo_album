let imgSwitch=0;
let fileList=[];
let num = 0;

let startX=0, startY=0, offsetX=0, offsetY=0;
const testImg = document.getElementById('testImg');
const AlbumBox1 = document.getElementById('AlbumBox1');
const testRect = AlbumBox1.getBoundingClientRect();

let tW=testRect.width, tH=testRect.height, tY=testRect.y, tX=testRect.x

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
					console.log(imgSmallBox.dataset.num);
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
					    
						function startMove(e) {
						    imgSwitch=1;
						    //imgSmallBox.style.boxShadow = '2px 2px 20px 10px grey'
						    const clientRect = imgSmallBox.getBoundingClientRect();
						    // 이미지 드래그시 마우스 위치의 좌표로 이동
						    const mainContainer = document.querySelector('#mainContainer');
						    //mainContainer.appendChild(imgSmallBox);
						    imgSmallBox.style.position = 'absolute';
						    imgSmallBox.style.left = e.clientX - (clientRect.width/2) + 'px';
						    imgSmallBox.style.top = e.clientY - (clientRect.height/2) + 'px';
						    imgSmallBox.style.transition='0s';
						    // 구역 접촉 시 이벤트
						    if((((clientRect.x > tX) && (clientRect.x < tX + tW)) && ((clientRect.y > tY) && (clientRect.y < tY + tH)))
							|| (((clientRect.left > tX) && (clientRect.left < tX + tW)) && ((clientRect.bottom > tY) && (clientRect.bottom < tY + tH)))
							|| (((clientRect.right > tX) && (clientRect.right < tX + tW)) && ((clientRect.top > tY) && (clientRect.top < tY + tH))) 
							|| (((clientRect.right > tX) && (clientRect.right < tX + tW))&& ((clientRect.bottom > tY) && (clientRect.bottom < tY + tH)))){
							    AlbumBox1.style.border='7px solid blue';
						    } else {
						   		 AlbumBox1.style.border='none'
						    }
						    
						}
						
						function stopMove() {
						//imgSmallBox.style.boxShadow = '2px 2px 10px 3px grey';
						// imgSmallBox 원위치
						const clientRect = imgSmallBox.getBoundingClientRect();
						AlbumBox1.style.border='none'
						    // 구역 안에서 놓았을 경우 이벤트
						    if((((clientRect.x > tX) && (clientRect.x < tX + tW)) && ((clientRect.y > tY) && (clientRect.y < tY + tH)))
							|| (((clientRect.left > tX) && (clientRect.left < tX + tW)) && ((clientRect.bottom > tY) && (clientRect.bottom < tY + tH)))
							|| (((clientRect.right > tX) && (clientRect.right < tX + tW)) && ((clientRect.top > tY) && (clientRect.top < tY + tH))) 
							|| (((clientRect.right > tX) && (clientRect.right < tX + tW))&& ((clientRect.bottom > tY) && (clientRect.bottom < tY + tH)))){
								if(imgSwitch==1) {
									AlbumBox1.appendChild(imgSmallBox);
									imgSwitch=0;
								}
							// 구역 바깥에서 놓았을 경우 이벤트
							} else {
							    if(imgSwitch==1) {
									imgBox.insertBefore(imgSmallBox, imgBox.childNodes[2]);						    
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

const dropImage = (e) => {
	
}



