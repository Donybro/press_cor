<template>
  <div class="wrapper container">
    <div class="title">Yangi xodim qo’shish</div>
    <div class="partsWrapper">
      <div class="part">
        <div class="main">
          <div class="label">Ismi</div>
          <input v-model="firstName" type="text" class="inputField" />
        </div>
        <div class="main">
          <div class="label">Sharifi</div>
          <input v-model="fatherName" type="text" class="inputField" />
        </div>
        <div class="main">
          <div class="label">Telefon raqami</div>
          <input v-model="phoneNumber" type="text" class="inputField" />
        </div>
        <div class="main">
          <div class="label">Parol</div>
          <input v-model="password" type="password" class="inputField" />
        </div>
      </div>
      <div class="part">
        <div class="main">
          <div class="label">Familiyasi</div>
          <input v-model="lastName" type="text" class="inputField" />
        </div>
        <div class="main">
          <div class="label">Lavozimi</div>
          <input v-model="position" type="text" class="inputField" />
        </div>
        <div class="main">
          <div class="label">Login</div>
          <input v-model="username" type="text" class="inputField" />
        </div>
        <div class="main">
          <div class="label">Parolni takroran kiriting</div>
          <input v-model="rePassword" type="password" class="inputField" />
        </div>
        <button @click="createWorker" class="btn">
          <Spinner v-if="sending" size="20px" line-fg-color="rgba(0, 88, 191, 0.5)" />
          <span v-else>Xodim qo’shish</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '../common/Http';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'AddNewWorker',
  components: { Spinner },
  data() {
    return {
      username: '',
      password: '',
      rePassword: '',
      firstName: '',
      lastName: '',
      fatherName: '',
      phoneNumber: '',
      position: '',
      photoId: '',
      organId: '',
      showErrorMessage: false,
      sending: false,
    };
  },
  methods: {
    async createWorker() {
      if (this.password !== this.rePassword) {
        this.showErrorMessage = true;
        return null;
      }
      this.sending = true;
      let sendObject = {
        organId: this.$store.getters['getOrganizationID'],
        username: this.username,
        password: this.password,
        rePassword: this.rePassword,
        firstName: this.firstName,
        lastName: this.lastName,
        fatherName: this.fatherName,
        phoneNumber: this.phoneNumber,
        position: this.position,
      };
      let req = await Http.post('api/journalist', sendObject);
      if (req.data.success) {
        this.username = '';
        this.password = '';
        this.rePassword = '';
        this.firstName = '';
        this.lastName = '';
        this.fatherName = '';
        this.phoneNumber = '';
        this.position = '';
        this.$alert(req.data.message);
        this.sending = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  cursor: pointer;
  background: #0058BF;
  border-radius: 20px;
  width: 250px;
  height: 50px;
  font-size: 20px;
  color: #FFFFFF;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  margin-top: 20px;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}

.partsWrapper {
  display: flex;
  flex-wrap: nowrap;

  .part {
    width: 50%;

    .main {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;

      .label {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 16px;
        line-height: 19px;
      }

      .inputField {
        height: 40px;
        background: #FFFFFF;
        padding-left: 20px;
        border: 1px solid #DADADA;
        width: 70%;
        font-size: 20px;
        line-height: 23px;
        outline: none;
      }
    }
  }
}
</style>