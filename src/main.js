import Vue from 'vue';
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Homepage },
    { path: '/login', component: LoginForm }
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')