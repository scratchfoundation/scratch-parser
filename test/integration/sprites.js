var test = require('tap').test;
var JSZip = require('jszip');
var data = require('../fixtures/data');
var parser = require('../../index');

test('default cat sprite2', function (t) {
    parser(data.sprites.default_cat_sprite2, true, function (err, result) {
        t.equal(err, null);
        t.equal(Array.isArray(result), true);
        var res = result[0];
        var possibleZip = result[1];
        t.type(res, 'object');
        t.equal(res.projectVersion, 2);
        t.equal(possibleZip instanceof JSZip, true);
        t.end();
    });
});

test('example sprite2', function (t) {
    parser(data.sprites.example_sprite2, true, function (err, result) {
        t.equal(err, null);
        t.equal(Array.isArray(result), true);
        var res = result[0];
        var possibleZip = result[1];
        t.type(res, 'object');
        t.equal(res.projectVersion, 2);
        t.equal(possibleZip instanceof JSZip, true);
        t.end();
    });
});

test('banana sprite2, no sounds', function (t) {
    parser(data.sprites.bananas_sprite2, true, function (err, result) {
        t.equal(err, null);
        t.equal(Array.isArray(result), true);
        var res = result[0];
        var possibleZip = result[1];
        t.type(res, 'object');
        t.equal(res.projectVersion, 2);
        t.equal(possibleZip instanceof JSZip, true);
        t.end();
    });
});

test('nested banana sprite2', function (t) {
    parser(data.sprites.bananas_nested_sprite2, true, function (err, result) {
        t.equal(err, null);
        t.equal(Array.isArray(result), true);
        var res = result[0];
        var possibleZip = result[1];
        t.type(res, 'object');
        t.equal(res.projectVersion, 2);
        t.equal(possibleZip instanceof JSZip, true);
        t.end();
    });
});

test('default cat sprite2 json', function (t) {
    parser(data.sprites.default_cat_sprite2_json, true, function (err, result) {
        t.equal(err, null);
        t.equal(Array.isArray(result), true);
        var res = result[0];
        var possibleZip = result[1];
        t.type(res, 'object');
        t.equal(res.projectVersion, 2);
        t.equal(possibleZip, null);
        t.end();
    });
});

test('default cat sprite2 json', function (t) {
    parser(data.sprites.example_sprite2_json, true, function (err, result) {
        t.equal(err, null);
        t.equal(Array.isArray(result), true);
        var res = result[0];
        var possibleZip = result[1];
        t.type(res, 'object');
        t.equal(res.projectVersion, 2);
        t.equal(possibleZip, null);
        t.end();
    });
});
