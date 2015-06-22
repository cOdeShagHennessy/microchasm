module.exports = function(gulp, plugins, options) {

    var runSequence = require('run-sequence');
    //TODO: refactor to pass plugins as object
//    require('./microstack')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
    //require('./twiglet')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
//    require('./twiglet')(gulp,plugins.install, plugins.conflict, plugins.template, plugins.rename, plugins._, plugins.inflection, plugins.inquirer, plugins.mkdirp);
//    require('./microstack')(gulp,plugins.install, plugins.conflict, plugins.template, plugins.rename, plugins.underscoreString, plugins.inflection, plugins.inquirer, plugins.mkdirp);
    require('./twiglet')(gulp,plugins,{});
    require('./microstack')(gulp,plugins,{});

    gulp.task('default', function (done) {
        runSequence('twiglet','microstack' );
        done();
    });
    return gulp;
};