import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store';
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker';
import 'vue2-timepicker/dist/VueTimepicker.css'
import VModal from 'vue-js-modal';

Vue.component('Datepicker', Datepicker);
Vue.component('Timepicker', VueTimepicker);
Vue.use(VModal);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false

import App from './App';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RegisterFormStudent from './components/RegisterFormStudent';
import RegisterFormTeacher from './components/RegisterFormTeacher';
import BookingPage from './components/BookingPage';
import LessonBooking from './components/LessonBooking';
import StudentSearch from './components/StudentSearch';
//import Invoicing from './components/Invoicing';
import LandingPage from './components/LandingPage';
import Error404 from './components/Error404';

import { loggedIn, loggedInStudent, loggedInTeacher, loggedOut } from './authentication'

Vue.use(VueRouter);

//, beforeEnter: loggedOut
const router = new VueRouter({
  routes: [
    { path: '/', component: LandingPage, name: "landingPage", beforeEnter: loggedOut},
    { path: '/home', component: Homepage, name: "homepage", beforeEnter: loggedIn},
    { path: '/login', component: LoginForm, name: "loginForm", beforeEnter: loggedOut},
    { path: '/register', component: RegisterForm, name: "registerForm", beforeEnter: loggedOut},
    { path: '/registerStudent', component: RegisterFormStudent, name: "registerFormStudent", beforeEnter: loggedOut},
    { path: '/registerTeacher', component: RegisterFormTeacher, name: "registerFormTeacher", beforeEnter: loggedOut},
    { path: '/booking', component: BookingPage, name: "bookingPage", beforeEnter: loggedInStudent},
    { path: '/lesson/booking/:teacherId', component: LessonBooking, name:'lessonBooking', props: true, beforeEnter: loggedInStudent},
    { path: '/students', component: StudentSearch, name: 'studentSearch', beforeEnter: loggedInTeacher},
    { path: '/*', component: Error404, name: '404'}
  ]
});
//Removed from Routes
//{ path: '/invoicing', component: Invoicing, name: 'invoicing', beforeEnter: loggedInTeacher},

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')