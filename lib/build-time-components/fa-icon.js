/* eslint-env node */
"use strict";

const { default: BuildTimeComponent, interpolateProperties } = require('ember-ast-helpers/build-time-component');
const { isDynamic, buildConcatIfPresent, interpolateSize, buildCacheKey, FONT_AWESOME_USAGE_CACHE_KEY } = require('./utils');
const DiskCache = require('sync-disk-cache');
const persistentCache = new DiskCache(buildCacheKey());

function trackIcons(interpolations) {
  let moduleName = this.options.transform && this.options.transform.options.moduleName;
  let fontAwesomeConfig = JSON.parse(persistentCache.get('fa-config').value);

  if (moduleName && fontAwesomeConfig.removeUnusedIcons) {
    // Get the FontAwesome usage cache
    let cache = persistentCache.get(FONT_AWESOME_USAGE_CACHE_KEY).value;
    let fontAwesomeUsage = cache !== undefined ? JSON.parse(cache) : {};
    let usage = fontAwesomeUsage[moduleName];

    if (usage) {
      if (!usage.dynamicIcon) {
        if (isDynamic(interpolations.icon)) {
          usage.dynamicIcon = true;
        } else {
          var iconsSet = new Set(usage.icons);
          iconsSet.add(interpolations.icon.value);
          usage.icons = iconsSet;
        }
      }
    } else {
      // If no usage object exists for a given module, create a new one
      usage = { icons: new Set(), dynamicIcon: false };
    }

    fontAwesomeUsage[moduleName] = usage;
    let normalizedUsage = {};
    // Convert the Icons Set to Array for each module and persist it.
    Object.keys(fontAwesomeUsage).forEach((k) => {
      normalizedUsage[k] = { icons: Array.from(fontAwesomeUsage[k].icons), dynamicIcon: fontAwesomeUsage[k].dynamicIcon };
    });
    persistentCache.set(FONT_AWESOME_USAGE_CACHE_KEY, JSON.stringify(normalizedUsage));
  }
}

module.exports = class FaIconComponent extends BuildTimeComponent {
  constructor(node, opts = {}) {
    super(node, Object.assign({ tagName: 'i', ariaHidden: true }, opts));
    this._syntax = opts.transform.syntax;
    this.classNames = ['fa'];
    this.attributeBindings = ['title', 'ariaLabel:aria-label', 'ariaHidden:aria-hidden:true', 'style', 'click:onclick'];
    this.classNameBindings = [
      'size',
      'icon',
      'pull',
      'rotate',
      'flip',
      'stack',
      'fixedWidth:fa-fw',
      'pulse:fa-pulse',
      'inverse:fa-inverse',
      'border:fa-border',
      'spin:fa-spin',
      'listItem:fa-li'
    ];
    this.positionalParams = ['icon'];
    this.iconContent = interpolateProperties('fa-:icon:', { callback: trackIcons })
    this.pullContent = interpolateProperties('fa-pull-:pull:')
    this.rotateContent = interpolateProperties('fa-rotate-:rotate:')
    this.flipContent = interpolateProperties('fa-flip-:flip:')
    this.styleContent = interpolateProperties('color:$color$', { divisor: '$', skipIfMissingDynamic: true })
  }

  sizeContent() {
    return interpolateSize(this);
  }

  stackContent() {
    if (this.invocationAttrs.stack) {
      if (isDynamic(this.invocationAttrs.stack)) {
        return buildConcatIfPresent(this._syntax.builders, this.invocationAttrs.stack, ['fa-stack-', this.invocationAttrs.stack, 'x']);
      } else if (this.invocationAttrs.stack.type === 'NumericLiteral') {
        return `fa-stack-${this.invocationAttrs.stack.value}x`;
      } else if (isNaN(parseInt(this.invocationAttrs.stack.value), 10)) {
        return `fa-stack-${this.invocationAttrs.stack.value}`;
      } else {
        return `fa-stack-${this.invocationAttrs.stack.value}x`;
      }
    } else if (this.options.stack) {
      return `fa-stack-${this.options.stack}x`;
    }
  }
}
