/**
 * Returns an array of items matching the specified attribute.
 *
 * @param {Object} Project
 * @param {String} Attribute to extract and flatten
 *
 * @return {Array}
 */
function flatten (project, attribute) {
    // Storage object
    var result = [];

    // If attribute exists at the top level of the project, append it
    if (typeof project[attribute] !== 'undefined') {
        result = project[attribute];
    }

    // Iterate over child elements and append to result array
    for (var i in project.children) {
        var child = project.children[i];
        if (typeof child[attribute] !== 'undefined') {
            result = result.concat(child[attribute]);
        }
    }

    return result;
}

/**
 * Extract summary information from a specific project attribute. Will attempt
 * to concatinate all children when generating summary.
 *
 * @param {Object} Project
 * @param {String} Attribute key
 * @param {String, Optional} "id" key
 * @param {String, Optional} "hash" key
 *
 * @return {Object}
 */
function extract (project, attribute, id, hash) {
    // Create storage objects and flatten project
    var idList = null;
    var hashList = null;
    var elements = flatten(project, attribute);

    // Extract ids if specified
    if (typeof id !== 'undefined') {
        idList = [];
        for (var x in elements) {
            idList.push(elements[x][id]);
        }
    }

    // Extract hashes if specified
    if (typeof hash !== 'undefined') {
        hashList = [];
        for (var y in elements) {
            hashList.push(elements[y][hash]);
        }
    }

    // Build result and return
    var result = {
        count: elements.length
    };
    if (idList !== null) result.id = idList;
    if (hashList !== null) result.hash = hashList;

    return result;
}

/**
 * Tallys term frequency from an array of strings.
 *
 * @param {Array} Array of strings
 *
 * @return {Object}
 */
function frequency (input) {
    var result = Object.create(null);

    for (var i in input) {
        var term = input[i];
        if (typeof result[term] === 'undefined') result[term] = 0;
        result[term]++;
    }

    return result;
}

/**
 * Extract blocks and generate frequency count.
 *
 * @param {Object} Project
 *
 * @return {Object}
 */
function blocks (project) {
    // Storage objects
    var blocks = [];

    // Walk scripts array(s) and build block list
    function walk (stack) {
        for (var i in stack) {
            // Skip if item is not array
            if (!Array.isArray(stack[i])) continue;

            // Recurse if first item is not a string
            if (typeof stack[i][0] !== 'string') {
                walk(stack[i]);
                continue;
            }

            // Add to block list
            blocks.push(stack[i][0]);

            // Don't pull in params from procedures
            if (stack[i][0] === 'procDef') continue;

            // Move to next item and walk
            walk(stack[i][0].slice(1));
        }
    }
    walk(flatten(project, 'scripts'));

    // Generate frequency count
    var freq = frequency(blocks);

    // Build result and return
    return {
        count: blocks.length,
        unique: Object.keys(freq).length,
        id: blocks,
        frequency: freq
    };
}

/**
 * Extract extensions list.
 *
 * @param {Object} Project
 *
 * @return {Object}
 */
function extensions (project) {
    var result = {count: 0, id: []};

    // Check to ensure project includes any extensions
    if (typeof project.info.savedExtensions === 'undefined') return result;

    // Iterate over extensions and build list
    var ext = project.info.savedExtensions;
    for (var i in ext) {
        result.id.push(ext[i].extensionName);
    }

    // Count and return
    result.count = result.id.length;
    return result;
}

/**
 * Analyzes project and appends metadata to the project object.
 *
 * @param {Object} Project
 *
 * @return {Object}
 */
module.exports = function (project, callback) {
    // Create metadata object
    var meta = {
        sprites: extract(project, 'children'),
        scripts: extract(project, 'scripts'),
        variables: extract(project, 'variables', 'name'),
        lists: extract(project, 'lists', 'listName'),
        comments: extract(project, 'scriptComments'),
        sounds: extract(project, 'sounds', 'soundName', 'md5'),
        costumes: extract(project, 'costumes', 'costumeName', 'baseLayerMD5')
    };

    // Blocks
    meta.blocks = blocks(project);

    // Extensions
    meta.extensions = extensions(project);

    // Bind metadata to project and return
    project._meta = meta;
    callback(null, project);
};
