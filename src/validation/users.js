const express = require('express');
const validations= require('./validations');
const errorMiddleware = require('./middleware/errors');
const isAdminMiddleware = require('./middleware/isAdmin');
const errorHelper = require('./helper/errorHelper');

/* Estas excepcioens se atrapan fuera del contexto de express */
//atrapa promesas rechazadas
process.on('unhandledRejection', (error) => {
    console.log(error);
})
//atrapa excepciones
process.on('uncaughtException', (error) => {
    console.log(error);
})
// throw new Error('critical error');
/* end */

const app = express();

app.use(express.json());

// para funciones sincronas
//si hay un error dentro del método el errorMiddleware lo atrapa
app.post('/users', isAdminMiddleware, validations.validate(validations.createUsersValidation), (req, res, next) => {
    throw new Error('joder');
    res.json({
        result: "ok"    
    })
})

// para funciones asincronas
//si hay un error dentro del método el flujo se congela... para evitar esto se agrega un helper async que contenga un try catch
app.post('/users-async', isAdminMiddleware, validations.validate(validations.createUsersValidation), errorHelper(async (req, res) => {
    throw new Error('joder');
    res.json({
        result: "ok"    
    })
}));

app.use(errorMiddleware);

app.listen(3000, ()=> console.log('corriendo en 3000 .... :>'))