var fs = require('fs');
var glob = require('glob');
var path = require('path');

// Build file listings
var sb = glob.sync(path.resolve(__dirname, './data/*.sb'));
var sb2 = glob.sync(path.resolve(__dirname, './data/*.sb2'));
var sb3 = glob.sync(path.resolve(__dirname, './data/*.sb3'));
var sprite2 = glob.sync(path.resolve(__dirname, './data/*.sprite2'));
// Sprite2 and Sprite3 jsons have modified file extensions
// so that they don't get caught here but can still be used by the
// validate unit tests
var json = glob.sync(path.resolve(__dirname, './data/*.json'));

// Read files and convert to buffers
for (var a in sb) sb[a] = fs.readFileSync(sb[a]);
for (var b in sb2) sb2[b] = fs.readFileSync(sb2[b]);
for (var c in sb3) sb3[c] = fs.readFileSync(sb3[c]);
for (var d in json) json[d] = fs.readFileSync(json[d]);
for (var f in sprite2) sprite2[f] = fs.readFileSync(sprite2[f]);

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
        json: fs.readFileSync(path.resolve(__dirname, './data/_example.json')),
        invalidEmpty: fs.readFileSync(path.resolve(__dirname, './data/invalid/_invalidEmpty.sb2'))
    },
    sprites: {
        default_cat_sprite2: fs.readFileSync(path.resolve(__dirname, './data/_default_cat.sprite2')),
        default_cat_sprite2_json: fs.readFileSync(path.resolve(__dirname, './data/_default_cat.sprite2json')),
        example_sprite2: fs.readFileSync(path.resolve(__dirname, './data/_example_sprite.sprite2')),
        example_sprite2_json: fs.readFileSync(path.resolve(__dirname, './data/_example_sprite.sprite2json')),
        bananas_sprite2: fs.readFileSync(path.resolve(__dirname, './data/_bananas.sprite2')),
        bananas_nested_sprite2: fs.readFileSync(path.resolve(__dirname, './data/_bananas_nested.sprite2'))
    },
    sb3_comments: {
        comments: fs.readFileSync(path.resolve(__dirname, './data/_comments.sb3')),
        invalid_comments: fs.readFileSync(path.resolve(__dirname, './data/invalid/_invalid_comments.sb3'))
    },
    sb: sb,
    sb2: sb2,
    sb3: sb3,
    json: json,
    sprite2: sprite2,
    layerOrderSB3Json: fs.readFileSync(path.resolve(__dirname, './data/_layer_ordering.json')),
    invalidStageLayerSB3Json: fs.readFileSync(path.resolve(__dirname, './data/invalid/_invalid_stage_layer.json')),
    invalidSpriteLayerSB3Json: fs.readFileSync(path.resolve(__dirname, './data/invalid/_invalid_sprite_layer.json')),
    invalidSpriteNameSB3Json: fs.readFileSync(
        path.resolve(__dirname, './data/invalid/_invalid_spriteNamed_stage_.json'))
};
