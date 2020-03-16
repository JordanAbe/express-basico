const express = require('express');
const { routeHelper, sleep, addUser } = require('./route');

const app = express();

app.use(express.json());

//middleware aplica para todos
app.use( (req, res, next) => {
    if(req.ip === '140.23.435.2'){
        next(new Error('error !!!'))
    } else {
        next();
    }
})

function getUser(){
    return {
        id: '123',
        name: 'jordan',
    }
}

//aplicación específica
const middleware = async (req, res, next) => {
    const user = await getUser();
    req.locals = {
        user,
    }
    next();
};

app.get('/test', middleware, routeHelper(async (req, res) => {
    // throw new Error('error crítico');
    // await addUser();
    // await sleep(3000);
    user = req.locals.user;
    res.json({
        status: 'ok',
        user,
    })
}));

app.get('/test-2', routeHelper(async (req, res) => {
    user = req.locals.user;
    res.json({
        status: 'ok',
        user,
    })
}));

app.listen(5000, ()=> console.log('corriendo en 5000 ...'));