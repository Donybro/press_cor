
export default {
  state: {
    id: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    position: '',
    photoId: '',
    username: '',
    phoneNumber: '',
    organizationName: '',
    certificateId: '',
    documentId: '',
    allEvents: [],
    joinedEvents: [],
  },
  actions: {
    async setWorkerInfo({ commit }, payload) {
      commit('setWorkerInfo', payload);
    },
  },
  mutations: {
    setWorkerInfo(state, payload) {
      state.id = payload.id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.fatherName = payload.fatherName;
      state.position = payload.position;
      state.photoId = payload.photoId;
      state.status = payload.status;
      state.username = payload.username;
      state.phoneNumber = payload.phoneNumber;
      state.organizationName = payload.organizationName;
      state.certificateId = payload.certificateId;
      state.documentId = payload.documentId;
    },
  },
  getters: {
    getWorkerState(state) {
      return state;
    },
    getWorkerID(state) {
      return state.id;
    },
  },
};









