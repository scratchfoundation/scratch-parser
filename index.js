var async = require('async');

var unpack = require('./lib/unpack');
var parse = require('./lib/parse');
var validate = require('./lib/validate');

/**
 * Unpacks, parses, validates, and analyzes Scratch projects. If successful,
 * will return a valid Scratch project object with appended metadata.
 * @param {Buffer | string} input    Buffer or string representing project
 * @param {Function}        callback Returns error or project data
 */
module.exports = function (input, callback) {
    async.waterfall([
        function (cb) {
            unpack(input, cb);
        },
        parse,
        validate
    ], callback);
};
