<template>
  <div class="wrapper container">
    <div class="info">
      <div class="photo">
        <img class="imgPhoto" :src='"http://aokaevents.tcrp.uz/api/file/"+getWorkerState.photoId' alt="">
        <AddPhoto @photo-seted="setWorkerPhoto" />
      </div>
      <div class="name">{{ getWorkerState.firstName }} {{ getWorkerState.lastName }} {{ getWorkerState.fatherName }}
      </div>
    </div>
    <div class="main">
      <div class="part">
        <div class="profession">
          <div class="title">Lavozimi</div>
          {{ getWorkerState.position }}
        </div>
        <div class="inputField">
          <label for="phone">Telefon raqami</label>
          <input :disabled="!editPhoneMode" :placeholder="getWorkerState.phoneNumber" ref="phone" id="phone"
                 v-model="phoneNumber" type="text">
          <div @click="toggleEditPhoneMode" class="editIcon">
            <img v-if="!editPhoneMode" src="../assets/icons/edit.svg" alt="">
            <img @click="sendChanges" v-else src="../assets/icons/done.svg" alt="">
          </div>
        </div>
        <div>
          <a @click="getLicense" class="licence" download>
            ID kartani yuklab olish (pdf, jpg)
            <img src="../assets/icons/download.svg" alt="">
          </a>
        </div>
      </div>
      <div class="part">
        <div @click="toggleEditPasswordMode" class="licence">
          <span>Parolni o’zgartirish</span>
          <img src="../assets/icons/editPasword.svg" alt="">
        </div>
        <div class="mb-4" v-if="editPasswordMode">
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
        <button @click="sendChanges" v-if="editPasswordMode">
          Tasdiqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AddPhoto from '../components/AddPhoto';
import { mapGetters } from 'vuex';
import Http from '../common/Http';

// let  fileDownload = require('js-file-download');
import fileDownload from 'js-file-download';

export default {
  name: 'Journalist_Profile',
  components: { AddPhoto },
  data() {
    return {
      phoneNumber: '',
      editPasswordMode: false,
      editPhoneMode: false,
      oldPassword: '',
      password: '',
      rePassword: '',
      photoId: '',
    };
  },
  methods: {
    async getLicense() {
      let file = await Http({
        url: 'http://aokaevents.tcrp.uz/api/journalist/QR/' + this.getWorkerState.id,
        method: 'GET',
        responseType: 'blob',
      });
      fileDownload(file.data, 'license.pdf');
    },
    toggleEditPasswordMode() {
      this.editPasswordMode = !this.editPasswordMode;
    },
    toggleEditPhoneMode() {
      this.editPhoneMode = !this.editPhoneMode;
      if (this.editPhoneMode) {
        setTimeout(() => {
          this.$refs.phone.focus();
        }, 200);
      }
    },
    async setWorkerPhoto(photo) {
      this.photoId = (await Http.post('api/file', photo)).data.object.fileId;
      await this.sendChanges();
    },
    async sendChanges() {
      if (this.password !== this.rePassword) {
        this.$alert('Parollarni xato kiritilgan!', '', 'error');
        return null;
      }
      let workerState = this.getWorkerState;
      let organizationName = workerState.organizationName;
      let sendObj = {
        id: workerState.id,
        username: workerState.username,
        firstName: workerState.firstName,
        lastName: workerState.lastName,
        fatherName: workerState.fatherName,
        phoneNumber: this.phoneNumber,
        password: this.password,
        rePassword: this.rePassword,
        oldPassword: this.oldPassword,
      };
      if (organizationName) {
        sendObj.position = workerState.position;
      } else {
        sendObj.documentNumber = workerState.documentNumber;
      }
      if (this.photoId) {
        sendObj.photoId = this.photoId;
      }
      try {
        await Http.patch('api/journalist', sendObj);
        this.password = '';
        this.rePassword = '';
        this.oldPassword = '';
        if (this.editPasswordMode) {
          this.toggleEditPasswordMode();
        }
        this.$store.dispatch('me');
        this.$alert('Saqlandi!', '', 'success');
      } catch (e) {
        console.log(e);
        this.$alert('Xatolik yuz berdi!', '', 'error');
      }

    },
  },
  computed: {
    ...mapGetters(['getWorkerState']),
  },
  watch: {
    getWorkerState: {
      immediate: true,
      handler(state) {
        if (state.id) {
          this.phoneNumber = state.phoneNumber;
        }
      },
    },
  },
  async mounted() {
    console.log(this.getWorkerState);
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  padding-top: 10px;
}

.main {
  display: flex;
}

.part {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.info {
  display: flex;
  align-items: center;
  width: 90%;
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

    .imgPhoto {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }

    .addPhoto {
      position: absolute;
      bottom: 0;
      right: 10px;
      cursor: pointer;
    }
  }
}

.profession {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-size: 20px;

  .title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
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
    font-size: 24px;
  }

  label {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }
}

.licence {
  font-size: 18px;
  line-height: 26px;
  color: #0058BF;
  cursor: pointer;
  display: flex;
  position: relative;
  width: 90%;
  text-decoration: none;

  img {
    margin-left: 10px;
  }
}

.editIcon {
  cursor: pointer;
  position: absolute;
  height: 100%;
  right: -60px;
  bottom: -32px;
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
</style>