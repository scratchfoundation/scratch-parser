var JSZip = require('jszip');
var GZip = require('gzip-js');

/**
 * Unpacks a zip or gzip file.
 * @param {string} input    Zip file provided as a string
 * @param {boolean} isGZip Whether the input is a GZip file, otherwise treat as zip
 * @param {array}  callback Array including both the project and zip archive
 * @return {void}
 */
module.exports = function (input, isGZip, callback) {
    var msg = 'Failed to unzip and extract project.json, with error: ';
    if (isGZip) {
        var unpackedProject = null;
        try {
            unpackedProject = GZip.unzip(input);
        } catch (e) {
            return callback(msg + e);
        }
        return callback(null, [(new Buffer(unpackedProject)).toString('utf-8'), null]);
    }
    return JSZip.loadAsync(input)
        .then(function (zip) {
            return zip.file('project.json').async('string')
                .then(function (project) {
                    return callback(null, [project, zip]);
                });
        })
        .catch(function (err) {
            return callback(msg + JSON.stringify(err));
        });

};
