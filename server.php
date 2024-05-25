<?php

$_POST = json_decode( file_get_contents("php://input"), true );
echo var_dump($_POST);

//позволяет увидеть массив, который приходит с бекенда - ответ от сервера