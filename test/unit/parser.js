var fs = require('fs');
var path = require('path');
var test = require('tap').test;
var parse = require('../../lib/parse');
var data = require('../fixtures/data');

test('spec', function (t) {
    t.type(parse, 'function');
    t.end();
});

test('valid', function (t) {
    for (var i = 0; i < data.json.length; i++) {
        parse(data.json[i].toString(), function (err, res) {
            t.equal(err, null);
            t.type(res, 'object');
        });
    }
    t.end();
});

test('invalid', function (t) {
    parse('&%@', function (err, res) {
        t.type(err, 'string');
        t.type(res, 'undefined');
        t.end();
    });
});

test('backspace control characters get stripped out in sb2', function (t) {
    var backspaceControlSb2 = fs.readFileSync(
        path.resolve(__dirname, '../fixtures/data/217845144_sb2_control_char_in_strings_credit_to_Mr-Dave_test.json'));
    parse(backspaceControlSb2.toString(), function (err, res) {
        t.equal(err, null);
        t.type(res, 'object');

        // Verify that the object doesn't have a control character in the global variable name
        t.equal(Array.isArray(res.variables), true);
        t.equal(res.variables.length, 1);
        // The parsed string should no longer include a backspace control character
        t.equal(res.variables[0].name, 'b-damage');
        t.end();
    });
});

test('backspace control characters get stripped out in sb3', function (t) {
    var backspaceControlSb2 = fs.readFileSync(
        path.resolve(__dirname, '../fixtures/data/217845144_sb3_control_char_in_strings_credit_to_Mr-Dave_test.json'));
    parse(backspaceControlSb2.toString(), function (err, res) {
        t.equal(err, null);
        t.type(res, 'object');

        // Verify that the object doesn't have a control character in the global variable name
        t.equal(Array.isArray(res.targets), true);
        t.equal(res.targets.length, 2);
        t.type(res.targets[0].variables, 'object');
        var backspaceControlVariableId = Object.keys(res.targets[0].variables)[0];
        var backspaceControlVariable = res.targets[0].variables[backspaceControlVariableId];
        // The parsed string should no longer include a backspace control character
        t.equal(backspaceControlVariable[0], 'b-damage');
        t.end();
    });
});

test('backslashes are kept when stripping backspace control characters', function (t) {
    var json = JSON.stringify({
        test: '\\\\\baaa\ba'
    });
    parse(json, function (err, res) {
        t.equal(err, null);
        t.type(res, 'object');
        t.equal(res.test, '\\\\aaaa');
        t.end();
    });
});

test('backslashes followed by b are not stripped at all', function (t) {
    var json = JSON.stringify({
        test: '\\b\b\\\\b'
    });
    parse(json, function (err, res) {
        t.equal(err, null);
        t.type(res, 'object');
        t.equal(res.test, '\\b\\\\b');
        t.end();
    });
});
