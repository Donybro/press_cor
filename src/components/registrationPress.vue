<template>
  <form class="fields">
    <div class="main">
      <md-field class="inputField" :class="{'md-invalid':$v.login.$error}">
        <label>Login</label>
        <md-input v-model="login"></md-input>
      </md-field>
      <span
          v-if="($v.login.$error)"
          class="md-error helper-text"
      >
            <img src="../assets/icons/warning.svg">
            Loginni kiriting
        </span>
    </div>
    <div class="main">
      <md-field class="inputField" :class="{'md-invalid':$v.password.$error}">
        <label for="password">Parol</label>
        <md-input v-model="password" id="password" type="password"></md-input>
      </md-field>
      <span
          v-if="($v.password.$error)"
          class="md-error helper-text"
      >
            <img src="../assets/icons/warning.svg">
            Parolni kiriting
        </span>
    </div>
    <div class="main">
      <md-field class="inputField" :class="{'md-invalid':$v.rePassword.$error}">
        <label for="rePassword">Parolni qayta kiriting</label>
        <md-input v-model="rePassword" id="rePassword" type="password"></md-input>
      </md-field>
      <span
          v-if="($v.rePassword.$error)"
          class="md-error helper-text"

      >
            <img src="../assets/icons/warning.svg">
            Parolni kiriting
        </span>
    </div>
    <div class="main">
      <md-field class="inputField" :class="{'md-invalid':$v.phoneNumber.$error}">
        <label for="phoneNumber">Telefon</label>
        <md-input v-model="phoneNumber" id="phoneNumber" type="text"></md-input>
      </md-field>
      <span
          v-if="($v.phoneNumber.$error)"
          class="md-error helper-text"
      >
            <img src="../assets/icons/warning.svg">
            Telefonni  kiriting
        </span>
    </div>
    <div class="main">
      <md-field class="inputField" :class="{'md-invalid':$v.name.$error}">
        <label for="name">Tashkilot nomi</label>
        <md-input v-model="name" id="name" type="text"></md-input>
      </md-field>
      <span
          v-if="($v.name.$error)"
          class="md-error helper-text"
      >
            <img src="../assets/icons/warning.svg">
            Tashkilot nomini kiriting
        </span>
    </div>
    <div class="filesWrapper">
      <img v-if="photoLoaded" src="../assets/icons/successForm.svg">
      <img v-if="!photoLoaded && showPhotoError" src="../assets/icons/warning.svg">
      <UploadPhoto @photo-seted="setPhoto" title="Logotip yuklash" />
    </div>
    <div class="filesWrapper">
      <img v-if="licenseLoaded" src="../assets/icons/successForm.svg">
      <img v-if="!licenseLoaded && showLicenseError" src="../assets/icons/warning.svg">
      <License @license-seted="setLicense" logo="cloud"
               title="Litsenziya yuklash (pdf, jpg)" />
    </div>
    <div class="btnWrapper">
      <button type="submit" @click.prevent="sendHandler" :disabled="sending">
        <Spinner v-if="sending" size="20px" line-fg-color="rgba(0, 88, 191, 0.5)" />
        <span v-else> Ro’yxatdan o’tish</span>
      </button>
    </div>
  </form>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import { required } from 'vuelidate/lib/validators';
import License from '../components/License';
import UploadPhoto from '../components/UploadPhoto';

let validationFields = {
  login: { required },
  password: { required },
  rePassword: { required },
  phoneNumber: { required },
  name: { required },

};
export default {
  name: 'registrationPress',
  props: ['stopSending'],
  validations: validationFields,
  components: { License, UploadPhoto, Spinner },
  data() {
    return {
      login: '',
      password: '',
      rePassword: '',
      phoneNumber: '',
      name: '',
      licenseLoaded: false,
      photoLoaded: false,
      showLicenseError: false,
      showPhotoError: false,
      licenceId: '',
      photoId: '',
      sending: false,
    };
  },
  watch: {
    stopSending(val) {
      if (val) {
        this.sending = false;
      }
    },
  },
  methods: {
    async setLicense(licenseFormData) {
      this.licenseLoaded = true;
      await this.$store.dispatch('setLicense', licenseFormData);
    },
    async setPhoto(photoFormData) {
      this.photoLoaded = true;
      await this.$store.dispatch('setPhoto', photoFormData);
    },
    checkFileInputs() {
      if (!this.licenseLoaded) {
        this.showLicenseError = true;
      }
      if (!this.photoLoaded) {
        this.showPhotoError = true;
      }
    },
    showErrorHandler() {
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 4000);
    },
    sendHandler() {
      this.sending = true;
      this.checkFileInputs();
      if (!this.photoLoaded && !this.licenseLoaded) {
        this.sending = false;
        return false;
      }
      if (this.$v.$invalid) {
        this.$v.$touch();
        this.sending = false;
        return null;
      }
      const licenseId = this.$store.getters['getLicenseFileId'];
      const logoId = this.$store.getters['getPhotoFileId'];
      let sendData = {
        username: this.login,
        password: this.password,
        rePassword: this.rePassword,
        phoneNumber: this.phoneNumber,
        name: this.name,
        licenseId,
        logoId,
      };
      this.$emit('reg-data', sendData);
    },
  },
};
</script>

<style scoped lang="scss">


.errorMsg {
  height: 50px;
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: #EB4848;

  div {
    text-align: center;
    width: 70%;
  }
}

.fields {
  width: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.filesWrapper {
  display: flex;
  justify-content: center;
  margin: 10px 0;

  img {
    margin-right: 10px;
  }
}

.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
  height: 62px;

  &:last-child {
    margin-bottom: 30px;
  }
}

.inputField {
  display: flex;
  width: 80%;
  border-bottom: 2px solid rgba(0, 88, 191, 0.3);
}


input {
  cursor: pointer;
  outline: none;
  width: 100%;
  padding: 0 15px;
  font-size: 22px;
}


.btnWrapper {
  display: flex;
  justify-content: center;
  margin-top: 30px;

  button {
    cursor: pointer;
    border-radius: 20px;
    height: 45px;
    width: 250px;
    font-size: 20px;
    background: #0058BF;
    color: #fff;
    border: none;
    outline: none;
  }
}


.helper-text {
  font-size: 16px;
  color: #EB4848;
  margin-top: 10px;
  display: flex;
  align-items: center;
  width: 80%;


  img {
    margin-right: 10px;
  }
}

.error {
  height: 10px;
}

label {
  color: rgba(0, 88, 191, 0.5);
  font-size: 20px;
  cursor: pointer;
}

.md-invalid {
  border-bottom: 2px solid #EB4848;

  label {
    color: #EB4848;
  }
}

.md-field {
  margin: 0;
}
</style>