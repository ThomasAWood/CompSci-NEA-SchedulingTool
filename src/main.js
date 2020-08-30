import Vue from 'vue';
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store';

import App from './App';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Test from './components/test'
import UserList from './components/UserList.vue'


Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Homepage },
    { path: '/login', component: LoginForm },
    { path: '/register', component: RegisterForm},
    { path: '/test', component: Test},
    { path: '/admin/users', component: UserList}
  ]
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')