import Vue from 'vue';
import axios from 'axios';
import store from './store';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import HomePage from '../components/HomePage.vue';
import ListingPage from '../components/ListingPage.vue';
import SavedPage from '../components/SavedPage.vue';
import LoginPage from '../components/LoginPage.vue';

let router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/listing/:listing', component: ListingPage, name: 'listing' },
    { path: '/saved', component: SavedPage, name: 'saved' },
    { path: '/login', component: LoginPage, name: 'login' }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  let serverData = JSON.parse(window.vuebnb_server_data) || {};
  if (to.name === 'saved' && !store.state.auth) {
    next('/login')
  } else if (
    to.name === 'listing'
      ? store.getters.getListing(to.params.listing)
      : store.state.listing_summaries.length > 0
    || to.name === 'login'
  ) {
    next();
  }
  else if (!serverData.path || to.path !== serverData.path) {
    axios.get(`/api${to.path}`).then(({data}) => {
      store.commit('addData', {route: to.name, data});
      next();
    });

  }
  else {
    store.commit('addData', {route: to.name, data: serverData});
    serverData.saved.forEach(id => store.commit('toggleSaved', id));
    next();
  }
});

export default router;
