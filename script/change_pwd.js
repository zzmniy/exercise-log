const btnButton = document.getElementById('button');
const modal = document.getElementById('mymodal');
const cancelButton = modal.querySelector('button');

btnButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

cancelButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
