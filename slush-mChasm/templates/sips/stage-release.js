var validateOptions = function (options) {
   if (!options || !options.sources || !options.releaseDir || !options.basedir ) {
      err = 'Invalid or missing options' + JSON.stringify(options, null, '\t');
      return err;
   }
};

module.exports = function (gulp, plugins, options) {

   var err = validateOptions(options);
   if (err) {
      plugins.util.log(plugins.util.colors.red.bgWhite('[GULP]: error ' + err));
      throw err;
   }

   return function stageRelease(done) {
      plugins.util.log(plugins.util.colors.blue.bgWhite('[GULP]: loading task ' + __filename +
         '\n options: ' + JSON.stringify(options)));
      var err = validateOptions(options);
      if (err) {
         plugins.util.log(plugins.util.colors.red.bgWhite('[GULP]: error ' + err));
         throw err;
      }
      return gulp.src(options.sources, { base: options.basedir}).pipe(gulp.dest(options.releaseDir)).pipe(plugins.debug()).on('finish', function () {
         plugins.util.log(plugins.util.colors.red.bgBlack('[GULP]: copy finished'));
      });

   };
};