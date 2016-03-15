var oboe = require('oboe');
var once = require('once');

module.exports = function (input, callback) {
    // Ensure callback is only called once
    callback = once(callback);

    // Metadata storage object
    var _meta = {
        assets: [],
        blocks: [],
        variables: []
    };

    // Node handlers
    function _infoHandler (obj) {
        return obj;
    }

    function _costumeHandler (obj) {
        return obj;
    }

    function _listHandler (obj) {
        return obj;
    }

    function _soundHandler (obj) {
        return obj;
    }

    function _variableHandler (obj) {
        return obj;
    }

    // Start parser
    oboe(input)
        // Meta
        .node('info', _infoHandler)

        // Stage
        .node('costumes.*', _costumeHandler)
        .node('lists.*', _listHandler)
        .node('sounds.*', _soundHandler)
        .node('variables.*', _variableHandler)

        // Sprites
        .node('children.*.costumes.*', _costumeHandler)
        .node('children.*.lists.*', _listHandler)
        .node('children.*.sounds.*', _soundHandler)
        .node('children.*.variables.*', _variableHandler)

        // Error handler
        .fail(function (err) {
            callback(err);
        })

        // Return
        .done(function () {
            var result = this.root();
            callback(null, result);
        });
};
