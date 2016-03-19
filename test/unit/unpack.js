var fs = require('fs');
var path = require('path');
var test = require('tap').test;
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
    unpack(buffer, function (err, res) {
        t.type(err, 'string');
        t.type(res, 'undefined');
        t.end();
    });
});

test('sb2', function (t) {
    var buffer = new Buffer(fixtures.sb2);
    unpack(buffer, function (err, res) {
        t.equal(err, null);
        t.type(res, 'string');
        t.doesNotThrow(function () {
            JSON.parse(res);
        });
        t.end();
    });
});

test('json', function (t) {
    var buffer = new Buffer(fixtures.json);
    unpack(buffer, function (err, res) {
        t.equal(err, null);
        t.type(res, 'string');
        t.doesNotThrow(function () {
            JSON.parse(res);
        });
        t.end();
    });
});

test('undefined', function (t) {
    unpack(undefined, function (err, res) {
        t.type(err, 'string');
        t.equal(res, undefined);
        t.end();
    });
});

test('null', function (t) {
    unpack(null, function (err, obj) {
        t.type(err, 'string');
        t.equal(obj, undefined);
        t.end();
    });
});

test('object', function (t) {
    unpack({}, function (err, obj) {
        t.type(err, 'string');
        t.equal(obj, undefined);
        t.end();
    });
});
