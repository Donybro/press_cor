<template>
  <div class="container">
    <div v-if="isLoading" class="">
      <Spinner size="large" line-fg-color="rgba(0, 88, 191, 0.5)" />
    </div>
    <div v-else>
      <div class="wrapper">
        <div class="info">
          <div class="photo">
            <img :src='"http://aokaevents.tcrp.uz/api/file/" + getOrganizationState.logoId' alt="">
            <AddPhoto @photo-seted="setPhoto" />
          </div>
          <div class="name">{{ getOrganizationState.name }}</div>
        </div>
        <div class="part">
          <div class="inputField">
            <label for="companyName">Tashkilot nomi</label>
            <input :disabled="!editOrganizationMode"
                   ref="companyName"
                   id="companyName"
                   v-model="companyName"
                   type="text">
            <div @click="toggleEditOrganizationNameMode" class="editIcon">
              <img v-if="!editOrganizationMode" src="../assets/icons/edit.svg" alt="">
              <img v-else @click="sendChanges" src="../assets/icons/done.svg" alt="">
            </div>
          </div>
          <div class="inputField">
            <label for="phone">Telefon raqami</label>
            <input :disabled="!editPhoneMode" ref="phone" id="phone" v-model="phoneNumber" type="text">
            <div @click="toggleEditPhoneMode" class="editIcon">
              <img v-if="!editPhoneMode" src="../assets/icons/edit.svg" alt="">
              <img @click="sendChanges" v-else src="../assets/icons/done.svg" alt="">
            </div>
          </div>
          <License title="Litsenziya yuklash (pdf, jpg)" logo="cloud" @license-seted="setLicense" />
        </div>
        <div class="part">
          <div class="login">
            <span class="title">Login</span>
            <span>{{ getOrganizationState.username }}</span>
          </div>
          <div @click="toggleEditPasswordMode" class="licence mb-4">
            <span>Parolni o’zgartirish</span>
            <img src="../assets/icons/editPasword.svg" alt="">
          </div>
          <div class="" v-if="editPasswordMode">
            <div class="inputField mb-4">
              <label for="lastPassword">Eski parol</label>
              <input id="lastPassword" v-model="oldPassword" type="password">
            </div>
            <div class="inputField mb-4">
              <label for="newPassword">Yangi parol</label>
              <input id="newPassword" v-model="password" type="password">
            </div>
            <div class="inputField mb-4">
              <label for="newPassword2">Yangi parolni takroran kiriting</label>
              <input id="newPassword2" v-model="rePassword" type="password">
            </div>
          </div>
          <button @click="changePassword" v-if="editPasswordMode">
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import License from '../components/License';
import AddPhoto from '../components/AddPhoto';
import Http from '../common/Http';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Profile',
  components: { AddPhoto, License, Spinner },
  data() {
    return {
      companyName: '',
      phoneNumber: '',
      oldPassword: '',
      password: '',
      rePassword: '',
      editPasswordMode: false,
      editOrganizationMode: false,
      editPhoneMode: false,
      userPhoto: null,
      userLicense: null,
      organization: null,
      isLoading: true,
    };
  },
  computed: {
    getOrganizationState() {
      return this.$store.getters['getOrganizationState'];
    },
  },
  methods: {
    toggleEditPhoneMode() {
      this.editPhoneMode = !this.editPhoneMode;
      if (this.editPhoneMode) {
        setTimeout(() => {
          this.$refs.phone.focus();
        }, 200);
      }
    },
    async setLicense(license) {
      this.userLicense = (await Http.post('api/file', license)).data.object.fileId;
      await this.sendChanges();
    },
    async setPhoto(photo) {
      this.userPhoto = (await Http.post('api/file', photo)).data.object.fileId;
      await this.sendChanges();
    },
    toggleEditOrganizationNameMode() {
      this.editOrganizationMode = !this.editOrganizationMode;
      if (this.editOrganizationMode) {
        setTimeout(() => {
          this.$refs.companyName.focus();
        }, 200);
      }
    },
    toggleEditPasswordMode() {
      this.editPasswordMode = !this.editPasswordMode;
    },
    async sendChanges() {
      let sendObject = {
        ...this.getOrganizationState,
        name: this.companyName,
        phoneNumber: this.phoneNumber,
      };
      if (this.userPhoto) {
        sendObject.logoId = this.userPhoto;
      }
      if (this.userLicense) {
        sendObject.licenseId = this.userLicense;
      } else {
        delete sendObject['licenseId'];
      }
      delete sendObject['status'];
      try {
        await Http.patch('/api/organ', sendObject);
        await this.$store.dispatch('me');
        this.$alert('Saqlandi!', '', 'success');
        this.userPhoto = '';
        this.userLicense = '';
      } catch (e) {
        console.log(e);
        this.$alert('Xatolik yuz berdi!', '', 'error');
      }
    },
    async changePassword() {
      if ((this.password === '') || (this.password !== this.rePassword)) {
        this.$alert('Parollarni xato kiritilgan!', '', 'error');
        return null;
      }
      let sendObject = {
        ...this.getOrganizationState,
        password: this.password,
        rePassword: this.rePassword,
        oldPassword: this.oldPassword,
      };
      delete sendObject['status'];
      delete sendObject['licenseId'];
      try {
        await Http.patch('/api/organ', sendObject);
        await this.$store.dispatch('me');
        this.password = '';
        this.rePassword = '';
        this.oldPassword = '';
        this.toggleEditPasswordMode();
        this.$alert('Saqlandi!', '', 'success');
      } catch (e) {
        console.log(e);
        this.$alert('Xatolik yuz berdi!', '', 'error');
      }
    },
  },
  async mounted() {
    this.companyName = this.getOrganizationState.name;
    this.phoneNumber = this.getOrganizationState.phoneNumber;
    this.isLoading = false;
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;

  .part {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
}

.info {
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 20px;

  .photo {
    width: 90px;
    height: 90px;
    background-color: #ba2e2e;
    border-radius: 50%;
    position: relative;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

.inputField {
  display: flex;
  flex-direction: column;
  width: 60%;
  position: relative;
  margin-bottom: 20px;

  input {
    font-size: 20px;
    line-height: 28px;
    padding: 6px 20px;
    border: 1px solid #DADADA;
    outline: none;

  }

  input::-webkit-input-placeholder {
    font-size: 20px;
  }

  label {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
  }

}

.licence {
  font-size: 18px;
  color: #0058BF;
  cursor: pointer;
  display: flex;
  position: relative;
  margin-bottom: 5px;

  img {
    margin-left: 10px;
  }
}

.login {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  margin-bottom: 20px;

  .title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
  }
}

button {
  width: 30%;
  background: #0058BF;
  border-radius: 30px;
  font-size: 18px;
  line-height: 23px;
  color: #FFFFFF;
  padding: 10px 20px;
  outline: none;
  border: none;
  cursor: pointer;
  text-align: center;
  margin-left: 15%;
}

.editIcon {
  cursor: pointer;
  position: absolute;
  height: 100%;
  right: -60px;
  bottom: -28px;
}


</style>