import Ember from 'ember';
import tryMatch from '../utils/try-match';

const {
  computed,
  get,
  isArray
} = Ember;

const FaIconComponent = Ember.Component.extend({
  tagName: 'i',

  classNames: ['fa'],

  classNameBindings: [
    'iconCssClass',
    'flipCssClass',
    'rotateCssClass',
    'sizeCssClass',
    'pullCssClass',
    'stackCssClass',
    'spin:fa-spin',
    'fixedWidth:fa-fw',
    'listItem:fa-li',
    'border:fa-border',
    'pulse:fa-pulse',
    'inverse:fa-inverse'
  ],

  attributeBindings: [
    'ariaLabel:aria-label',
    'ariaHiddenAttribute:aria-hidden',
    'title',
    'style'
  ],

  style: computed('color', function() {
    let color = get(this, 'color');
    if (!color) { return; }
    return Ember.String.htmlSafe(`color:${color}`);
  }),

  iconCssClass: computed('icon', 'params.[]', function() {
    let icon = get(this, 'icon');
    let params = get(this, 'params');

    icon = icon || isArray(params) && params[0];

    if (icon) {
      return tryMatch(icon, /^fa-/) ? icon : `fa-${icon}`;
    }
  }),

  flipCssClass: computed('flip', function() {
    let flip = get(this, 'flip');
    if (!flip) { return; }
    return tryMatch(flip, /^fa-flip/) ? flip : `fa-flip-${flip}`;
  }),

  rotateCssClass: computed('rotate', function() {
    let rotate = get(this, 'rotate');
    if (!rotate) { return; }

    if (tryMatch(rotate, /^fa-rotate/)) {
      return rotate;
    } else {
      return `fa-rotate-${rotate}`;
    }
  }),

  sizeCssClass: computed('size', function() {
    let size = get(this, 'size');
    if (!size) { return ; }

    if (tryMatch(size, /^fa-/)) {
      return size;
    } else if (tryMatch(size, /(?:lg|x)$/)) {
      return `fa-${size}`;
    } else {
      return `fa-${size}x`;
    }
  }),

  pullCssClass: computed('pull', function() {
    let pull = get(this, 'pull');
    if (!pull) { return ; }
    return `fa-pull-${pull}`;
  }),

  stackCssClass: computed('stack', function() {
    let stack = get(this, 'stack');
    if (!stack) { return; }

    if (tryMatch(stack, /^fa-/)) {
      return stack;
    } else if (tryMatch(stack, /x$/)) {
      return `fa-stack-${stack}`;
    } else {
      return `fa-stack-${stack}x`;
    }
  }),

  ariaHiddenAttribute: computed('ariaHidden', function() {
    let ariaHidden = get(this, 'ariaHidden');
    return ariaHidden !== false ? 'true' : undefined;
  })
});

FaIconComponent.reopenClass({
  positionalParams: 'params'
});

export default FaIconComponent;
