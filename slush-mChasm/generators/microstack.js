module.exports = function (gulp, plugins, options) {
    console.log('microstack loaded');
    var path = require('path');
    var debug = require('gulp-debug');

    gulp.task('microstack', function () {
        console.log(options);
        var answers = options.microChasmAnswers;
        plugins.mkdirp('microstack');
        console.log('dir = ' + __dirname);

        //TODO: move all files into templates to remove the npm link issue after npm install -g. Move out to externalize later
        gulp.src(__dirname + '/../../microstack/*.*').pipe(debug())
            .pipe(plugins.template(answers))
            .pipe(plugins.rename(function (file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(gulp.dest('./microstack'))
            .on('end', function () {
                //
                // Overwrite any templated files
                gulp.src(__dirname + '/../templates/microstack/*.*').pipe(debug())
                    .pipe(plugins.template(answers))
                    .pipe(plugins.rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
//                    .pipe(plugins.conflict('./'))
                    .pipe(gulp.dest('./microstack'))
                    .pipe(plugins.install())
                    .on('end', function () {
//                        done();
                    });
            });

        //
        // Include tests
        if (answers.includeTests) {
            plugins.mkdirp('microstack/test');
            plugins.mkdirp('samples/microstack');
            gulp.src(__dirname + '/../templates/microstack/test/**').pipe(debug())
                .pipe(plugins.template(answers))
                .pipe(plugins.rename(function (file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
//                .pipe(plugins.conflict('./'))
                .pipe(gulp.dest('./microstack/test'))
//                .pipe(plugins.install())
                .on('end', function () {
                    gulp.src(__dirname + '/../templates/samples/microstack/**').pipe(debug())
                        .pipe(plugins.template(answers))
                        .pipe(plugins.rename(function (file) {
                            if (file.basename[0] === '_') {
                                file.basename = '.' + file.basename.slice(1);
                            }
                        }))
//                        .pipe(plugins.conflict('./'))
                        .pipe(gulp.dest('./samples/microstack'))
//                        .pipe(plugins.install())
                        .on('end', function () {
                            return gulp;
                        });
                });
        }
        else
            return gulp;
    });
    return gulp;
};