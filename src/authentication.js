import { isEmptyObject } from 'jquery';
import store from './store/index';

export const loggedIn = (to, from, next) => {
    if (!isEmptyObject(store.state.currentUser)) {
        next();
    } else {
        next({ name: 'landingPage' });
    }
}

export const loggedInStudent = (to, from, next) => {
    if ((!isEmptyObject(store.state.currentUser)) && (!store.state.currentUser.isTeacher)) {
        next();
    } else {
        next({ name: 'homepage' });
    }
}

export const loggedInTeacher = (to, from, next) => {
    if ((!isEmptyObject(store.state.currentUser)) && (store.state.currentUser.isTeacher)) {
        next();
    } else {
        next({ name: 'homepage' });
    }
}

export const loggedOut = async (to, from, next) => {
    await store.dispatch('loadUsers');
    if (isEmptyObject(store.state.currentUser)) {
        next();
    } else {
        next({ name: 'homepage' });
    }
}