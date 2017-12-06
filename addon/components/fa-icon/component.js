import Component from '@ember/component';

import { argument } from '@ember-decorators/argument';
import { type, unionOf, optional } from '@ember-decorators/argument/type';
import { ClosureAction } from '@ember-decorators/argument/types';

import layout from './template';

export default class FaIconComponent extends Component.extend({
  layout,
  tagName: ''
}) {
  static positionalParams = ['icon'];

  @argument
  @type('string')
  icon;

  @argument
  @type(optional('string'))
  id;

  @argument
  @type(optional('string'))
  class;

  @argument
  @type(optional('string'))
  title;

  @argument
  @type(optional('string'))
  ariaLabel;

  @argument
  @type('boolean')
  ariaHidden = true;

  @argument
  @type(optional('string'))
  color;

  @argument
  @type(optional(ClosureAction))
  click;

  @argument
  @type(optional(unionOf('number', 'string')))
  size;

  @argument
  @type(optional('string'))
  pull;

  @argument
  @type(optional('number'))
  rotate;

  @argument
  @type(optional('string'))
  flip;

  @argument
  @type(optional('number'))
  stack;

  @argument
  @type('boolean')
  fixedWidth = false;

  @argument
  @type('boolean')
  pulse = false;

  @argument
  @type('boolean')
  inverse = false;

  @argument
  @type('boolean')
  border = false;

  @argument
  @type('boolean')
  spin = false;

  @argument
  @type('boolean')
  listItem = false;
}
