import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

//定义状态
let state = {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    count: 6,
    customerID: '',
    isMenuShow: true
};

//用于读取状态
let getters = {
    count () {
        return state.count;
    },
    isMenuShow (){
        return state.isMenuShow;
    }
};

//action 行为，要执行的相关操作，由视图去调用行为
//写相关流程或异步请求
let actions = {
    add ( {commit,state} ){
        commit('add');  //提交到mutations对应的名称里
    },
    sub ( {commit,state} ){
        commit('sub');
    },
    isMenuShow( { commit,state} ){
        commit('isMenuShow');
    },
    isMenuHidden( { commit,state} ){
        commit('isMenuHidden');
    }
};

//改变状态的值（处理状态的改变）
let mutations = {
    add( state ){
        state.count++;
    },
    sub( state ){
        state.count--;
    },
    changeLogin (state, user) {
        state.Authorization = user.Authorization;
        localStorage.setItem('Authorization', user.Authorization);
    },
    isMenuShow (state){
        state.isMenuShow = true;
    },
    isMenuHidden (state){
        state.isMenuShow = true;
    },

};


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

