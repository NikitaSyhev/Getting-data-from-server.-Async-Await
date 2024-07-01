### JS Project

Локальный сервер:

```
MAMP
```
Стек:
```
HTML&&CSS
JAVA SCRIPT 
AJAX
FETCH API
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

