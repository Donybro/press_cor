import Http from '../common/Http';

export default {
  state: {
    licenseFileId: '',
    photoFileId: '',
    authorized: false,
  },
  actions: {
    async setLicense({ commit }, licenseFormData) {
      if (licenseFormData === 'Error Type') {
        return false;
      }
      let { data } = await Http.post('api/file', licenseFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        commit('setLicenseFileId', data.object.fileId);
        commit('setLicenseFileDownloadUri', data.object.fileDownloadUri);
        return true;
      } else {
        return false;
      }
    },
    async setPhoto({ commit }, photoFormData) {
      if (photoFormData === 'Error Type') {
        return false;
      }
      let { data } = await Http.post('api/file', photoFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data.success) {
        commit('setPhotoFileId', data.object.fileId);
        commit('setPhotoFileDownloadUri', data.object.fileDownloadUri);
        return true;
      } else {
        return false;
      }
    },
    async registration(_, payload) {
      try {
        let req = await Http.post(`api/auth/${payload.requestPath}/register`, payload.sendData);
        localStorage.setItem('isAuth', "true");
        return req.data.success;
      } catch (e) {
        return false;
      }

    },
    async login({ dispatch }, payload) {
      try {
        let req = await Http.post('api/auth/login', payload);
        localStorage.setItem('isAuth', "true");
        localStorage.setItem('tokenType', req.data.body.tokenType);
        localStorage.setItem('accessToken', req.data.body.accessToken);
        Http.defaults.headers.common['Authorization'] = req.data.body.tokenType + ' ' + req.data.body.accessToken;
        return await dispatch('me');
      } catch (e) {
        return false;
      }
    },
  },
  mutations: {
    setLicenseFileId(state, payload) {
      state.licenseFileId = payload;
    },
    setLicenseFileDownloadUri(state, payload) {
      state.licenseFileDownloadUri = payload;
    },
    setPhotoFileId(state, payload) {
      state.photoFileId = payload;
    },
    setPhotoFileDownloadUri(state, payload) {
      state.photoFileDownloadUri = payload;
    },
  },
  getters: {
    getLicenseFileId(state) {
      return state.licenseFileId;
    },
    getLicenseFileDownloadUri(state) {
      return state.licenseFileDownloadUri;
    },
    getPhotoFileId(state) {
      return state.photoFileId;
    },
    getPhotoFileDownloadUri(state) {
      return state.photoFileDownloadUri;
    },
  },
};