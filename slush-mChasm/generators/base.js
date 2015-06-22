module.exports = function(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp) {

    var runSequence = require('run-sequence');
    //TODO: refactor to pass plugins as object
    require('./microstack')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
    require('./twiglet')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);

    gulp.task('default', function (done) {
        runSequence('twiglet','microstack' );
        done();
    });
    return gulp;
};