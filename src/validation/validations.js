const yup = require('yup');

function validate(validation){
    return (req, res, next) => {
        try {
            validation(req.body);
            next();
        } catch (error) {
            next(error);
        }
    }
}

function createUsersValidation2(data){
    const { name, age, email } = data;

    if(typeof name !== 'string'){
        throw new Error('name debe ser un string');
    }
    if(name.length <= 5){
        throw new Error('name debe ser mayor a 5 caracteres');
    }
    if(!/^[a-z]+$/i.test(name)){
        throw new Error('name debe contener solo caracteres de a-z');
    }

    if(typeof age !== 'number'){
        throw new Error('La edad debe ser un número')
    }
    if(age < 0) {
        throw new Error('La edad no debe ser negativo')
    }
    
    if(typeof email !== 'string'){
        throw new Error('El email debe ser un string');
    }
    if(!/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9:.]+$/i.test(email)){
        throw new Error('Email debe ser un email válido');
    }
}

function createUsersValidation(data){
    const schema = yup.object().shape({
        name: yup.string().min(5).matches(/^[a-z]+$/i).required(),
        age: yup.number().min(1).max(100).integer().required(),
        email: yup.string().matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9:.]+$/i).required()
    });
    schema.validateSync(data);
}

module.exports = {
    validate,
    createUsersValidation,
}