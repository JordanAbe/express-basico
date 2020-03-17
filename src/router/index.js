const express = require('express');
const usersRouter = require('./routeres/users');
const ordersRouter = require('./routeres/orders');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.listen(5000, ()=> { console.log('corriendo en 5000 ...')});