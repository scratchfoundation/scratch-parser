var fs = require('fs');
var glob = require('glob');
var path = require('path');

// Build file listings
var sb = glob.sync(path.resolve(__dirname, './data/*.sb'));
var sb2 = glob.sync(path.resolve(__dirname, './data/*.sb2'));
var json = glob.sync(path.resolve(__dirname, './data/*.json'));

// Read files and convert to buffers
for (var x in sb) sb[x] = fs.readFileSync(sb[x]);
for (var y in sb2) sb2[y] = fs.readFileSync(sb2[y]);
for (var z in json) json[z] = fs.readFileSync(json[z]);

// Return listings
module.exports = {
    empty: {
        sb: fs.readFileSync(path.resolve(__dirname, './data/_empty.sb')),
        sb2: fs.readFileSync(path.resolve(__dirname, './data/_empty.sb2')),
        json: fs.readFileSync(path.resolve(__dirname, './data/_empty.json'))
    },
    example: {
        sb: fs.readFileSync(path.resolve(__dirname, './data/_example.sb')),
        sb2: fs.readFileSync(path.resolve(__dirname, './data/_example.sb2')),
        json: fs.readFileSync(path.resolve(__dirname, './data/_example.json'))
    },
    sb: sb,
    sb2: sb2,
    json: json
};
