class ValidationError extends Error {
    constructor(error){
        super(error.message);
        this.name = 'ValidationError';
        this.status = 400;
        this.path = error.path;
    }

    errorObject(){
        return {
            name: this.name,
            status: this.status,
            message: this.message,
            path: this.path,
        };
    }

}

module.exports = ValidationError;