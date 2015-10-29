import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this.set('user', Ember.Object.create({loggedIn: false}));
  },
});
