const state = {
};

const mutations = {
  HANDLE_CHANGE(state,{key,value}){
    state[key] = value;
  },
  ADD_PROBLEM(state, data) {
    state.problems.push(data);
  },
  EDIT_PROBLEM(state, { index, key, value }) {
    state.problems[index][key] = value;
  }
};

const actions = {
  changeState({ commit, state }, data) {
    for(let key in data){
      commit('HANDLE_CHANGE', { key, value: data[key] });
    }
  },
  addProblem({ commit }, data) {
    commit('ADD_PROBLEM', data);
  },
  editProblem({ commit }, {index, key, value }) {
    commit('EDIT_PROBLEM', { index, key, value });
  }
};

export default {
  state,
  mutations,
  actions,
};



/**
 * [POET]
 * {
 * description:string,
 * generator:string,
 * problems:Array<Object>,
 * standard:string,
 * url:string};
 * 
 * item of [POET.problems]
 * {
 * description:string,
 * extra:{
 *    forceRaw:boolean,
 *    markdown:boolean,
 *    partial:boolean,
 *    toScore:number
 * },
 * input:string,
 * memoryLimit:{
 *    unit:string,
 *    value:number
 * },
 * note:string,
 * output:string,
 * require:{
 *    Babel:{
 *       core:true
 *    },
 *    MathJax:boolean
 * },
 * resources:[
 *  {
 *    alias:string,
 *    fixedName:boolean
 *  }
 * ],
 * sample:[
 *    {
 *        input:string,
 *        output:string
 *    }
 * ],
 * solution:[
 *    {
 *      locde:string,
 *      source:string
 *    }
 * ],
 * source:{
 *    name:boolean,
 *    url:boolean
 * },
 * specialJudge:boolean,
 * testCases:[
 *    {
 *      input:string,
 *      output:string
 *    }
 * ],
 * timeLimit:{
 *    unit:string,
 *    value:number
 * },
 * title:string,
 * type:string
 * }
 * 
 */