'use strict';

var ejs = require('ejs');
var fs = require('fs');

var DIRS = {
  PAGES: 'pages',
  DIST: 'dist'
};
var LAYOUT = 'layout.ejs';


var layoutString = getFileInString(LAYOUT);

fs.readdirSync(DIRS.PAGES).
  map(getFileNameWithoutExtension).
  forEach(function(page) {
  var template = ejs.compile(layoutString, {filename: 'temp'});
  var pageContent = getFileInString(getEjsPath(page));
  var pageString = template({content: pageContent});
  var destFileName = getHtmlPath(page);
  fs.writeFileSync(destFileName, pageString);
});

function getFileInString(filename) {
  return fs.readFileSync(filename).toString();
}

function getFileNameWithoutExtension(filename) {
  var parts = filename.split('.');
  parts.pop();
  return parts.join('.');
}

function getEjsPath(filename) {
  return DIRS.PAGES + '/' + filename + '.ejs';
}

function getHtmlPath(filename) {
  return DIRS.DIST + '/' + filename + '.html';
}

