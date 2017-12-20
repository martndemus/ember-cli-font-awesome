import Ember from 'ember';
import tryMatch from '../utils/try-match';

const {
  computed,
  deprecate,
  get,
  getWithDefault,
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

  didReceiveAttrs() {
    this._super(...arguments);
    this.checkDeprecations();
  },

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
  }),

  checkDeprecations() {
    const icon = get(this, 'icon');
    const params = get(this, 'params');

    const iconOrParam = icon || isArray(params) && params[0];
    if (iconOrParam) {
      if (iconOrParam.startsWith && iconOrParam.startsWith('fa-')) {
        const preferedIcon = iconOrParam.substring(3);
        deprecate(
          `Passing the icon prefixed with 'fa-' (${iconOrParam}) is deprecated and will be removed in v4. Use '${preferedIcon}' instead.`,
          false,
          { id: 'ember-font-awesome.no-fa-prefix', until: '4.0.0' }
        );
      }
    }

    const size = getWithDefault(this, 'size', '').toString();
    if (size.endsWith && size.endsWith('x')) {
      const preferedSize = size.substring(0, size.length - 1);
      deprecate(
        `Passing 'size' as '${size}' to fa-icon is deprecated and will be removed in v4. Use size='${preferedSize}' instead`,
        false,
        { id: 'ember-font-awesome.no-size-suffix', until: '4.0.0' }
      );
    }
  },
});

FaIconComponent.reopenClass({
  positionalParams: 'params'
});

export default FaIconComponent;
