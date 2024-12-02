document.addEventListener("DOMContentLoaded", function() {
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeBtn = document.querySelector(".close");

    // 페이지 로드 시 모달을 숨기기
    loginModal.style.display = "none";

    // 로그인 버튼을 클릭했을 때 모달 보이기
    loginBtn.addEventListener("click", function() {
        loginModal.style.display = "flex";
    });

    // 닫기 버튼을 클릭했을 때 모달 숨기기
    closeBtn.addEventListener("click", function() {
        loginModal.style.display = "none";
    });

    // 모달 밖의 빈 공간을 클릭했을 때 모달 숨기기
    window.addEventListener("click", function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
    });
});
