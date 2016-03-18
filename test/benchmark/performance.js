var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var data = require('../fixtures/data');
var parser = require('../../index');

// Run suite
suite
    .add({
        name: 'JSON - Empty',
        defer: true,
        fn: function (deferred) {
            parser(data.empty.json, function () {
                deferred.resolve();
            });
        }
    })
    .add({
        name: 'SB2 - Empty',
        defer: true,
        fn: function (deferred) {
            parser(data.empty.sb2, function () {
                deferred.resolve();
            });
        }
    })
    .add({
        name: 'JSON - Example',
        defer: true,
        fn: function (deferred) {
            parser(data.example.json, function () {
                deferred.resolve();
            });
        }
    })
    .add({
        name: 'SB2 - Example',
        defer: true,
        fn: function (deferred) {
            parser(data.example.sb2, function () {
                deferred.resolve();
            });
        }
    })
    .on('cycle', function (event) {
        process.stdout.write(String(event.target) + '\n');
    })
    .run({
        async: false,
        minSamples: 100,
        delay: 2
    });
