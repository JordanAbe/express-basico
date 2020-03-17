class AuthError extends Error {
    constructor(){
        super('Tu no tienes acceso');
        this.name = 'AuthError';
        this.status = 403;
    }

    errorObject(){
        return {
            name: this.name,
            status: this.status,
            message: this.message,
        };
    }

}

module.exports = AuthError;