/**
 * Created by skircher on 6/23/15.
 */
var LIBS_DIRECTORY = 'libs/';
module.exports = function (gulp, plugins, options) {
    console.log('microservice slush generator loaded');
    var colors = require('colors/safe');
    var path = require('path');
    var debug = require('gulp-debug');

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
            name:     'fieldDescription',
            message:  'Describe this property?',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){9,}$/
                if (namePattern.test(input)) {
                    return true;
                }
                else return 'You need to provide a description(must start with a alpha character and be longer than 9 characters)';
                //TODO:validate if the field already exists in this list
            },
            when:     function (addProps) {
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
                    description: responses.fieldDescription,
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

    gulp.task('microlib', function () {
        var prompts = [{
            name:     'serviceName',
            message:  'What microservice are you adding the microlib to? (' +options.defaults.workingDir +')',
            default:  options.defaults.workingDir,
            validate: function (input) {
//                var namePattern = /^([a-zA-Z])(.)$/
//                if (namePattern.test(input)) {
                // Check that current directory matches the
                // microservice adding the api for
                if (options.defaults.workingDir === input)
                    return true;
                else return 'The current directory must be the microservice you are adding the api';

//                }
//                else return 'You need to provide a name (must start with a alpha character and be longer than 3 characters)';
            }
        }, {
            name:     'libName',
            message:  'What do you want to call this microlib?',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){2,}$/
                if (namePattern.test(input)) {
                    return true;
                }
                else return 'You need to provide a name (must start with a alpha character and be longer than 3 characters)';
            }
        }, {
            name:     'libDescription',
            message:  'Describe what this microlib does.',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){10,}$/
                if (namePattern.test(input))
                    return true;
                else return 'You need to provide a description (must start with a alpha character and be longer than 10 characters)';
            }
        }, {
            name:     'libVersion',
            message:  'What should the be the initial version of this microlib?',
            default:  '0.1.0',
            validate: function (input) {
                var versionPattern = /^(?:(\d+)\.){2}(\*|\d+)$/
                if (versionPattern.test(input))
                    return true;
                else
                    return 'Please provide a version number in the format x.y.z, where x,y,z are integers';
            }
        }, {
            name:     'libExposure',
            message:  'What method do you want to expose from this microlib?',
            validate: function (input) {
                var namePattern = /^([a-zA-Z]){1}(.){2,}$/
                if (namePattern.test(input)) {
                    return true;
                }
                else return 'You need to provide a name (must start with a alpha character and be longer than 3 characters)';
            }
        }, {
            type:    'confirm',
            name:    'addProps',
            message: 'Do you want to add properties to this microlib?',
            default: false,
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
                newFields(answers.addProps, function () {
                    answers.fields = fields;
                    answers.userName = options.defaults.userName;
                    answers.authorName = options.defaults.authorName;
                    answers.authorEmail = options.defaults.authorEmail;
                    answers.serviceNameSlug = plugins._.slugify(answers.serviceName);
                    answers.libNameSlug = plugins._.slugify(answers.libName);
                    answers.descHuman = plugins._.humanize(answers.libDescription);
                    answers.libExposureSlug = answers.libExposure.replace(/\s+/g, '');

                    console.log('microlib called ' + answers.libNameSlug);
                    console.log('microlib desc ' + answers.descHuman);
                    console.log('library exposes:' + answers.libExposureSlug);

                    plugins.mkdirp(LIBS_DIRECTORY + answers.libNameSlug);

                    var templateDir = __dirname + '/../templates/microlib'
                    var api_sources = [
                        templateDir + '/index.ejs',
//                        templateDir + '/ddl.js',
//                        templateDir + '/package.json'
//                    templateDir + '/.dockerignore',
//                    templateDir + '/.gitignore',
//                    templateDir + '/Dockerfile',
//                    templateDir + '/**'
                    ];

                    gulp.src(api_sources).pipe(debug())
                        .pipe(plugins.template(answers))
                        .pipe(plugins.rename(function (file) {
                            if (file.basename[0] === '_') {
                                file.basename = '.' + file.basename.slice(1);
                            }
                            if (file.extname === '.ejs')
                                file.extname = '.js'
                        }))
//                    .pipe(plugins.conflict('./'))
                        .pipe(gulp.dest('./' + LIBS_DIRECTORY + answers.libNameSlug))
//                    .pipe(plugins.install())
                        .on('end', function () {
                        //
                        // Include tests
                        plugins.mkdirp('test/microlibs/' + answers.libNameSlug);

                        var api_test_sources = [
                            templateDir + '/test/lib-test.ejs'
                        ];
                        gulp.src(api_test_sources).pipe(debug())
                            .pipe(plugins.template(answers))
                            .pipe(plugins.rename(function (file) {
                                if (file.basename[0] === '_') {
                                    file.basename = '.' + file.basename.slice(1);
                                }
                                if (file.extname === '.ejs')
                                    file.extname = '.js'
                            }))
//                        .pipe(plugins.conflict('./'))
                            .pipe(gulp.dest('./test/microlibs/' + answers.libNameSlug))
                            .on('end', function () {
//                              done();
                            });
                            // Register api with microservice
                            gulp.src('./manifest.js')
                                .pipe(plugins.injectString.before("//<insert new microlib above this line>",
                                    "'./libs/" + answers.libNameSlug + "': [{\n" +
                                    "\t\t\t\t//MicroLibrary for "+ answers.descHuman +"\n" +
                                    "\t\t\t\t//exposing method "+ answers.libExposureSlug +"\n" +
                                    "\t\t\t\t//sample call: request.server.plugins['"+answers.libNameSlug+"']."+ answers.libExposureSlug+"({...libData}, function (reply,error) { });\n" +
                                    "\t\t\t}],\n\t\t\t"))
                                .pipe(gulp.dest('.'));
                        });
                });
            });
    });
//});
    return gulp;
};
