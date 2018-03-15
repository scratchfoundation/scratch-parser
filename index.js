var Promise = require('promise');

var unpack = require('./lib/unpack');
var parse = require('./lib/parse');
var validate = require('./lib/validate');
var analyze = require('./lib/analyze');


/**
 * Unpacks, parses, validates, and analyzes Scratch projects.
 * If a callback is provided, passes a validated scratch object on success, or
 * an error on failure.
 * If a callback is not provided, returns a promise of a 2 element array of
 * the validated project json and the entire unpacked zip (if zip was provided,
 * or null if not provided)
 * Promise rejects if the input could not be validated against the sb2 or sb3
 * schemas.
 *
 * @param {Buffer | string} Input buffer or string representing scratch project
 *
 * @return {Object}
 */
module.exports = function (input, callback) {
    var callbackWrapper = callback ?
        (function (err, resArr) {
            return callback(err, resArr ? resArr[0] : resArr);
        }) :
        callback;
    return unpack(input)
        .then(function (resultArr) {
            var unpackedInput = resultArr[0];
            var zip = resultArr[1];
            return parse(unpackedInput)
                .then(validate)
                .then(function (validatedInput) {
                    if (validatedInput.projectVersion === 2) {
                        // Calling analyze only if project was SB2
                        return analyze(validatedInput);
                    }
                    return Promise.resolve(validatedInput);
                })
                .then(function (fullyValidatedResult) {
                    return Promise.resolve([fullyValidatedResult, zip]);
                });
        })
        .nodeify(callbackWrapper);
};
