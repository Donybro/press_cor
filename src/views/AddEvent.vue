<template>
  <form class='container form'>
    <div class='title'>Yangi tadbir qo’shish</div>
    <div class='partsWrapper'>
      <div class='part'>
        <div class='main'>
          <div class='label'>O’tkazilish kuni va vaqti</div>
          <date-picker :lang='lang' v-model='startTime'
                       :show-second='false' type='datetime' valueType='date'>
          </date-picker>
          <span
              v-if='($v.startTime.$error)'
              class='helper-text'
          >
            <img src='../assets/icons/warning.svg'>
            Ismni kiriting
        </span>
        </div>
        <div class='main'>
          <div class='label'>Ro’yxatdan o’tish uchun oxirgi muhlat</div>
          <date-picker :lang='lang' v-model='deadline'
                       :show-second='false' type='datetime' valueType='date'></date-picker>
          <span
              v-if='($v.deadline.$error)'
              class='helper-text'
          >
            <img src='../assets/icons/warning.svg'>
            Ismni kiriting
        </span>
        </div>
      </div>
      <div class='part'>
        <div class='main'>
          <div class='label'>Tadbir nomi</div>
          <input v-model='eventName' type='text' class='body'>
          <span
              v-if='($v.eventName.$error)'
              class='helper-text'
          >
            <img src='../assets/icons/warning.svg'>
            Ismni kiriting
        </span>
        </div>
        <div class='main'>
          <div class='label'>Ja’mi o’rinlar soni</div>
          <input v-model.number='maxAmount' type='number' class='body'>
          <span
              v-if='($v.maxAmount.$error)'
              class='helper-text'
          >
            <img src='../assets/icons/warning.svg'>
            Ismni kiriting
        </span>
        </div>
      </div>
    </div>
    <div class='lastPart'>
      <div class='label'>Tadbir o’tkazilish manzili</div>
      <div class='lastInput'>
        <input v-model='eventAddress' type='text' class=''>
        <span
            v-if='($v.eventAddress.$error)'
            class='helper-text'
        >
            <img src='../assets/icons/warning.svg'>
            Ismni kiriting
        </span>
        <button type='submit' @click.prevent='createEvent' class='btn'>Tasdiqlash</button>
      </div>
    </div>

  </form>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Http from '../common/Http';
import { required } from 'vuelidate/lib/validators';
import 'vue2-datepicker/index.css';


export default {
  name: 'AddEvent',
  components: { DatePicker },
  validations: {
    startTime: { required },
    deadline: { required },
    eventAddress: { required },
    eventName: { required },
    maxAmount: { required },
  },
  data() {
    return {
      startTime: null,
      deadline: null,
      eventName: '',
      eventAddress: '',
      maxAmount: null,
      lang: {
        formatLocale: {
          // MMMM
          months: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Octabr', 'Noyabr', 'Decabr'],
          // MMM
          monthsShort: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Oct', 'Noy', 'Dec'],
          // dddd
          weekdays: ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
          // ddd
          weekdaysShort: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shn'],
          // dd
          weekdaysMin: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shn'],
        },
      },
    };
  },
  watch: {
    startTime(val) {
      console.log(val);
    },
  },
  methods: {
    async createEvent() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return null;
      }
      try {
        let res = await Http.post('api/event', {
          name: this.eventName,
          dateTime: this.startTime,
          deadline: this.deadline,
          address: this.eventAddress,
          maxAmount: +this.maxAmount,
        });
        if (res.data.success) {
          this.eventName = '';
          this.startTime = null;
          this.deadline = null;
          this.eventAddress = '';
          this.maxAmount = '';
        }
        this.$v.$reset();
        this.$alert('Tadbir qoshildi!', '', 'success');
      } catch (e) {
        this.$alert('Xatolik yuz berdi!', '', 'error');
        console.log(e);
      }

    },
  },
};
</script>

<style scoped lang='scss'>


.form {
  margin-top: 20px;
}

.helper-text {
  font-size: 18px;
  color: #EB4848;
  margin-top: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  width: 50%;

  img {
    margin-right: 10px;
  }
}

.title {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 40px;
}

.partsWrapper {
  display: flex;
  flex-wrap: nowrap;

  .part {
    width: 50%;
  }
}

.main {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .body {
    width: 60%;
  }
}

.label {
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 10px;
}

.lastPart {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 20px;

  .lastInput {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    input {
      width: 100%;
    }

    .btn {
      margin-top: 30px;
      background: #0058BF;
      border-radius: 20px;
      font-size: 20px;
      line-height: 23px;
      color: #FFFFFF;
      padding: 14px 40px;
      outline: none;
      border: none;
      cursor: pointer;
      align-self: center;
    }
  }
}

input {
  border: 1px solid #DADADA;
  outline: none;
  box-sizing: border-box;
  padding-left: 10px;
  height: 39px;
  color: #73879c;
  font-size: 16px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
