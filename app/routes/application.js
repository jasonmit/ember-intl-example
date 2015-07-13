import Ember from 'ember';

export default Ember.Route.extend({
	intl: Ember.inject.service(),
	setTitle: Ember.observer('intl.locale', function() {
		let intl =  this.get('intl');
		let title = intl.findTranslationByKey('product.title');
		document.title = intl.formatMessage(title);
	}),
	beforeModel() {
		this.set('intl.locale', 'en-us');
		this.setTitle();
	},
	model() {
		return [{
			name: 'iphone',
			price: 500,
			imageUrl: 'iphone.png'
		},{
			name: 'xbox',
			price: 350,
			imageUrl: 'xbox.png'
		},{
			name: 'playstation',
			price: 400,
			imageUrl: 'playstation.png'
		},{
			name: 'gameboy',
			price: 50,
			imageUrl: 'gameboy.png'
		}].map(product => {
			product.deadline = this.randomDate();
			return product;
		});
	},
	randomDate() {
		var date = new Date();
		date.setDate(date.getDate() + Math.ceil(Math.random(0, 10) * 100));
		return date;
	}
});
