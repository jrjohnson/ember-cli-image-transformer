import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Load Shapes');

function testLoad(assert, selector) {
  const done = assert.async(1);
  assert.equal(currentURL(), '/');
  const images = find(selector);
  assert.equal(images.length, 1);
  const img = images.eq(0);

  const reloadedImage = new Image();
  reloadedImage.addEventListener('error', () => {
    const filename = img.attr('src').replace(/^.*[\\/]/, '')
    assert.ok(false, `${filename} image didn't load`);
    reloadedImage.remove();
    done();
  });
  reloadedImage.addEventListener('load', () => {
    assert.ok(true);
    done();
  });
  reloadedImage.src =img.attr('src');
}

test('circle with green background', function (assert) {
  assert.expect(3);
  assert.timeout(1000);
  visit('/');

  andThen(function () {
    testLoad(assert, '.circle-with-green-background img');
  });
});

test('sized squares', function (assert) {
  assert.expect(12);
  assert.timeout(1000);
  visit('/');

  andThen(function () {
    testLoad(assert, '.squares img:eq(0)');
    testLoad(assert, '.squares img:eq(1)');
    testLoad(assert, '.squares img:eq(2)');
    testLoad(assert, '.squares img:eq(3)');
  });
});

test('transparent circle', function (assert) {
  assert.expect(3);
  assert.timeout(1000);
  visit('/');

  andThen(function () {
    testLoad(assert, '.transparent-circle img');
  });
});

test('different destination square', function (assert) {
  assert.expect(3);
  assert.timeout(1000);
  visit('/');

  andThen(function () {
    testLoad(assert, '.square-in-a-different-destination img');
  });
});
