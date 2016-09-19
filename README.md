# scratch-parser
#### Parser for Scratch projects

[![Build Status](https://travis-ci.org/LLK/scratch-parser.svg?branch=develop)](https://travis-ci.org/LLK/scratch-parser)
[![Dependency Status](https://david-dm.org/llk/scratch-parser.svg)](https://david-dm.org/llk/scratch-parser)
[![devDependency Status](https://david-dm.org/llk/scratch-parser/dev-status.svg)](https://david-dm.org/llk/scratch-parser#info=devDependencies)

## Overview
The Scratch Parser is a [Node.js](https://nodejs.org) module that parses and validates [Scratch](https://scratch.mit.edu) projects. Internally, this utility is used for validation of Scratch projects as well as for extracting metadata from projects for research and search purposes.

## API

#### Installation
```bash
npm install scratch-parser
```

#### Basic Use
```js
var fs = require('fs');
var parser = require('scratch-parser');

var buffer = fs.readFileSync('/path/to/project.sb2');
parser(buffer, function (err, project) {
    if (err) // handle the error
    // do something interesting
});
```

## Metadata
The `scratch-parser` module will append metadata about the project should validation and parsing be successful. The `_meta` object includes:

| Key               | Attributes                                               |
| ----------------- | -------------------------------------------------------- |
| `scripts`         | `count`                                                  |
| `blocks`          | `count`, `unique`, `list`, `frequency`                   |
| `sprites`         | `count`                                                  |
| `variables`       | `count`                                                  |
| `lists`           | `count`                                                  |
| `costumes`        | `count`, `list`, `hash`                                  |
| `sounds`          | `count`, `list`, `hash`                                  |
| `extensions`      | `count`, `list`                                          |
| `comments`        | `count`                                                  |

#### "Info"
In addition to the `_meta` data described above, Scratch projects include an attribute called `info` that *may* include the following:

| Key               | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `flashVersion`    | Installed version of Adobe Flash                         |
| `swfVersion`      | Version of the Scratch editor used to create the project |
| `userAgent`       | User agent used to create the project                    |
| `savedExtensions` | Array of Scratch Extensions used in the project          |

## Testing

#### Running the Test Suite
```bash
npm test
```

#### Code Coverage Report
```bash
make coverage
```

#### Performance Benchmarks / Stress Testing
```bash
make benchmark
```
