import Vue from "vue";
import Vuex from "vuex";
import Api from '../service/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        currentUser: {}
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        LOGOUT_USER(state) {
            state.currentUser = {};
            window.localStorage.currentUser = JSON.stringify({});
        },
        SET_CURRENT_USER(state, user) {
            state.currentUser = user;
            window.localStorage.currentUser = JSON.stringify(user);
        }
    },
    actions: {
        async loadUsers({commit}) {
            let response = await Api().get('/users');
            let users = response.data;
            commit('SET_USERS', users);

            let user = JSON.parse(window.localStorage.currentUser);
            commit('SET_CURRENT_USER', user);
        },
        logoutUser({commit}) {
            commit('LOGOUT_USER')
        },
        async loginUser({commit}, loginInfo) {
            let response = await Api().post('/sessions', loginInfo);
            let user = response.data;
            commit('SET_CURRENT_USER', user);
        }
    },
    modules: {}
});