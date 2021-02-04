<template>
  <form class='fields'>
    <div class='main'>
      <div class='inputField'>
        <label for='login2'>Login</label>
        <input v-model='login' id='login2' type='text'>
      </div>
      <span
          v-if='($v.login.$error)'
          class='helper-text'
      >
            <img src='../assets/icons/warning.svg'>
            Loginni kiriting
        </span>
    </div>
    <div class='main'>
      <div class='inputField'>
        <label for='password2'>Parol</label>
        <input v-model='password' id='password2' type='password'>
      </div>
      <span
          v-if='($v.password.$error)'
          class='helper-text'
      >
            <img src='../assets/icons/warning.svg'>
            Parolni kiriting
        </span>
    </div>
    <div class='main'>
      <div class='inputField'>
        <label for='rePassword2'>ReParol</label>
        <input v-model='rePassword' id='rePassword2' type='password'>
      </div>
      <span
          v-if='($v.rePassword.$error)'
          class='helper-text'
      >
            <img src='../assets/icons/warning.svg'>
            Paralni kiriting
        </span>
    </div>
    <div class='main'>
      <div class='inputField'>
        <label for='phoneNumber2'>Telefon</label>
        <input v-model='phoneNumber' id='phoneNumber2' type='text'>
      </div>
      <span
          v-if='($v.phoneNumber.$error)'
          class='helper-text'
      >
            <img src='../assets/icons/warning.svg'>
            Telefonni  kiriting
        </span>
    </div>
    <div class='main'>
      <div class='inputField'>
        <label for='firstName'>Ism</label>
        <input v-model='firstName' id='firstName' type='text'>
      </div>
      <span
          v-if='($v.firstName.$error)'
          class='helper-text'
      >
            <img src='../assets/icons/warning.svg'>
            Ismni kiriting
        </span>
    </div>
    <div class='main'>
      <div class='inputField'>
        <label for='lastName'>Familiya</label>
        <input v-model='lastName' id='lastName' type='text'>
      </div>
      <span
          v-if='($v.lastName.$error)'
          class='helper-text'
      >
            <img src='../assets/icons/warning.svg'>
            Familiyani kiriting
        </span>
    </div>
    <div class='main'>
      <div class='inputField'>
        <label for='fatherName'>Sharif</label>
        <input v-model='fatherName' id='fatherName' type='text'>
      </div>
      <span
          v-if='($v.fatherName.$error)'
          class='helper-text'
      >
            <img src='../assets/icons/warning.svg'>
            Sharifni kiriting
        </span>
    </div>
    <div class='main'>
      <div class='inputField'>
        <label for='licence'>Lisenziya raqam</label>
        <input v-model='documentNumber' id='licence' type='text'>
      </div>
      <span
          v-if='($v.documentNumber.$error)'
          class='helper-text'
      >
            <img src='../assets/icons/warning.svg'>
            Lisenziyani kiriting
        </span>
    </div>
    <div class='filesWrapper'>
      <img v-if='photoLoaded' src='../assets/icons/successForm.svg'>
      <img v-if='!photoLoaded && showPhotoError' src='../assets/icons/warning.svg'>
      <UploadPhoto @photo-seted='setPhoto' title='Rasm yuklash' />
    </div>
    <div class='filesWrapper'>
      <img v-if='licenseLoaded' src='../assets/icons/successForm.svg'>
      <img v-if='!licenseLoaded && showLicenseError' src='../assets/icons/warning.svg'>
      <License @license-seted='setLicense' logo='cloud'
               title='Litsenziya yuklash (pdf, jpg)' />
    </div>
    <div class='btnWrapper'>
      <button type='submit' @click.prevent='sendHandler' :disabled='sending'>
        <Spinner v-if='sending' size='20px' line-fg-color='rgba(0, 88, 191, 0.5)' />
        <span v-else> Ro’yxatdan o’tish</span>
      </button>
    </div>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import License from '../components/License';
import UploadPhoto from '../components/UploadPhoto';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'registrationJournalist',
  validations: {
    login: { required },
    password: { required },
    rePassword: { required },
    phoneNumber: { required },
    firstName: { required },
    lastName: { required },
    fatherName: { required },
    documentNumber: { required },
  },
  components: { License, UploadPhoto, Spinner },
  data() {
    return {
      login: '',
      password: '',
      rePassword: '',
      phoneNumber: '',
      name: '',
      firstName: '',
      lastName: '',
      fatherName: '',
      licenseLoaded: false,
      photoLoaded: false,
      sending: false,
      showLicenseError: false,
      showPhotoError: false,
      licenceId: '',
      photoId: '',
      documentNumber: '',
    };
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
        firstName: this.firstName,
        lastName: this.lastName,
        fatherName: this.fatherName,
        documentNumber: this.documentNumber,
        certificateId: licenseId,
        photoId: logoId,
      };
      this.$emit('reg-data', sendData);
    },

  },
};
</script>

<style scoped lang='scss'>


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
  flex-direction: column;
  height: 55px;

  &:last-child {
    margin-bottom: 30px;
  }

  .inputField {
    display: flex;
    margin: 0 auto;
    width: 500px;
  }
}

label {
  color: rgba(0, 88, 191, 0.5);
  font-size: 22px;
  border-bottom: 2px solid rgba(0, 88, 191, 0.3);
  cursor: pointer;
}

input {
  cursor: pointer;
  outline: none;
  width: 100%;
  border: none;
  border-bottom: 2px solid rgba(0, 88, 191, 0.3);
  padding: 0 15px;
  font-size: 22px;
}


.btnWrapper {
  display: flex;
  justify-content: center;

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
  font-size: 20px;
  color: #EB4848;
  margin-top: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;

  img {
    margin-right: 10px;
  }
}

.error {
  height: 10px;
}

.active {
  background: #fff;
  color: #070D93;
}
</style>