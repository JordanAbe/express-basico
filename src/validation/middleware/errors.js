//middleware que atrapa errores
const middleware = (error, req, res, next) => {

    let errorObject;

    if(typeof error.errorObject === 'function'){
       errorObject = error.errorObject();
    } else {
        errorObject = {
            status: 500,
            name: 'UnkwnowError',
            message: 'Unkwnown Error',
        };
    }

    res.status(errorObject.status).json(errorObject);
}

module.exports = middleware;