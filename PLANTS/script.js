const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

const toggleMenu = () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('active');
}

hamburger.addEventListener('click', e => {
  e.stopPropagation();
  toggleMenu();
});

document.addEventListener('click', e => {
  let target = e.target;
  let its_hamburger = target === hamburger;
  let menu_is_active = menu.classList.contains('active');

  if (!its_hamburger && menu_is_active) {
    e.stopPropagation();
    toggleMenu();
  }
})