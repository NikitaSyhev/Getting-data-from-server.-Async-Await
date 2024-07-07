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

export default slider;