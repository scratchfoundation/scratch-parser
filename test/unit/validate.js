var test = require('tap').test;
var data = require('../fixtures/data');
var validate = require('../../lib/validate');

test('spec', function (t) {
    t.type(validate, 'function');
    t.end();
});

test('valid', function (t) {
    validate(JSON.parse(data.example.json), function (err, res) {
        t.equal(err, null);
        t.type(res, 'object');
        t.end();
    });
});

test('invalid', function (t) {
    validate({foo: 1}, function (err, res) {
        t.equal(Array.isArray(err), true);
        t.type(res, 'undefined');
        t.type(err[0], 'object');
        t.type(err[0].keyword, 'string');
        t.type(err[0].dataPath, 'string');
        t.type(err[0].schemaPath, 'string');
        t.type(err[0].message, 'string');
        t.type(err[0].params, 'object');
        t.type(err[0].params.missingProperty, 'string');
        t.end();
    });
});
