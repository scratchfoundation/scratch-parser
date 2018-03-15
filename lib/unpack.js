var JSZip = require('jszip');
var Promise = require('promise');

/**
 * If input is a buffer, transforms buffer into a UTF-8 string.
 * If input is encoded in ZIP format, the input will be extracted and decoded.
 * If input is a string, resolves promise with that string.
 * This function returns a promise, but if a callback is provided,
 * this function will pass the relevant info to the callback as if un-promised.
 * The zip is explicitly not provided to the callback, but is resolved in the
 * promise. This is to support functionality needed by scratch-vm, but to
 * avoid major breaking changes with dependencies of this library.
 *
 * @param {Buffer | string} Input
 *
 * @return {?Promise} A promise of the unpacked project as a 2-element array of
 * the project json and the entire unpacked zip (if zip was provided,
 * or null if not provided)
 * Promise rejects upon any errors encountered in the unpacking process
 * (including if provided a .sb file).
 */
module.exports = function (input, callback) {
    var callbackWrapper = callback ?
        (function (err, resArr) {
            return callback(err, resArr ? resArr[0] : resArr);
        }) :
        callback;

    if (typeof input === 'string') {
        return Promise.resolve([input, null])
            .nodeify(callbackWrapper);
    }

    // Validate input type
    if (!Buffer.isBuffer(input)) {
        try {
            input = new Buffer(input);
        } catch (e) {
            return Promise.reject('Input must be a Buffer or a string.')
                .nodeify(callbackWrapper);
        }
    }

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
    if (!isZip && !isLegacy) {
        return Promise.resolve([input.toString('utf-8'), null])
            .nodeify(callbackWrapper);
    }

    // Reject if legacy encoding detected
    if (isLegacy) {
        return Promise.reject('Parser only supports Scratch 2.X and above')
            .nodeify(callbackWrapper);
    }

    // Handle zip
    // Need this extra Promise.resolve here so that the correct kind of promise
    // is returned
    return Promise.resolve(JSZip.loadAsync(input).then(function (zip) {
        return zip.file('project.json').async('string')
            .then(function (project) {
                return Promise.resolve([project, zip])
                    .nodeify(callbackWrapper);
            });
    }));
};
