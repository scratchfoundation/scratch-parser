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
    analyze(JSON.parse(data.example.json.toString()), function (err, res) {
        t.equal(err, null);
        t.type(res, 'object');
        t.type(res._meta, 'object');
        t.type(res._meta.sprites, 'object');
        t.type(res._meta.scripts, 'object');
        t.type(res._meta.variables, 'object');
        t.type(res._meta.lists, 'object');
        t.type(res._meta.comments, 'object');
        t.type(res._meta.sounds, 'object');
        t.type(res._meta.costumes, 'object');
        t.type(res._meta.blocks, 'object');
        t.type(res._meta.extensions, 'object');

        t.equal(res._meta.sprites.count, 2, 'expected number of sprites');
        t.equal(res._meta.scripts.count, 5, 'expected number of scripts');
        t.equal(res._meta.variables.count, 2, 'expected number of variables');
        t.equal(res._meta.lists.count, 2, 'expected number of lists');
        t.equal(res._meta.comments.count, 1, 'expected number of comments');
        t.equal(res._meta.sounds.count, 4, 'expected number of sounds');
        t.equal(res._meta.costumes.count, 16, 'expected number of costumes');
        t.equal(res._meta.blocks.count, 16, 'expected number of blocks');
        t.equal(res._meta.blocks.unique, 11, 'exepected number of blocks');
        t.equal(res._meta.extensions.count, 1, 'expected number of extensions');

        t.end();
    });
});
