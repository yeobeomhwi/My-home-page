function animatePageTransition(event) {
    event.preventDefault(); // 기본 이벤트(링크 이동) 중지

    // 왼쪽으로 넘어가는 애니메이션 클래스 추가
    document.body.classList.add('page-transition-left');

    // 일정 시간 후에 페이지 이동
    setTimeout(function() {
        window.location.href = event.target.href;
    }, 500); // 0.5초 후에 페이지 이동 (애니메이션 시간에 맞게 조정)

    return false;
}