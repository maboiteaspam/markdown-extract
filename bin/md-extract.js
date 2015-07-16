#!/usr/bin/env node

var byline = require('byline')
var mdExtract = require('../index.js')

var search = process.argv[2]

var display = false
byline(process.stdin).on('data', function (d){
  if (display && !('' + d).match(/^[#]+/)) {
    process.stdout.write(d + '\n')
  }
  if (('' + d).match(/^[#]+/)) {
    display = !!('' + d).match(search)
  }
})
