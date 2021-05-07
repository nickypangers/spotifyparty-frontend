import { createStore } from "vuex";

export default createStore({
  state: {
    count: 1,
    user: null,
    joinedRoom: null,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    addUser(state, userData) {
      state.user = userData;
    },
    joinRoom(state, roomId) {
      state.joinedRoom = roomId;
    },
  },
  actions: {},
  modules: {},
});
