/**
 * Created by skircher on 6/23/15.
 */
var APIS_DIRECTORY = 'apis/';
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
            microServiceName: workingDirName,
            userName:         osUserName || format(user.name || ''),
            authorName:       user.name || '',
            authorEmail:      user.email || ''
        };
    })();

    gulp.task('microapi', function () {
        var prompts = [{
            name:     'serviceName',
            message:  'What microservice are you adding the microapi to?',
            default:  defaults.microServiceName,
            validate: function (input) {
//                var namePattern = /^([a-zA-Z])(.)$/
//                if (namePattern.test(input)) {
                // Check that current directory matches the
                // microservice adding the api for
                if (defaults.microServiceName === input)
                    return true;
                else return 'The current directory must be the microservice you are adding the api';

//                }
//                else return 'You need to provide a name (must start with a alpha character and be longer than 3 characters)';
            }
        }, {
            name:     'apiName',
            message:  'What do you want to call this microapi?',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){2,}$/
                if (namePattern.test(input)) {
                    return true;
                }
                else return 'You need to provide a name (must start with a alpha character and be longer than 3 characters)';
            }
        }, {
            name:     'apiDescription',
            message:  'Describe what this microapi does.',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){10,}$/
                if (namePattern.test(input))
                    return true;
                else return 'You need to provide a description (must start with a alpha character and be longer than 10 characters)';
            }
        }, {
            name:     'apiVersion',
            message:  'What should the be the initial version of this microapi?',
            default:  '0.1.0',
            validate: function (input) {
                var versionPattern = /^(?:(\d+)\.){2}(\*|\d+)$/
                if (versionPattern.test(input))
                    return true;
                else
                    return 'Please provide a version number in the format x.y.z, where x,y,z are integers';
            }
        }, {
            type:     "checkbox",
            message:  "What REST methods would you like to support?",
            name:     "restMethods",
            choices:  [
                {
                    value:   'PING',
                    name:    'ping',
                    checked: true
                },
                {
                    value:   'GET',
                    name:    'get',
                    checked: true
                },
                {
                    value: 'PUT',
                    name:  'put',
                },
                {
                    value: 'POST',
                    name:  'post',
                },
                {
                    value: 'DELETE',
                    name:  'delete',
                },
                new plugins.inquirer.Separator("The Works:"),
                {
                    value: 'ALL',
                    name:  'all',
                }
            ],
            validate: function (answer) {
                if (answer.length < 1) {
                    return "You must support at least REST method"
                }
                return true;
            }
        }, {
            type:    'confirm',
            name:    'includeRedis',
            message: 'Do you want to include basic Redis integration at a data store for this microapi? (Requires previously selecting redis integration with the microservice)'
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
                    return gulp;
                }
                answers.serviceNameSlug = plugins._.slugify(answers.serviceName);
                answers.apiNameSlug = plugins._.slugify(answers.apiName);
                answers.descHuman = plugins._.humanize(answers.apiDescription);
                //TODO: make all option set all these to true
                answers.restPING = plugins._.contains(answers.restMethods, 'PING');
                answers.restGET = plugins._.contains(answers.restMethods, 'GET');
                answers.restPUT = plugins._.contains(answers.restMethods, 'PUT');
                answers.restPOST = plugins._.contains(answers.restMethods, 'POST');
                answers.restDELETE = plugins._.contains(answers.restMethods, 'DELETE');
                answers.restALL = plugins._.contains(answers.restMethods, 'ALL');
                if(answers.restALL)
                    answers.restPING = answers.restGET = answers.restPUT = answers.restPOST = answers.restDELETE = true;

                //temp
//                answers.TBDrestPUT = false;
//                answers.TBDrestPOST = false;
//                answers.TBDrestDELETE = false;
//                console.log('service called ' + answers.serviceNameSlug);
                console.log('microapi called ' + answers.apiNameSlug);
                console.log('REST with:' + answers.restMethods);

                plugins.mkdirp(APIS_DIRECTORY + answers.apiNameSlug);
//                console.log('dir = ' + __dirname);

                var templateDir = __dirname + '/../templates/microapi'
                var api_sources = [
                    templateDir + '/index.sjs',
                    templateDir + '/ddl.js',
                    templateDir + '/package.json'
//                    templateDir + '/.dockerignore',
//                    templateDir + '/.gitignore',
//                    templateDir + '/Dockerfile',
//                    templateDir + '/**'
                ];
                if (answers.includeRedis)
                    api_sources.push(templateDir + '/redisStore.sjs');
                if (answers.restGET)
                    api_sources.push(templateDir + '/get.sjs');
                if (answers.restPUT)
                    api_sources.push(templateDir + '/put.sjs');
                if (answers.restPOST)
                    api_sources.push(templateDir + '/post.sjs');
                if (answers.restDELETE)
                    api_sources.push(templateDir + '/delete.sjs');

                gulp.src(api_sources).pipe(debug())
                    .pipe(plugins.template(answers))
                    .pipe(plugins.rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                        if (file.extname === '.sjs')
                            file.extname = '.js'
                    }))
//                    .pipe(plugins.conflict('./'))
                    .pipe(gulp.dest('./' + APIS_DIRECTORY + answers.apiNameSlug))
//                    .pipe(plugins.install())
                    .on('end', function () {
                        //
                        // Include tests
                        plugins.mkdirp('test/microapis/' + answers.apiNameSlug);

                        var api_test_sources = [
                            templateDir + '/test/api-ddl-test.sjs',
                            templateDir + '/test/api-test.sjs'
                        ];
                        gulp.src(api_test_sources).pipe(debug())
                            .pipe(plugins.template(answers))
                            .pipe(plugins.rename(function (file) {
                                if (file.basename[0] === '_') {
                                    file.basename = '.' + file.basename.slice(1);
                                }
                                if (file.extname === '.sjs')
                                    file.extname = '.js'
                            }))
//                        .pipe(plugins.conflict('./'))
                            .pipe(gulp.dest('./test/microapis/' + answers.apiNameSlug))
                            .on('end', function () {
//                              done();
                            });
                    });
            });
    });
//});
    return gulp;
};
