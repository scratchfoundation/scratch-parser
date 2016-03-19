/**
 * Converts string from unpack method into a project object. Note: this method
 * will be expanded greatly in the future in order to support the Scratch 1.4
 * file format. For now, this is nothing but an (awkward) async wrapper around
 * the `JSON.parse` function.
 *
 * @param {String} Input
 *
 * @return {Object}
 */
module.exports = function (input, callback) {
    try {
        callback(null, JSON.parse(input));
    } catch (e) {
        return callback(e.toString());
    }
};
