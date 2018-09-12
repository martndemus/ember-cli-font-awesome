/* eslint-env node */
"use strict";

const BroccoliFilter = require('broccoli-filter');
const postcss = require('postcss');
const { buildCacheKey, FONT_AWESOME_USAGE_CACHE_KEY } = require('./build-time-components/utils');
const DiskCache = require('sync-disk-cache');

module.exports = class PruneUnusedIcons extends BroccoliFilter {
  constructor(inputNodes, options) {
    super(inputNodes, options)
    this.options = options;
    this.targetFiles = ['assets/vendor.css'];
    this.persistentCache = new DiskCache(buildCacheKey());
    this.postcss = postcss.plugin('postcss-remove-unused-fa-icons', () => {
      return root => {

        // TODO: More css rules that could be pruned, ordered by how much I think they would save.
        //
        // - .fa-spin and associated keyframes if not used.
        // - .fa-rotate-90, .fa-rotate-180, .fa-rotate-270 if any/all are not used.
        // - .fa-stack, .fa-stack-1x, .fa-stack-2x if not used.
        // - .fa-pull-left, .fa-pull-right if not used.
        // - .fa-flip-horizontal, .fa-flip-vertical
        let usage = this.processUsage();
        let usedIcons = new Set();
        Object.keys(usage).forEach((k) => {
          usedIcons = new Set(usage[k].icons.concat([...usedIcons]));
        });
        this.options.addon.includeStaticIcons.forEach(i => usedIcons.add(i))
        root.walkRules(rule => {
          let matchData = rule.selector.match(/\.fa-(.*):before/);
          if (matchData !== null && !usedIcons.has(matchData[1])) {
            let selectors = rule.selector.split(',');

            let isMultiClass = selectors.length > 0;
            if (isMultiClass) {
              // Some selectors group several icons on the same line (p.e `.fa-close:before, .fa-times:before, .fa-remove:before`)
              // That means we need to split that selector by `,`, match each one individually and
              // only remove the selector if NONE of the classes is used.
              let remove = !selectors.some((cssSelector) => {
                let matchData = cssSelector.match(/\.fa-(.*):before/);
                if (matchData !== null) {
                  return usedIcons.has(matchData[1])
                }
              });
              if (remove) {
                rule.remove();
              }

            } else {
              rule.remove();
            }
          }
        });
      };
    });
  }

  processString(str /*, relativePath */) {
    let usage = this.processUsage();
    let dynamicIcon = Object.keys(usage).some(k => usage[k].dynamicIcon)
    if (dynamicIcon) {
      return str;
    }
    return this.postcss.process(str).css;
  }

  getDestFilePath(relativePath) {
    if (this.targetFiles.includes(relativePath)) {
      return relativePath;
    }
    return null;
  }

  processUsage() {
    if (this._normalizedUsage) {
      return this._normalizedUsage;
    }

    let usage = JSON.parse(this.persistentCache.get(FONT_AWESOME_USAGE_CACHE_KEY).value);
    return this._normalizedUsage = usage;
  }
}
