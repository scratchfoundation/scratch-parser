var JSZip = require('jszip');

/**
 * Unpacks a zip
 *
 * @param {String} Input
 *
 * @return {Object}
 */
module.exports = function (input, callback) {
    JSZip.loadAsync(input).then(function (zip) {
        zip.file('project.json').async('string')
            .then(function (project) {
                callback(null, [project, zip]);
            })
            .catch(function (err) {
                callback(err);
            });
    });
};
