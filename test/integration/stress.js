var test = require('tap').test;
var JSZip = require('jszip');
var data = require('../fixtures/data');
var parser = require('../../index');

test('sb', function (t) {
    var set = data.sb;
    t.plan(set.length * 2);
    for (var i in data.sb) {
        parser(data.sb[i], false, function (err, res) {
            t.type(err, 'string');
            t.type(res, 'undefined');
        });
    }
});

test('sb2', function (t) {
    var set = data.sb2;
    t.plan(set.length * 5);
    for (var i in data.sb2) {
        parser(data.sb2[i], false, function (err, result) {
            t.equal(err, null);
            t.equal(Array.isArray(result), true);
            var res = result[0];
            var possibleZip = result[1];
            t.type(res, 'object');
            t.type(res.info, 'object');
            t.equal(possibleZip instanceof JSZip, true);
        });
    }
});

test('sb3', function (t) {
    var set = data.sb3;
    t.plan(set.length * 5);
    for (var i in data.sb3) {
        parser(data.sb3[i], false, function (err, result) {
            t.equal(err, null);
            t.equal(Array.isArray(result), true);
            var res = result[0];
            var possibleZip = result[1];
            t.type(res, 'object');
            t.type(res.targets, 'object');
            t.equal(possibleZip instanceof JSZip, true);
        });
    }
});

test('json', function (t) {
    var set = data.json;
    t.plan(set.length * 6);
    for (var i in data.json) {
        parser(data.json[i], false, function (err, result) {
            t.equal(err, null);
            t.equal(Array.isArray(result), true);
            var res = result[0];
            var possibleZip = result[1];
            t.type(res, 'object');
            t.type(res.projectVersion, 'number');
            if (res.projectVersion === 2) {
                t.type(res.info, 'object');
            } else if (res.projectVersion === 3) {
                t.type(res.info, 'undefined');
            }
            t.equal(possibleZip, null);
        });
    }
});

test('json string', function (t) {
    var set = data.json;
    t.plan(set.length * 6);
    for (var i in data.json) {
        parser(data.json[i].toString('utf-8'), false, function (err, result) {
            t.equal(err, null);
            t.equal(Array.isArray(result), true);
            var res = result[0];
            var possibleZip = result[1];
            t.type(res, 'object');
            t.type(res.projectVersion, 'number');
            if (res.projectVersion === 2) {
                t.type(res.info, 'object');
            } else if (res.projectVersion === 3) {
                t.type(res.info, 'undefined');
            }
            t.equal(possibleZip, null);
        });
    }
});
