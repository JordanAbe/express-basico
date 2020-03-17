class FlowError extends Error {
    constructor(error){
        super(error.message);
        this.name = 'FlowError';
        this.status = 500;
    }

    errorObject(){
        return {
            name: this.name,
            status: this.status,
            message: this.message,
        };
    }

}

module.exports = FlowError;