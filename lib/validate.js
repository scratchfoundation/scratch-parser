var ajv = require('ajv')();
var schema = require('./schema.json');

module.exports = function (input, callback) {
    var validate = ajv.compile(schema);
    var valid = validate(input);

    if (!valid) return callback(validate.errors);
    callback();
};
