import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';


import Search from './Search.vue';
import About from './About.vue';
import Profile from './Profile.vue';
import Navbar from './Navbar.vue';
import EditProfile from './EditProfile.vue';

window.donosaurColors = ['rgba(75, 78, 109, 0.7)', 'rgba(161, 232, 135, 0.7)', 'rgba(3, 167, 151, 0.7)', 'rgba(196, 147, 176, 0.7)'];
//window.apiLocation = "http://donosaur.org/api";
window.apiLocation = "http://localhost:8090";

window.formatMoney = function(val){
  if (!val) {
    val = 0;
  }
  var n = 0;
  var x = 3;
  var pre = '';
  if(val > 1e9){
    val = val/1e9;
    pre = ' Billion';
    if(val%1 !== 0)
      n = 2;
  }
  if(val > 1e6){
    val = val/1e6;
    pre = ' Million';
    if(val%1 !== 0)
      n = 2;
  }

  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return '$' + val.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,') + pre;
};

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.filter('toTitleCase', function (str) {
  if(!str)return "";
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
});

Vue.filter('formatMoney', window.formatMoney);

var router = new VueRouter();

var App = Vue.extend({
  components:{
    navbar: Navbar
  }
});


router.map({
  '/search': {
    component: Search
  },
  '/about': {
    component: About
  },
  '/profile/:ein': {
    component: Profile
  },
  '/editProfile/:ein/:key': {
    component: EditProfile
  }
});

router.redirect({
  // redirect any not-found route to home
  '*': '/search'
});

router.start(App, '#app');
