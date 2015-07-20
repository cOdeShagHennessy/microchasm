var validateOptions = function (options) {
   var validSegments = ['patch', 'major', 'minor', 'prerelease'];
   if (!options.segment || validSegments.indexOf(options.segment) < 0) {
      err = 'invalid version segment ' + options.segment;
      return err;
   }
};

module.exports = function (gulp, plugins, options) {

   var err = validateOptions(options);
   if (err) {
      plugins.util.log(plugins.util.colors.red.bgWhite('[GULP]: error ' + err));
      throw err;
   }

   return function RollVersion(done) {

      plugins.util.log(plugins.util.colors.blue.bgWhite('[GULP]: loading task ' + __filename +
         '\n basedir: ' + options.basedir +
            //'\n plugins: ' + JSON.stringify(plugins,null, '\t')+
         '\n options: ' + JSON.stringify(options)));
      var err = validateOptions(options);
      if (err) {
         plugins.util.log(plugins.util.colors.red.bgWhite('[GULP]: error ' + err));
         throw err;
      }

      return gulp.src(options.basedir + '/package.json')
         .pipe(plugins.bump({type: options.segment, preid: options.preid || null})) //??
         .pipe(plugins.debug())
         .pipe(gulp.dest(options.basedir), function () {
            done();
         });
   };
};

