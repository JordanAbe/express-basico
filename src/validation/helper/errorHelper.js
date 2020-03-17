const FlowError = require('../errors/flowError');

function errorHelper(callback) {
    return async (req, res, next) => {
        try {
            await callback(req, res);
            next();
        } catch (error) {
            // next(new FlowError(error));
            next(error);
        }
    }
};

module.exports = errorHelper;