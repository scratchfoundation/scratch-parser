var fs = require('fs');
var glob = require('glob');
var path = require('path');

// Build file listings
var sb = glob.sync(path.resolve(__dirname, './data/*.sb'));
var sb2 = glob.sync(path.resolve(__dirname, './data/*.sb2'));
var json = glob.sync(path.resolve(__dirname, './data/*.json'));
var gzipJson = glob.sync(path.resolve(__dirname, './data/*.json.gz'));

// Read files and convert to buffers
for (var w in sb) sb[w] = fs.readFileSync(sb[w]);
for (var x in sb2) sb2[x] = fs.readFileSync(sb2[x]);
for (var y in json) json[y] = fs.readFileSync(json[y]);
for (var z in gzipJson) gzipJson[z] = fs.readFileSync(gzipJson[z]);

// Return listings
module.exports = {
    empty: {
        sb: fs.readFileSync(path.resolve(__dirname, './data/_empty.sb')),
        sb2: fs.readFileSync(path.resolve(__dirname, './data/_empty.sb2')),
        json: fs.readFileSync(path.resolve(__dirname, './data/_empty.json')),
        gzipJson: fs.readFileSync(path.resolve(__dirname, './data/_empty.json.gz'))
    },
    example: {
        sb: fs.readFileSync(path.resolve(__dirname, './data/_example.sb')),
        sb2: fs.readFileSync(path.resolve(__dirname, './data/_example.sb2')),
        json: fs.readFileSync(path.resolve(__dirname, './data/_example.json')),
        gzipJson: fs.readFileSync(path.resolve(__dirname, './data/_example.json.gz'))
    },
    sb: sb,
    sb2: sb2,
    json: json,
    gzipJson: gzipJson
};
