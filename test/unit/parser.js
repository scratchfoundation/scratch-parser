var test = require('tap').test;
var parse = require('../../lib/parse');
var data = require('../fixtures/data');

test('spec', function (t) {
    t.type(parse, 'function');
    t.end();
});

test('valid', function (t) {
    for (var i = 0; i < data.json.length; i++) {
        var currData = data.json[i];
        var testString = 'valid subtest ' + i;
        test(testString, function(subTest) {
            parse(currData.toString(),
                function (err, res) {
                    subTest.equal(err, null);
                    subTest.type(res, 'object');
                    subTest.end();
                });
        });
    }
    t.end();
});

test('invalid', function (t) {
    parse('&%@', function (err, res) {
        t.type(err, 'string');
        t.equal(res, undefined);
        t.end();
    });
});
