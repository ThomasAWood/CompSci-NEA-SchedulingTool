import Vue from 'vue';
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store';
import ValidationProvider from 'vee-validate';
import ValidationObserver from 'vee-validate';
import Datepicker from 'vuejs-datepicker';
import Timeselector from 'vue-timeselector'

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('Datepicker', Datepicker);
Vue.component('Timeselector', Timeselector);

import App from './App';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RegisterFormStudent from './components/RegisterFormStudent';
import RegisterFormTeacher from './components/RegisterFormTeacher';
import UserList from './components/UserList';
//import CreateLessonForm from './components/CreateLessonForm';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Homepage, name: "homepage" },
    { path: '/login', component: LoginForm, name: "loginForm" },
    { path: '/register', component: RegisterForm, name: "registerForm"},
    { path: '/register/student', component: RegisterFormStudent, name: "registerFormStudent"},
    { path: '/register/teacher', component: RegisterFormTeacher, name: "registerFormTeacher"},
    { path: '/admin/users', component: UserList},
    //{ path: '/admin/createLesson', component: CreateLessonForm}
  ]
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')