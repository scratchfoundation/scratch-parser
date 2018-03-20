var JSZip = require('jszip');

/**
 * Unpacks a zip
 *
 * @param {String} Input
 *
 * @return {Object}
 */
module.exports = function (input, callback) {
    return JSZip.loadAsync(input)
        .then(function (zip) {
            return zip.file('project.json').async('string')
                .then(function (project) {
                    return callback(null, [project, zip]);
                });
        })
        .catch(function(err) {
            var msg = 'Failed to unzip and extract project.json, with error: ';
            return callback(msg + JSON.stringify(err));
        });
};
