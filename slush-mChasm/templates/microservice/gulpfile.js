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

gulp.task('build', function (done) {
    Logger.debug('[GULP] build');
    done();
});

gulp.task('default', function (done) {
    runSequence('build');
    Logger.debug('[GULP] default');
    done();
});

