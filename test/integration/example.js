var test = require('tap').test;
var data = require('../fixtures/data');
var parser = require('../../index');

test('sb', function (t) {
    parser(data.example.sb, function (err, res) {
        t.type(err, 'string');
        t.type(res, 'undefined');
        t.end();
    });
});

test('sb2', function (t) {
    parser(data.example.sb2, function (err, res) {
        t.equal(err, null);
        t.type(res, 'object');
        t.type(res._meta, 'object');
        t.type(res.info, 'object');
        t.end();
    });
});

test('json', function (t) {
    parser(data.example.json, function (err, res) {
        t.equal(err, null);
        t.type(res, 'object');
        t.type(res._meta, 'object');
        t.type(res.info, 'object');
        t.end();
    });
});

test('json string', function (t) {
    parser(data.example.json.toString('utf-8'), function (err, res) {
        t.equal(err, null);
        t.type(res, 'object');
        t.type(res._meta, 'object');
        t.type(res.info, 'object');
        t.end();
    });
});
