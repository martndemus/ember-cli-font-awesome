/* eslint-env node */
"use strict";

const { default: BuildTimeComponent, interpolateProperties } = require('ember-ast-helpers/build-time-component');
const { isDynamic, buildConcatIfPresent, interpolateSize } = require('./utils');

function trackIcons(interpolations) {
  let moduleName = this.options.transform && this.options.transform.options.moduleName;
  if (moduleName) {
    let { addon: { fontAwesomeUsage } } = this.options.transform;
    let usage = fontAwesomeUsage[moduleName];
    if (!usage.dynamicIcon) {
      if (isDynamic(interpolations.icon)) {
        usage.dynamicIcon = true;
      } else {
        usage.icons.add(interpolations.icon.value);
      }
    }
  }
}
module.exports = class FaIconComponent extends BuildTimeComponent {
  constructor(node, opts = {}) {
    super(node, Object.assign({ tagName: 'i', ariaHidden: true }, opts));
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
        return buildConcatIfPresent(this.invocationAttrs.stack, ['fa-stack-', this.invocationAttrs.stack, 'x']);
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
