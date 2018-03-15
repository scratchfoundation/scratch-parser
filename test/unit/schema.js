var ajv = require('ajv')();
var test = require('tap').test;
var meta = require('../fixtures/meta.json');
var schema = require('../../lib/sb2_schema.json');

test('spec', function (t) {
    t.type(schema, 'object');
    t.end();
});

test('is valid', function (t) {
    // Validate schema against the JSON meta schema:
    // http://json-schema.org/draft-04/schema#
    var validate = ajv.compile(meta);
    var valid = validate(schema);

    t.equal(valid, true);
    t.end();
});
