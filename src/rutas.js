const express = require('express');
const { routeHelper, sleep, addUser } = require('./route');

const app = express();

app.use(express.json());

app.get('/test', routeHelper(async (req, res) => {
    // throw new Error('error crítico');
    await addUser();
    await sleep(3000);
    res.json({
        status: 'ok'
    })
}));

app.listen(5000, ()=> console.log('corriendo en 5000 ...'));