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
        bookings: [],
        students: []
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
       },
        SET_STUDENTS(state, students) {
            state.students = students
        },
        CLEAR_STUDENTS(state) {
            state.students = []
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
                let lessonResponse = await Api().post('/search/teachers/lessons', searchInfo)
                let lessons = lessonResponse.data.lessonInstances
                let bookingsResponse = await Api().get(`/teachers/bookings/${searchInfo.userId}`)
                let bookings = bookingsResponse.data
                //Removes lesson which have a booking, so two calendar events don't show up
                console.log('lessonLength', lessons.length)
                for (let lesson = 0; lesson < lessons.length; lesson++) {
                    console.log('Lesson1', lesson)
                    for (let booking = 0; booking < bookings.length; booking++) {
                        console.log('Booking1', booking)
                        if ((bookings[booking].lessonId == lessons[lesson].id) && (lessons[lesson].start == bookings[booking].start)) {
                            console.log('Booking lesson overlap triggered')
                            lessons.splice(lesson, 1);
                        }
                    }
                }
                commit('SET_TEACHERS_LESSONS', lessons)
            } catch {
                return {error: "There was an error when loading teachers lessons"}
            }
            },
        async loginUser({commit}, loginInfo) {
            try {
                let response = await Api().post('/users/sessions', loginInfo);
                let user = response.data;
                if (user.error) {
                    return user.error
                }
                commit('SET_CURRENT_USER', user);
                return user
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
                console.log('searchInput:', searchInput)
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
        async searchForStudents({commit}, searchInput) {
            try {
                console.log('searchInput:', searchInput)
                let response = await Api().post('/students/search', searchInput);
                console.log(response)
                let students = response.data
                if (students.error) {
                    return students.error
                }
                commit('SET_STUDENTS', students)
                return students
            } catch {
                return {error: "There was an error while searching for that student"}
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
                //Adds the students name to each of the bookings so it can be displayed to the teacher
                for (let index = 0; index < bookings.length; index++) {
                    try {
                        let studentResponse = await Api().get(`/users/${bookings[index].studentId}`);
                        let student = studentResponse.data
                        bookings[index].title = student.fname + ' ' + student.lname
                    } catch {
                        bookings[index].title = 'Name Error'
                        
                    }
                }
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
                //Adds the students name to each of the bookings so it can be displayed to the teacher
                for (let index = 0; index < bookings.length; index++) {
                    try {
                        //console.log('Booking', bookings[index])
                        let teacherResponse = await Api().get(`/users/${bookings[index].teacherId}`);
                        let teacher = teacherResponse.data
                        bookings[index].title = teacher.fname + ' ' + teacher.lname
                    } catch {
                        bookings[index].title = 'Name Error'
                        
                    }
                }
                commit('SET_BOOKINGS', bookings)
                return
            } catch {
                return { error: "There was an error while getting the students bookings" }
            }
        },
        async cancelBooking({commit}, id) {
            try {
                let response = await Api().post(`/bookings/cancel/${id}`)
                let cancellation = response.data
                if (cancellation.error) {
                    return cancellation.error
                } else {
                    commit('SET_BOOKINGS', [])
                    return cancellation 
                }
            } catch {
                return { error: "There was an error while cancelling the booking. Please try again"}
            }
        },
        async deleteLesson({commit}, id) {
            try {
                let response = await Api().delete(`/lessons/${id}`)
                let deletion = response.data
                console.log('Deletion', deletion)
                if (deletion.error) {
                    return deletion.error
                } else {
                    commit('SET_TEACHERS_LESSONS', [])
                    return deletion
                }
            } catch {
                return { error: "There was an error while deleting the lesson."}
            }
        }
}});