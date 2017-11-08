/* eslint-env node */
'use strict';

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const Funnel = require('broccoli-funnel');
const faPath = path.dirname(require.resolve('font-awesome/package.json'));
const buildAstTransform = require('./lib/ast-transform');
const PruneUnusedIcons = require('./lib/prune-css');

module.exports = {
  name: 'ember-font-awesome',

  setupPreprocessorRegistry(type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'font-awesome-static-transform',
      plugin: buildAstTransform(this),
      baseDir() {
        return __dirname;
      },
      cacheKey() {
        return  process.env.EMBER_CLI_FONT_AWESOME_DISABLE_CACHE ? Date.now() : null;
      }
    });
  },

  postprocessTree(type, tree) {
    // if (this.app.env === 'production' && type === 'all') {
    if (this.fontAwesomeConfig.removeUnusedIcons && type === 'all') {
      return new PruneUnusedIcons(tree, { addon: this });
    }
    return tree;
  },

  treeForVendor() {
    // Get configured fontFormats
    let fontFormats = this.fontAwesomeConfig.fontFormats || ['eot', 'svg', 'ttf', 'woff', 'woff2', 'otf'];
    let fontFormatsString = fontFormats.join(',');
    // Define fontFormatPattern
    let fontFormatPattern;
    if (fontFormats.length > 1) {
      fontFormatPattern = `*.{${fontFormatsString}}`;
    } else {
      fontFormatPattern = `*.${fontFormatsString}`;
    }
    // Funnel required font types
    return new Funnel(faPath, {
      destDir: 'font-awesome',
      include: ['css/*', `fonts/${fontFormatPattern}`]
    });
  },

  included(app, parentAddon) {
    this.fontAwesomeUsage = {};
    this.includeStaticIcons = new Set();
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

    this.app = app;
    // https://github.com/ember-cli/ember-cli/issues/3718#issuecomment-88122543
    this._super.included.call(this, app);

    // Per the ember-cli documentation
    // http://ember-cli.com/extending/#broccoli-build-options-for-in-repo-addons
    let target = (parentAddon || app);
    target.options = target.options || {}; // Ensures options exists for Scss/Less below
    this.fontAwesomeConfig = target.options['ember-font-awesome'] || {};
    if (!this.fontAwesomeConfig.hasOwnProperty('removeUnusedIcons')) {
      this.fontAwesomeConfig.removeUnusedIcons = false; // this.app.env === 'production';
    }

    let scssPath = path.join(faPath, 'scss');
    let lessPath = path.join(faPath, 'less');
    let cssPath = 'vendor/font-awesome/css';
    let fontsPath = 'vendor/font-awesome/fonts';
    let absoluteFontsPath = path.join(faPath, 'fonts');

    // Ensure the font-awesome path is added to the ember-cli-sass addon options
    // (Taking a cue from the Babel options above)
    if (this.fontAwesomeConfig.useScss) {
      target.options.sassOptions = target.options.sassOptions || {};
      target.options.sassOptions.includePaths = target.options.sassOptions.includePaths || [];
      if (target.options.sassOptions.includePaths.indexOf(scssPath) === -1) {
        target.options.sassOptions.includePaths.push(scssPath);
      }
    }

    // Ensure the font-awesome path is added to the ember-cli-less addon options
    // (Taking a cue from the Babel options above)
    if (this.fontAwesomeConfig.useLess) {
      target.options.lessOptions = target.options.lessOptions || {};
      target.options.lessOptions.paths = target.options.lessOptions.paths || [];
      if (target.options.lessOptions.paths.indexOf(lessPath) === -1) {
        target.options.lessOptions.paths.push(lessPath);
      }
    }

    // Force inclusion of some icons that would otherwise by removed in post processing
    if ('includeStaticIcons' in this.fontAwesomeConfig && this.fontAwesomeConfig.includeStaticIcons.length) {
      this.fontAwesomeConfig.includeStaticIcons.forEach(icon => {
        if (icon.indexOf('fa-') !== -1) {
          icon = icon.substring(3);
        }
        this.includeStaticIcons.add(icon);
      });
    }

    // Early out if no assets should be imported
    if ('includeFontAwesomeAssets' in this.fontAwesomeConfig && !this.fontAwesomeConfig.includeFontAwesomeAssets) {
      return;
    }

    // Import the css when Sass and Less are NOT used
    if (!this.fontAwesomeConfig.useScss && !this.fontAwesomeConfig.useLess) {
      target.import({
        development: path.join(cssPath, 'font-awesome.css'),
        production: path.join(cssPath, 'font-awesome.min.css')
      });
    }

    // Import all files in the fonts folder when option not defined or enabled
    if (!('includeFontFiles' in this.fontAwesomeConfig) || this.fontAwesomeConfig.includeFontFiles) {
      // Get all of the font files
      let fontsToImport = fs.readdirSync(absoluteFontsPath);
      let filesInFonts  = []; // Bucket for filenames already in the fonts folder
      let fontsSkipped  = []; // Bucket for fonts not imported because they already have been

      // Find files already imported into the fonts folder
      let fontsFolderPath = this.fontAwesomeConfig.fontsOutput ? this.fontAwesomeConfig.fontsOutput : '/fonts';
      (target.otherAssetPaths || []).forEach(function(asset){
        if (asset.dest && asset.dest.indexOf(fontsFolderPath) !== -1) {
          filesInFonts.push(asset.file);
        }
      });

      // Attempt to import each font, if not already imported
      fontsToImport.forEach(function(fontFilename){
        if (filesInFonts.indexOf(fontFilename) > -1) {
          fontsSkipped.push(fontFilename);
        } else {
          target.import(
            path.join(fontsPath, fontFilename),
            { destDir: fontsFolderPath }
          );
        }
      });

      // Fonts that had already been imported, so we skipped..
      if (fontsSkipped.length) {
        this.ui.writeLine(chalk.red(
          this.name + ': Fonts already imported into the "/fonts" folder [' + fontsSkipped.join(', ') +
          '] by another addon or in your ember-cli-build.js, disable the import ' +
          'from other locations or disable the Font Awesome import by setting ' +
          '`includeFontFiles:false` for the "' + this.name + '" options in your ember-cli-build.js'
        ));
      }
    }
  }
};
