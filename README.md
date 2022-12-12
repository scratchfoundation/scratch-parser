# scratch-parser

Parser for Scratch projects

[![CircleCI](https://circleci.com/gh/LLK/scratch-parser.svg?style=shield)](https://app.circleci.com/pipelines/github/LLK/scratch-parser?branch=master)

## Overview

The Scratch Parser is a [Node.js](https://nodejs.org) module that parses and validates
[Scratch](https://scratch.mit.edu) projects.

## API

### Installation

```sh
npm install scratch-parser
```

### Basic Use

```js
var fs = require('fs');
var parser = require('scratch-parser');

var buffer = fs.readFileSync('/path/to/project.sb2');
parser(buffer, function (err, project) {
    if (err) // handle the error
    // do something interesting
});
```

### "Info"

In addition to the `_meta` data described above, Scratch projects include an attribute called `info` that *may*
include the following:

| Key               | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `flashVersion`    | Installed version of Adobe Flash                         |
| `swfVersion`      | Version of the Scratch editor used to create the project |
| `userAgent`       | User agent used to create the project                    |
| `savedExtensions` | Array of Scratch Extensions used in the project          |

## Testing

### Running the Test Suite

```sh
npm test
```

### Code Coverage Report

```sh
make coverage
```

### Performance Benchmarks / Stress Testing

```sh
make benchmark
```

## Committing

This project uses [semantic release](https://github.com/semantic-release/semantic-release)
to ensure version bumps follow semver so that projects using the config don't
break unexpectedly.

In order to automatically determine the type of version bump necessary, semantic
release expects commit messages to be formatted following
[conventional-changelog](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md).

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

`subject` and `body` are your familiar commit subject and body. `footer` is
where you would include `BREAKING CHANGE` and `ISSUES FIXED` sections if
applicable.

`type` is one of:

* `fix`: A bug fix **Causes a patch release (0.0.x)**
* `feat`: A new feature **Causes a minor release (0.x.0)**
* `docs`: Documentation only changes
* `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* `refactor`: A code change that neither fixes a bug nor adds a feature
* `perf`: A code change that improves performance **May or may not cause a minor release. It's not clear.**
* `test`: Adding missing tests or correcting existing tests
* `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* `chore`: Other changes that don't modify src or test files
* `revert`: Reverts a previous commit

Use the [commitizen CLI](https://github.com/commitizen/cz-cli) to make commits
formatted in this way:

```sh
npm install -g commitizen
npm install
```

Now you're ready to make commits using `git cz`.

## Breaking changes

If you're committing a change that will require changes to existing code, ensure
your commit specifies a breaking change.  In your commit body, prefix the changes with "BREAKING CHANGE: "
This will cause a major version bump so downstream projects must choose to upgrade
the config and will not break the build unexpectedly.
