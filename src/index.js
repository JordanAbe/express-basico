const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

//npm init -y --> crea el package.json
//buscar y matar por un puerto 
// sudo lsof -i :5000
// kill -9 {PID}

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.post('/users/:userId', (request, response) => {

    const { userId } = request.params;
    const { test } = request.query;
    const { nombre, edad } = request.body || {};
    const contentType = request.headers['content-type'];
    const { galleta, perrito } = request.cookies;

    response.json({
        id: userId,
        test,
        nombre,
        edad,
        contentType,
        galleta,
        perrito,
        headers: request.headers,
        cookies: request.cookies,
        body: request.body,
    })
});

app.get('/users/error', (request, response) => {
    response.status(500).json({
        error: "este es un error",
    })
})

app.get('/users/error-code', (request, response) => {
    response.sendStatus(401);
})

app.get('/users/send', (request, response) => {
    response.send({
        name: "jordan con send",
    })
    // response.status(201).send('<h1>hola maria</h1>')
})

app.get('/users/send-header', (request, response) => {
    response.status(201)
    .set({
        'Content-type': 'application/json',
        'mi-header': 'oki-doki',
    })
    .append('header-cache-2','cachce-2')
    .json(
        {
            status: 'ok',
        }
    )
})

app.get('/users/send-cookie', (request, response) => {
    response
    .cookie('mi-cookie', '12345', {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24,
    })
    .json(
        {
            status: 'ok',
        }
    )
})

app.get('/users/clear-cookie', (request, response) => {
    response
    .clearCookie('mi-cookie')
    .json(
        {
            status: 'ok',
        }
    )
})

app.get('/users/redirect-location', (request, response) => {
    response.redirect('https://www.google.com?search=react');
})

app.get('/users/download', (request, response) => {
    response.download(path.join(__dirname, 'file.txt'), 'hola.txt');
})

app.listen(5000, () => console.log('API  ready port: 5000 ...'));