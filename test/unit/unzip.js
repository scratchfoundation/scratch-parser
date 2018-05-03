var fs = require('fs');
var path = require('path');
var test = require('tap').test;
var JSZip = require('jszip');
var unzip = require('../../lib/unzip');

var fixtures = {
    sb: path.resolve(__dirname, '../fixtures/data/_example.sb'),
    sb2: path.resolve(__dirname, '../fixtures/data/_example.sb2'),
    gzipJSON: path.resolve(__dirname, '../fixtures/data/_example.json.gz'),
    zipFakeProjectJSON:
        path.resolve(__dirname, '../fixtures/data/_zipFakeProjectJson.zip'),
    zipNoProjectJSON:
        path.resolve(__dirname, '../fixtures/data/_zipNoProjectJson.zip')
};

for (var i in fixtures) {
    fixtures[i] = fs.readFileSync(fixtures[i]);
}

var errorMessage = 'Failed to unzip and extract project.json';

test('spec', function (t) {
    t.type(unzip, 'function');
    t.end();
});

test('sb', function (t) {
    var buffer = new Buffer(fixtures.sb);
    unzip(buffer, false, false, function (err, res) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(res, 'undefined');
        t.end();
    });
});

test('sb2', function (t) {
    var buffer = new Buffer(fixtures.sb2);
    unzip(buffer, false, false, function (err, res) {
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

test('gzipped JSON', function (t) {
    var buffer = new Buffer(fixtures.gzipJSON);
    unzip(buffer, true, false, function (err, res) {
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

test('zip without project json', function (t) {
    var buffer = new Buffer(fixtures.zipNoProjectJSON);
    unzip(buffer, false, false, function (err, res) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(res, 'undefined');
        t.end();
    });
});

test('zip with fake project json', function (t) {
    var buffer = new Buffer(fixtures.zipFakeProjectJSON);
    unzip(buffer, false, false, function (err, res) {
        t.equal(err, null);
        t.equal(Array.isArray(res), true);
        t.type(res[0], 'string');
        t.equal(res[0], 'this is not json\n');
        t.throws(function () {
            JSON.parse(res[0]);
        });
        t.equal(res[1] instanceof JSZip, true);
        t.end();
    });
});

var randomString = 'this is not a zip';

test('random string instead of zip, whole project', function (t) {
    unzip(randomString, false, false, function (err, res) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(res, 'undefined');
        t.end();
    });
});

test('random string instead of zip, sprite', function (t) {
    unzip(randomString, false, true, function (err, res) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(res, 'undefined');
        t.end();
    });
});

test('random string instead of gzip, whole project ', function (t) {
    unzip(randomString, true, false, function (err, res) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(res, 'undefined');
        t.end();
    });
});

test('random string instead of gzip, sprite', function (t) {
    unzip(randomString, true, true, function (err, res) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(res, 'undefined');
        t.end();
    });
});

test('undefined', function (t) {
    var foo;
    unzip(foo, false, false, function (err, obj) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(obj, 'undefined');
        t.end();
    });
});

test('undefined isGZip', function (t) {
    var foo;
    unzip(foo, true, false, function (err, obj) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(obj, 'undefined');
        t.end();
    });
});

test('null instead of zip, whole project', function (t) {
    unzip(null, false, false, function (err, obj) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(obj, 'undefined');
        t.end();
    });
});

test('null instead of zip, sprite', function (t) {
    unzip(null, false, true, function (err, obj) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(obj, 'undefined');
        t.end();
    });
});

test('null instead of gzip, whole project', function (t) {
    unzip(null, true, false, function (err, obj) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(obj, 'undefined');
        t.end();
    });
});

test('null instead of gzip, sprite', function (t) {
    unzip(null, true, true, function (err, obj) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(obj, 'undefined');
        t.end();
    });
});

test('object instead of zip, whole project', function (t) {
    unzip({}, false, false, function (err, obj) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(obj, 'undefined');
        t.end();
    });
});

test('object instead of zip, sprite', function (t) {
    unzip({}, false, true, function (err, obj) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(obj, 'undefined');
        t.end();
    });
});

test('object instead of gzip, whole project', function (t) {
    unzip({}, true, false, function (err, obj) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(obj, 'undefined');
        t.end();
    });
});

test('object instead of gzip, sprite', function (t) {
    unzip({}, true, false, function (err, obj) {
        t.type(err, 'string');
        t.equal(err.startsWith(errorMessage), true);
        t.type(obj, 'undefined');
        t.end();
    });
});
