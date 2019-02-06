var pify = require('pify');

var unpack = pify(require('./lib/unpack'));
var parse = pify(require('./lib/parse'));
var validate = pify(require('./lib/validate'));

/**
  * Unpacks, parses, validates, and analyzes Scratch projects. If successful,
  * will return a valid Scratch project object with appended metadata.
  * @param {Buffer | string} input    Buffer or string representing project
  * @param {boolean}         isSprite Whether this is a sprite (true) or whole project (false)
  * @param {Function}        callback Returns error or project data
  */
module.exports = function (input, isSprite, callback) {
    // Unpack the input and further transform the json portion by parsing and
    // validating it.
    unpack(input, isSprite)
        .then(function (unpackedProject) {
            return parse(unpackedProject[0])
                .then(validate.bind(null, isSprite))
                .then(function (validatedProject) {
                    return [validatedProject, unpackedProject[1]];
                });
        })
        .then(callback.bind(null, null), callback);
};
