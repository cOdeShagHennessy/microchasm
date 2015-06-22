module.exports = function (gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp) {
    console.log('microstack loaded');
    var path = require('path');
    var debug = require('gulp-debug');

    function format(string) {
        var username = string.toLowerCase();
        return username.replace(/\s/g, '');
    }

    var defaults = (function () {
        var workingDirName = path.basename(process.cwd()),
            homeDir, osUserName, configFile, user;

        if (process.platform === 'win32') {
            homeDir = process.env.USERPROFILE;
            osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
        }
        else {
            homeDir = process.env.HOME || process.env.HOMEPATH;
            osUserName = homeDir && homeDir.split('/').pop() || 'root';
        }

        configFile = path.join(homeDir, '.gitconfig');
        user = {};

        if (require('fs').existsSync(configFile)) {
            user = require('iniparser').parseSync(configFile).user;
        }

        return {
            appName:     workingDirName,
            userName:    osUserName || format(user.name || ''),
            authorName:  user.name || '',
            authorEmail: user.email || ''
        };
    })();

    gulp.task('microstack', function (done) {
        var prompts = [{
            name:    'appVersion',
            message: 'What is the version of your microChasm of services?',
            default: '0.1.0'
        }, {
            type:    'confirm',
            name:    'includeTests',
            message: 'Do you want to include tests?'
        }//, {
//            type:    'confirm',
//            name:    'moveon',
//            message: 'Continue?'
//        }
        ];
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
//                if (!answers.moveon) {
//                    return done();
//                }
                answers.appNameSlug = _.slugify(answers.appName);
                answers.includeTests = answers.includeTests;

                mkdirp('microstack');
                console.log('dir = ' + __dirname);

                gulp.src(__dirname + '/../templates/microstack/*.*').pipe(debug())
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./microstack'))
                    .pipe(install())
                    .on('end', function () {
//                        done();
                    });
                //
                // Include tests
                if (answers.includeTests) {
                    mkdirp('microstack/test');
                    mkdirp('samples/microstack');
                    gulp.src(__dirname + '/../templates/microstack/test/**').pipe(debug())
                        .pipe(template(answers))
                        .pipe(rename(function (file) {
                            if (file.basename[0] === '_') {
                                file.basename = '.' + file.basename.slice(1);
                            }
                        }))
                        .pipe(conflict('./'))
                        .pipe(gulp.dest('./microstack/test'))
                        .pipe(install())
                        .on('end', function () {
//                        done();
                        });
                    gulp.src(__dirname + '/../templates/samples/microstack/**').pipe(debug())
                        .pipe(template(answers))
                        .pipe(rename(function (file) {
                            if (file.basename[0] === '_') {
                                file.basename = '.' + file.basename.slice(1);
                            }
                        }))
                        .pipe(conflict('./'))
                        .pipe(gulp.dest('./samples/microstack'))
                        .pipe(install())
                        .on('end', function () {
                            done();
                        });
                }
                else
                    done();
            });
    });
    return gulp;
};