/* jshint node: true, -W030 */
'use strict';

// var chalk = require('chalk');
// var fs = require('fs');
var path = require('path');
var stew = require('broccoli-stew');

module.exports = {
  name: 'ember-font-awesome',

  init: function() {
    this._super.init && this._super.init.apply(this, arguments);
    // Enable ES7 decorators via Babel
    // https://www.npmjs.com/package/ember-computed-decorators#setup-with-addon
    this.options = this.options || {};
    this.options.babel = this.options.babel || {};
    this.options.babel.optional = this.options.babel.optional || [];
    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators');
    }
  },

  treeForPublic: function() {
    return stew.mv(path.join(path.dirname(require.resolve('font-awesome/package.json')), 'fonts'), 'fonts');
  },

  treeForVendor: function() {
    return stew.find(path.dirname(require.resolve('font-awesome/package.json')), {
      destDir: 'font-awesome',
      include: ['scss/*', 'less/*', 'css/*']
    });
  },

  included: function(app, parentAddon) {

    // Quick fix for add-on nesting
    // https://github.com/aexmachina/ember-cli-sass/blob/v5.3.0/index.js#L73-L75
    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && (app.app || app.parent)) {
      app = app.app || app.parent;
    }

    // if app.import and parentAddon are blank, we're probably being consumed by an in-repo-addon
    // or engine, for which the "bust through" technique above does not work.
    if (typeof app.import !== 'function' && !parentAddon) {
      if (app.registry && app.registry.app) {
        app = app.registry.app;
      }
    }

    if (!parentAddon && typeof app.import !== 'function') {
      throw new Error('ember-font-awesome is being used within another addon or engine and is' +
        ' having trouble registering itself to the parent application.');
    }

    // https://github.com/ember-cli/ember-cli/issues/3718#issuecomment-88122543
    this._super.included.call(this, app);

    // Per the ember-cli documentation
    // http://ember-cli.com/extending/#broccoli-build-options-for-in-repo-addons
    var target = (parentAddon || app);
    target.options = target.options || {}; // Ensures options exists for Scss/Less below
    var options = target.options['ember-font-awesome'] || {};

    var faPath = 'vendor/font-awesome';
    var scssPath = path.join(faPath, 'scss');
    var lessPath = path.join(faPath, 'less');
    var cssPath = path.join(faPath, 'css');
//    var fontsPath = 'public/fonts';

    // Ensure the font-awesome path is added to the ember-cli-sass addon options
    // (Taking a cue from the Babel options above)
    if (options.useScss) {
      target.options.sassOptions = target.options.sassOptions || {};
      target.options.sassOptions.includePaths = target.options.sassOptions.includePaths || [];
      if (target.options.sassOptions.includePaths.indexOf(scssPath) === -1) {
        target.options.sassOptions.includePaths.push(scssPath);
      }
    }

    // Ensure the font-awesome path is added to the ember-cli-less addon options
    // (Taking a cue from the Babel options above)
    if (options.useLess) {
      target.options.lessOptions = target.options.lessOptions || {};
      target.options.lessOptions.paths = target.options.lessOptions.paths || [];
      if (target.options.lessOptions.paths.indexOf(lessPath) === -1) {
        target.options.lessOptions.paths.push(lessPath);
      }
    }

    // // Make sure font-awesome is available
    // if (!fs.existsSync(faPath)) {
    //   throw new Error(
    //     this.name + ': font-awesome is not available from npm (' + faPath + '), ' +
    //     'install it into your project by running `npm install`'
    //   );
    // }

    // Early out if no assets should be imported
    if ('includeFontAwesomeAssets' in options && !options.includeFontAwesomeAssets) {
      return;
    }

    // Import the css when Sass and Less are NOT used
    if (!options.useScss && !options.useLess) {
      target.import({
        development: path.join(cssPath, 'font-awesome.css'),
        production: path.join(cssPath, 'font-awesome.min.css')
      });
    }

    // // Import all files in the fonts folder when option not defined or enabled
    // if (!('includeFontFiles' in options) || options.includeFontFiles) {
    //   // Get all of the font files
    //   var fontsToImport = fs.readdirSync(fontsPath);
    //   var filesInFonts  = []; // Bucket for filenames already in the fonts folder
    //   var fontsSkipped  = []; // Bucket for fonts not imported because they already have been
    //
    //   // Find files already imported into the fonts folder
    //   var fontsFolderPath = options.fontsOutput ? options.fontsOutput : '/fonts';
    //   target.otherAssetPaths.forEach(function(asset){
    //     if (asset.dest && asset.dest.indexOf(fontsFolderPath) !== -1) {
    //       filesInFonts.push(asset.file);
    //     }
    //   });
    //
    //   // Attempt to import each font, if not already imported
    //   fontsToImport.forEach(function(fontFilename){
    //     if (filesInFonts.indexOf(fontFilename) > -1) {
    //       fontsSkipped.push(fontFilename);
    //     } else {
    //       target.import(
    //         path.join(fontsPath, fontFilename),
    //         { destDir: fontsFolderPath }
    //       );
    //     }
    //   });
    //
    //   // Fonts that had already been imported, so we skipped..
    //   if (fontsSkipped.length) {
    //     this.ui.writeLine(chalk.red(
    //       this.name + ': Fonts already imported into the "/fonts" folder [' + fontsSkipped.join(', ') +
    //       '] by another addon or in your ember-cli-build.js, disable the import ' +
    //       'from other locations or disable the Font Awesome import by setting ' +
    //       '`includeFontFiles:false` for the "' + this.name + '" options in your ember-cli-build.js'
    //     ));
    //   }
    //
    //}
  }
};
