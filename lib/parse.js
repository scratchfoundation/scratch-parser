/**
 * Converts string from unpack method into a project object. Note: this method
 * will be expanded greatly in the future in order to support the Scratch 1.4
 * file format. For now, this is nothing but an (awkward) async wrapper around
 * the `JSON.parse` function.
 * @param {string}   input    Stringified JSON object
 * @param {Function} callback Returns error or parsed JSON object
 * @return {void}
 */
module.exports = function (input, callback) {
    try {
        var result = JSON.parse(input);
        callback(null, result);
    } catch (e) {
        return callback(e.toString());
    }
};
