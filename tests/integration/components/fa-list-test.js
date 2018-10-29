import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | {{fa-list}}', function(hooks) {
  setupRenderingTest(hooks);

  test("An <ul> element with the class 'fa-ul' is rendered", async function(assert) {
    await render(hbs`{{fa-list}}`);

    let $list = this.$('ul');
    assert.equal($list.length, 1, 'An <ul> element is rendered');
    assert.ok($list.hasClass('fa-ul'), "The <ul> element should have the 'fa-ul' class");
  });

  test('A contextual {{fa-icon}} component with listItem=true is yielded to a block', async function(assert) {
    await render(hbs`
      {{#fa-list as |l|}}
        <li>{{l.fa-icon icon="star"}}Item 1</li>
        <li>{{l.fa-icon icon="star"}}Item 2</li>
      {{/fa-list}}
    `);

    let $icons = this.$('i');
    assert.equal($icons.length, 2, 'Two <i> elements are rendered');
    assert.ok($icons.hasClass('fa-li'), "The <i> elements have the 'fa-li' class");
  });
});
