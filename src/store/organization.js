export default {
  state: {
    id: '',
    name: '',
    phoneNumber: '',
    licenseId: '',
    logoId: '',
    status: '',
    username: '',
  },
  actions: {
    setOrganizationInfo({ commit }, payload) {
      commit('setOrganizationInfo', payload);
    },
  },
  mutations: {
    setOrganizationInfo(state, payload) {
      state.id = payload.id;
      state.name = payload.name;
      state.phoneNumber = payload.phoneNumber;
      state.licenseId = payload.licenseId;
      state.logoId = payload.logoId;
      state.status = payload.status;
      state.username = payload.username;
    },
  },
  getters: {
    getOrganizationState(state) {
      return state;
    },
    getOrganizationID(state) {
      return state.id;
    },
  },
};
