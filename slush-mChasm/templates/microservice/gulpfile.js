var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
process.on('uncaughtException', function (err) {
    Logger.error('Caught error: %s', err.message);
    process.exit(1);
});

var microConfig = {
    name: '<%=chasmNameSlug%>-<%=serviceNameSlug%>',
    desc: '<%=chasmNameSlug%> <%=serviceNameSlug%> microservice',
    comment: "This document describes the microservice being deployed to elastic beanstalk. It should be created by the microservice developer at the time they wish to begin deploying this microservice to run on aws elasticbeanstalk.",
    region: "us-east-1",
    elasticbeanstalk: {
        ebAppName: '<%=chasmNameSlug%>-<%=serviceNameSlug%>',
        ebAppDesc: '<%=chasmNameSlug%> <%=serviceNameSlug%> API',
        ebEnvName: '<%=chasmServiceCamel%>-dev'
    },
    "s3": {
        "bucket": "<%=chasmServiceCamel%>Api"
    }
};

var gulp = require('gulp');
var runSequence = require('run-sequence');
//
var sipsDir = '../sips/';
var plugins = require('gulp-load-plugins')({
    //pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
    pattern: ['*'], // the glob(s) to search for
    //config: require('path').join(__dirname, 'package.json'),
    config: require('path').join(__dirname + '/' + sipsDir, 'package.json'),
    scope: ['devDependencies'],  // which keys in the config to look within
    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
    camelize: true, // if true, transforms hyphenated plugins names to camel case
    lazy: false, // whether the plugins should be lazy loaded on demand
    rename: {"aws-sdk": "awsSdk"} // a mapping of plugins to rename
});

function getTask(task, options) {
    if (typeof options !== 'object') {
        options = {};
    }
    options.basedir = __dirname;
    return require(sipsDir + task)(gulp, plugins, options);
}
//
function getPackageJsonVersion () {
    //We parse the json file instead of using require because require caches multiple calls so the version number won't be updated
    JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
};

gulp.task('roll-patch-version', getTask('roll-version', {segment: 'patch'}, function (done) {
}));

gulp.task('roll-prerelease-version', getTask('roll-version', {segment: 'prerelease', preid:'develop'}, function (done) {
}));


gulp.task('build', function (done) {
    Logger.debug('[GULP] build');
    done();
});

gulp.task('default', function (done) {
    runSequence('build');
    Logger.debug('[GULP] default');
    done();
});

