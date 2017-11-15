import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Shapes');

test('All squares show up', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    const squares = find('.squares img');
    assert.equal(squares.length, 4);
    squares.on('error', function () {
      const filename = this.src.replace(/^.*[\\/]/, '')
      assert.ok(false, `${filename} image didn't load`);
    });
  });
});

test('All transparent circles show up', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    const circles = find('.transparent-circle img');
    assert.equal(circles.length, 1);
    circles.on('error', function () {
      const filename = this.src.replace(/^.*[\\/]/, '')
      assert.ok(false, `${filename} image didn't load`);
    });
  });
});

test('All green background circles show up', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    const circles = find('.circle-with-green-background img');
    assert.equal(circles.length, 1);
    circles.on('error', function () {
      const filename = this.src.replace(/^.*[\\/]/, '')
      assert.ok(false, `${filename} image didn't load`);
    });
  });
});
