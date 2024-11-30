// 모든 버튼을 선택
const buttons = document.querySelectorAll('.image-button');
// 이미지를 표시하는 요소 선택
const displayedImage = document.getElementById('displayed-image');
// 하단부 텍스트 선택
const selectedItemText = document.getElementById('selectedItemText');
const text = ["All", "캐릭터", "코드", "거래", "마켓"];

// 공통 이벤트 핸들러
function handleButtonClick(event) {
    // 클릭된 버튼의 data-image 값을 가져옴
    const newImage = event.target.getAttribute('data-image');
    // 이미지 변경
    displayedImage.src = newImage;
}

// 각 버튼에 클릭 이벤트 리스너 추가
buttons.forEach((button, i) => {
    button.addEventListener('click', handleButtonClick);
    selectedItemText.innerText = text[i];
});
