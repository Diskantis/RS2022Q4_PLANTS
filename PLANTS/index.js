console.log("\n" +
    "    Вёрстка соответствует макету. Ширина экрана 768px +24\n" +
    "    Вёрстка соответствует макету. Ширина экрана 380px +24\n" +
    "\n" +
    "    Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки.\n" +
    "    Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n" +
    "\n" +
    "    На ширине экрана 380рх и меньше реализовано адаптивное меню +22\n" +
    "\n" +
    "    ИТОГОВАЯ ОЦЕНКА: 85 баллов.")

window.onload = function () {
  console.log('Hello Rolling Scopes!')

  //SERVICE BUTTON
  addServiceBtnClickHandler();
}

const elements = {
activeServiceButtonCounter: 0,
serviceCards: document.querySelectorAll('.service-card')
}

//SERVICE BUTTON

const addServiceBtnClickHandler = () => {
  document.querySelector('.service__buttons').addEventListener('click', (e) => {
    if (e.target.classList.contains('button-service_media')) {
      let clickedButton = e.target;
      if (elements.activeServiceButtonCounter < 2){
        if (elements.activeServiceButtonCounter === 0) {
          addServiceCardBlur();
        }
        addSelectClickedButton(clickedButton)
      } else {
        removeSelectClickedButton(clickedButton);
      }
    }
  })
}

const addSelectClickedButton = (clickedButton) => {
  if (!clickedButton.classList.contains('select')) {
    clickedButton.classList.add('select')
    elements.activeServiceButtonCounter += 1;
    removeServiceCardBlur(clickedButton.dataset.group)
  } else {
    removeSelectClickedButton(clickedButton);
  }
}

const removeSelectClickedButton = (clickedButton) => {
  if (clickedButton.classList.contains('select')){
    clickedButton.classList.remove('select')
    elements.activeServiceButtonCounter -= 1;
    addServiceCardBlur(clickedButton.dataset.group)
    if (elements.activeServiceButtonCounter === 0) {
      removeServiceCardBlur();
    }
  }
}

const addServiceCardBlur = (group) => {
  if (group) {
    Array.prototype.filter.call(elements.serviceCards, card => card.dataset.group === group).forEach(element => element.classList.add('blur'));
  } else {
    elements.serviceCards.forEach(element => element.classList.add('blur'));
  }
}

const removeServiceCardBlur = (group) => {
  if (group) {
    Array.prototype.filter.call(elements.serviceCards, card => card.dataset.group === group).forEach(element => element.classList.remove('blur'));
  } else {
    elements.serviceCards.forEach(element => element.classList.remove('blur'));
  }
}


// HAMBURGER & MENU

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

// BUTTON PRICE

const buttonPrice = document.querySelector('.button_price');

const toggleButtonPrice = () => {
  buttonPrice.classList.toggle('opened')
}

buttonPrice.addEventListener('click', e => {
  e.stopPropagation();
  toggleButtonPrice();
});

// BUTTON CITY (ACCORDION)

const contactsCityInner = document.querySelector('.contacts__city-inner');
const contactsCityInnerIcon = document.querySelector('.ico_btn-city');
const customSelCityList = document.querySelector('.custom-select__city-list');

const selectCityAddress = document.querySelectorAll('.custom-select__city-address');

const toggleCityInner = () => {
  contactsCityInner.classList.toggle('opened') // .contacts__city-inner.opened
  contactsCityInnerIcon.classList.toggle("opened") // .ico_btn-city.opened
  customSelCityList.classList.toggle("opened") // .custom-select__city-list.opened
}

// если кликнули по Inner, то выполни функцию toggleCityInner и откроется city-list
contactsCityInner.addEventListener('click', e => {
  e.stopPropagation();
  toggleCityInner();
});

// если кликнули по city-list, то выполни функцию toggleCityInner и закроется city-list
customSelCityList.addEventListener('click', e => {
  e.stopPropagation();
  toggleCityInner();
});

const toggleElementText = (text) => {
  contactsCityInner.innerHTML = text
}

const handleClick = (event) => {
  console.log(event.target)
  console.log(event.target.innerText)

  // contactsCityInner.outerHTML = `<div class="contacts__city-inner opened">
  //   ${event.target.innerText}<span class="ico ico_btn-city"></span></div>`
  contactsCityInner.innerText = event.target.innerText

}

selectCityAddress.forEach((address) => {
  address.addEventListener('click', handleClick);
})
