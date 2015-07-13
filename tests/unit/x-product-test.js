import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import initializer from '../../initializers/ember-intl';

moduleForComponent('x-product', 'XProductComponent', {
	unit: true,
	needs: [
		'service:intl',
		'ember-intl@adapter:-intl-adapter',
		'ember-intl@formatter:format-message',
		'helper:intl-get'
	],
	setup() {
		const intl = this.container.lookup('service:intl');
		initializer.initialize(this.container);
		intl.set('locale', 'en-us');
	}
});

test('it renders', function(assert) {
	assert.expect(2);

	const component = this.subject({
		price: 1000,
		deadline: new Date()
	});

	assert.equal(component._state, 'preRender');
	this.render();
	assert.equal(component._state, 'inDOM');
});
