<template>
  <div class='wrapper'>
    <div class='welcome'>
      <div class='content'>
        <div class='title'>XUSH KELIBSIZ</div>
        <div class='subtitle'>O’zingizga tegishli login va parolni kiriting</div>
      </div>
    </div>
    <div class='fields'>
      <div class='content'>
        <div class='main'>
          <div class='inputField'>
            <label class='' for='login'>Login</label>
            <input
                v-model='login'
                id='login'
                type='text'
                :class='{
              "invalid":
                ($v.login.$dirty && !$v.login.required) ||
                ($v.login.$dirty && !$v.login.minLength)
            }'
            >
          </div>
          <span
              v-if='($v.login.$error)'
              class='helper-text'
          >
            <img src='../assets/icons/warning.svg'>
            Login ni kiriting
        </span>
        </div>
        <div class='main lastInput'>
          <div class='inputField'>
            <label for='password'>Parol</label>
            <input
                v-model='password'
                id='password'
                type='password'
                :class='{
              "invalid":
                ($v.password.$dirty && !$v.password.required) ||
                ($v.password.$dirty && !$v.password.minLength)
            }'>
          </div>
          <span class='helper-text' v-if='$v.password.$dirty && !$v.password.required'><img
              src='../assets/icons/warning.svg'>
          Parol ni kiriting
        </span>
        </div>
        <div class='helper-text error'>
          <span v-if='showError' class='helper-text'>
            <img src='../assets/icons/warning.svg'>
            Login yoki parol xato kiritilgan !
          </span>
          <span v-if='someError' class='helper-text'>
            <img src='../assets/icons/warning.svg'>
            Kirishda hatolik yuz berdi !
          </span>
        </div>
        <div class='btnWrapper'>
          <button @click='sendHandler' :disabled='sending'>
            <Spinner v-if='sending' size='20px' line-fg-color='rgba(0, 88, 191, 0.5)' />
            <span v-else>Kirish</span>
          </button>
        </div>
        <div class='havent'>Akkauntingiz yo’qmi?</div>
        <router-link tag='div' class='link' to='/registration'>Ro’yxatdan o’tish</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Auth',
  components: { Spinner },
  validations: {
    login: { required },
    password: { required },
  },
  data() {
    return {
      password: '',
      login: '',
      sending: false,
      showError: false,
      someError: false,
    };
  },
  mounted() {
    localStorage.clear();
  },
  methods: {
    showErrorHandler() {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
    },
    showSomeErrorHandler() {
      this.someError = true;
      setTimeout(() => {
        this.someError = false;
      }, 2000);
    },
    async sendHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return null;
      }
      this.sending = true;
      let enteringProcess = await this.$store.dispatch('login', {
        username: this.login,
        password: this.password,
      });
      if (enteringProcess) {
        this.$router.push('/');
      } else {
        this.showErrorHandler();
        this.sending = false;
      }
    },
  },
};
</script>


<style scoped lang='scss'>
.hide {
  display: none;
}

.havent {
  text-align: center;
  font-size: 20px;
  margin-top: 60px;
  margin-bottom: 20px;
}

.link {
  cursor: pointer;
  text-align: center;
  font-size: 20px;
  line-height: 23px;
  color: #0058BF;
  text-decoration: underline;
}

.wrapper {
  min-height: 100%;
  display: flex;
}

.helper-text {
  font-size: 20px;
  color: #EB4848;
  margin-top: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-right: 10px;
  }
}

.error {
  height: 10px;
}

.welcome {
  width: 50%;
  background: #070D93;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .title {
    font-weight: bold;
    font-size: 44px;
  }

  .subtitle {
    font-size: 24px;
    margin-top: 30px;
  }
}

.fields {
  width: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content {
  align-self: center;
  height: 200px;
}

.main {
  display: flex;
  flex-direction: column;
  height: 80px;

  &:last-child {
    margin-bottom: 30px;
  }
}

.inputField {
  display: flex;
  margin: 0 auto;

  label {
    color: rgba(0, 88, 191, 0.5);
    font-size: 26px;
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
}

.btnWrapper {
  display: flex;
  justify-content: center;

  button {
    cursor: pointer;
    border-radius: 20px;
    height: 50px;
    width: 150px;
    font-size: 20px;
    background: #0058BF;
    color: #fff;
    border: none;
    outline: none;
  }
}

.invalid {
  border: none;
  border-bottom: 2px solid rgba(235, 72, 72, .5);
  //background: #EB4848;
}
</style>