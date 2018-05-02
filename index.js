var async = require('async');

var unpack = require('./lib/unpack');
var parse = require('./lib/parse');
var validate = require('./lib/validate');

/**
  * Unpacks, parses, validates, and analyzes Scratch projects. If successful,
  * will return a valid Scratch project object with appended metadata.
  * @param {boolean}         isSprite Whether this is a sprite (true) or whole project (false)
  * @param {Buffer | string} input    Buffer or string representing project
  * @param {Function}        callback Returns error or project data
  */
module.exports = function (isSprite, input, callback) {
    // First unpack the input (need this outside of the async waterfall so that
    // unpackedProject can be refered to again)
    unpack(isSprite, input, function (err, unpackedProject) {
        if (err) return callback(err);

        async.waterfall([
            function (cb) {
                parse(unpackedProject[0], cb);
            },
            validate.bind(null, isSprite)
        ], function (error, validatedInput) {
            // One more callback wrapper so that we can re-package everything
            // with the possible zip returned from unpack
            if (error) return callback(error);
            callback(null, [validatedInput, unpackedProject[1]]);
        });
    });
};
