import { moduleForComponent, test } from 'ember-qunit';
import instanceInitializer from '../../instance-initializers/ember-intl';

moduleForComponent('x-product', 'XProductComponent', {
	unit: true,
	needs: [
		'service:intl',
		'ember-intl@adapter:-intl-adapter',
		'ember-intl@formatter:format-message',
		'helper:format-message',
		'helper:intl-get'
	],
	setup() {
		instanceInitializer.initialize(this);
		const intl = this.container.lookup('service:intl');
		intl.setLocale('en-us');
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
