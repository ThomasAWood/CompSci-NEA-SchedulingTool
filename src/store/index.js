import Vue from "vue";
import Vuex from "vuex";
import Api from '../service/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: []
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        }
    },
    actions: {
        async loadUsers({commit}) {
            let response = await Api().get('/users');
            let users = response.data.data;
            commit('SET_USERS', users);
        }
    },
    modules: {}
});