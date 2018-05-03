var fs = require('fs');
var path = require('path');
var test = require('tap').test;
var JSZip = require('jszip');
var unpack = require('../../lib/unpack');

var fixtures = {
    sb: path.resolve(__dirname, '../fixtures/data/_example.sb'),
    sb2: path.resolve(__dirname, '../fixtures/data/_example.sb2'),
    json: path.resolve(__dirname, '../fixtures/data/_example.json')
};

for (var i in fixtures) {
    fixtures[i] = fs.readFileSync(fixtures[i]);
}

test('spec', function (t) {
    t.type(unpack, 'function');
    t.end();
});

test('sb', function (t) {
    var buffer = new Buffer(fixtures.sb);
    unpack(buffer, false, function (err, res) {
        t.type(err, 'string');
        t.type(res, 'undefined');
        t.end();
    });
});

test('sb2', function (t) {
    var buffer = new Buffer(fixtures.sb2);
    unpack(buffer, false, function (err, res) {
        t.equal(err, null);
        t.equal(Array.isArray(res), true);
        t.type(res[0], 'string');
        t.doesNotThrow(function () {
            JSON.parse(res[0]);
        });
        t.equal(res[1] instanceof JSZip, true);
        t.end();
    });
});

test('sb2 does not validate as sprite', function (t) {
    var buffer = new Buffer(fixtures.sb2);
    unpack(buffer, true, function (err, res) {
        t.type(err, 'string');
        t.type(res, 'undefined');
        t.end();
    });
});

test('json', function (t) {
    var buffer = new Buffer(fixtures.json);
    unpack(buffer, false, function (err, res) {
        t.equal(err, null);
        t.equal(Array.isArray(res), true);
        t.type(res[0], 'string');
        t.doesNotThrow(function () {
            JSON.parse(res[0]);
        });
        t.equal(res[1], null);
        t.end();
    });
});

test('json utf-8 string', function (t) {
    var buffer = new Buffer(fixtures.json);
    unpack(buffer.toString('utf-8'), false, function (err, res) {
        t.equal(err, null);
        t.equal(Array.isArray(res), true);
        t.type(res[0], 'string');
        t.doesNotThrow(function () {
            JSON.parse(res[0]);
        });
        t.equal(res[1], null);
        t.end();
    });
});

test('invalid string', function (t) {
    unpack('this is not json', false, function (err, res) {
        t.equal(err, null);
        t.equal(Array.isArray(res), true);
        t.type(res[0], 'string');
        t.throws(function () {
            JSON.parse(res[0]);
        });
        t.equal(res[1], null);
    });
    unpack('this is not json', true, function (err, res) {
        t.equal(err, null);
        t.equal(Array.isArray(res), true);
        t.type(res[0], 'string');
        t.throws(function () {
            JSON.parse(res[0]);
        });
        t.equal(res[1], null);
        t.end();
    });
});

test('undefined', function (t) {
    var foo;
    unpack(false, foo, function (err, res) {
        t.type(err, 'string');
        t.type(res, 'undefined');
        t.end();
    });
});

test('null', function (t) {
    unpack(false, null, function (err, obj) {
        t.type(err, 'string');
        t.type(obj, 'undefined');
        t.end();
    });
});

test('object', function (t) {
    unpack(false, {}, function (err, obj) {
        t.type(err, 'string');
        t.type(obj, 'undefined');
        t.end();
    });
});
