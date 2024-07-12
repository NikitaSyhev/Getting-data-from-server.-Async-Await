## WebSite with scripts

### Локальный сервер:

```
MAMP
```
### Стек:
```
HTML&&CSS
JAVA SCRIPT 
AJAX
FETCH API
WebPack
JSON Server
```

### Запуск WebPack:
```
npx webpack
```

### Запуск JSON сервера:
```
json-server db.json
```

### Если не хватает прав на запуск JSON Server ( ошибка:  Ошибка безопасности: (:) [], PSSecurityException ):

Запусть Power Shell Windows  в папке проекта (Shift + правая кнопка мыши)
```
Set-ExecutionPolicy -Scope CurrentUser
Unrestricted 
Y
```
В терминале IDE запускаем json: 
```
json-server db.json
```
В Power Shell:
```
Set-ExecutionPolicy -Scope CurrentUser
Restricted 
Y
```

### Установка Babel:
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
npm i --save-dev babel-loader
```

### Установка Core.js:
```
npm i --save-dev core-js
```

### Установка ES6 Promises:
```
npm install es6-promise-polyfill
```

### Установка Nodelist polyfill:
```
npm i nodelist-foreach-polyfill
```

### Проект содержит модули:
```
calc: калькулятор калорий
cards: карточки товаров 
forms: работа с формами
modal: логика работы модальных окон
slider: логика работы слайдера
tabs: табы, переключатели
timer: настройка таймера
services: сервисы - отправка и получение данных с сервера 
```

### Пример кода

     ```
     /``/ функция отвечает за получение данных с JSON
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
        ```

