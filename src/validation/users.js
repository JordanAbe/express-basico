const express = require('express');
const validations= require('./validations');

const app = express();

app.use(express.json());

app.post('/users', validations.validate(validations.createUsersValidation), (req, res) => {
    const { name, age, email } = req.body;
    res.json({
        name,
        age,
        email,
    })
})

//middleware que atrapa errores
app.use((error, req, res, next) => {
    res.status(400).json({
        status: 'error',
        message: error.message,
    })
});

app.listen(3000, ()=> console.log('corriendo en 3000 .... :>'))