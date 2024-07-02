function forms() {
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
}
}

module.exports = forms;