import Vue from "vue";
import Vuex from "vuex";
import Api from '../service/api';
//import { user } from "../../api/config/db.config";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        currentUser: {},
        lessons: []
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
        },
        SET_CURRENT_LESSONS(state, lessons) {
            state.lessons = lessons;
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
            try {
                let response = await Api().post('/users/sessions', loginInfo);
                let user = response.data;
                commit('SET_CURRENT_USER', user);
                return
            } catch {
                return {error: "Username/Password was incorrect. Please try again"}
            }
            
        },
        async registerUser({commit}, registerInfo) {
            try {
                let response = await Api().post('/users', registerInfo);
                let user = response.data;
                if (user.error) {
                    return user.error
                }
                commit('SET_CURRENT_USER', user);
                return
            } catch {
                return {error: "There was an error. Please try registering again"}
            }
        },
        async createLesson({commit}, lessonInfo) {
            try {
                let response = await Api().post('/lessons', lessonInfo);
                let lesson = response.data;
                if (lesson.error) {
                    return lesson.error
                }
                commit('SET_CURRENT_LESSONS', lesson);
                return
            } catch {
                return {error: "There was an error while creating the lesson"}
            }
        }

}});