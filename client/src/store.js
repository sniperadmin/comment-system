import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    token: null,
    user: null
  },

  getters: {
    getToken: state => state.token,
    getUser: state => state.user
  },

  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
    CLEAR_ALL: state => {
      state.token = null;
      state.user = null;
    }
  },

  actions: {
    async loginUser({ commit }, token) {
      try {
        commit("SET_TOKEN", token);
        const userInfo = await axios.get("http://localhost:9000/api/me", {
          headers: {
            Authorization: token
          }
        });
        commit("SET_USER", userInfo.data.user);
      } catch (error) {
        return error;
      }
    },
    logoutUser({ commit }) {
      try {
        commit("CLEAR_ALL");
      } catch (error) {
        console.log(error);
      }
    }
  },

  plugins: [vuexLocal.plugin]
});
