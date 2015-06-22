/*
 * slush-slush-mchasm
 * https://github.com/codeshaghennessy@gmail.com/slush-slush-mchasm
 *
 * Copyright (c) 2015, cOdeShag Hennessy
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    inflection = require('inflection'),
    mkdirp = require('mkdirp'),
    path = require('path');

var plugins = require('gulp-load-plugins')({
    //pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
    pattern: ['*'], // the glob(s) to search for
    //config: require('path').join(__dirname, 'package.json'),
    config: path.join(__dirname + '/generators/plugins.json'),
    scope: ['dependencies'],  // which keys in the config to look within
    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
    camelize: true, // if true, transforms hyphenated plugins names to camel case
    lazy: false, // whether the plugins should be lazy loaded on demand
    rename: {"underscore.string": "underscoreString"} // a mapping of plugins to rename
});
console.log(plugins['debug']);

//TODO: refactor to ues 'gulp-load-plugins' and pass plugins instead of the current list
gulp = require('./generators/base')(gulp, plugins.install, plugins.conflict, plugins.template, plugins.rename, plugins.underscoreString, plugins.inflection, plugins.inquirer, plugins.mkdirp);
//gulp = require('./generators/base')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
