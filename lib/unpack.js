var Adm = require('adm-zip');

/**
 * Transforms buffer into a UTF-8 string. If input is encoded in ZIP format,
 * the input will be extracted and decoded.
 *
 * @param {Buffer} Input
 *
 * @return {String}
 */
module.exports = function (input, callback) {
    // Validate input type
    var typeError = 'Input must be a Buffer.';
    if (!Buffer.isBuffer(input)) return callback(typeError);

    // Determine format
    // We don't use the file suffix as this is unreliable and mine-type
    // information is unavailable from Scratch's project CDN. Instead, we look
    // at the first few bytes from the provided buffer (byte signature).
    // https://en.wikipedia.org/wiki/List_of_file_signatures
    var signature = input.slice(0, 3).join(' ');
    var isLegacy = false;
    var isZip = false;

    if (signature.indexOf('83 99 114') === 0) isLegacy = true;
    if (signature.indexOf('80 75') === 0) isZip = true;

    // If not legacy or zip, convert buffer to UTF-8 string and return
    if (!isZip && !isLegacy) return callback(null, input.toString('utf-8'));

    // Return error if legacy encoding detected
    if (isLegacy) return callback('Parser only supports Scratch 2.X');

    // Handle zip
    // @todo Handle error
    var zip = new Adm(input);
    var project = zip.readAsText('project.json', 'utf8');
    callback(null, project);
};
