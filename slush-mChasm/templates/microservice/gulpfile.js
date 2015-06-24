var use = require('rekuire');
var Logger = use('twiglet')(process.env.DEBUG_LEVEL || 'info', process.env.LOG_STYLE || '');
process.on('uncaughtException', function (err) {
    Logger.error('Caught error: %s', err.message);
    process.exit(1);
});

//var stackPath = require('path').join(__dirname, '../')
//require('app-module-path').addPath(stackPath);

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

//var microservice = stackRequire('eb-microsvc')(microConfig);
//var microservice = require('eb-microsvc')(microConfig);
//Logger.debug(microservice);
//
//var microGulpTasksDir = '../gulp-tasks/';
var gulp = require('gulp');
var runSequence = require('run-sequence');
//var plugins = require('gulp-load-plugins')({
//    //pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
//    pattern: ['*'], // the glob(s) to search for
//    //config: require('path').join(__dirname, 'package.json'),
//    config: require('path').join(__dirname + '/' + microGulpTasksDir, 'package.json'),
//    scope: ['devDependencies'],  // which keys in the config to look within
//    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
//    camelize: true, // if true, transforms hyphenated plugins names to camel case
//    lazy: false, // whether the plugins should be lazy loaded on demand
//    rename: {"aws-sdk": "awsSdk"} // a mapping of plugins to rename
//});
//
//function getTask(task, options) {
//    if (typeof options !== 'object') {
//        options = {};
//    }
//    return require(microGulpTasksDir + task)(gulp, plugins, options, __dirname);
//}

//var archiveName = function (extension) {
//    return microservice.definition.elasticbeanstalk.ebAppName + '_v' + packageFileVersion() + extension;
//};

/**
 * Dynamically reload the version number from the package.json incase the version has been bumped since it was loaded
 * @returns version number from package.json
 */
var packageFileVersion = function () {
    delete require.cache[require.resolve('./package.json')]; //uncache the module
    return require('./package.json').version;
};

//var privates = ['eb-microsvc', 'topology'];
//
//var localModuleCache = 'local_module_cache';

//gulp.task('clean-stack-cache', getTask('clean-local-cache', {dir: localModuleCache}, function (done) {
//}));
//gulp.task('clean-pm-cache', getTask('clean-pm-cache', {dir: localModuleCache}, function (done) {
//}));

//gulp.task('get-stack-modules', function (done) {
//
//    var clone_stack_modules = function (module, done) {
//        plugins.util.log(plugins.util.colors.green.bgBlack('[GULP] clone module ', module));
//        plugins.mkdirp(localModuleCache, function (err) {
//            if (err) plugins.util.log(plugins.util.colors.red.bgWhite('[GULP]: error ', err));
//        });
//        var modbase='../'+module;
//        return gulp.src([modbase +'/**/*.*', '!'+modbase+'/node_modules/**']).pipe(gulp.dest('./' +localModuleCache +'/'+ module)).pipe(plugins.debug()).on('finish', function () {
//            plugins.util.log(plugins.util.colors.red.bgBlack('[GULP]: copy finished'));
//        });
//    };
//    plugins.async.each(privates, clone_stack_modules, function () {
//        done();
//
//    });
//});

//gulp.task('roll-minor-version', getTask('roll-version', {segment: 'minor'}, function (done) {
//}));

//var releaseDir = "_deploy_" + packageFileVersion();
//
//var stage_sources = [
//    './.dockerignore',
//    './Dockerfile',
//    './apis/**/*.*',
//    './config/**/*.*',
//    './lib/**/*.*',
//    './logger.js',
//    './manifest.js',
//    './package.json',
//    './server.js',
//    localModuleCache + '/**/*.*'
//];

//gulp.task('stage-files', getTask('stage-release', {
//    sources: stage_sources,
//    releaseDir: releaseDir
//}, function (done) {
//    plugins.util.log(plugins.util.colors.green.bgBlack('[GULP] stage-release done'));
//    done();
//}));

//gulp.task('stage-npm', getTask('stage-npm-install', {
//    releaseDir: releaseDir,
//    pmCache: localModuleCache
//}, function (done) {
//    done();
//}));

//
//gulp.task('archive-release', getTask('archive-release', {
//    releaseDir: releaseDir,
//    archiveName: archiveName('.zip')
//}, function (done) {
//    done();
//}));
//
//gulp.task('clean-releases', getTask('clean-release-archives', {sources: ['_deploy*', '*.zip']}, function (done) {
//    done();
//}));
//
//gulp.task('roll-patch-version', getTask('roll-version', {segment: 'patch'}, function (done) {
//}));
//
//gulp.task('s3-upload', getTask('s3-upload-version', {
//    bucket: microservice.definition.s3.bucket,
//    archiveName: archiveName('.zip')
//}, function (done) {
//    done();
//}));
//
//gulp.task('eb-version', getTask('eb-app-version', {
//    awsProfile: microservice.definition.awsCredentialsProfile,
//    region: microservice.definition.region,
//    bucket: microservice.definition.s3.bucket,
//    archiveName: archiveName('.zip'),
//    appName: microservice.definition.elasticbeanstalk.ebAppName,
//    version: packageFileVersion()
//}, function (done) {
//    done();
//}));
//
//gulp.task('eb-load', getTask('eb-load-version', {
//    awsProfile: microservice.definition.awsCredentialsProfile,
//    region: microservice.definition.region,
//    ebEnvironment: microservice.definition.elasticbeanstalk.ebEnvName,
//    version: packageFileVersion()
//}, function (done) {
//    done();
//}));

/****************************************
 * Consolidation tasks
 ****************************************/
//gulp.task('eb-deploy', function (done) {
//    runSequence('s3-upload', 'eb-version', 'eb-load');
//});
//gulp.task('full-stage', function (done) {
//    runSequence('build', 'stage-files',  'archive-release');
//    done();
//});

gulp.task('build', function (done) {
    Logger.debug('[GULP] build stub');
    done();
});

//gulp.task('test', function () {
//    plugins.nodemon({
//        script: 'server.js'
//        , env: {'NODE_ENV': 'test'}
//    });
//});
//
//gulp.task('debug', function () {
//    plugins.nodemon({
//        script: 'server.js'
//        , env: {'NODE_ENV': 'local_docker'}
//    });
//});

gulp.task('default', function (done) {
    runSequence('build');
    Logger.debug('[GULP] default continue');
    done();
});

