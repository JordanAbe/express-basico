function routeHelper(callback) {
    return async (req, res) => {
        try {
            await callback(req, res);
        } catch (error) {
            res.status(400)
            .json({
                error: 'error',
                message: error.message,
            })
        }
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addUser() {
    return new Promise((resolve, reject) => setTimeout(reject(new Error('Hubo un problemilla')), 3000));
}

module.exports = {
    routeHelper, 
    sleep,
    addUser,
};