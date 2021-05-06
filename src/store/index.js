import { createStore } from "vuex";

export default createStore({
  state: {
    count: 1,
    user: null,
  },
  mutations: {
    increment (state) {
      state.count++;
    },
    addUser (state, userData) {
      state.user = userData;
    },
  },
  actions: {},
  modules: {},
});
