import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import instanceInitializer from '../../instance-initializers/ember-intl';

moduleForComponent('auth-button', 'Integration | Component | auth button', {
  integration: true,
  setup() {
    instanceInitializer.initialize(this);
    const intl = this.container.lookup('service:intl');
    intl.setLocale('en-us');
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{auth-button}}`);
  assert.equal(this.$().text().trim(), 'Login');
});
