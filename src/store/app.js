import Http from '../common/Http';

export default {
  state: {
    ROLE: '',
    sidebarIsOpen: true,
    tableButtonSelected: 'LeftText',
    userInfoLoaded: false,

  },
  actions: {
    setTableSelectedButton({ commit }, payload) {
      commit('setTableSelectedButton', payload);
    },
    toggleSidebar({ commit }) {
      commit('toggleSidebar');
    },
    async me({ commit, dispatch }) {
      try {
        Http.defaults.headers.common['Authorization'] = localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken');
        let req = await Http.get('api/user/me');
        let role = req.data.object.role;
        localStorage.setItem('ROLE', role);
        commit('setRole', role);
        if (role === 'ROLE_JOURNALIST') {
          dispatch('setWorkerInfo', req.data.object);
        } else if (role === 'ROLE_ORGANIZATION') {
          dispatch('setOrganizationInfo', req.data.object);
        } else if (role === 'ROLE_ADMIN') {
          dispatch('setAdminInfo')
        }
        commit('setUserInfoLoaded');
        return true;
      } catch (e) {
        return false;
      }
    },
    setUserInfoLoaded({ commit }) {
      commit('setUserInfoLoaded');
    },
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarIsOpen = !state.sidebarIsOpen;
    },
    setTableSelectedButton(state, payload) {
      state.tableButtonSelected = payload;
    },

    setUserInfoLoaded(state) {
      state.userInfoLoaded = true;
    },
    setRole(state, payload) {
      state.ROLE = payload;
    },
  },
  getters: {
    sidebarIsOpen(state) {
      return state.sidebarIsOpen;
    },

    getTableSelectedButton(s) {
      return s.tableButtonSelected;
    },
    getRole(s) {
      return s.ROLE;
    },
    getUserInfoIsLoaded(s) {
      return s.userInfoLoaded;
    },
  },
};
