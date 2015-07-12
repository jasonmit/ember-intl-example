import Ember from 'ember';

export default Ember.Controller.extend({
	intl: Ember.inject.service(),
	locales: Ember.A(['en-us', 'en-gb', 'fr-fr']),
	actions: {
		changeLocale(localeName) {
			this.set('intl.locale', localeName);
		}
	}
});
