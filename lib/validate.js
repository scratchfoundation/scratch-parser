var ajv = require('ajv')();
var sb2schema = require('./sb2_schema.json');
var sb3schema = require('./sb3_schema.json');

module.exports = function (input, callback) {
    var validateSb2 = ajv.compile(sb2schema);
    var validateSb3 = ajv.compile(sb3schema);

    var isValidSb2 = validateSb2(input);

    if (isValidSb2) {
        input.projectVersion = 2;
        return callback(null, input);
    }

    var isValidSb3 = validateSb3(input);
    if (isValidSb3) {
        input.projectVersion = 3;
        return callback(null, input);
    }

    var validationErrors = {
        validationError: 'Could not parse as a valid SB2 or SB3 project.',
        sb2Errors: validateSb2.errors,
        sb3Errors: validateSb3.errors
    };

    callback(validationErrors);
};
