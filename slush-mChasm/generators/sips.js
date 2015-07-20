module.exports = function (gulp, plugins, options) {
    var path = require('path');
    var debug = require('gulp-debug');

    gulp.task('sips', function () {
        var answers = options.microChasmAnswers;

        plugins.mkdirp('sips');
        console.log('dir = ' + __dirname);

        gulp.src(__dirname + '/../../sips/*.*')
            .pipe(plugins.template(answers))
            .pipe(plugins.rename(function (file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
//                    .pipe(plugins.conflict('./'))
            .pipe(gulp.dest('./sips'))
//                    .pipe(plugins.install())
            .on('end', function () {
                //
                // Overwrite any templated files
                gulp.src(__dirname + '/../templates/sips/*.*').pipe(debug())
                    .pipe(plugins.template(answers))
                    .pipe(plugins.rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
//                    .pipe(plugins.conflict('./'))
                    .pipe(gulp.dest('./sips'))
                    .pipe(plugins.install())
                    .on('end', function () {
                        return gulp;
                    });
            });

    });
    return gulp;
};