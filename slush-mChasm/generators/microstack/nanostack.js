module.exports = function(gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp){
    gulp.task('nanostack', function (done) {

        if(!this.args[0])
        {
            console.log('******    Incorrect usage of the sub-generator!!        ******');
            console.log('******    Try slush mChasm:nanostack <nanostack-name>   ******');
            console.log('******    Ex: slush meanjs:nanostack ns_RedisPostgres   ******');
            return done();
        }
        var moduleName = this.args[0];

        var prompts = [{
            type: 'checkbox',
            name: 'folders',
            message: 'Which supplemental folders would you like to include in your angular module?',
            choices: [{
                value: 'addCSSFolder',
                name: 'css',
                checked: true
            }, {
                value: 'addImagesFolder',
                name: 'img',
                checked: true
            }, {
                value: 'addDirectivesFolder',
                name: 'directives',
                checked: true
            }, {
                value: 'addFiltersFolder',
                name: 'filters',
                checked: true
            }]
        }, {
            type: 'confirm',
            name: 'addMenuItems',
            message: 'Would you like to add the CRUD module links to a menu?',
            default: true
        }];
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
                if (!answers) {
                    return done();
                }

                answers.addCSSFolder = _.contains(answers.folders, 'addCSSFolder');
                answers.addImagesFolder = _.contains(answers.folders, 'addImagesFolder');
                answers.addDirectivesFolder = _.contains(answers.folders, 'addDirectivesFolder');
                answers.addFiltersFolder = _.contains(answers.folders, 'addFiltersFolder');
                answers.addMenuItems = answers.addMenuItems;
                // modulenames
                answers.slugifiedName = _.slugify(moduleName);
                answers.slugifiedPluralName = inflections.pluralize(answers.slugifiedName);
                answers.slugifiedSingularName = inflections.singularize(answers.slugifiedName);
                answers.camelizedPluralName = _.camelize(answers.slugifiedPluralName);
                answers.camelizedSingularName = _.camelize(answers.slugifiedSingularName);
                answers.classifiedPluralName = _.classify(answers.slugifiedPluralName);
                answers.classifiedSingularName = _.classify(answers.slugifiedSingularName);
                answers.humanizedPluralName = _.humanize(answers.slugifiedPluralName);
                answers.humanizedSingularName = _.humanize(answers.slugifiedSingularName);

                //public folders
                if (answers.addCSSFolder) mkdirp('public/modules/' + answers.slugifiedPluralName + '/css');
                if (answers.addImagesFolder) mkdirp('public/modules/' + answers.slugifiedPluralName + '/img');
                if (answers.addDirectivesFolder) mkdirp('public/modules/' + answers.slugifiedPluralName + '/directives');
                if (answers.addFiltersFolder) mkdirp('public/modules/' + answers.slugifiedPluralName + '/filters');

                // Create public folders for ng
                mkdirp('public/modules/' + answers.slugifiedPluralName + '/config');
                mkdirp('public/modules/' + answers.slugifiedPluralName + '/controllers');
                mkdirp('public/modules/' + answers.slugifiedPluralName + '/services');
                mkdirp('public/modules/' + answers.slugifiedPluralName + '/tests');

                // express-modules
                gulp.src(__dirname + '/../templates/crud-module/express-module/**')
                    .pipe(template(answers))
                    .pipe(rename(function(file) {
                        if (file.basename.indexOf('_') == 0) {
                            file.basename = answers.slugifiedPluralName + '.'+file.basename.slice(2);
                        }
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./'));

                // Menu configuration
                if (answers.addMenuItems) {
                    answers.menuId = 'topbar';
                    gulp.src(__dirname + '/../templates/crud-module/angular-module/config/**')
                        .pipe(template(answers))
                        .pipe(rename(function(file) {
                            if (file.basename.indexOf('_') == 0) {
                                file.basename = answers.slugifiedPluralName + '.'+file.basename.slice(2);
                            }
                        }))
                        .pipe(conflict('public/modules/' + answers.slugifiedPluralName+'/'))
                        .pipe(gulp.dest('public/modules/' + answers.slugifiedPluralName+'/'));
                }

                gulp.src(__dirname + '/../templates/crud-module/angular-module/views/**')
                    .pipe(template(answers))
                    .pipe(rename(function(file) {
                        if (file.basename.indexOf('list') >= 0) {
                            file.basename = file.basename.replace('_', answers.slugifiedPluralName) ;
                        }
                        else {
                            file.basename = file.basename.replace('_', answers.slugifiedSingularName) ;
                        }
                    }))
                    .pipe(conflict('public/modules/' + answers.slugifiedPluralName+'/'))
                    .pipe(gulp.dest('public/modules/' + answers.slugifiedPluralName+'/'));

                gulp.src(__dirname + '/../templates/crud-module/angular-module/public/**')
                    .pipe(template(answers))
                    .pipe(rename(function(file) {
                        if (file.basename.indexOf('_') == 0) {
                            file.basename = answers.slugifiedPluralName + '.'+file.basename.slice(2);
                        }
                    }))
                    .pipe(conflict('public/modules/' + answers.slugifiedPluralName+'/'))
                    .pipe(gulp.dest('public/modules/' + answers.slugifiedPluralName+'/'))
                    .on('end', function () {
                        done();
                    });

            });
    });
    return gulp;
}