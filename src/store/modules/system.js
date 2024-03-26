const getDefaultState = () => {
  return {
    account: "",
    windowClientWidth: 0,
    isInApp: false,
    chainName: "",
    lang: '',
    // 精度
    ttDecimal: 18,
    usdtDecimal: 6,
    bgtDecimal: 18,
    configLoaded: false,
    useInfo: {
      "name": "--",
      "screen_name": "",
      "profile_image_url_https": "",
      "score": 0
    }
  };
};

const state = getDefaultState();

const mutations = {
  SET_USERINFO: (state, load) => {
    state.useInfo = load;
  },
  SET_CONFIG_LOADED: (state, load) => {
    state.configLoaded = load;
  },
  SET_TT_DECIMAL: (state, dec) => {
    state.ttDecimal = dec;
  },
  SET_USDT_DECIMAL: (state, dec) => {
    state.usdtDecimal = dec;
  },
  SET_BGT_DECIMAL: (state, dec) => {
    state.bgtDecimal = dec;
  },
  SET_IS_IN_APP: (state, isIn) => {
    state.isInApp = isIn
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account;
  },
  SET_WINDOW_WIDTH: (state, width) => {
    state.windowClientWidth = width;
  },
  SET_SYSTEM_LOCALE: (state, lang) => {
    state.lang = lang
  },
};

const actions = {
  setWindowWidth({ commit }, width) {
    return new Promise((resolve) => {
      commit("SET_WINDOW_WIDTH", width);
      resolve();
    });
  },
  setAccount({ commit }, account) {
    return new Promise((resolve) => {
      commit("SET_ACCOUNT", account);
      resolve();
    });
  },
  setUserInfo({ commit }, userInfo) {
    commit("SET_USERINFO", userInfo);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
