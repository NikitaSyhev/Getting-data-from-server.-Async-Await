function modal() {
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
}

module.exports = modal;