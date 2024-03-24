const logoutButton = document.querySelector('.logout');
const modal = document.getElementById('myModal');
const cancelButton= document.getElementById('cancel');

logoutButton.addEventListener('click', ()=>{
  modal.style.display = 'block';
});

cancelButton.addEventListener('click', ()=>{
  modal.style.display = 'none';
});

window.addEventListener('click',(event)=>{
  if(event.target===modal) {
    modal.style.display = 'none';
  }
});