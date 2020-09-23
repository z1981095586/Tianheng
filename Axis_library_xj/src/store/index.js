import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    peopleData: {},
    companyID:"",
    library_num:"",
    passwordFlag:false
  },
  mutations: {

    setPeopleData(state, str) {//设置用户数据
      state.peopleData = str
    },
    setPasswordFlag(state, str) {//设置系统密码是否输入标识
      state.passwordFlag = str
    },
    setCompanyID(state, str) {//设置companyID和library_num
    state.companyID=str.companyID
    state.library_num=str.library_num
    }
  }

})
export default store
