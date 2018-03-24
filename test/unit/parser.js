var test = require('tap').test;
var parse = require('../../lib/parse');
var data = require('../fixtures/data');

test('spec', function (t) {
    t.type(parse, 'function');
    t.end();
});

test('valid', function (t) {
    for (var i = 0; i < data.json.length; i++) {
        parse(data.json[i].toString(), function (err, res) {
            t.equal(err, null);
            t.type(res, 'object');
        });
    }
    t.end();
});

test('invalid', function (t) {
    parse('&%@', function (err, res) {
        t.type(err, 'string');
        t.type(res, 'undefined');
        t.end();
    });
});
