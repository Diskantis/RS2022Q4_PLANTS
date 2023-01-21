const hamb = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamb.addEventListener('click', function() {
  hamb.classList.toggle('active');
  menu.classList.toggle('active');
})