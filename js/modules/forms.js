import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

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
    }

    //создает модальное окно с сообщениями: успех или неудача загрузки
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

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
            closeModal('.modal')
        }, 4000);
    }
}

export default forms;