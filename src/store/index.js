import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { LOGIN, SET_USER , GET_USER, CREATE_PROFILE, GET_PROFILES, SET_PROFILES_STATE, SET_PROFILES, UPDATE_PROFILE, 
  DELETE_PROFILE, LOGOUT, SEND_EMAIL 
} from './constants'
import { apiCall } from '@/store/apiCall'

const BASE_URI = `https://mttu-api.herokuapp.com`

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      data: {

      }
    },
    profiles: {
      state: 'DATA',
      data: [],
      meta: {
        totalCount: ''
      }
    },
    offenses: {

    },
    reports: {

    }
  },
  getters: {
    user: state => state.user.data,
    profiles: state => state.profiles.data,
    profilesState: state => state.profiles.state,
    profilesMeta: state => state.profiles.meta
  },
  mutations: {
    [SET_USER] (state, data) {
      state.user.data = data
    },
    [SET_PROFILES_STATE] (state, data) {
      state.profiles.state = data
    },
    [SET_PROFILES] (state, data) {
      state.profiles.data = data
      state.profiles.meta.totalCount = data.length
    }
  },
  actions: {
    // Login
    [LOGIN] ({state, commit}, data) {
      return new Promise((resolve, reject) => {
        var url = `${BASE_URI}/profile/login`
        var loginData = {
          'email': data.name,
          'password': data.password
        }
        axios.post(url, loginData)
        .then((response) => {
          console.log('Data after login: ', response)
          commit('SET_USER', response)
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      })      
    },
    [GET_PROFILES] ({ state, commit, rootGetters }, {page = 1, cache = true} = {}) {
      var query = `?page=${page}&limit=12`
      commit(SET_PROFILES_STATE, 'LOADING')
      if (cache && state.profiles.data.length !== 0) {
        commit(SET_PROFILES_STATE, 'DATA')
      } else {
        return new Promise((resolve, reject) => {
          apiCall({
          url: `${BASE_URI}/users${query}`,
          method: 'GET',
          auth: {
              username: state.user.data.full_name,
              password: localStorage.getItem('userPass')
            }
          })
          .then((response) => {
            commit(SET_PROFILES_STATE, 'DATA')
            commit(SET_PROFILES, response)
            resolve(response)
          }).catch((error) => {
            commit(SET_PROFILES_STATE, 'ERROR')
            reject(error)
          })
        })
      }
    },   
    [CREATE_PROFILE] ({ commit, rootGetters, dispatch }, profile) {
      commit(SET_PROFILES_STATE, 'LOADING')
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/profiles`,
          method: 'POST',
          token: rootGetters.token,
          data: profile
        }).then((response) => {
          commit(SET_PROFILES_STATE, 'DATA')
          dispatch('getProfiles', {page: 1, cache: false})
          resolve(response)
        }).catch((error) => {
          commit(SET_PROFILES_STATE, 'ERROR')
          reject(error)
        })
      })
    },
    [UPDATE_PROFILE] ({ commit, rootGetters }, product) {
      commit(SET_PROFILES_STATE, 'LOADING')
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}profiles`,
          method: 'PUT',
          token: rootGetters.token,
          data: product
        }).then((response) => {
          commit(SET_PROFILES_STATE, 'DATA')
          resolve(response)
        }).catch((error) => {
          commit(SET_PROFILES_STATE, 'ERROR')
          reject(error)
        })
      })
    },
    [DELETE_PROFILE] ({ commit, rootGetters }, id) {
      commit(SET_PROFILES_STATE, 'LOADING')
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}profiles`,
          method: 'DELETE',
          token: rootGetters.token
        }).then((response) => {
          commit(SET_PROFILES_STATE, 'DATA')
          resolve(response)
        }).catch(error => {
          commit(SET_PROFILES_STATE, 'ERROR')
          reject(error)
        })
      })
    },        
  }
});
