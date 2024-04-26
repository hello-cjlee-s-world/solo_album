const formData = new FormData(document.getElementById('insertPhotosForm'));
const imgBox = document.querySelector('#imgBox');
const deletedPhoto = new Blob();
let imgSwitch=0;
let page = 1;
let fileList=[];
let num = 0;
let imgAlbumDic = {};

formData.delete('pwdRequired'); formData.delete('pwd');

const files = document.querySelector("#files");
// input의 onchange에서 this를 인자로 넣었기 때문에 input은 files.addEventListener("change" (e))의 e.target 과 같다
// 이미지 프리뷰 설정
const fileChange = (input) => {
	if (input.files && input.files[0]) {
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
					//imgSmallBox.setAttribute('data-num', String(num));
					imgSmallBox.setAttribute('data-name', input.files[i].name);
					num += 1
					imgSmallBox.appendChild(img);
					imgSmallBox.appendChild(xButton);
					imgBox.appendChild(imgSmallBox);

// dropImage에서 parentNode 가 쓰이는데, imgSamllBox에 appendChild 된 후에 addEventLinstener 해준다
					xButton.addEventListener("click", (e) => {
					// x 버튼 클릭시 사진 삭제 이벤트
						e.stopPropagation();
						e.preventDefault();
						// 이미지 : 앨범구역 dict 에서 삭제
						delete imgAlbumDic[imgSmallBox.dataset.name];
						// 파일리스트에서 삭제
						for(let i=0; i<fileList.length; i++) {
							if(fileList[i].name == imgSmallBox.dataset.name){
								fileList[i] = deletedPhoto;
								break;
							}
						}
						// blob URL 삭제
						URL.revokeObjectURL(xButton.parentNode.childNodes[0].src);
						xButton.parentNode.parentNode.removeChild(xButton.parentNode);
					});
					
					// img 드래그를 위한 코드
					imgSmallBox.addEventListener("mousedown", function(e){
					// 앨범 구역에 태그할때 구역에 이미지가 있는지 검색하는데, 
					// 전역으로 해놓으면 페이지 넘어가도 이전 객체들을 그대로 바라보기 때문에 아래 객체들 여기 위치
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
									imgAlbumDic[imgSmallBox.dataset.name] = albumBox1.dataset.albumnum;
									imgSwitch=0;
								}
							} else if(touched(clientRect, tX2, tY2, tW2, tH2)) {
								if(imgSwitch==1 && albumBox2.childElementCount < 1) {
									albumBox2.appendChild(imgSmallBox);
									imgAlbumDic[imgSmallBox.dataset.name] = albumBox2.dataset.albumnum;
									imgSwitch=0;
								}
							} else if(touched(clientRect, tX3, tY3, tW3, tH3)) {
								if(imgSwitch==1 && albumBox3.childElementCount < 1) {
									albumBox3.appendChild(imgSmallBox);
									imgAlbumDic[imgSmallBox.dataset.name] = albumBox3.dataset.albumnum;
									imgSwitch=0;
								}
							} else if(touched(clientRect, tX4, tY4, tW4, tH4)) {
								if(imgSwitch==1 && albumBox4.childElementCount < 1) {
									albumBox4.appendChild(imgSmallBox);
									imgAlbumDic[imgSmallBox.dataset.name] = albumBox4.dataset.albumnum;
									imgSwitch=0;
								}
							} else { // 구역 바깥에서 놓았을 경우 이벤트
							    if(imgSwitch==1) {
									imgBox.insertBefore(imgSmallBox, imgBox.childNodes[2]);
									delete imgAlbumDic[imgSmallBox.dataset.name];			    
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
			// 파일 목록에 넣기
			const inputFileList = input.files;
			for(let i=0; i<inputFileList.length; i++) {
				fileList.push(inputFileList[i]);						
			}
	  } else {
	    document.getElementById('preview').src = "";
	  }
}

// input file 클릭 이벤트
const handleClick = () => {
	files.click();
}

// 데이터 서버로 보내기
document.getElementById('submitButton').addEventListener('click', () => {
	// 페이지당 이미지 갯수 세기
	const pagePerImage = {};
	for(let i=1; i < page+1; i++) {
		pagePerImage[i] = 0;
		const boxsInPage = document.querySelectorAll(`.page${i}`);
		for(let j=0; j<boxsInPage.length; j++) {
			//console.log(j)
			//console.log(boxsInPage[j].childElementCount)
			if(boxsInPage[j].childElementCount > 0) {
				pagePerImage[i] = pagePerImage[i]+1;		
			}
		}
	}
	if(imgBox.childElementCount <= 1){
		formData.delete('uploadFile');
		// 파일 formData에 추가
		fileList.forEach(file => {
			formData.append('uploadFile', file, file.name);
		});
		// 이미지:앨범 구역 맵핑 정보 Object에서 JSON으로 변환 후 추가
		formData.append('imgAlbumDic', JSON.stringify(imgAlbumDic));
		// 페이지:이미지개수 맵핑 정보 Object에서 JSON으로 변환 후 추가
		formData.append('pagePerImage', JSON.stringify(pagePerImage));
		formData.append('pwdRequired', document.querySelector('input[name="pwdRequired"]:checked').value);
		formData.append('pwd', document.querySelector('#pwd').value);
		formData.append('albumName', document.querySelector('#albumName').value);
		for (let key of formData.keys()) {
			console.log(key, ":", formData.get(key));
		}
		fetch('insertPhotos.do', {
			method: 'POST',
			cache: 'no-cache',
			body: formData
		})
		//.then((response) => response.json())
		.then((loc) => {
			formData.delete('uploadFile');
			formData.delete('imgAlbumDic');
			formData.delete('pagePerImage');
			formData.delete('pwdRequired');
			formData.delete('pwd');
			formData.delete('albumName');
			
			console.log(loc);
			//location.href=loc.url;
		})
		.catch((err) => {
			console.error(err);
		});
	} else {
		alert('사진을 전부 등록하거나 삭제해주세요.');
	}
	// 
	
	console.log(pagePerImage);
	
});



