'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cli-font-awesome',

  treeFor: function(name) {
    if (name === 'vendor') {
      // Map 'node_modules' to 'vendor', so that we can import Font Awesome assets later.
      return this.treeGenerator(path.join(__dirname, 'node_modules'));
    } else if (name === 'app') {
      return this.treeGenerator(path.join(__dirname, 'app-addon'));
    }
  },

  included: function included(app) {
    this.app = app;
    var options = this.app.options.emberCliFontAwesome || { includeFontAwesomeAssets: true };
    if (options.includeFontAwesomeAssets) {
      app.import("vendor/font-awesome/css/font-awesome.css");
      app.import("vendor/font-awesome/fonts/fontawesome-webfont.eot", { destDir: "assets/fonts" });
      app.import("vendor/font-awesome/fonts/fontawesome-webfont.svg", { destDir: "assets/fonts" });
      app.import("vendor/font-awesome/fonts/fontawesome-webfont.ttf", { destDir: "assets/fonts" });
      app.import("vendor/font-awesome/fonts/fontawesome-webfont.woff", { destDir: "assets/fonts" });
      app.import("vendor/font-awesome/fonts/fontawesome-webfont.woff2", { destDir: "assets/fonts" });
      app.import("vendor/font-awesome/fonts/FontAwesome.otf", { destDir: "assets/fonts" });
    }
  }
};
