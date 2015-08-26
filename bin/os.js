
var os = require('os');

var Type = os.type();
var Platform = os.platform();
var Release = os.release().split('.');
var Architecture = os.arch().replace('x', '');


var Map = {
  'os=darwin' : {
    set: {
      major: 10
    },
    'major=5': {
      set: {
        minor: 1,
        codename: 'Puma'
      }
    },
    'major=14': {
      set: {
        minor: 10,
        codename: 'Yosemite'
      }
    },
    'major=15': {
      set: {
        minor: 11,
        codename: 'El Capitan'
      }
    }
  }
};

var Tags = {
  os: '',
  version: {
    major: -1,
    minor: -1,
    codename: ''
  },
  arch: Number(Architecture.replace('x'))
};

function ApplySet(from, to) {
  if (typeof from.set != 'undefined') {
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

function Select(platform, major, minor) {
  var osc = Map['os=' + platform] || {};
  var version = {
    major: -1,
    minor: -1,
    codename: ''
  }
  // Apply current version set
  version = ApplySet(osc, version);

  // Apply by major define
  var curMajor = osc['major=' + major];
  if (typeof curMajor !== 'undefined') {
    version = ApplySet(curMajor, version);

    // Apply by minor version
    var curMinor = curMajor['minor=' + minor];
    if (typeof curMinor !== 'undefined') {
      version = ApplySet(curMinor, version)
    }
  }
  return version;
}

Tags.version = Select(Platform, Release[0], Release[1]);

switch(Platform) {
  case 'darwin': Tags.os = 'Mac OS'; break;
  case 'linux': Tags.os = 'Linux'; break;
  case 'win': Tags.os = 'Windows'; break;
}

module.exports = Tags;