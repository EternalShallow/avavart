import BigNumber from "bignumber.js";

const getDefaultState = () => {
  return {
    // tt余额
    ttBalance: 0,
    bgtBalance: 0,
    ptPoint: 0,
    ttOuterAmount: 0,
    bgtOuterAmount: 0,
    // 授权
    ttApprove: '0',
    bgtApprove: '0',
    theVeApprove: false,
    // ttApprove: '0',
    // 余额信息加载完成
    userBalanceLoaded: false,
  };
};

const state = getDefaultState();

const mutations = {
  SET_TT_OUTER_AMOUNT: (state, nums) => {
    state.ttOuterAmount = nums
  },
  SET_BGT_OUTER_AMOUNT: (state, nums) => {
    state.bgtOuterAmount = nums
  },
  SET_TT_BALANCE: (state, nums) => {
    state.ttBalance = nums
  },
  SET_BGT_BALANCE: (state, nums) => {
    state.bgtBalance = nums
  },
  SET_BT_POINT: (state, nums) => {
    state.ptPoint = nums
  },
  SET_TT_APPROVE: (state, nums) => {
    state.ttApprove = nums
  },
  SET_BGT_APPROVE: (state, nums) => {
    state.bgtApprove = nums
  },
  SET_THEVE_APPROVE: (state, nums) => {
    state.theVeApprove = nums
  },
  SET_USER_BALANCE_LOADED: (state, loaded) => {
    state.userBalanceLoaded = loaded
  },
};

const actions = {
  addOuterTTAmount({ commit }, amount) {
    return new Promise((resolve) => {
      console.log(state.ttOuterAmount)
      let tmp = new BigNumber(state.ttOuterAmount)
      commit("SET_TT_OUTER_AMOUNT", tmp.plus(amount).toString());
      resolve();
    });
  },
  addOuterBGTAmount({ commit }, amount) {
    return new Promise((resolve) => {
      console.log(state.bgtOuterAmount)
      let tmp = new BigNumber(state.bgtOuterAmount)
      commit("SET_BGT_OUTER_AMOUNT", tmp.plus(amount).toString());
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
