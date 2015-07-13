import Ember from 'ember';

let now = new Date();
let yesterday = now.setDate(now.getDate() - 1);
let threeDaysAgo = now.setDate(now.getDate() - 2);

export default Ember.Controller.extend({
	intl: Ember.inject.service(),
	locales: Ember.A(['en-us', 'en-gb', 'fr-fr']),
	actions: {
		changeLocale(localeName) {
			this.set('intl.locale', localeName);
		}
	},
	num: 0,
	now: now,
	yesterday: yesterday,
	threeDaysAgo: threeDaysAgo,
	incrementTime: Ember.on('init', function() {
			setInterval(() => {
					Ember.run(() => {
							this.set('now', new Date());
							this.incrementProperty('num');
					});
			}, 500);
	})
});
