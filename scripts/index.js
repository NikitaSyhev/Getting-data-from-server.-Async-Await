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


    //реалищация Таймера - установили деадлайн для таймера ( 30 мая 2024), его можно менять
    const deadline = '2024-05-30';

    //функция определяет разницу между дедлайном и текущим временем 
    //возвращает объект: разница в мс, дни, часы, минуты, секунды
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24 )),
              minutes = Math.floor((t / (1000 / 60 ) % 60)),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
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
});