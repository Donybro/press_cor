import Http from '../common/Http';

export default {
  state: {
    notificationCount: 0,
  },
  actions: {
    async setAdminInfo({ commit }) {
      let { journalistCount, organCount } = (await Http.get('api/admin/notification')).data;
      commit('setAdminInfo', {
        journalistCount,
        organCount,
      });
    },
  },
  mutations: {
    setAdminInfo(state, payload) {
      state.notificationCount = payload.journalistCount + payload.organCount;
    },
  },
  getters: {
    getNotificationCount(state) {
      return state.notificationCount;
    },
  },
};









