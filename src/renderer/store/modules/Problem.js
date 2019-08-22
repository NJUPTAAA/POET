const state = {
};

const mutations = {
  HANDLE_CHANGE(state,{key,value}){
    state[key] = value;
  }
};

const actions = {
  changeState({commit,state},data){
    for(let key in data){
      commit('HANDLE_CHANGE',{key,value:data[key]});
    }
    console.log(state);
  }
};

export default {
  state,
  mutations,
  actions,
};
