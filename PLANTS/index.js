
console.log(`1. При нажатии на кнопки:Gardens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50

    При выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20
    Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги
      выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг. При повторном нажатии на активную
      кнопку она деактивируется (становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние (входит в состяние blur
      если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). +20
    Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur +10

2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50

    При нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на
      секцию contacts, при нажатии на нее Accordion все еще остается открытым. +25
    Пользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии
      нового тарифа предыдущее автоматически закрывается. +25

3. В разделе contacts реализован select с выбором городов -25

    В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе -15
    При нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу -10

ИТОГОВАЯ ОЦЕНКА: 100/100 баллов.
`)

window.onload = function () {
  console.log('Hello Rolling Scopes!')

  // HAMBURGER & MENU
  addHamburgerClickHandler();
  // SERVICE BUTTON
  addServiceBtnClickHandler();
  // PRICE BUTTON
  addPriceBtnClickHandler();
}

const elements = {
  hamburger: document.querySelector('.hamburger'),
  menu: document.querySelector('.menu'),
  activeServiceButtonCounter: 0,
  activePriceButtonCounter: 0,
  serviceCards: document.querySelectorAll('.service-card')
}


// HAMBURGER & MENU

const addHamburgerClickHandler = () => {
  elements.hamburger.addEventListener('click', e => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', e => {
    let target = e.target;
    let its_hamburger = target === elements.hamburger;
    let menu_is_active = elements.menu.classList.contains('active');

    if (!its_hamburger && menu_is_active) {
      e.stopPropagation();
      toggleMenu();
    }
  })
}

const toggleMenu = () => {
  elements.hamburger.classList.toggle('active');
  elements.menu.classList.toggle('active');
}


// SERVICE BUTTON

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


// // PRICE BUTTON

const addPriceBtnClickHandler = () => {
  let asd = document.querySelectorAll('.button_price')
      asd.forEach(button => button.addEventListener('click', (e) => {
    document.querySelector('.ico_btn-price').classList.remove('opened')
    document.querySelector('.block__buttons').classList.remove('opened')
    document.querySelector('.prices__block-wrapper').classList.remove('opened')
    document.querySelector('.page-prices').classList.remove('opened')

    if (e.target.classList.contains('button_price')) {
      let clickedPriceButton = e.target;
      let openedTariffBlock = e.target.closest('.price-button__block');
      if (!clickedPriceButton.classList.contains('opened')) {
        addClickedPriceButton(clickedPriceButton, openedTariffBlock);
      } else {
        removeClickedPriceButton(clickedPriceButton, openedTariffBlock);
      }
    }
  }));
}

const addClickedPriceButton = (clickedButton, openedTariffBlock) => {
  removeClickedAllPriceButtons(openedTariffBlock);
  clickedButton.classList.add('opened');
  clickedButton.querySelector('.ico_btn-price').classList.add('opened');
  openedTariffBlock.querySelector('.tariff__block').classList.add('opened');
}

const removeClickedPriceButton = (clickedButton, openedTariffBlock) => {
  clickedButton.classList.remove('opened')
  clickedButton.querySelector('.ico_btn-price').classList.remove('opened')
  openedTariffBlock.querySelector('.tariff__block').classList.remove('opened');
}

const removeClickedAllPriceButtons = () => {
  document.querySelectorAll('.button_price').forEach(button => {
    if (button.classList.contains('opened')){
      button.classList.remove('opened')
      button.querySelector('.ico_btn-price').classList.remove('opened')
    }
    document.querySelector('.block__buttons').classList.add('opened')
    document.querySelector('.prices__block-wrapper').classList.add('opened')
    document.querySelector('.page-prices').classList.add('opened')
    document.querySelectorAll('.tariff__block').forEach(button => button.classList.remove('opened'));
  });
}


// CITY BUTTON (ACCORDION)

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

// const toggleElementText = (text) => {
//   contactsCityInner.innerHTML = text
// }

const handleClick = (event) => {
  console.log(event.target)
  console.log(event.target.innerText)
  contactsCityInner.innerText = event.target.innerText
}

selectCityAddress.forEach((address) => {
  address.addEventListener('click', handleClick);
})