module.exports = function (gulp, plugins, options) {

    var path = require('path');
    var runSequence = require('run-sequence');

    function format(string) {
        var username = string.toLowerCase();
        return username.replace(/\s/g, '');
    }

    //TODO: pass defaults i.e. author, email, workind dir etc. to generators To refactor and remove duplicated code
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

    gulp.task('default', function (done) {
        var prompts = [{
            name: 'microChasmName',
            message: 'What\'s do you want to call your microChasm?',
            default: defaults.microChasmName
        }, {
            name:    'microChasmVersion',
            message: 'What should the be the initial version of your microChasm of services?',
            default: '0.0.1'
        }, {
            type:    'confirm',
            name:    'includeTests',
            message: 'Do you want to include tests?'
        }, {
            type:    'confirm',
            name:    'moveon',
            message: 'Continue with microChasm scaffolding generation?'
        }];
        plugins.inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    return done();
                }
                answers.chasmNameSlug = plugins._.slugify(answers.microChasmName);
                answers.defaults = defaults;
//                answers.microChasmVersion = answers.microChasmVersion;
//                answers.includeTests = answers.includeTests;

                var baseOptions = { microChasmAnswers:answers }
//                    "answers.appName":answers.chasmNameSlug,
//                    "microChasmVersion":answers.microChasmVersion,
//                    "includeTests":answers.includeTests
                //
                // Require the generators for all base components
                require('./twiglet')(gulp, plugins,baseOptions );
                require('./microstack')(gulp, plugins,baseOptions);
                require('./sips')(gulp, plugins,baseOptions);

                var templateDir = __dirname + '/../templates/'
                var docker_sources = [
                    templateDir + '/build-docker.sh',
                    templateDir + '/.dockerignore',
                    templateDir + '/docker-compose.yml',
                    templateDir + '/Dockerfile.base',
                    templateDir + '/Dockerfile.dev'
                ];
                gulp.src(docker_sources).pipe(plugins.debug())
                    .pipe(plugins.template(answers))
                    .pipe(plugins.rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
//                    .pipe(plugins.conflict('./'))
                    .pipe(gulp.dest('.' ))
                    .on('end', function () {
//                        done();
                    });

                runSequence('twiglet', 'microstack', 'sips');

                done();
            });
    });
    return gulp;
};