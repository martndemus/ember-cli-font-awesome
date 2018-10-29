import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click } from 'ember-native-dom-helpers';

module('Integration | Component | {{fa-icon}}', function(hooks) {
  setupRenderingTest(hooks);

  // general
  test("An <i> element with the class 'fa' is rendered", async function(assert) {
    await render(hbs`{{fa-icon}}`);

    let $icon = this.$('i');
    assert.equal($icon.length, 1, 'An <i> element is rendered');
    assert.ok($icon.hasClass('fa'), "The <i> element should have the 'fa' class");
  });

  test("An <i> element with the given id is rendered", async function(assert) {
    await render(hbs`{{fa-icon id="sample-id"}}`);

    let $icon = this.$('i');
    assert.equal($icon.length, 1, 'An <i> element is rendered');
    assert.equal($icon.attr('id'), "sample-id", "The <i> element should have the right id attribute");
  });

  test("'undefined' is not present in the class list", async function(assert) {
    await render(hbs`{{fa-icon}}`);
    let { className } = findAll('i')[0];
    assert.ok(className.indexOf('undefined') === -1, "The <i> element should not have the 'undefined' class");
  });

  // icon
  test("I can set the specific icon using the 'icon' property", async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card"}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-credit-card'), "The <i> element should have the 'fa-credit-card' class");
  });

  test("I can set the specific icon to a path", async function(assert) {
    this.set('iconName', 'credit-card');
    await render(hbs`{{fa-icon icon=iconName}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-credit-card'), "The <i> element should have the 'fa-credit-card' class");
  });

  test("I can set the specific icon to a subexpression", async function(assert) {
    this.set('condition', false);
    await render(hbs`{{fa-icon icon=(if condition 'credit-card' 'android')}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-android'), "The <i> element should have the 'fa-android' class");
  });

  // icon as positional param
  test('I can set the specific icon using the first positional param', async function(assert) {
    await render(hbs`{{fa-icon "credit-card"}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-credit-card'), "The <i> element should have the 'fa-credit-card' class");
  });

  test('I can set the positional param to a path', async function(assert) {
    this.set('iconName', 'credit-card');
    await render(hbs`{{fa-icon iconName}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-credit-card'), "The <i> element should have the 'fa-credit-card' class");
  });

  test('I can set the positional param to a subexpression', async function(assert) {
    this.set('condition', true);
    await render(hbs`{{fa-icon (if condition 'credit-card' 'android')}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-credit-card'), "The <i> element should have the 'fa-credit-card' class");
  });

  // size
  test(`I can set the size property to a string literal ('lg')`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" size="lg"}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-lg'), `The <i> element should have the 'fa-lg' class`);
  });

  test(`I can set the size property to a number literal (2)`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" size=2}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-2x`), `The <i> element should have the 'fa-2x' class`);
  });

  test(`I can set the size property to a number disguised as a string ("2")`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" size="2"}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-2x`), `The <i> element should have the 'fa-2x' class`);
  });

  test('I can set the size property to a bound value', async function(assert) {
    this.set('boundSize', 2);
    await render(hbs`{{fa-icon icon="credit-card" size=boundSize}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-2x`), `The <i> element should have the 'fa-2x' class`);
  });

  // fixedWidth
  test("Setting the fixedWidth property adds the 'fa-fw' class", async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" fixedWidth=true}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-fw'), "The <i> element should have the 'fa-fw' class");
  });

  test("Setting the fixedWidth to a bound value also works", async function(assert) {
    this.set('isFixed', true);
    await render(hbs`{{fa-icon icon="credit-card" fixedWidth=isFixed}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-fw'), "The <i> element should have the 'fa-fw' class");
  });

  test("Setting the fixedWidth to a subexpression also works", async function(assert) {
    this.set('isFixed', true);
    await render(hbs`{{fa-icon icon="credit-card" fixedWidth=(if isFixed true)}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-fw'), "The <i> element should have the 'fa-fw' class");
  });

  // listItem
  test("Setting the listItem property adds the 'fa-li' class", async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" listItem=true}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-li'), "The <i> element should have the 'fa-li' class");
  });

  test("Setting the listItem to a bound value also works", async function(assert) {
    this.set('isList', true);
    await render(hbs`{{fa-icon icon="credit-card" listItem=isList}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-li'), "The <i> element should have the 'fa-li' class");
  });

  test("Setting the listItem to a subexpression value also works", async function(assert) {
    this.set('isList', true);
    await render(hbs`{{fa-icon icon="credit-card" listItem=(if isList true)}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-li'), "The <i> element should have the 'fa-li' class");
  });

  // border
  test("Setting the border property adds the 'fa-border' class", async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" border=true}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-border'), "The <i> element should have the 'fa-border' class");
  });

  test("Setting the border property to a bound value also works", async function(assert) {
    this.set('hasBorder', true);
    await render(hbs`{{fa-icon icon="credit-card" border=hasBorder}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-border'), "The <i> element should have the 'fa-border' class");
  });

  test("Setting the border property to a subexpression also works", async function(assert) {
    this.set('hasBorder', true);
    await render(hbs`{{fa-icon icon="credit-card" border=(if hasBorder true)}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-border'), "The <i> element should have the 'fa-border' class");
  });

  // pull
  test(`Setting the pull property to 'left' adds the 'fa-pull-left' class`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" pull='left'}}`);
    assert.dom('i').hasClass('fa-pull-left', `The <i> element should have the 'fa-pull-left' class`);
  });

  test(`Setting the pull property to 'right' adds the 'fa-pull-right' class`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" pull='right'}}`);
    assert.dom('i').hasClass('fa-pull-right', `The <i> element should have the 'fa-pull-right' class`);
  });

  test(`Setting the pull property to a bound value works`, async function(assert) {
    this.set('direction', 'left');
    await render(hbs`{{fa-icon icon="credit-card" pull=direction}}`);
    assert.dom('i').hasClass('fa-pull-left', `The <i> element should have the right class`);
  });

  // spin
  test("Setting the spin property adds the 'fa-spin' class", async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" spin=true}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-spin'), "The <i> element should have the 'fa-spin' class");
  });

  test("Setting the spin property also works with bound values", async function(assert) {
    this.set('hasSpin', true);
    await render(hbs`{{fa-icon icon="credit-card" spin=hasSpin}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-spin'), "The <i> element should have the 'fa-spin' class");
  });

  test("Setting the spin property also works with subexpressions", async function(assert) {
    this.set('hasSpin', true);
    await render(hbs`{{fa-icon icon="credit-card" spin=(if hasSpin true)}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-spin'), "The <i> element should have the 'fa-spin' class");
  });

  // pulse
  test("Setting the pulse property adds the 'fa-pulse' class", async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" pulse=true}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-pulse'), "The <i> element should have the 'fa-pulse' class");
  });

  test("Setting the pulse property to a bound value also works", async function(assert) {
    this.set('hasPulse', true);
    await render(hbs`{{fa-icon icon="credit-card" pulse=hasPulse}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-pulse'), "The <i> element should have the 'fa-pulse' class");
  });

  test("Setting the pulse property to a subexpression also works", async function(assert) {
    this.set('hasPulse', true);
    await render(hbs`{{fa-icon icon="credit-card" pulse=(if hasPulse true)}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-pulse'), "The <i> element should have the 'fa-pulse' class");
  });

  // rotate
  test(`I can set the rotate property as a number literal - rotate=90`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" rotate=90}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-rotate-90`), `The <i> element should have the 'fa-rotate-90' class`);
  });

  test(`I can set the rotate property as a string literal - rotate="180"`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" rotate="180"}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-rotate-180`), `The <i> element should have the 'fa-rotate-180' class`);
  });

  test(`I can set the rotate property to a bound value - rotate=degrees`, async function(assert) {
    this.set('degrees', 270);
    await render(hbs`{{fa-icon icon="credit-card" rotate=degrees}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-rotate-270`), `The <i> element should have the 'fa-rotate-270' class`);
  });

  test(`I can set the rotate property to a subexpression - rotate=degrees`, async function(assert) {
    this.set('rotate', true);
    await render(hbs`{{fa-icon icon="credit-card" rotate=(if rotate 270)}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-rotate-270`), `The <i> element should have the 'fa-rotate-270' class`);
  });

  // flip
  test(`I can set the the flip property to 'horizontal'`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" flip='horizontal'}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-flip-horizontal`), `The <i> element should have the 'fa-flip-horizontal' class`);
  });

  test(`I can set the the flip property to 'vertical'`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" flip='vertical'}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-flip-vertical`), `The <i> element should have the 'fa-flip-vertical' class`);
  });

  test(`I can set the the flip property to a bound value`, async function(assert) {
    this.set('flip', 'vertical')
    await render(hbs`{{fa-icon icon="credit-card" flip=flip}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-flip-vertical`), `The <i> element should have the 'fa-flip-vertical' class`);
  });

  test(`I can set the the flip property to a bound value`, async function(assert) {
    this.set('isVertical', true)
    await render(hbs`{{fa-icon icon="credit-card" flip=(if isVertical 'vertical' 'horizontal')}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-flip-vertical`), `The <i> element should have the 'fa-flip-vertical' class`);
  });

  // stack
  test(`I can set the stack property as a number`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" stack=1}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-stack-1x`), `The <i> element should have the 'fa-stack-1x' class`);
  });

  test(`I can set the stack property as a string`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" stack="2"}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-stack-2x`), `The <i> element should have the 'fa-stack-2x' class`);
  });

  test(`I can set the stack property to a boundValue`, async function(assert) {
    this.set('stack', 2);
    await render(hbs`{{fa-icon icon="credit-card" stack=stack}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-stack-2x`), `The <i> element should have the 'fa-stack-2x' class`);
  });

  test(`I can set the stack property to a subexpression`, async function(assert) {
    this.set('big', true);
    await render(hbs`{{fa-icon icon="credit-card" stack=(if big 2 1)}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass(`fa-stack-2x`), `The <i> element should have the 'fa-stack-2x' class`);
  });

  // inverse
  test("Setting the inverse property adds the 'fa-inverse' class", async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" inverse=true}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-inverse'), "The <i> element should have the 'fa-inverse' class");
  });

  test("Setting the inverse property to a bound value works", async function(assert) {
    this.set('inverse', true);
    await render(hbs`{{fa-icon icon="credit-card" inverse=inverse}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-inverse'), "The <i> element should have the 'fa-inverse' class");
  });

  test("Setting the inverse property to a subexpression works", async function(assert) {
    this.set('inverse', true);
    await render(hbs`{{fa-icon icon="credit-card" inverse=(if inverse true)}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('fa-inverse'), "The <i> element should have the 'fa-inverse' class");
  });

  // ariaHidden
  test(`Setting the aria-hidden property to true sets the aria-hidden attribute to 'true'`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" ariaHidden=true}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('aria-hidden'), 'true', `The aria-hidden attribute of the <i> element should be 'true'`);
  });

  test(`Setting the aria-hidden property to false sets the aria-hidden attribute to undefined`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" ariaHidden=false}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('aria-hidden'), undefined, `The aria-hidden attribute of the <i> element should be undefined`);
  });

  test(`Setting the aria-hidden property to undefined sets the aria-hidden attribute to true`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card"}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('aria-hidden'), 'true', `The aria-hidden attribute of the <i> element should be true`);
  });

  // ariaLabel
  test(`Setting the aria-label to a string works`, async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" ariaLabel='Close Me'}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('aria-label'), 'Close Me', `The aria-label attribute of the <i> element should be 'Close me'`);
  });

  test(`Setting the aria-label to bound values works`, async function(assert) {
    this.set('input', 'Close Me');
    await render(hbs`{{fa-icon icon="credit-card" ariaLabel=input}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('aria-label'), 'Close Me', `The aria-label attribute of the <i> element should be 'Close me'`);
    this.set('input', null);
    assert.equal($icon.attr('aria-label'), null, `The aria-label attribute of the <i> element should be null`);
    this.set('input', undefined);
    assert.equal($icon.attr('aria-label'), undefined, `The aria-label attribute of the <i> element should be undefined`);
  });

  // title
  test('I can set the title attribute to a string', async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" title="foo bar"}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('title'), 'foo bar', "The title attribute of the <i> element should be 'foo bar'");
  });

  test('I can set the title attribute to a bound value', async function(assert) {
    this.set('title', 'foo bar');
    await render(hbs`{{fa-icon icon="credit-card" title=title}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('title'), 'foo bar', "The title attribute of the <i> element should be 'foo bar'");
  });

  test('I can set the title attribute to a subexpression', async function(assert) {
    this.set('title', 'foo bar');
    await render(hbs`{{fa-icon icon="credit-card" title=(concat "foo" " " "bar")}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('title'), 'foo bar', "The title attribute of the <i> element should be 'foo bar'");
  });

  // color
  test('I can set the color to a string', async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" color="#ff00ff"}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('style'), "color:#ff00ff", "The style attribute of the <i> element contains the right color");
  });

  test('I can set the color to a bound value', async function(assert) {
    this.set('color', '#ff00ff')
    await render(hbs`{{fa-icon icon="credit-card" color=color}}`);
    let $icon = this.$('i');
    assert.equal($icon.attr('style'), "color:#ff00ff", "The style attribute of the <i> element contains the right color");
    this.set('color', undefined);
    assert.equal($icon.attr('style'), undefined, "The style attribute of the <i> element contains the right color");
  });

  // tagName
  test('I can alter the tagName of the icon', async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" tagName="span"}}`);
    let $icon = this.$('span');
    assert.equal($icon.length, 1, 'The icon should be a <span> element');
  });

  // class
  test('I can add custom static class names', async function(assert) {
    await render(hbs`{{fa-icon icon="credit-card" class="custom-class"}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('custom-class'), "The icon should have the 'custom-class' class");
  });

  test('I can add bound custom class names', async function(assert) {
    this.customClass = 'custom-class';
    await render(hbs`{{fa-icon icon="credit-card" class=customClass}}`);
    let $icon = this.$('i');
    assert.ok($icon.hasClass('custom-class'), "The icon should have the 'custom-class' class");
  });

  // click
  test('I can add a click action', async function(assert) {
    assert.expect(1)
    this.foobar = function() {
      assert.ok(true, 'The action is invoked');
    }
    await render(hbs`{{fa-icon icon="credit-card" click=(action foobar)}}`);
    click('.fa-credit-card');
  });
});
