var test = require('tap').test;
var data = require('../fixtures/data');
var analyze = require('../../lib/analyze');

test('spec', function (t) {
    t.type(analyze, 'function');
    t.end();
});

test('empty project', function (t) {
    t.end();
});

test('example project', function (t) {
    analyze(JSON.parse(data.example.json.toString()), function (err, project) {
        t.equal(err, null);
        t.type(project, 'object');
        t.type(project._meta, 'object');

        t.end();
    });
});
