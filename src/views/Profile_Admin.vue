<template>
  <div class='wrapper container'>
    <div class='info'>
      <div class='photo'>
        <img v-if='getRole === "ROLE_ADMIN" || getRole === "ROLE_CREATOR"' :src='logodefault' alt=''>
      </div>
      <div v-if='ROLE==="ROLE_ADMIN"' class='name'>Administratsiya</div>
      <div v-else class='name'>Creator</div>
    </div>
    <div @click='toggleEditPasswordMode' class='licence'>
      <span>Parolni o’zgartirish</span>
      <img src='../assets/icons/editPasword.svg' alt=''>
    </div>
    <div class='editPassword' v-if='editPasswordMode'>
      <div class='inputField '>
        <label for='lastPassword'>Eski parol</label>
        <input id='lastPassword' v-model='lastPassword' type='password'>
      </div>
      <div class='inputField '>
        <label for='newPassword'>Yangi parol</label>
        <input id='newPassword' v-model='newPassword' type='password'>
      </div>
      <div class='inputField '>
        <label for='newPassword2'>Yangi parolni takroran kiriting</label>
        <input id='newPassword2' v-model='rePassword' type='password'>
      </div>
      <div v-if='showError' class='errorText'>
        Parollar notogri kiritilgan!
      </div>
      <button @click='senChanges' v-if='editPasswordMode'>
        Tasdiqlash
      </button>
    </div>

  </div>
</template>

<script>

import Http from '../common/Http';
import logodefault from '../assets/icons/images.png';

let ROLE = localStorage.getItem('ROLE');
export default {
  name: 'Profile_Admin',
  data() {
    return {
      editPasswordMode: false,
      ROLE,
      showError: false,
      rePassword: '',
      lastPassword: '',
      newPassword: '',
      logodefault,
    };
  },
  methods: {
    toggleEditPasswordMode() {
      this.editPasswordMode = !this.editPasswordMode;
    },
    senChanges() {
      if (this.newPassword !== this.rePassword) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3000);
        return null;
      }
      try {
        Http.patch('api/user', {
          oldPassword: this.lastPassword,
          password: this.newPassword,
          rePassword: this.rePassword,
        });
        this.rePassword = '';
        this.newPassword = '';
        this.lastPassword = '';
        this.$alert('Saqlandi!', '', 'success');
        this.toggleEditPasswordMode();
      } catch (e) {
        this.$alert('Xatolik yuz berdi!', '', 'error');
        console.log(e);
      }
    },
  },
  computed: {
    getRole() {
      return this.$store.getters.getRole;
    },
  },
};
</script>

<style scoped lang='scss'>
.wrapper {
  display: flex;
  flex-direction: column;
  padding-top: 10px;

}

.errorText {
  text-align: center;
  font-size: 24px;
  color: #ba2e2e;
}

.info {
  display: flex;
  align-items: center;
  width: 90%;
  font-weight: bold;
  font-size: 32px;
  line-height: 37px;

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

    .addPhoto {
      position: absolute;
      bottom: 0;
      right: 10px;
      cursor: pointer;
    }
  }
}

.inputField {
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 20px;

  input {
    font-size: 24px;
    line-height: 28px;
    padding-left: 20px;
    padding-top: 6px;
    padding-bottom: 6px;
    border: 1px solid #DADADA;
    outline: none;
  }

  input::-webkit-input-placeholder {
    font-size: 24px;
    line-height: 28px;
  }

  label {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 10px;
  }
}

.licence {
  font-size: 22px;
  line-height: 26px;
  color: #0058BF;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  width: 90%;
  margin: 30px 0;

  img {
    margin-left: 10px;
    height: 20px;

  }
}

.editIcon {
  cursor: pointer;
  position: absolute;
  right: -60px;
  top: 32px;
  height: 100%;
}

button {
  width: 150px;
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
  align-self: center;
}

.editPassword {
  width: 40%;
  display: flex;
  flex-direction: column;
}
</style>