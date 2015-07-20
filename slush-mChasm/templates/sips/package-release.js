var validateOptions = function (options) {
   if (!options || !options.releaseDir || !options.packageName || !options.outputDir){
      err = 'invalid options' + JSON.stringify(options,null, '\t');
      return err;
   }
};

module.exports = function (gulp, plugins, options) {
   plugins.util.log(plugins.util.colors.blue.bgWhite('[GULP]: loading task ' + __filename +
      '\n options: ' + JSON.stringify(options)));

   var err = validateOptions(options);
   if (err) {
      plugins.util.log(plugins.util.colors.red.bgWhite('[GULP]: error ' + err));
      throw err;
   }

   return function packageRelease(done) {
      plugins.util.log(plugins.util.colors.blue.bgWhite('[GULP]: loading task ' + __filename +
         '\n options: ' + JSON.stringify(options)));
      var err = validateOptions(options);
      if (err) {
         plugins.util.log(plugins.util.colors.red.bgWhite('[GULP]: error ' + err));
         throw err;
      }
      //
      // Copy Files
      //
      var sources=[
         options.releaseDir + '/*',
         options.releaseDir + '/**/*.*'
      ];
      return gulp.src(sources)
         .pipe(plugins.zip(options.packageName))
         .pipe(gulp.dest(options.outputDir), function(){done();})
         .pipe(plugins.debug());

   };
};