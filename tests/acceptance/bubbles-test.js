import Ember from 'ember';
import { test, module } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';

let application;

module('Acceptance | bubbles fa-icon test', {
    beforeEach: function() {
        application = startApp();
    },
    afterEach: function() {
        Ember.run(application, 'destroy');
    }
});

test('bubbles attribute is respected on action', function(assert) {
  visit('/');
  click('.bubbles');
  andThen(function() {
      assert.equal(currentURL(), '/');
  });
});

// the below works (ie bubbles will stop the browser from propagating the event)
// <li><a href='#' class='bubbles' {{action 'trip' model bubbles=false}}>bubbles</a></li>
