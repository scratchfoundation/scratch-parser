var JSZip = require('jszip');
var GZip = require('gzip-js');

/**
 * Unpacks a zip or gzip file.
 * @param {string} input    Zip file provided as a string
 * @param {boolean} isGZip Whether the input is a GZip file, otherwise treat as zip
 * @param {boolean} isSprite Whether the input should be treated as
 * a sprite (true) or whole project (false)
 * @param {array}  callback Array including both the project and zip archive
 * @return {void}
 */
module.exports = function (input, isGZip, isSprite, callback) {
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
            // look for json in the list of files, or in a subdirectory
            // assumes there is only one sprite or project json in the zipfile
            const file = isSprite ?
                zip.file(/^([^/]*\/)?sprite\.json$/)[0] :
                zip.file(/^([^/]*\/)?project\.json$/)[0];
            if (file) {
                return file.async('string')
                    .then(function (project) {
                        return callback(null, [project, zip]);
                    });
            }
            return callback(msg + 'missing project or sprite json');
        })
        .catch(function (err) {
            return callback(msg + JSON.stringify(err));
        });

};
