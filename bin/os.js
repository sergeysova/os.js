
var os = require('os');

// Declare variables instead function calls
var Platform = os.platform();
var Release = os.release().split('.');
var Architecture = os.arch().replace('x', '');
var OSMap = require('../lib/map');


// Structure of response
var Tags = {
  os: '',
  version: {
    major: -1,
    minor: -1,
    codename: ''
  },
  arch: Number(Architecture.replace('x'))
};


// Set variables from `set` object to base version
function applySet(from, to) {
  if (typeof from.set !== 'undefined') {
    if (from.set.major) {
      to.major = from.set.major;
    }
    if (from.set.minor) {
      to.minor = from.set.minor;
    }
    if (from.set.codename) {
      to.codename = from.set.codename;
    }
  }
  return to;
}


// Select basics info about versions from map
function selectFromMap(platform, major, minor) {
  var osc = OSMap['os=' + platform] || {};
  var version = {
    major: -1,
    minor: -1,
    codename: ''
  };
  // Apply current version set
  version = applySet(osc, version);

  // Apply by major define
  var curMajor = osc['major=' + major];
  if (typeof curMajor !== 'undefined') {
    version = applySet(curMajor, version);

    // Apply by minor version
    var curMinor = curMajor['minor=' + minor];
    if (typeof curMinor !== 'undefined') {
      version = applySet(curMinor, version)
    }
  }
  return version;
}

// Set concrete version to response
Tags.version = selectFromMap(Platform, Release[0], Release[1]);

// Select platform
switch(Platform) {
  case 'darwin': Tags.os = 'OS X'; break;
  case 'linux': Tags.os = 'Linux'; break;
  case 'win': Tags.os = 'Windows'; break;
}

Object.defineProperty(Tags.version, 'toString', {
  value: function(){
    return this.major + '.' + this.minor;
  }
});

module.exports = Tags;