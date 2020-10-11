import Vue from 'vue';
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store';
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker';
import 'vue2-timepicker/dist/VueTimepicker.css'
import VModal from 'vue-js-modal';

Vue.component('Datepicker', Datepicker);
Vue.component('Timepicker', VueTimepicker);
Vue.use(VModal)

import App from './App';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RegisterFormStudent from './components/RegisterFormStudent';
import RegisterFormTeacher from './components/RegisterFormTeacher';
import UserList from './components/UserList';
import BookingPage from './components/BookingPage';
import LessonBooking from './components/LessonBooking';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Homepage, name: "homepage" },
    { path: '/login', component: LoginForm, name: "loginForm" },
    { path: '/register', component: RegisterForm, name: "registerForm"},
    { path: '/register/student', component: RegisterFormStudent, name: "registerFormStudent"},
    { path: '/register/teacher', component: RegisterFormTeacher, name: "registerFormTeacher"},
    { path: '/admin/users', component: UserList},
    { path: '/booking', component: BookingPage, name: "bookingPage"},
    { path: '/lesson/booking/:teacherId', component: LessonBooking, name:'lessonBooking', props: true}
  ]
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')