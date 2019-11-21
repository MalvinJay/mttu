import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {  LOGIN, SET_USER, 
          CREATE_PROFILE, GET_PROFILES, SET_PROFILES_STATE, SET_PROFILES, UPDATE_PROFILE, DELETE_PROFILE, 
          GET_OFFENSES, CREATE_OFFENSE, DELETE_OFFENSE, UPDATE_OFFENSE, SET_OFFENSES_STATE, SET_OFFENSES, 
          GET_OFFERNDERS, CREATE_OFFERDER, DELETE_OFFERDER, UPDATE_OFFERDER, SET_OFFERNDERS_STATE, SET_OFFERNDERS,          
          LOGOUT, SEND_EMAIL 
} from './constants'
import { apiCall } from '@/store/apiCall'

const BASE_URI = `https://mttu-api.herokuapp.com`;
// const BASE_URI = `http://localhost:8080`;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      data: {}
    },
    profiles: {
      state: 'DATA',
      data: [],
      meta: {
        current_page: "",
        current_page_total: "",
        total_filtered: 0,
        total_pages: "",
      }
    },
    offenses: {
      state: 'DATA',
      data: [],
      meta: {
        current_page: "",
        current_page_total: "",
        total_filtered: 0,
        total_pages: "",
      }
    },
    offenders: {
      state: 'DATA',
      data: [],
      meta: {
        current_page: "",
        current_page_total: "",
        total_filtered: 0,
        total_pages: "",
      }
    },
    reports: {
      state: 'DATA',
      data: []
    }
  },

  getters: {
    user: state => localStorage.getItem('user') || state.user.data,
    profiles: state => state.profiles.data,
    profilesState: state => state.profiles.state,
    profilesMeta: state => state.profiles.meta,

    offenses: state => state.offenses.data,
    offensesState: state => state.offenses.state,
    offensesMeta: state => state.offenses.meta,

    offenders: state => state.offenders.data,
    offendersState: state => state.offenders.state,
    offendersMeta: state => state.offenders.meta
  },

  mutations: {
    [SET_USER] (state, data) {
      state.user.data = data
    },
    [SET_PROFILES_STATE] (state, data) {
      state.profiles.state = data
    },
    [SET_PROFILES] (state, data) {
      state.profiles.data = data.users
      state.profiles.meta = data
    },
    [SET_OFFENSES_STATE] (state, data) {
      state.offenses.state = data
    },
    [SET_OFFENSES] (state, data) {
      state.offenses.data = data.offenses
      state.offenses.meta = data
    },
    [SET_OFFERNDERS_STATE] (state, data) {
      state.offenders.state = data
    },
    [SET_OFFERNDERS] (state, data) {
      state.offenders.data = data.offenders
      state.offenders.meta = data
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
          commit(SET_USER, response.data)
          resolve(response)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      })      
    },

    // Profiles
    [GET_PROFILES] ({ state, commit, rootGetters }, {page = 1, cache = true, search = ''} = {}) {
      var query = `?page=${page}&limit=12`
      if(search) query = query + `&search_value=${search}`
      commit(SET_PROFILES_STATE, 'LOADING')

      if (cache && state.profiles.data.length !== 0) {
        commit(SET_PROFILES_STATE, 'DATA')
      } else {
        return new Promise((resolve, reject) => {
          apiCall({
          url: `${BASE_URI}/users${query}`,
          method: 'GET'
        })
        .then((response) => {
          commit(SET_PROFILES_STATE, 'DATA')
          commit(SET_PROFILES, response.data)
          resolve(response)
        })
        .catch((error) => {
          commit(SET_PROFILES_STATE, 'ERROR')
          reject(error)
        })
        })
      }
    },   
    [CREATE_PROFILE] ({ commit, rootGetters, dispatch }, profile) {
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/users`,
          method: 'POST',
          data: profile
        }).then((response) => {
          dispatch('getProfiles', {page: 1, cache: false})
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    [UPDATE_PROFILE] ({ commit, rootGetters, dispatch }, profile) {
      // commit(SET_PROFILES_STATE, 'LOADING')
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/users/${profile.id}`,
          method: 'PUT',
          data: profile
        }).then((response) => {
          dispatch('getProfiles', {page: 1, cache: false})
          commit(SET_PROFILES_STATE, 'DATA')
          resolve(response)
        }).catch((error) => {
          commit(SET_PROFILES_STATE, 'ERROR')
          reject(error)
        })
      })
    },
    [DELETE_PROFILE] ({ commit, rootGetters, dispatch }, id) {
      commit(SET_PROFILES_STATE, 'LOADING')
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/users/${id}`,
          method: 'DELETE',
        }).then((response) => {
          dispatch('getProfiles', {page: 1, cache: false})
          commit(SET_PROFILES_STATE, 'DATA')
          resolve(response)
        }).catch(error => {
          commit(SET_PROFILES_STATE, 'ERROR')
          reject(error)
        })
      })
    },        

    // Offenses
    [GET_OFFENSES] ({ state, commit, rootGetters }, {page = 1, cache = true, search = ''} = {}) {
      var query = `?page=${page}&limit=12`
      if(search) query = query + `&search_value=${search}`
      commit(SET_OFFENSES_STATE, 'LOADING')

      if (cache && state.offenses.data.length !== 0) {
        commit(SET_OFFENSES_STATE, 'DATA')
      } else {
        return new Promise((resolve, reject) => {
          apiCall({
          url: `${BASE_URI}/offenses${query}`,
          method: 'GET'
        })
        .then((response) => {
          commit(SET_OFFENSES_STATE, 'DATA')
          commit(SET_OFFENSES, response.data)
          resolve(response)
        })
        .catch((error) => {
          commit(SET_OFFENSES_STATE, 'ERROR')
          reject(error)
        })
        })
      }
    },   
    [CREATE_OFFENSE] ({ commit, rootGetters, dispatch }, offense) {
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/offenses`,
          method: 'POST',
          data: offense
        })
        .then((response) => {
          console.log("I'm done creating an offense")
          dispatch('getOffenses', { page: 1, cache: false} )
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
      })
    },
    [UPDATE_OFFENSE] ({ commit, rootGetters }, product) {
      // commit(SET_PROFILES_STATE, 'LOADING')
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/offenses`,
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
    [DELETE_OFFENSE] ({ commit, rootGetters }, id) {
      commit(SET_PROFILES_STATE, 'LOADING')
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/offenses`,
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

    // Offenders
    [CREATE_OFFERDER] ({ commit, rootGetters, dispatch }, offense) {
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/offenses`,
          method: 'POST',
          data: offense
        })
        .then((response) => {
          console.log("I'm done creating an offense")
          dispatch('getOffenses', { page: 1, cache: false} )
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
      })
    },          
    [GET_OFFERNDERS] ({ commit, rootGetters, dispatch }, offense) {
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/offenses`,
          method: 'POST',
          data: offense
        })
        .then((response) => {
          console.log("I'm done creating an offense")
          dispatch('getOffenses', { page: 1, cache: false} )
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
      })
    },
    [UPDATE_OFFERDER] ({ commit, rootGetters }, product) {
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/offenses`,
          method: 'PUT',
          token: rootGetters.token,
          data: product
        }).then((response) => {
          // commit(SET_PROFILES_STATE, 'DATA')
          resolve(response)
        }).catch((error) => {
          // commit(SET_PROFILES_STATE, 'ERROR')
          reject(error)
        })
      })
    },
    [DELETE_OFFERDER] ({ commit, rootGetters }, id) {
      // commit(SET_PROFILES_STATE, 'LOADING')
      return new Promise((resolve, reject) => {
        apiCall({
          url: `${BASE_URI}/offenses`,
          method: 'DELETE',
          token: rootGetters.token
        }).then((response) => {
          // commit(SET_PROFILES_STATE, 'DATA')
          resolve(response)
        }).catch(error => {
          // commit(SET_PROFILES_STATE, 'ERROR')
          reject(error)
        })
      })
    },        
  }
});
