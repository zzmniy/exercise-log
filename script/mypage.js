//로그아웃 모달
const logoutButton = document.querySelector('.logout');

//첫번째 모달창
const modal = document.getElementById('myModal');
const confirmButton = document.getElementById('confirm');
const cancelButton= document.getElementById('cancel');

//두번째 모달창
const modal2 = document.getElementById('myModal2');
const loginButton = document.getElementById('login');

//이벤트
logoutButton.addEventListener('click', ()=>{
  modal.style.display='block';
});

cancelButton.addEventListener('click', ()=>{
  modal.style.display = 'none';
});

confirmButton.addEventListener('click', () => {
  modal.style.display = 'none';
  modal2.style.display = 'block'; // 두 번째 모달 표시
});

window.addEventListener('click',(event)=>{
  if(event.target===modal) {
    modal.style.display = 'none';
  }
  
  if(event.target===modal2) {
    modal2.style.display = 'none';
  }
});

loginButton.addEventListener('click', ()=>{
  modal2.style.display = 'none';
});