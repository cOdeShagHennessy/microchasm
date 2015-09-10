/*
 * slush-mchasm
 * https://github.com/codeshaghennessy@gmail.com/slush-slush-mchasm
 *
 * Copyright (c) 2015, cOdeShag Hennessy
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    path = require('path');
//
// dynamically load gulp plugins to pass to generators
var plugins = require('gulp-load-plugins')({
    //pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
    pattern: ['*'], // the glob(s) to search for
    //config: require('path').join(__dirname, 'package.json'),
    config: path.join(__dirname + '/generators/plugins.json'),
    scope: ['dependencies'],  // which keys in the config to look within
    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
    camelize: true, // if true, transforms hyphenated plugins names to camel case
    lazy: false, // whether the plugins should be lazy loaded on demand
    rename: {"underscore.string": "_"} // a mapping of plugins to rename
});
//console.log(plugins['debug']);

var options = {};

//TODO: pass defaults i.e. author, email, working dir etc. to generators To refactor and remove duplicated code
options.defaults= (function () {
    var workingDirName = path.basename(process.cwd()),
        homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    }
    else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        workingDir:     workingDirName,
        userName:    osUserName || format(user.name || ''),
        authorName:  user.name || '',
        authorEmail: user.email || ''
    };
})();

//TODO: pass defaults i.e. author, email, workind dir etc. to generators To refactor and remove duplicated code
gulp = require('./generators/base')(gulp,plugins,options);
gulp = require('./generators/microservice')(gulp,plugins,options);
gulp = require('./generators/microapi')(gulp,plugins,options);
gulp = require('./generators/nanostack')(gulp,plugins,options);
gulp = require('./generators/microlib')(gulp,plugins,options);

