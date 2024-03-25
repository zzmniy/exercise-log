//로그아웃 모달
const logoutButton = document.querySelector('.logout');
const modal = document.getElementById('myModal');
const confirmButton = document.getElementById('confirm');
const modal2 = document.getElementById('myModal2');
const cancelButton= document.getElementById('cancel');
const loginButton = document.querySelector('.login');

logoutButton.addEventListener('click', ()=>{
  modal.style.display = 'block';
});

cancelButton.addEventListener('click', ()=>{
  modal.style.display = 'none';
});

confirmButton.addEventListener('click', () => {
  modal.style.display = 'none';
  modal2.style.display = 'block'; // 두 번째 모달 표시
});

// 두 번째 모달에서 취소 버튼 클릭 이벤트
cancelButton2.addEventListener('click', () => {
  modal2.style.display = 'none';
});

// 두 번째 모달에서 확인 버튼 클릭 이벤트
confirmButton2.addEventListener('click', () => {
  // 두 번째 모달에서 확인 버튼을 클릭한 후의 동작을 여기에 추가
  modal2.style.display = 'none';
});

window.addEventListener('click',(event)=>{
  if(event.target===modal) {
    modal.style.display = 'none';
  }
});
