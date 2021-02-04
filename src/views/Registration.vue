<template>
  <div class='wrapper'>
    <div class='welcome'>
      <div class='title'>REGISTRATSIYA</div>
      <div class='btns'>
        <button :class='{"active":registrationType==="Press"}' class='btn' @click='setRegType("Press")'>
          Matbuot tashkilot
        </button>
        <button :class='{"active":registrationType==="Journalist"}' class='btn' @click='setRegType("Journalist")'>
          Erkin jurnalist
        </button>
      </div>
      <div class='subtitle'>
        Tashkilot yoki o’zingiz haqingizdagi ma’lumotlarni to’liq kiriting
      </div>
    </div>
    <RegistrationPress @reg-data='sendHandler' v-if='registrationType==="Press"' />
    <RegistrationJournalist @reg-data='sendHandler' v-else />
    <div class='errorMsg'>
      <div v-if='showErrorMessage'>
        Registratsiyada hatolik yuz berdi, iltimos barcha qatorlarni tekshirib qayta takrorlang
      </div>
    </div>
  </div>
</template>

<script>

import RegistrationPress from '../components/registrationPress';
import RegistrationJournalist from '../components/registrationJournalist';

// Spinner

export default {
  name: 'Registration',
  components: { RegistrationJournalist, RegistrationPress },
  computed: {
    getIngSrc() {
      return this.$store.getters['getPhotoFileDownloadUri'];
    },
  },
  data() {
    return {
      showError: false,
      registrationType: 'Press',
      showErrorMessage: false,
      sendData: {},
    };
  },
  methods: {
    async sendHandler(sendData) {
      this.sending = true;
      let requestPath = this.registrationType === 'Press' ? 'organ' : 'journalist';
      let request = await this.$store.dispatch('registration', {
        sendData,
        requestPath,
      });
      console.log(request);
      if (request) {
        await this.$router.push('/welcome');
      } else {
        this.showErrorHandler();
      }
    },
    setRegType(type) {
      this.registrationType = type;
    },
    showErrorHandler() {
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 4000);
    },
  },
};
</script>

<style scoped lang='scss'>
.wrapper {
  min-height: 100%;
  display: flex;
}

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

.welcome {
  width: 50%;
  background: #070D93;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-weight: bold;
    font-size: 44px;
  }

  .btns {
    display: flex;
    justify-content: space-between;
    width: 440px;
    margin-top: 20px;
  }


  .subtitle {
    font-size: 24px;
    margin-top: 30px;
    width: 400px;
    text-align: center;
  }
}

.btn {
  cursor: pointer;
  outline: none;
  font-size: 20px;
  color: #FFFFFF;
  text-align: center;
  padding: 10px 0;
  border: 1px solid #C4C4C4;
  border-radius: 6px;
  background: transparent;
  width: 200px;
}

.active {
  background: #fff;
  color: #070D93;
}
</style>