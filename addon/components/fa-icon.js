import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
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
    'ariaHiddenAttribute:aria-hidden',
    'title'
  ],

  iconCssClass: computed('icon', function() {
    let icon = this.get('icon');
    if (icon) {
      return icon.match(/^fa-/) ? icon : `fa-${icon}`;
    }
  }),

  flipCssClass: computed('flip', function() {
    let flip = this.get('flip');
    if (flip) {
      return flip.match(/^fa-flip/) ? flip : `fa-flip-${flip}`;
    }
  }),

  rotateCssClass: computed('rotate', function() {
    let rotate = this.get('rotate');
    if (rotate) {
      return rotate.toString().match(/^fa-rotate/) ? rotate : `fa-rotate-${rotate}`;
    }
  }),

  sizeCssClass: computed('size', function() {
    let size = this.get('size');
    if (size) {
      size = size.toString();
      if (size.match(/^fa-/)) {
        return size;
      } else {
        return size.match(/(?:lg|x)$/) ? `fa-${size}` : `fa-${size}x`;
      }
    }
  }),

  pullCssClass: computed('pull', function() {
    let pull = this.get('pull');
    if (pull) {
      return `fa-pull-${pull}`;
    }
  }),

  stackCssClass: computed('stack', function() {
    let stack = this.get('stack');
    if (stack) {
      stack = stack.toString();
      if (stack.match(/^fa-/)) {
        return stack;
      } else {
        return stack.match(/x$/) ? `fa-stack-${stack}` : `fa-stack-${stack}x`;
      }
    }
  }),

  ariaHiddenAttribute: computed('ariaHidden', function() {
    const ariaHidden = this.get('ariaHidden');
    return ariaHidden !== false ? true : undefined;
  })
});
