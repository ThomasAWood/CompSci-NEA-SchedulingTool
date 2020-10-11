import Vue from "vue";
import Vuex from "vuex";
import Api from '../service/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        currentUser: {},
        teachersLessons: [],
        teachers: [],
        bookings: []
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
        SET_TEACHERS_LESSONS(state, lessons) {
            state.teachersLessons = lessons;
        },
        SET_TEACHERS(state, teachers) {
            state.teachers = teachers
        },
        CLEAR_TEACHERS(state) {
            state.teachers = []
        },
        ADD_BOOKING(state, booking) {
            state.bookings.append(booking);
        },
        SET_BOOKINGS(state, bookings) {
            state.bookings = bookings
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
        async loadTeachersLessons({commit}, searchInfo) {
            try {
                let response = await Api().post('/search/teachers/lessons', searchInfo)
                let lessons = response.data.lessonInstances
                commit('SET_TEACHERS_LESSONS', lessons)
            } catch {
                return {error: "There was an error when loading teachers lessons"}
            }
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
                return user
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
                commit('SET_TEACHERS_LESSONS', lesson)
                return lesson  
            } catch {
                return {error: "There was an error while creating the lesson"}
            }
        },
        async searchForTeachers({commit}, searchInput) {
            try {
                let response = await Api().post('/teachers/search', searchInput);
                console.log(response)
                let teachers = response.data
                if (teachers.error) {
                    return teachers.error
                }
                commit('SET_TEACHERS', teachers)
                return teachers
            } catch {
                return {error: "There was an error while searching the teachers"}
            }
            

        },
        async createBooking({commit}, bookingInfo) {
            try {
                console.log(bookingInfo)
                let reponse = await Api().post('/bookings', bookingInfo)
                console.log('Create Booking Store response', reponse)
                let booking = reponse.data
                if (booking.error) {
                    return booking.error
                }
                commit('ADD_BOOKING', booking)
                return booking
            } catch {
                return {error: "There was an error while creating the booking"}
            }    
        },
        async loadTeachersBookings({commit}, userId) {
            try {
                let response = await Api().get(`/teachers/bookings/${userId}`)
                let bookings = response.data
                if (bookings.error) {
                    return bookings.error
                }
                commit('SET_BOOKINGS', bookings)
                return
            } catch {
                return { error: "There was an error while getting the teachers bookings" }
            }
        },
        async loadStudentsBookings({commit}, userId) {
            try {
                let response = await Api().get(`/students/bookings/${userId}`)
                let bookings = response.data
                if (bookings.error) {
                    return bookings.error
                }
                commit('SET_BOOKINGS', bookings)
                return
            } catch {
                return { error: "There was an error while getting the students bookings" }
            }
        }
}});