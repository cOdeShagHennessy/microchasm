module.exports = function (gulp, plugins, options) {
    var path = require('path');
    var debug = require('gulp-debug');

    gulp.task('twiglet', function () {
        var answers = options.microChasmAnswers;

        plugins.mkdirp('twiglet');
        console.log('dir = ' + __dirname);

        gulp.src(__dirname + '/../../twiglet/*.*')//.pipe(debug())
            .pipe(plugins.template(answers))
            .pipe(plugins.rename(function (file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
//                    .pipe(plugins.conflict('./'))
            .pipe(gulp.dest('./twiglet'))
//                    .pipe(plugins.install())
            .on('end', function () {
                //
                // Overwrite any templated files
                gulp.src(__dirname + '/../templates/twiglet/*.*').pipe(debug())
                    .pipe(plugins.template(answers))
                    .pipe(plugins.rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
//                    .pipe(plugins.conflict('./'))
                    .pipe(gulp.dest('./twiglet'))
                    .pipe(plugins.install())
                    .on('end', function () {
                        return gulp;
                    });
            });

        //
        // Include tests
//                if (answers.includeTests) {
//                    mkdirp('samples/twiglet');
//                    gulp.src(__dirname + '/../../samples/twiglet/**').pipe(debug())
//                        .pipe(plugins.template(answers))
//                        .pipe(plugins.rename(function (file) {
//                            if (file.basename[0] === '_') {
//                                file.basename = '.' + file.basename.slice(1);
//                            }
//                        }))
//                        .pipe(plugins.conflict('./'))
//                        .pipe(gulp.dest('./samples/twiglet'))
//                        .pipe(plugins.install())
//                        .on('end', function () {
//                            done();
//                        });
//
//                }
//                else
//                    done();
//            });
    });
    return gulp;
};