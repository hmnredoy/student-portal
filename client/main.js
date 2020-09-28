import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import '../imports/js/app';
import '../imports/style/app';
import VueMeteorTracker from 'vue-meteor-tracker';
import App from '../imports/ui/App.vue';
import router from "../imports/router";

Vue.use(VueMeteorTracker);
// import './components'

window.capitalize = (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

Vue.component('Navbar', require('../imports/ui/layouts/Navbar').default)
Vue.component('Master', require('../imports/ui/layouts/Master').default)

Meteor.startup(() => {
  new Vue({
    el: '#app',
    router,
    ...App,
  });
});