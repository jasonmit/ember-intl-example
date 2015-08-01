import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import initializer from '../../initializers/ember-intl';

moduleForComponent('x-product', 'XProductComponent', {
  integration: true,
  setup() {
    initializer.initialize(this.container);
    const intl = this.container.lookup('service:intl');
    intl.setLocale('en-us');
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{x-product price=price deadline=deadline}}`);
  this.set('price', 1000);
  this.set('deadline', new Date());
  let output = this.$().text();
  assert.ok(output);
});
