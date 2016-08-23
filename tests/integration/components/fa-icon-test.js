// import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fa-icon', 'Integration | Component | {{fa-icon}}', {
  integration: true
});

test("An <i> element with the class 'fa' is rendered", function(assert) {
  this.render(hbs`{{fa-icon}}`);

  let $icon = this.$('i');
  assert.equal($icon.length, 1, 'An <i> element is rendered');
  assert.ok($icon.hasClass('fa'), "The <i> element should have the 'fa' class");
});

test("I can set the specific icon using the 'icon' property", function(assert) {
  this.render(hbs`{{fa-icon icon="credit-card"}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('fa-credit-card'), "The <i> element should have the 'fa-credit-card' class");
});

test('I can set the specific icon using the first positional param', function(assert) {
  this.render(hbs`{{fa-icon "credit-card"}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('fa-credit-card'), "The <i> element should have the 'fa-credit-card' class");
});

test("'undefined' is not present in the class list", function(assert) {
  this.render(hbs`{{fa-icon}}`);
  let { className } = this.$('i').get(0);
  assert.ok(className.indexOf('undefined') === -1, "The <i> element should not have the 'undefined' class");
});

test("The value supplied to the 'icon' property may include the 'fa-' prefix", function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card"}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('fa-credit-card'), "The <i> element should have the 'fa-credit-card' class");
});

test(`I can set the size property to 'lg'`, function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" size="lg"}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('fa-lg'), `The <i> element should have the 'fa-lg' class`);
});

[2, 3, 4, 5].forEach((size) => {
  test(`I can set the size property as a number - size=${size}`, function(assert) {
    this.set('size', size);
    this.render(hbs`{{fa-icon icon="fa-credit-card" size=size}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-${size}x`), `The <i> element should have the 'fa-${size}x' class`);
  });

  test(`I can set the size property as a string - size="${size}"`, function(assert) {
    this.set('size', `${size}`);
    this.render(hbs`{{fa-icon icon="fa-credit-card" size=size}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-${size}x`), `The <i> element should have the 'fa-${size}x' class`);
  });

  test(`I can set this size property as a string - size="${size}x"`, function(assert) {
    this.set('size', `${size}x`);
    this.render(hbs`{{fa-icon icon="fa-credit-card" size=size}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-${size}x`), `The <i> element should have the 'fa-${size}x' class`);
  });
});

test("Setting the fixedWidth property adds the 'fa-fw' class", function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" fixedWidth=true}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('fa-fw'), "The <i> element should have the 'fa-fw' class");
});

test("Setting the listItem property adds the 'fa-li' class", function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" listItem=true}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('fa-li'), "The <i> element should have the 'fa-li' class");
});

test("Setting the border property adds the 'fa-border' class", function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" border=true}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('fa-border'), "The <i> element should have the 'fa-border' class");
});

['left', 'right'].forEach((direction) => {
  test(`Setting the pull property to '${direction}' adds the 'fa-pull-${direction}' class`, function(assert) {
    this.set('direction', direction);
    this.render(hbs`{{fa-icon icon="fa-credit-card" pull=direction}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-pull-${direction}`), `The <i> element should have the 'fa-pull-${direction}' class`);
  });
});

test("Setting the spin property adds the 'fa-spin' class", function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" spin=true}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('fa-spin'), "The <i> element should have the 'fa-spin' class");
});

test("Setting the pulse property adds the 'fa-pulse' class", function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" pulse=true}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('fa-pulse'), "The <i> element should have the 'fa-pulse' class");
});

[90, 180, 270].forEach((deg) => {
  test(`I can set the rotate property as a number - rotate=${deg}`, function(assert) {
    this.set('deg', deg);
    this.render(hbs`{{fa-icon icon="fa-credit-card" rotate=deg}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-rotate-${deg}`), `The <i> element should have the 'fa-rotate-${deg}' class`);
  });

  test(`I can set the rotate property as a string - rotate="${deg}"`, function(assert) {
    this.set('deg', `${deg}`);
    this.render(hbs`{{fa-icon icon="fa-credit-card" rotate=deg}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-rotate-${deg}`), `The <i> element should have the 'fa-rotate-${deg}' class`);
  });
});

['horizontal', 'vertical'].forEach((direction) => {
  test(`I can set the the flip property to '${direction}'`, function(assert) {
    this.set('direction', direction);
    this.render(hbs`{{fa-icon icon="fa-credit-card" flip=direction}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-flip-${direction}`), `The <i> element should have the 'fa-flip-${direction}' class`);
  });
});

[1, 2].forEach((size) => {
  test(`I can set the stack property as a number - stack=${size}`, function(assert) {
    this.set('size', size);
    this.render(hbs`{{fa-icon icon="fa-credit-card" stack=size}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-stack-${size}x`), `The <i> element should have the 'fa-stack-${size}x' class`);
  });

  test(`I can set the stack property as a string - stack="${size}"`, function(assert) {
    this.set('size', `${size}`);
    this.render(hbs`{{fa-icon icon="fa-credit-card" stack=size}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-stack-${size}x`), `The <i> element should have the 'fa-stack-${size}x' class`);
  });

  test(`I can set the stack property as a string - stack="${size}x"`, function(assert) {
    this.set('size', `${size}x`);
    this.render(hbs`{{fa-icon icon="fa-credit-card" stack=size}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-stack-${size}x`), `The <i> element should have the 'fa-stack-${size}x' class`);
  });
});

test("Setting the inverse property adds the 'fa-inverse' class", function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" inverse=true}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('fa-inverse'), "The <i> element should have the 'fa-inverse' class");
});

[[true, 'true'], [false, undefined], [undefined, 'true']].forEach(([input, result]) => {
  test(`Setting the aria-hidden property to '${input}' set the aria-hidden attribute to '${result}'`, function(assert) {
    this.set('input', input);
    this.render(hbs`{{fa-icon icon="fa-credit-card" ariaHidden=input}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('aria-hidden'), result, `The aria-hidden attribute of the <i> element should be '${result}`);
  });
});

test('I can set the title attribute', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" title="foo bar"}}`);
  let $icon = this.$('i');
  assert.equal($icon.attr('title'), 'foo bar', "The title attribute of the <i> element should be 'foo bar'");
});

test('I can set the color', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" color="#ff00ff"}}`);
  let $icon = this.$('i');
  assert.equal($icon.attr('style'), "color:#ff00ff", "The style attribute of the <i> element contains the right color");
});

test('I can alter the tagName of the icon', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" tagName="span"}}`);
  let $icon = this.$('span');
  assert.equal($icon.length, 1, 'The icon should be a <span> element');
});

test('I can add custom class names', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" class="custom-class"}}`);
  let $icon = this.$('i');
  assert.ok($icon.hasClass('custom-class'), "The icon should have the 'custom-class' class");
});
