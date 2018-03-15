var ajv = require('ajv')();
var Promise = require('promise');

var sb2schema = require('./sb2_schema.json');
var sb3schema = require('./sb3_schema.json');

/**
 * Validates provided input as a Scratch project (either in 2.0 or 3.0 format).
 * This function returns a Promise (if a callback function is not specified)
 * or the result of running the provided promise on the input if it is
 * determined to be valid, or an error object containing
 * both sb2 and sb3 errors.
 *
 * @param {Buffer | string} Input
 *
 * @return {?Promise} If callback function was provided, it gets called on
 * the validated input, or an error object containing both sb2 and sb3 errors.
 * If a callback function is not provided, this function returns
 * a promise of which resolves to the validated input or rejects to the error
 * object described.
 */
module.exports = function (input, callback) {
    var validateSb2 = ajv.compile(sb2schema);
    var validateSb3 = ajv.compile(sb3schema);

    var isValidSb2 = validateSb2(input);

    if (isValidSb2) {
        input.projectVersion = 2;
        return Promise.resolve(input).nodeify(callback);
    }

    var isValidSb3 = validateSb3(input);
    if (isValidSb3) {
        input.projectVersion = 3;
        return Promise.resolve(input).nodeify(callback);
    }

    var validationErrors = {
        validationError: 'Could not parse as a valid SB2 or SB3 project.',
        sb2Errors: validateSb2.errors,
        sb3Errors: validateSb3.errors
    };

    return Promise.reject(validationErrors).nodeify(callback);
};
