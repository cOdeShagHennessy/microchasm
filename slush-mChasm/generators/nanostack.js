/**
 * Created by cOdeShagHennessy on 7/10/15.
 */
var NANOS_DIRECTORY = 'nanos/';
var colors = require('colors/safe');
var path = require('path');
var fs = require('fs');
module.exports = function (gulp, plugins, options) {
    console.log('nanostack sub-generator loaded');
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
        console.log("WORKING DIR =" + workingDirName);

        return {
            microChasmName: workingDirName,
            userName:       osUserName || format(user.name || ''),
            authorName:     user.name || '',
            authorEmail:    user.email || ''
        };
    })();

    var fields = [];

    /**
     * Recursively add new properties to the nanostack
     * @param addProps
     * @param cb
     */
    function newFields(addProps, cb) {

        var fieldPrompts = [{
            name:     'fieldName',
            message:  'What do you want to call this property?',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){2,}$/
                if (namePattern.test(input)) {
                    return true;
                }
                else return 'You need to provide a name (must start with a alpha character and be longer than 3 characters)';
                //TODO:validate if the field already exists in this list
            },
            when:     function (addProps) {
                return addProps
            }
        }, {
            type:    "list",
            message: "What type is this property?",
            name:    "fieldType",
            choices: ["string", "number", "boolean", "date"],
            default: "string",
            when:    function (addProps) {
                return addProps
            }
        }, {
            name:     'defValue',
            message:  "What is the default value?",
            validate: function (input) {
                var valPattern = /^[a-zA-Z0-9_:.]+$/

                if (valPattern.test(input)) {
                    return true;
                }
                else return 'You need to provide value';
                //TODO:validate by field type
            },
            when:     function (addProps) {
                return addProps
            }
        }, {
            type:    'confirm',
            name:    'override',
            message: "Will you override this for this field for different environments?",
            default: false,
            when:    function (addProps) {
                return addProps;
            }
        }, {
            type:    'confirm',
            name:    'addMore',
            message: "add another field?",
            default: false,
            when:    function (addProps) {
                return addProps;
            }
        }];

        if (addProps) {
            console.log(colors.cyan("Adding a new property"));
            plugins.inquirer.prompt(fieldPrompts, function (responses) {
                fields.push({
                    name:     responses.fieldName,
                    type:     responses.fieldType,
                    defValue: responses.defValue,
                    override: responses.override
                });
                if (responses.addMore) {
                    newFields(addProps, cb);
                } else {
                    console.log("fields", fields);
                    cb(responses);
                }
            });
        } else cb();
    };

    /**
     * Recursively add new properties to the nanostack
     * @param addProps
     * @param cb
     */
    function installInMicroService(cb) {
        // Get and compose list of services into choices
        var p = process.cwd();
        var serviceChoices = []
        fs.readdir(p, function (err, files) {
            if (err) {
                throw err;
            }

            //files.map(function (file) {

            //     return path.join(p, file);
            // }).
            files.filter(function (file) {
                return fs.statSync(path.join(p, file)).isDirectory();
            }).forEach(function (dir) {
//                console.log("%s ", dir);
                var contents = fs.readdirSync(path.join(p, dir));
                if (plugins._.contains(contents, 'apis') && plugins._.contains(contents, 'config'))
                    serviceChoices.push(
                        {
                            value:   dir,
                            name:    dir,
                            checked: false
                        }
                    )
            });
        });
        //
        var servicePrompts = [{
            type:    'confirm',
            name:    'installInServices',
            message: 'Do you want to install this nanostack in any services?',
            default: false
        }, {
            type:     "checkbox",
            message:  "For what services do you want to install this nanostack?",
            name:     "installForServices",
            choices:  serviceChoices,
            when:     function (answers) {
                return answers.installInServices;
            },
            validate: function () {
                return true;
            },
        }];

        console.log(colors.cyan("*****************************************"));
        console.log(colors.cyan("***Installing nanostack in services******"));
        console.log(colors.cyan("*****************************************"));
        plugins.inquirer.prompt(servicePrompts, function (responses) {
            if (responses.installInServices) {
                console.log("services", responses.installForServices);
                cb(responses);
            } else cb(responses);
        });
    };

    gulp.task('nanostack', function () {
        console.log('done');
        var prompts = [{
            type:    'confirm',
            name:    'isMicroChasm',
            message: "Is this the microChasm where are you adding the nanostack(" + defaults.microChasmName + ")?",
            when:    function (answers) {
                var contents = require('fs').readdirSync(process.cwd());
//                console.log("contents =" + contents);
                if (plugins._.contains(contents, 'microstack') && plugins._.contains(contents, 'twiglet'))
                    return true;
                else {
                    console.error(colors.bgRed("The current directory must be the microChasm to add a nanostack"));
                    return false;
                }
            },
            default: false
        }, {
            type:    'confirm',
            name:    'useNSRoot',
            message: "Do you want store this nanostack in the " + NANOS_DIRECTORY + "? (if No, will be stored in this " +
                     "microchasm's root directory [/" + defaults.microChasmName + "]",
            when:    function (answers) {
                return answers.isMicroChasm;
            }
        }, {
            name:     'nsName',
            message:  'What do you want to call this nanostack?(\'ns_\' will be prepended to the name)',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){2,}$/
                if (namePattern.test(input)) {
                    return true;
                }
                else return 'You need to provide a name (must start with a alpha character and be longer than 3 characters)';
                //TODO:validate if the nanostack already exists in this chasm
            },
            when:     function (answers) {
                return answers.isMicroChasm;
            }
        }, {
            name:     'nsDescription',
            message:  'Describe what this nanostack represents.',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){10,}$/
                if (namePattern.test(input))
                    return true;
                else return 'You need to provide a description (must start with a alpha character and be longer than 10 characters)';
            },
            when:     function (answers) {
                return answers.isMicroChasm;
            }
        }, {
            name:     'nsVersion',
            message:  'What should the be the initial version of this nanostack?',
            default:  '0.1.0',
            validate: function (input) {
                var versionPattern = /^(?:(\d+)\.){2}(\*|\d+)$/
                if (versionPattern.test(input))
                    return true;
                else
                    return 'Please provide a version number in the format x.y.z, where x,y,z are integers';
            },
            when:     function (answers) {
                return answers.isMicroChasm;
            }
        }, {
            type:     "checkbox",
            message:  "What NODE_ENV values do you want to provide overrides for?",
            name:     "envsSupported",
            choices:  [
                {
                    value:   'DEV',
                    name:    'development',
                    checked: true
                },
                {
                    value:   'LDOCKER',
                    name:    'local_docker',
                    checked: true
                },
                {
                    value: 'PROD',
                    name:  'production',
                },
                {
                    value:   'TEST',
                    name:    'test',
                    checked: true
                },
                new plugins.inquirer.Separator("The Works:"),
                {
                    value: 'ALL',
                    name:  'all',
                }
            ],
            validate: function (answer) {
//                if (answer.length < 1) {
//                    return "You must support at least REST method"
//                }
                return true;
            },
            when:     function (answers) {
                return answers.isMicroChasm;
            }
        }, {
            type:    'confirm',
            name:    'addProps',
            message: 'Do you want to add properties to this nanostack?',
            default: false,
            when:    function (answers) {
                return answers.isMicroChasm;
            }
        }, {
            type:    'confirm',
            name:    'moveon',
            message: 'Continue?',
            default: false,
            when:    function (answers) {
                return answers.isMicroChasm;
            }
        }
        ];
        //Ask
        plugins.inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    console.error(colors.bgRed("Quitting scaffolding of nanostack"));
                    return gulp;
                }
                newFields(answers.addProps, function () {
                    installInMicroService(function (serviceChoices) {
                        console.log(answers);
                        console.log(fields);
                        console.log(serviceChoices);
                        answers.fields = fields;
                        answers.userName = defaults.userName;
                        answers.authorName = defaults.authorName;
                        answers.authorEmail = defaults.authorEmail;
                        answers.chasmNameSlug = plugins._.slugify(answers.chasmName);
                        answers.nsNameSlug = "ns_" + plugins._.camelize(plugins._.slugify(answers.nsName));
                        answers.nsHuman = plugins._.humanize(answers.nsDescription);
                        // process restMethods
                        answers.envDEV = plugins._.contains(answers.envsSupported, 'DEV');
                        answers.envLDOCKER = plugins._.contains(answers.envsSupported, 'LDOCKER');
                        answers.envPROD = plugins._.contains(answers.envsSupported, 'PROD');
                        answers.envTEST = plugins._.contains(answers.envsSupported, 'TEST');
                        answers.envALL = plugins._.contains(answers.envsSupported, 'ALL');

                        if (answers.envALL)
                            answers.envDEV = answers.envLDOCKER = answers.envPROD = answers.envTEST = true;

                        console.log('nanostack called ' + answers.nsNameSlug);
                        console.log('Overrides with:' + answers.envsSupported);

                        if (!answers.useNSRoot)
                            NANOS_DIRECTORY = answers.chasmNameSlug + "/";
                        plugins.mkdirp(NANOS_DIRECTORY + answers.nsNameSlug);

                        var templateDir = __dirname + '/../templates/nanostack'
                        var ns_sources = [
                            templateDir + '/base.ejs',
                            templateDir + '/index.js',
                            templateDir + '/overrides.ejs',
                            templateDir + '/schema.ejs',
                            templateDir + '/package.json'
                        ];

                        gulp.src(ns_sources).pipe(debug())
                            .pipe(plugins.template(answers))
                            .pipe(plugins.rename(function (file) {
                                if (file.basename[0] === '_') {
                                    file.basename = '.' + file.basename.slice(1);
                                }
                                if (file.extname === '.ejs')
                                    file.extname = '.js'
                            }))
//                    .pipe(plugins.conflict('./'))
                            .pipe(gulp.dest('./' + NANOS_DIRECTORY + answers.nsNameSlug))
                            .pipe(plugins.install())
                            .on('end', function () {

                            });

                        //
                        // Include tests
                        plugins.mkdirp(NANOS_DIRECTORY + '/' + answers.nsNameSlug + '/test');
                        var ns_test_sources = [
                            templateDir + '/test/bdd.js',
                            templateDir + '/test/config-test.js'
                        ];
                        gulp.src(ns_test_sources).pipe(debug())
                            .pipe(plugins.template(answers))
                            .pipe(plugins.rename(function (file) {
                                if (file.basename[0] === '_') {
                                    file.basename = '.' + file.basename.slice(1);
                                }
                                if (file.extname === '.ejs')
                                    file.extname = '.js'
                            }))
//                        .pipe(plugins.conflict('./'))
                            .pipe(gulp.dest(NANOS_DIRECTORY + '/' + answers.nsNameSlug + '/test'))
                            .on('end', function () {
                                //TODO: finish up install in services
                                if (serviceChoices.installInServices) {
                                    serviceChoices.installForServices.forEach(function (entry) {
                                        var options = {
                                            cwd: process.cwd() + '/' + entry
                                        }
                                        var tasks = [];
                                        tasks.push('npm install --save ../' + NANOS_DIRECTORY + answers.nsNameSlug);
                                        console.log(colors.bgMagenta(" running " + tasks));
                                        plugins.shell.task(tasks, options)();
                                    });
                                }
                            });

                    });
                    //TODO: when adding a nanostack needs to update the Dockerfile.base or add an additional dockerfile and add that to the base image
                });

            });
    });

//});
    return gulp;
}
;
