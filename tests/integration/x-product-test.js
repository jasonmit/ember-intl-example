import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import instanceInitializer from '../../instance-initializers/ember-intl';

moduleForComponent('x-product', 'XProductComponent Integration', {
  integration: true,
  setup() {
    instanceInitializer.initialize(this);
    const intl = this.container.lookup('service:intl');
    intl.setLocale('en-us');
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.set('price', 1000);
  this.set('deadline', new Date());
  this.render(hbs`{{x-product price=price deadline=deadline}}`);
  let output = this.$().text();
  assert.ok(output);
});
