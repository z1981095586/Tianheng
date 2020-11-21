import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
      companyId:1,
      openOutline:false,
      showLoadingLog:false,
      staff_id:null,
      staff_name:null,
      ifShift:false,
      shiftName:"",
      workshopId:null,
      commonClock:null
    },
    modules:{

    },
    mutations:{
      setCompanyId(state,companyId){
        state.companyId = companyId
      },
    },
  getters
});

export default store
