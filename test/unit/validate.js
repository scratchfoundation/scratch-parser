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
        t.type(err, 'object');
        t.type(err.validationError, 'string');
        var sb2Errs = err.sb2Errors;
        t.equal(Array.isArray(sb2Errs), true);
        t.type(res, 'undefined');
        t.type(sb2Errs[0], 'object');
        t.type(sb2Errs[0].keyword, 'string');
        t.type(sb2Errs[0].dataPath, 'string');
        t.type(sb2Errs[0].schemaPath, 'string');
        t.type(sb2Errs[0].message, 'string');
        t.type(sb2Errs[0].params, 'object');
        t.type(sb2Errs[0].params.missingProperty, 'string');
        t.end();
    });
});
