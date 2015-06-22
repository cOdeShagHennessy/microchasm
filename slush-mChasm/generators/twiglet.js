module.exports = function (gulp, plugins, options) {
//module.exports = function (gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp) {
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

    gulp.task('twiglet', function (done) {

        //TODO: pass version from base prompts
        var prompts = [{
            name:    'appVersion',
            message: 'What is the version of your microChasm of services?(twiglet)',
            default: '0.0.1'
        }];
//        }, {
//            type:    'confirm',
//            name:    'includeTests',
//            message: 'Include Tests?'
//        }];
        //Ask
        plugins.inquirer.prompt(prompts,
            function (answers) {
//                if (!answers.moveon) {
//                    return done();
//                }
                answers.appNameSlug = plugins._.slugify(answers.appName);
                answers.includeTests = answers.includeTests;

                plugins.mkdirp('twiglet');
                console.log('dir = ' + __dirname);

                //TODO: move non-templated code to be copied from ../../twiglet repo
                gulp.src(__dirname + '/../templates/twiglet/**')//.pipe(debug())
                    .pipe(plugins.template(answers))
                    .pipe(plugins.rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
                    .pipe(plugins.conflict('./'))
                    .pipe(gulp.dest('./twiglet'))
                    .pipe(plugins.install());

                //
                // Include tests
                if (answers.includeTests) {
                    plugins.mkdirp('samples/twiglet');
                    gulp.src(__dirname + '/../templates/samples/twiglet/**').pipe(debug())
                        .pipe(plugins.template(answers))
                        .pipe(plugins.rename(function (file) {
                            if (file.basename[0] === '_') {
                                file.basename = '.' + file.basename.slice(1);
                            }
                        }))
                        .pipe(plugins.conflict('./'))
                        .pipe(gulp.dest('./samples/twiglet'))
                        .pipe(plugins.install())
                        .on('end', function () {
                            done();
                        });
                    ;

                }
                else
                    done();
            });
    });
    return gulp;
};