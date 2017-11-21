import Component from '@ember/component';

import { tagName } from 'ember-decorators/component';

import { argument } from '@ember-decorators/argument';
import { type, unionOf } from '@ember-decorators/argument/type';
import { required } from '@ember-decorators/argument/validation';
import { ClosureAction } from '@ember-decorators/argument/types';

import layout from './template';

const optional = (type) => unionOf(type, undefined, null);

const OptionalString = optional('string');
const OptionalClosureAction = optional(ClosureAction);

@tagName('')
export default class FaIconComponent extends Component.extend({ layout }) {
  static positionalParams = ['icon'];

  @argument
  @type('string')
  @required
  icon;

  @argument
  @type(OptionalString)
  id;

  @argument
  @type(OptionalString)
  class;

  @argument
  @type(OptionalString)
  title;

  @argument
  @type(OptionalString)
  ariaLabel;

  @argument
  @type('boolean')
  ariaHidden = true;

  @argument
  @type(OptionalString)
  color;

  @argument
  @type(OptionalClosureAction)
  click;

  @argument
  @type(unionOf('number', 'string'))
  size = 1;

  @argument
  @type(OptionalString)
  pull;

  @argument
  @type('number')
  rotate = 0;

  @argument
  @type(OptionalString)
  flip;

  @argument
  @type('boolean')
  stack = false;

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
