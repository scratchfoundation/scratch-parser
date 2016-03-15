var validate = require('./lib/validate');
var parse = require('./lib/parse');

module.exports = function (input, callback) {
    parse(input, function (err, project) {
        if (err) return callback(err);

        validate(project, function (err) {
            if (err) return callback(err);
            callback(null, project);
        });
    });
};
