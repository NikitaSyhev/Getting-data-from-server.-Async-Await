/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
        //КАЛЬКУЛЯТОР КАЛОРИЙ НА САЙТЕ

        const result = document.querySelector('.calculating__result span');
        let sex, height, weight, age, ratio;
        if(localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        }
        else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
    
        if(localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        }
        else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }
    
        //функция установки зеленых блоков
        function initLocalSettings(selector, activeClass) {
           const elements=  document.querySelectorAll(selector);
           elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
           });
        }
    
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
        
    
        //функция для расчета калорий
        function calcTotal() {
            if(!sex || !height || !weight || !age || !ratio) {
                result.textContent = '____';
                return;
            }
            if(sex === 'female') {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            }
            else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    
        calcTotal();
    
        //функция получения данных - ПОЛ и ФИЗИЧЕСКАЯ АКТИВНОСТЬ
        function getStaticInformation(parentSelector, activeClass) {
            const elements = document.querySelectorAll(`${parentSelector} div`);
    
    
            elements.forEach(elem => {
                elem.addEventListener('click', e => {
                    if(e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                    }
                    else {
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                    }
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                    });
        
                    e.target.classList.add(activeClass);
        
                    calcTotal();
        
                });
            });
            
        }
    
    
        getStaticInformation('#gender', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    
        //функция получения данных - РОСТ, ВЕС, ВОЗРАСТ 
        function getDynamicInformation(selector) {
            const input = document.querySelector(selector);
    
            input.addEventListener('input', () => {
    
                if(input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                }
                else {
                    input.style.border = 'none';
                }
    
                switch(input.getAttribute('id')) {
                    case 'height': height = +input.value; break;
                    case 'age':    age = +input.value; break;
                    case 'weight': weight = +input.value; break;
                }
    
                calcTotal();
            });
    
            
        }
        getDynamicInformation('#height');
        getDynamicInformation('#age');
        getDynamicInformation('#weight');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
   //использование классов для карточек
    class MenuCard{
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.usdToRub = 90;
        this.changeToRub();
    }
    changeToRub() {
        this.price = this.price * this.usdToRub;
    }

    //метод для формирования верстки
    render() {
        const element = document.createElement('div');
        if(this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        this.classes.forEach(className => element.classList.add(className));
        element.innerHTML =  `
        <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
        </div>
    `;
    this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
//Forms

const forms = document.querySelectorAll(formSelector);

//список фраз для отображения (на loading поставили картинку загрузки)
const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, скоро мы с вами свяжемся',
    failure: 'Что то пошло не так...',
}

//ко всем формам проекта привязываем функцию postData
forms.forEach(item=> {
    bindPostData(item);
})

//функция постинга данных
function bindPostData(form) {
    form.addEventListener('submit', (e)=> {
        e.preventDefault();
        //создаем блок для вывода сообщения со статусом
        const statusMessage =  document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        //элегантный способ создать JSON из FORM DATA
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        // ================ОТПРАВКА ДАННЫХ ЧЕРЕЗ JSON==================================
        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        })
        
        ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then(data=> {
            console.log(data);
            showThanksModal(message.success);            
            statusMessage.remove();
        }).catch(()=>{
            showThanksModal(message.failure);  
        }).finally(()=>{
            //очистка формы
            form.reset();
        })
    });
    }

    //создает модальное окно с сообщениями: успех или неудача загрузки
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal')
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    //запретили скрол страницы при запуске модельного окна
    document.body.style.overflow = 'hidden';

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //создание модального окна
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

    //обработчик открытия модального окна
    modalTrigger.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
   

    //обработчик закрытия окна при клике на подложку
    modal.addEventListener('click',(e) => {
        if(e.target == modal || e.target.getAttribute('data-close') == '') 
            {
                closeModal(modalSelector);
            }
    })

    //обработчик закрытия окна при клике на ESC
    document.addEventListener('keydown',(e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) 
            {
                closeModal(modalSelector);
            }
    });

    //вызов модального окна при скроле и удаление модельного окна
    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    //событие: пользователь долистал до конца - открывается окно\
    window.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCouner, wrapper, field}) {
     //Slider
     const slides = document.querySelectorAll(slide),
     slider = document.querySelector(container),
     prev = document.querySelector(prevArrow),
     next = document.querySelector(nextArrow),
     idSlide = document.querySelector(currentCouner),
     idTotal = document.querySelector(totalCounter),
     slidesWrapper = document.querySelector(wrapper),
     slidesField =  document.querySelector(field),
     width = window.getComputedStyle(slidesWrapper).width;


let slideIndex = 1;
let offset = 0;

//РЕАЛИЗАЦИЯ СЛОЖНОГО СЛАЙДЕРА

//функиця индикатора счетчика ( отображается с нулем или без)
function createCounterInSlider() {
   if(slides.length < 10) {
       idTotal.innerHTML = `0${slides.length}`;
       idSlide.innerHTML = `0${slideIndex}`;
   }
   else {
       idTotal.innerHTML = `${slides.length}`;
       idSlide.innerHTML = `0${slideIndex}`;
   }
}


createCounterInSlider();

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
   slide.style.width = width;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
     dots = [];

indicators.classList.add('carousel-indicators');
slider.append(indicators);

for(let i = 0; i < slides.length; ++i) {
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i  + 1);
  dot.classList.add('dot');
  if( i== 0) {
       dot.style.opacity = 1;
  }
  indicators.append(dot);
  dots.push(dot);
}

//функция для удаления чисел из строки
const deleteNumbers = (str) => +str.replace(/\D/g, '');


next.addEventListener('click', ()=> {
   if(offset == deleteNumbers(width) * (slides.length - 1)) {
       offset = 0; 
   } else {
       offset += deleteNumbers(width);
   }

   slidesField.style.transform = `translateX(-${offset}px)`;

   if(slideIndex == slides.length) {
       slideIndex = 1;
   }
   else {
       slideIndex++;
   }
   createCounterInSlider();

   addOpacityToDots();
})

prev.addEventListener('click', ()=> {
   if(offset == 0) {
       offset = deleteNumbers(width) * (slides.length - 1);
   } else {
       offset -= deleteNumbers(width);
   }

   slidesField.style.transform = `translateX(-${offset}px)`;

   createCounterInSlider();

   if(slideIndex == 1) {
       slideIndex = slides.length;
   }
   else {
       slideIndex--;
   }
   addOpacityToDots();
   
})

dots.forEach(dot => {
   dot.addEventListener('click', (e)=> {
       const slideTo = e.target.getAttribute('data-slide-to');
       slideIndex = slideTo;

       offset = deleteNumbers(width) * (slideTo - 1);
       slidesField.style.transform = `translateX(-${offset}px)`;

       createCounterInSlider();

       addOpacityToDots();
   });

  
});

//функция добавления прозрачности на кнопки слайдера
function addOpacityToDots() {
   dots.forEach(dot => dot.style.opacity = '.5');
   dots[slideIndex -1].style.opacity = 1;
}

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //tabs - работа с элементами выбора стиля питания
    //переменные для выбора стиля питания
    let tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    //скрываем ненужные табы
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';         
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass); 
        })
    }

    //функция для отображения табов
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }

    //вызов фнкции
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

    //функция определяет разницу между дедлайном и текущим временем 
    //возвращает объект: разница в мс, дни, часы, минуты, секунды
    function getTimeRemaining(deadline) {
         const timeRemain = Date.parse(deadline) - Date.parse(new Date()),
               days = Math.floor(timeRemain / (1000 * 60 * 60 * 24)),
               hours = Math.floor((timeRemain / (1000 * 60 * 60) % 24 )),
               minutes = Math.floor((timeRemain / (1000 / 60 ) % 60)),
               seconds = Math.floor((timeRemain / 1000) % 60);
               //если дата прошла - выведем нули
               if(timeRemain < 0) {
                 return {
                     'total': 0,
                     'days': 0,
                     'hours': 0,
                     'minutes': 0,
                     'seconds': 0,
                 };
               }
               else {
                 return {
                     'total': timeRemain,
                     'days': days,
                     'hours': hours,
                     'minutes': minutes,
                     'seconds': seconds,
                 };
         }
    }
 
    //фунция добавляет ноль на тайме, если значение меньше 0 ( пример, часов 09 и т д )
    function getZero(num) {
         if( num >= 0 && num < 10) {
             return `0${num}`;
         }
         else {
             return num;
         }
    }
 
    // фунция установки таймера на страницу
    function setClock(selector, deadline) {
         const timer = document.querySelector(selector),
               days = timer.querySelector('#days'),
               hours = timer.querySelector('#hours'),
               minutes = timer.querySelector('#minutes'),
               seconds = timer.querySelector('#seconds'),
               //прописали обновление через каждую секунду
               timeInterval = setInterval(updateClock, 1000);
 
    //устраняем мерцание таймера
    updateClock();
 
    //функция обновления таймера на странице
    function updateClock() {
             const timeRemain = getTimeRemaining(deadline);
             days.innerHTML = getZero(timeRemain.days);
             hours.innerHTML = getZero(timeRemain.hours);
             minutes.innerHTML = getZero(timeRemain.minutes);
             seconds.innerHTML = getZero(timeRemain.seconds);
             //условие остановки таймера   
             if(timeRemain.total <= 0) {
                 clearInterval(timeInterval);
             }
         }
    }
    setClock(id ,deadline);
 
    //функция обновляет инфо о дедлайне акции исходя из переменной deadline
    function monthToScreen(deadline) {
         let monthDeadline = '';
         let dateFunc = new Date(deadline);
         switch(dateFunc.getMonth()) {
             case 0: monthDeadline = 'января';break;
             case 1: monthDeadline = 'февраля';break; 
             case 2: monthDeadline = 'марта';break;
             case 3: monthDeadline = 'апреля';break; 
             case 4: monthDeadline = 'мая';break; 
             case 5: monthDeadline = 'июня';break;
             case 6: monthDeadline = 'июля';break; 
             case 7: monthDeadline = 'августа';break; 
             case 8: monthDeadline = 'сентября';break; 
             case 9: monthDeadline = 'октября';break; 
             case 10: monthDeadline = 'ноября';break; 
             case 11: monthDeadline = 'декабря';break;  
         }
         return monthDeadline;
    }
 
    const setDeadlineToPage = document.querySelector('.promotion__descr');
    let date = new Date(deadline);
    setDeadlineToPage.innerHTML = `
                 <div>
                     Мы ценим каждого клиента и предлагаем вам стать одним из них на очень выгодных условиях. 
                     Каждому, кто закажет доставку питание на неделю, будет предоставлена скидка в размере <span>20%!</span>
                     <br><br>
                     Акция закончится ${date.getDate()} ${monthToScreen(deadline)} в 00:00
                 </div>
    `
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });

// функция отправки данных на сервер и возврат ответа в JSON - используем метод создания -  function expression
const postData = async (url, data) => {
    const res =  await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: data,
    });
    return  await res.json();
};




// функция отвечает за получение данных с JSON
const getResource = async (url) => {
const res =  await fetch(url);
    
    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return  await res.json();
};







/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");







//import { openModal } from './modules/modal';


//DDOMContentLoaded - событие загрузки HTML и DOM дерева
window.addEventListener('DOMContentLoaded',() =>{ 

    //вызов модального окна через определенное время
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal) ('.modal', modalTimerId ), 50000);
            
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',   
        totalCounter: '#total', 
        currentCouner: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner', 
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2024-08-30');

});
/******/ })()
;
//# sourceMappingURL=bundle.js.map