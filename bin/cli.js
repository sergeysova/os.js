#!/usr/bin/env node
var osjs = require('./os');

console.log(osjs.os, String(osjs.version), osjs.version.codename);
