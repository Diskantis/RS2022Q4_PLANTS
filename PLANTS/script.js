const hamb = document.querySelector('.hamburger');
const menu = document.querySelector('.navigation');

hamb.addEventListener('click', function() {
  hamb.classList.toggle('active');
  menu.classList.toggle('active');
})