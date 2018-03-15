var Promise = require('promise');

/**
 * Converts string from unpack method into a project object. Note: this method
 * will be expanded greatly in the future in order to support the Scratch 1.4
 * file format. For now, this is nothing but an (awkward) async wrapper around
 * the `JSON.parse` function.
 *
 * @param {String} Input
 *
 * @return {Promise} If callback function was provided, it gets called on
 * the validated input, or an error object containing both sb2 and sb3 errors.
 * If a callback function is not provided, this function returns
 * a promise which resolves to the validated input or rejects to the error
 * object described.
 */
module.exports = function (input, callback) {
    try {
        var parsedInput = JSON.parse(input);
        return Promise.resolve(parsedInput).nodeify(callback);
    } catch (e) {
        return Promise.reject(e.toString()).nodeify(callback);
    }
};
