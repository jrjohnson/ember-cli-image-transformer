import { currentURL, visit, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Load Shapes', function(hooks) {
  setupApplicationTest(hooks);

  function testLoad(assert, selector) {
    const done = assert.async(1);
    assert.equal(currentURL(), '/');
    const images = findAll(selector);
    assert.equal(images.length, 1);
    const img = images[0];

    const reloadedImage = new Image();
    reloadedImage.addEventListener('error', () => {
      const filename = img.src.replace(/^.*[\\/]/, '')
      assert.ok(false, `${filename} image didn't load`);
      reloadedImage.remove();
      done();
    });
    reloadedImage.addEventListener('load', () => {
      assert.ok(true);
      done();
    });
    reloadedImage.src =img.src;
  }

  test('circle with green background', async function(assert) {
    assert.expect(3);
    assert.timeout(1000);
    await visit('/');

    testLoad(assert, '.circle-with-green-background img');
  });

  test('sized squares', async function(assert) {
    assert.expect(12);
    assert.timeout(1000);
    await visit('/');

    testLoad(assert, '.squares img:nth-of-type(1)');
    testLoad(assert, '.squares img:nth-of-type(2)');
    testLoad(assert, '.squares img:nth-of-type(3)');
    testLoad(assert, '.squares img:nth-of-type(4)');
  });

  test('transparent circle', async function(assert) {
    assert.expect(3);
    assert.timeout(1000);
    await visit('/');

    testLoad(assert, '.transparent-circle img');
  });

  test('different destination square', async function(assert) {
    assert.expect(3);
    assert.timeout(1000);
    await visit('/');

    testLoad(assert, '.square-in-a-different-destination img');
  });
});
