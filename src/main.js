import Vue from 'vue';
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store';

import App from './App';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserList from './components/UserList'


Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Homepage, name: "homepage" },
    { path: '/login', component: LoginForm, name: "loginForm" },
    { path: '/register', component: RegisterForm, name: "registerForm"},
    { path: '/admin/users', component: UserList}
  ]
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')