let imgSwitch=0;
let startX=0, startY=0, offsetX=0, offsetY=0;

const files = document.querySelector("#files");
// input의 onchange에서 this를 인자로 넣었기 때문에 input은 files.addEventListener("change" (e))의 e.target 과 같다
const fileChange = (input) => {
	if (input.files && input.files[0]) {
		const imgBox = document.querySelector('#imgBox');

		for(let i=0; i < input.files.length; i++){
				var reader = new FileReader();
				reader.onload = function(e) {
					const img = document.createElement('img');
					const imgSmallBox = document.createElement('div');
					const newURL = URL.createObjectURL(input.files[i]);
					const xButton = document.createElement('button');
					
					xButton.innerText = 'x';
					xButton.classList.add('xButton');	
					img.src = newURL;
					img.classList.add('preview');
					imgSmallBox.classList.add('imgSmallBox');
					imgSmallBox.appendChild(img);
					imgSmallBox.appendChild(xButton);
					imgBox.appendChild(imgSmallBox);
												
// dropImage에서 parentNode 가 쓰이는데, imgSamllBox에 appendChild 된 후에 addEventLinstener 해준다
					xButton.addEventListener("click", (e) => {
						e.stopPropagation();
						e.preventDefault();
						URL.revokeObjectURL(xButton.parentNode.childNodes[0].src);
						xButton.parentNode.parentNode.removeChild(xButton.parentNode);
					});
					
					// img 드래그를 위한 코드
					imgSmallBox.addEventListener("mousedown", function(e){
					    // 드래그시 마우스 클릭 동작 방지
					    e.preventDefault();
					    // 마우스 현재 좌표
					    startX = e.clientX;
					    startY = e.clientY;
					
					    // 이동중인 마우스의 좌표값 업데이트
					    offsetX = parseInt(imgSmallBox.style.left) - startX;
					    offsetY = parseInt(imgSmallBox.style.top) - startY;
					    
					    // 이동중이거나 마우스 드래그 상태가 아닐때의 이벤트
					    document.addEventListener("mousemove", startMove);
					    document.addEventListener("mouseup", stopMove);
						
						function startMove(e) {
						    // 이미지 드래그시 마우스 위치의 좌표로 이동
						    imgSwitch=1;
						    const clientRect = imgSmallBox.getBoundingClientRect();
						    const mainContainer = document.querySelector('#main_container');
						    mainContainer.appendChild(imgSmallBox);
						    imgSmallBox.style.position = 'absolute';
						    imgSmallBox.style.left = e.clientX - (clientRect.width/2) + 'px';
						    imgSmallBox.style.top = e.clientY - (clientRect.height/2) + 'px';
						    imgSmallBox.style.transition='0s';
						}
						
						function stopMove() {
						    // imgSmallBox 원위치
						    if(imgSwitch==1) {
								imgBox.insertBefore(imgSmallBox, imgBox.childNodes[2]);						    
							    imgSwitch=0
						    }
							imgSmallBox.style.position = 'relative';
						    imgSmallBox.style.transition='0.15s';
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
	
	  } else {
	    document.getElementById('preview').src = "";
	  }
}

const handleClick = () => {
	files.click();
}

const dropImage = (e) => {
	
}



