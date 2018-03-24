var JSZip = require('jszip');

/**
 * Unpacks a zip file.
 * @param {string} input    Zip file provided as a string
 * @param {array}  callback Array including both the project and zip archive
 * @return {void}
 */
module.exports = function (input, callback) {
    return JSZip.loadAsync(input)
        .then(function (zip) {
            return zip.file('project.json').async('string')
                .then(function (project) {
                    return callback(null, [project, zip]);
                });
        })
        .catch(function (err) {
            var msg = 'Failed to unzip and extract project.json, with error: ';
            return callback(msg + JSON.stringify(err));
        });
};
