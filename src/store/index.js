import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  // state 里面放的是全局共享的数据
  state: {
    classList: [],
    currentClass: ''
  },
  // mutations里面放的是操作state里面的数据的方法，state里面的数据必须通过mutations来操作
  mutations: {
    initClassList (state, list) {
      state.classList = list
      // 默认班级是班级列表的第一个
      state.currentClass = list[0].className
    },
    changeClass (state, className) {
      state.currentClass = className
    }
  },
  // actions里面可以执行异步操作也是通过mutations来操作state
  actions: {

  },
  // 对数据进行加工，不改变原数据
  getters: {

  }
})
export default store
