function timer() {
    //реализация Таймера - установили деадлайн для таймера ( 30 июля 2024), его можно менять
    const deadline = '2024-07-30';

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
    setClock('.timer' ,deadline);
 
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

module.exports = timer;