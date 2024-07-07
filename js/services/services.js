
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




export {postData};
export {getResource};