import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//라이프 사이클 이해하고 돌아가는 동작 이해하지
export default new Vuex.Store({
  state: {
    settings : { // 서버에서 데이터를 가져온다.
      starttime : '08:00',
      lang : 'ko'
    },
    userId : undefined
  },
  getters : {
    savedSettings : (state) =>{
      return state.settings; 
    },
    getUserId : (state) =>{
      return state.userId;
    }
  },
  actions: {
    actionSaveSettings : ( {commit}, payLoad) =>{ 
      commit('mutaionSaveSettings',payLoad)
    },
    actionSaveUserId : ( {commit}, payload) => {
      commit('mutaionsSaveUserId',payload)
    }
  },
  mutations: {
    mutaionSaveSettings : (state,payLoad) =>{
      state.settings = payLoad;
    },
    mutaionsSaveUserId : (state,payLoad) => {
      state.userId = payLoad; 
    }
  },
  modules: {
  }
})
