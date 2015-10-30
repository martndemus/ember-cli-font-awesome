import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fa-icon', 'Integration | Component | {{fa-icon}}', {
  integration: true
});

test('it renders an I element with class fa', function(assert) {
  this.render(hbs`{{fa-icon}}`);

  const $icon = this.$('i');
  assert.equal($icon.length, 1);
  assert.ok($icon.hasClass('fa'));
});

test('it renders an icon with given icon class', function(assert) {
  this.render(hbs`{{fa-icon icon="credit-card"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-credit-card'));
});

test('it does not add the class fa-undefined when icon is null/undefined', function(assert) {
  this.render(hbs`{{fa-icon}}`);
  const $icon = this.$('i');
  assert.ok(!$icon.hasClass('fa-undefined'));
});

test('icon names with the fa- prefix are also accepted', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-credit-card'));
});

test('fa-spin', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" spin=true}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-spin'));
});

test('fa-flip horizontal', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" flip="horizontal"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-flip-horizontal'));
});

test('fa-flip vertical', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" flip="vertical"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-flip-vertical'));
});

test('fa-flip no flip', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card"}}`);
  const $icon = this.$('i');
  assert.ok(!$icon.hasClass('fa-flip-undefined'));
});

test('fa-flip prefixed with fa-flip', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" flip="fa-flip-vertical"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-flip-vertical'));
});

test('fa-rotate 90', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" rotate="90"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-rotate-90'));
});

test('fa-rotate 180', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" rotate="180"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-rotate-180'));
});

test('fa-rotate 270', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" rotate="270"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-rotate-270'));
});

test('fa-rotate as integer', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" rotate=270}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-rotate-270'));
});

test('fa-rotate no rotation', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card"}}`);
  const $icon = this.$('i');
  assert.ok(!$icon.hasClass('fa-rotate-undefined'));
});

test('fa-rotate prefixed with fa-rotate', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" rotate="fa-rotate-270"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-rotate-270'));
});


test('size 2x', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" size="2x"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-2x'));
});

test('size 2', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" size="2"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-2x'));
});

test('size 2 as integer', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" size=2}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-2x'));
});

test('size fa-3x', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" size="fa-3x"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-3x'));
});

test('size lg', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" size="lg"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-lg'));
});

test('fixedWidth', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" fixedWidth=true}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-fw'));
});

test('fa-li', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" listItem=true}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-li'));
});

test('fa-border', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" border=true}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-border'));
});

test('fa-pull left', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" pull="left"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-pull-left'));
});

test('fa-pull right', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" pull="right"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-pull-right'));
});

test('fa-pull with fa-prefix', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card"}}`);
  const $icon = this.$('i');
  assert.ok(!$icon.hasClass('fa-pull-undefined'));
});

test('fa-pulse', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" pulse=true}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-pulse'));
});

test('fa-stack 1x', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" stack="1x"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-stack-1x'));
});

test('fa-stack 2x', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" stack="2x"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-stack-2x'));
});

test('fa-stack 2', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" stack="2"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-stack-2x'));
});

test('fa-stack 2 as integer', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" stack=2}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-stack-2x'));
});

test('fa-stack fa-stack-2x', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" stack="fa-stack-2x"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-stack-2x'));
});

test('fa-stack no stack', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card"}}`);
  const $icon = this.$('i');
  assert.ok(!$icon.hasClass('fa-stack-undefined'));
});

test('fa-inverse', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" inverse=true}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('fa-inverse'));
});

test('aria-hidden true', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" ariaHidden=true}}`);
  const $icon = this.$('i');
  assert.equal($icon.attr('aria-hidden'), 'true');
});

test('aria-hidden false', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" ariaHidden=false}}`);
  const $icon = this.$('i');
  assert.equal($icon.attr('aria-hidden'), undefined);
});

test('aria-hidden not set', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card"}}`);
  const $icon = this.$('i');
  assert.equal($icon.attr('aria-hidden'), 'true');
});

test('title', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" title="foo bar"}}`);
  const $icon = this.$('i');
  assert.equal($icon.attr('title'), 'foo bar');
});

test('tagName', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" tagName="span"}}`);
  const $icon = this.$('span');
  assert.equal($icon.length, 1);
});

test('custom class names', function(assert) {
  this.render(hbs`{{fa-icon icon="fa-credit-card" class="custom-class"}}`);
  const $icon = this.$('i');
  assert.ok($icon.hasClass('custom-class'));
});
