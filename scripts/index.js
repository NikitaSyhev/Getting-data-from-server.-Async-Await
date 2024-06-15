//DDOMContentLoaded - событие загрузки HTML и DOM дерева
window.addEventListener('DOMContentLoaded',() =>{ 

    //tabs - работа с элементами выбора стиля питания

    //переменные для выбора стиля питания
    let tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    //скрываем ненужные табы
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';         
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); 
        })
    }

    //функция для отображения табов
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    //вызов фнкции
    hideTabContent();
    showTabContent();
   tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});

    //реалищация Таймера - установили деадлайн для таймера ( 30 июля 2024), его можно менять
    const deadline = '2024-07-30';

    //функция определяет разницу между дедлайном и текущим временем 
    //возвращает объект: разница в мс, дни, часы, минуты, секунды
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24 )),
              minutes = Math.floor((t / (1000 / 60 ) % 60)),
              seconds = Math.floor((t / 1000) % 60);
              //если дата прошла - выведем нули
              if(t < 0) {
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
                    'total': t,
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
    function setClock(selector, endtime) {
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
            const t = getTimeRemaining(deadline);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            //условие остановки таймера   
            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer' ,deadline);

    //создание модального окна
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    //обработчик открытия модального окна
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        //запретили скрол страницы при запуске модельного окна
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    //обработчик закрытия окна при клике на подложку
    modal.addEventListener('click',(e) => {
        if(e.target == modal || e.target.getAttribute('data-close') == '') {closeModal();}
    })

    //обработчик закрытия окна при клике на ESC
    document.addEventListener('keydown',(e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {closeModal();}
    });

    //вызов модального окна через определенное время
    const modalTimerId = setTimeout(openModal, 50000);

    //вызов модального окна при скроле и удаление модельного окна
    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    //событие: пользователь долистал до конца - открывается окно\
    window.addEventListener('scroll', showModalByScroll);

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

       // функция отвечает за получение данных с JSON
       const getResource = async (url) => {
        const res =  await fetch(url);
        
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return  await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    //Forms

    const forms = document.querySelectorAll('form');

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

    // функция отвечает за постинг данных - используем метод создания -  function expression
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
            
            postData('http://localhost:3000/requests', json)
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
   
   //создает модальное окно с сообщениями: успех или неудача загрузки
   function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

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
        closeModal()
    }, 4000);
   }


    //Slider
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          idSlide = document.querySelector('#current'),
          idTotal = document.querySelector('#total'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField =  document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

   
    let slideIndex = 1;
    let offset = 0;

    //РЕАЛИЗАЦИЯ СЛОЖНОГО СЛАЙДЕРА
    if(slides.length < 10) {
        idTotal.innerHTML = `0${slides.length}`;
        idSlide.innerHTML = `0${slideIndex}`;
    }
    else {
        idTotal.innerHTML = `${slides.length}`;
        idSlide.innerHTML = `0${slideIndex}`;
    }


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(slide => {
        slide.style.width = width;
    });


    next.addEventListener('click', ()=> {
        if(offset == +width.slice(0, width.length-2) * (slides.length - 1)) {
            offset = 0; 
        } else {
            offset += +width.slice(0, (width.length-2));
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {
            slideIndex = 1;
        }
        else {
            slideIndex++;
        }

        if(slides.length < 10 ) {
            idSlide.innerHTML = `0${slideIndex}`;
        }
        else {
            idSlide.innerHTML = `${slideIndex}`;
        }
    })

    prev.addEventListener('click', ()=> {
        if(offset == 0) {
            offset = +width.slice(0, (width.length-2)) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, (width.length-2));
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slides.length < 10 ) {
            idSlide.innerHTML = `0${slideIndex}`;
        }
        else {
            idSlide.innerHTML = `${slideIndex}`;
        }

        if(slideIndex == 1) {
            slideIndex = slides.length;
        }
        else {
            slideIndex--;
        }
        
    })


    
    //РЕАЛИЗАЦИЯ ПРОСТОГО СЛАЙДЕРА
   
    // showMaxNumberSlides();
    // showSlides(1);
    //функция показа слайдов
    // function showSlides(slideIndex) {
    //     if(slideIndex > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if(slideIndex < 1) {
    //         slideIndex = slides.length;
    //     }
    //     slides.forEach(slide => slide.style.display = 'none');  
    //     slides[slideIndex - 1].style.display = 'block'; 
    //     if(slides.length < 10) {
    //         idSlide.innerHTML = `0${slideIndex}`;
    //     }
    //     else {
    //         idSlide.innerHTML = `${slideIndex}`;   
    // }
    // //функция отображения максимального количества слайдов
    //  function showMaxNumberSlides() {
    //         if(slides.length < 10) {
    //             idTotal.innerHTML = `0${slides.length}`;
    //         }
    //         else {
    //             idTotal.innerHTML = `${slides.length}`;
    //         }
    //     }
    // //функция изменения индекса
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }
    // prev.addEventListener('click', ()=> {
    //     plusSlides(-1);
    // });
    // next.addEventListener('click', ()=> {
    //     plusSlides(1);
    // });
    // }







}
});