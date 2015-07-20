var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
process.on('uncaughtException', function (err) {
    Logger.error('Caught error: %s', err.message);
    process.exit(1);
});

var microConfig = {
    name:             '<%=chasmNameSlug%>-<%=serviceNameSlug%>',
    desc:             '<%=chasmNameSlug%> <%=serviceNameSlug%> microservice',
    comment:          "This document describes the microservice being deployed to elastic beanstalk. It should be created by the microservice developer at the time they wish to begin deploying this microservice to run on aws elasticbeanstalk.",
    region:           "us-east-1",
    elasticbeanstalk: {
        ebAppName: '<%=chasmNameSlug%>-<%=serviceNameSlug%>',
        ebAppDesc: '<%=chasmNameSlug%> <%=serviceNameSlug%> API',
        ebEnvName: '<%=chasmServiceCamel%>-dev'
    },
    "s3":             {
        "bucket": "<%=chasmServiceCamel%>Api"
    }
};

var gulp = require('gulp');
var runSequence = require('run-sequence');
var minimist = require('minimist');
//
var sipsDir = '../sips/';
var plugins = require('gulp-load-plugins')({
    //pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
    pattern:       ['*'], // the glob(s) to search for
    //config: require('path').join(__dirname, 'package.json'),
    config:        require('path').join(__dirname + '/' + sipsDir, 'package.json'),
    scope:         ['devDependencies'],  // which keys in the config to look within
    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
    camelize:      true, // if true, transforms hyphenated plugins names to camel case
    lazy:          false, // whether the plugins should be lazy loaded on demand
    rename:        {"aws-sdk": "awsSdk"} // a mapping of plugins to rename
});

function getTask(task, options) {
    if (typeof options !== 'object') {
        options = {};
    }
    options.basedir = __dirname;
    return require(sipsDir + task)(gulp, plugins, options);
}
var knownOptions = {
    string:  'mode',
    default: {mode: 'patch'}
};
var options = minimist(process.argv.slice(2), knownOptions);
//
function getPackageJsonVersion() {
    //We parse the json file instead of using require because require caches multiple calls so the version number won't be updated
    return JSON.parse(require('fs').readFileSync('./package.json', 'utf8')).version;
};

var releasesDir = "_deploy_";

var stage_sources = [
//    './.dockerignore',
//    './Dockerfile',
    './apis/**/*.*',
    './config/**/*.*',
    './manifest.js',
    './package.json',
    './server.js',
];
stage_sources.push('../microstack/*.*');
stage_sources.push('../twiglet/*.*');
stage_sources.push('../sips/*.*');
stage_sources.push('../samples/**/*');

gulp.task('stage', getTask('stage-release', {
    sources:    stage_sources,
    releaseDir: releasesDir + "/" + getPackageJsonVersion() + "/<%=serviceNameSlug%>"
}, function (done) {
    plugins.util.log(plugins.util.colors.green.bgBlack('[GULP] stage files done'));
    done();
}));

gulp.task('package', getTask('package-release', {
    releaseDir:  releasesDir + "/" + getPackageJsonVersion(),
    packageName: "<%=serviceNameSlug%>" + getPackageJsonVersion() + ".zip",
    outputDir:   releasesDir
}, function (done) {
    done();
}));

/**
 * Mode options: patch, minor, major, prerelease
 * Preid: string appended to version x.y.z-preid.0. Subesquent calls with --mode prerelease will increment the postfixed number
 */
gulp.task('roll-ver', getTask('roll-version', {segment: options.mode, preid: options.preid || null}, function (done) {
}));

/*
 Common tasks and combination tasks
 */
gulp.task('build', function (done) {
    Logger.debug('[GULP] build');
    done();
});

gulp.task('default', function (done) {
    runSequence('build');
    Logger.debug('[GULP] default');
    done();
});

