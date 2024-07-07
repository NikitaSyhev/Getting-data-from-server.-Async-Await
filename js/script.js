import tabs from './modules/tabs';
import modal, { openModal } from './modules/modal';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';
//import { openModal } from './modules/modal';


//DDOMContentLoaded - событие загрузки HTML и DOM дерева
window.addEventListener('DOMContentLoaded',() =>{ 

    //вызов модального окна через определенное время
    const modalTimerId = setTimeout(() => openModal ('.modal', modalTimerId ), 50000);
            
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    calc();
    cards();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',   
        totalCounter: '#total', 
        currentCouner: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner', 
    });
    timer('.timer', '2024-08-30');

});