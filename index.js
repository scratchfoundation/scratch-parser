var async = require('async');

var unpack = require('./lib/unpack');
var parse = require('./lib/parse');
var validate = require('./lib/validate');
var analyze = require('./lib/analyze');

/**
 * Unpacks, parses, validates, and analyzes Scratch projects. If successful,
 * will return a valid Scratch project object with appended metadata, as well
 * as the unpacked zip object if originally provided.
 *
 * @param {Buffer | string} Input buffer or string representing scratch project
 *
 * @return {Object}
 */
module.exports = function (input, callback) {
    // A wrapper around the analyze function, so that
    // it only gets called on 2.0 projects
    var analyzeWrapper = function (validatedProject, cb) {
        if (validatedProject.projectVersion !== 2) {
            return cb(null, validatedProject);
        }
        analyze(validatedProject, cb);
    };

    // First unpack the input (need this outside of the async waterfall so that
    // unoackedProject can be refered to again)
    unpack(input, function(err, unpackedProject) {
        if (err) {
            return callback(err);
        }

        async.waterfall([
            function (cb) {
                parse(unpackedProject[0], cb);
            },
            validate,
            analyzeWrapper
        ], function(error, validatedInput) {
            // One more callback wrapper so that we can re-package everything
            // with the possible zip returned from unpack
            if (error) {
                return callback(error);
            }
            callback(null, [validatedInput, unpackedProject[1]]);
        });
    });
};
