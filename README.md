## scratch-parser
#### Streaming parser for Scratch projects

## Installation
```bash
npm install scratch-parser
```

## Interface

#### HTTP Stream
```js
var parser = require('scratch-parser');

parser({
    method: 'GET',
    url: 'https://scratch.mit.edu/path/to/project.json'
}, function (err, callback) {
    if (err) // handle the error
    // do something interesting
});
```

#### File Stream
```js
var fs = require('fs');
var parser = require('scratch-parser');

var stream = fs.createReadStream('/path/to/project.json');
parser(stream, function (err, callback) {
    if (err) // handle the error
    // do something interesting
});
```

## Testing
```bash
npm test
```
