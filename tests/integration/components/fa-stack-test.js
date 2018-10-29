import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | {{fa-stack}}', function(hooks) {
  setupRenderingTest(hooks);

  test("A <span> tag with the 'fa-stack' class", async function(assert) {
    await render(hbs`{{fa-stack}}`);

    let $stack = this.$('span');
    assert.equal($stack.length, 1, 'A <span> element is rendered');
    assert.ok($stack.hasClass('fa-stack'), "The <span> element should have the 'fa-stack' class");
  });

  test(`I can set the size property to 'lg'`, async function(assert) {
    await render(hbs`{{fa-stack size="lg"}}`);
    let $stack = this.$('span');
    assert.ok($stack.hasClass('fa-lg'), "The <span> element should have the 'fa-lg' class");
  });

  [2, 3, 4, 5].forEach((size) => {
    test(`I can set the size property as a number - size=${size}`, function(assert) {
      this.set('size', size);
      this.render(hbs`{{fa-stack size=size}}`);
      let $stack = this.$('span');
      assert.ok($stack.hasClass(`fa-${size}x`), `The <span> element should have the 'fa-${size}x' class`);
    });

    test(`I can set the size property as a string - size="${size}"`, function(assert) {
      this.set('size', `${size}`);
      this.render(hbs`{{fa-stack size=size}}`);
      let $stack = this.$('span');
      assert.ok($stack.hasClass(`fa-${size}x`), `The <span> element should have the 'fa-${size}x' class`);
    });
  });

  test('A block with stack contextual components is yielded', async function(assert) {
    await render(hbs`
      {{#fa-stack as |s|}}
        {{s.stack-2x icon="fa-square-o"}}
        {{s.stack-1x icon="fa-twitter"}}
      {{/fa-stack}}
    `);

    let $icons = this.$('i');
    assert.equal($icons.length, 2);
    assert.dom($icons[0]).hasClass('fa-stack-2x', 'The second icon has stack 2x');
    assert.dom($icons[1]).hasClass('fa-stack-1x', 'The second icon has stack 1x');
  });
});
