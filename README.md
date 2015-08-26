# Readme
Very stupid detection of OS version and Name for node(io).js
More usable for Atom's [Electron](electron.atom.io).

### Warning!
This package under development!
Now detect only Mac OS X

# Usage
Install in your project:

```bash
npm install os.js --save
```

And simple use:

```javascript
var osjs = require('os.js');

console.log(osjs.os, osjs.version.major + '.' + osjs.version.minor, osjs.version.codename);
// Output: 
// OS X 10.10 Yosemite
```

And for some user's cli:

```bash
$ os.js
OS X 10.10 Yosemite
```

# Testing
Tests use Mocha and Should

```bash
git clone --recursive https://github.com/LestaD/os.js.git
cd os.js
npm install
npm test
```

Tested on OS X 10.10, Ubuntu 15 with [iojs-v2.5.0](https://iojs.org/dist/v2.5.0/), [iojs-v3.0.0](https://iojs.org/dist/v3.0.0/), [iojs-v3.2.0](https://iojs.org/dist/v3.2.0/)

Need testing on Windows 7, 8, 8.1, 10.

    Not detect right version of some Linuxes
