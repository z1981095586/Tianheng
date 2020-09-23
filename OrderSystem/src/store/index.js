import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store=new Vuex.Store({
    plugins:[createPersistedState()],
state:{
    historySearchData:[]
},
mutations: {
    setHistorySearchData (state, str) {//设置历史搜素数据
        let label={
            label:str
        }
        if(label.label!=""){
            state.historySearchData.unshift(label)
        }
    
   
 
    },
    clearHistorySearchData (state, str) {//清空历史搜素数据
        state.historySearchData=[]
     
   
      },
  }

})
export default store