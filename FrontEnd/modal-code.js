// JavaScript to handle modal behavior

// DOM이 완전히 로드될 때까지 기다립니다.
document.addEventListener("DOMContentLoaded", function () {
    // 모달 및 버튼 요소 가져오기
    const modal = document.querySelector(".modal");
    const getCodeButton = document.querySelector(".get-code");
    const closeModalButton = document.querySelector(".close");

    // 페이지 로드 시 모달을 숨기기
    modal.style.display = "none";

    // "Buy Now" 버튼을 클릭하면 모달을 표시합니다.
    getCodeButton.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // "close" 버튼을 클릭하면 모달을 닫습니다.
    if (closeModalButton) {
        closeModalButton.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // 사용자가 모달 외부를 클릭하면 모달을 닫습니다.
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
