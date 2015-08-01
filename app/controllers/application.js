import Ember from 'ember';

let now          = new Date();
let yesterday    = now.setDate(now.getDate() - 1);
let threeDaysAgo = now.setDate(now.getDate() - 2);

export default Ember.Controller.extend({
  intl: Ember.inject.service(),
  actions: {
    changeLocale(localeName) {
      this.get('intl').setLocale(localeName);
    }
  },
  locales: Ember.A(['en-us', 'en-gb', 'fr-fr']),
  num: 1000,
  now: now,
  yesterday: yesterday,
  threeDaysAgo: threeDaysAgo,
  incrementTime: Ember.on('init', function() {
    Ember.run.later(this, () => {
      this.set('now', new Date());
      this.incrementProperty('num');
      this.incrementTime();
    }, 1000);
  })
});
