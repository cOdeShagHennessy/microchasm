module.exports = function(gulp, plugins, options) {

    var runSequence = require('run-sequence');
    //
    // Require the generators for all base components
    require('./twiglet')(gulp,plugins,{});
    require('./microstack')(gulp,plugins,{});

    gulp.task('default', function (done) {
        runSequence('twiglet','microstack' );
        done();
    });
    return gulp;
};