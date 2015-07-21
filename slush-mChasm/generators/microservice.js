/**
 * Created by skircher on 6/23/15.
 */
module.exports = function (gulp, plugins, options) {
    console.log('microservice slush generator loaded');
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
            microChasmName:     workingDirName,
            userName:    osUserName || format(user.name || ''),
            authorName:  user.name || '',
            authorEmail: user.email || ''
        };
    })();

    gulp.task('microservice', function () {
        var prompts = [{
            name:     'serviceName',
            message:  'What do you want to call the new microservice?',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){2,}$/
                if (namePattern.test(input))
                    return true;
                else return 'You need to provide a name (must start with a alpha character and be longer than 3 characters)';
            }
        }, {
            name:     'serviceDescription',
            message:  'Describe what this microservice does.',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){10,}$/
                if (namePattern.test(input))
                    return true;
                else return 'You need to provide a description (must start with a alpha character and be longer than 10 characters)';
            }
        }, {
            name:     'serviceVersion',
            message:  'What should the be the initial version of this service?',
            default:  '0.1.0',
            validate: function (input) {
                var versionPattern = /^(?:(\d+)\.){2}(\*|\d+)$/
                if (versionPattern.test(input))
                    return true;
                else
                    return 'Please provide a version number in the format x.y.z, where x,y,z are integers';
            }
        }, {
            name:     'servicePort',
            message:  'What should the be the default port for this service?(Can be configured in config/overrides per environment, i.e. NODE_ENV',
            default:  '9080',
            validate: function (input) {
                var portPattern = /^\b(102[5-9]|10[3-9][0-9]|1[1-9][0-9]{2}|[2-9][0-9]{3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])\b$/
                if (portPattern.test(input))
                    return true;
                else
                    return 'Please provide a port number in the range 1025 - 65535';
            }
        }, {
            type:    'confirm',
            name:    'includeRedis',
            message: 'Do you want to include basic Redis integration into your microservice? (Recommended to add Redis configuration via a nanostack)'
        }, {
            type:    'confirm',
            name:    'moveon',
            message: 'Continue?'
        }
        ];
        //Ask
        plugins.inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    return done();
                }
                answers.chasmNameSlug = plugins._.slugify(defaults.microChasmName);
                answers.serviceNameSlug = plugins._.slugify(answers.serviceName);
                answers.chasmServiceCamel = plugins._.camelize(answers.chasmNameSlug+'-'+answers.serviceNameSlug);
                answers.descHuman = plugins._.humanize(answers.serviceDescription);
                console.log('service called ' + answers.serviceNameSlug);
                console.log('service called ' + answers.chasmServiceCamel);

                plugins.mkdirp(answers.serviceNameSlug);
//                console.log('dir = ' + __dirname);

                var templateDir = __dirname + '/../templates/microservice'
                var service_sources = [
//                    templateDir + '/.dockerignore',
                    templateDir + '/.gitignore',
//                    templateDir + '/Dockerfile',
                    templateDir + '/**'
                ];
//                gulp.src(__dirname + '/../templates/microservice/**/*.*').pipe(debug())
                gulp.src(service_sources).pipe(debug())
                    .pipe(plugins.template(answers))
                    .pipe(plugins.rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                        if (file.extname === '.ejs')
                         file.extname = '.js'
                    }))
//                    .pipe(plugins.conflict('./'))
                    .pipe(gulp.dest('./'+answers.serviceNameSlug ))
                    .pipe(plugins.install())
                    .on('end', function () {
//                        done();
                    });

            });

        //
        // Include tests
//                if (answers.includeTests) {
//                    plugins.mkdirp('microservice/test');
//                    plugins.mkdirp('samples/microservice');
////                    gulp.src(__dirname + '/../templates/microservice/test/**').pipe(debug())
//                    gulp.src(__dirname + '/../../microservice/test/**').pipe(debug())
//                        .pipe(plugins.template(answers))
//                        .pipe(plugins.rename(function (file) {
//                            if (file.basename[0] === '_') {
//                                file.basename = '.' + file.basename.slice(1);
//                            }
//                        }))
//                        .pipe(plugins.conflict('./'))
//                        .pipe(gulp.dest('./microservice/test'))
//                        .pipe(plugins.install())
//                        .on('end', function () {
////                        done();
//                        });
//                    gulp.src(__dirname + '/../../samples/microservice/**').pipe(debug())
//                        .pipe(plugins.template(answers))
//                        .pipe(plugins.rename(function (file) {
//                            if (file.basename[0] === '_') {
//                                file.basename = '.' + file.basename.slice(1);
//                            }
//                        }))
//                        .pipe(plugins.conflict('./'))
//                        .pipe(gulp.dest('./samples/microservice'))
//                        .pipe(plugins.install())
//                        .on('end', function () {
//                            return gulp;
//                        });
//                }
//                else
//                    return gulp;
    });
//});
return gulp;
};
