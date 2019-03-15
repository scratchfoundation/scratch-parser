var test = require('tap').test;
var JSZip = require('jszip');
var data = require('../fixtures/data');
var parser = require('../../index');

test('sb', function (t) {
    parser(data.example.sb, false, function (err, res) {
        t.type(err, 'string');
        t.type(res, 'undefined');
        t.end();
    });
});

test('sb2', function (t) {
    parser(data.example.sb2, false, function (err, result) {
        t.equal(err, null);
        t.equal(Array.isArray(result), true);
        var res = result[0];
        var possibleZip = result[1];
        t.type(res, 'object');
        t.type(res.info, 'object');
        t.equal(possibleZip instanceof JSZip, true);
        t.end();
    });
});

test('json', function (t) {
    parser(data.example.json, false, function (err, result) {
        t.equal(err, null);
        t.equal(Array.isArray(result), true);
        var res = result[0];
        var possibleZip = result[1];
        t.type(res, 'object');
        t.type(res.info, 'object');
        t.equal(possibleZip, null);
        t.end();
    });
});

test('json string', function (t) {
    parser(data.example.json.toString('utf-8'), false, function (err, result) {
        t.equal(err, null);
        t.equal(Array.isArray(result), true);
        var res = result[0];
        var possibleZip = result[1];
        t.type(res, 'object');
        t.type(res.info, 'object');
        t.equal(possibleZip, null);
        t.end();
    });
});

test('invalid empty project archive', function (t) {
    var msg = 'Failed to unzip and extract project.json, with error: ';
    parser(data.example.invalidEmpty, false, function (err, result) {
        t.type(err, 'string');
        t.equal(err.startsWith(msg), true);
        t.type(result, 'undefined');
        t.end();
    });
});
