<template>
  <form class="container form">
    <div class="title">Yangi tadbir qo’shish</div>
    <div class="partsWrapper">
      <div class="part">
        <div class="main">
          <div class="label">O’tkazilish kuni va vaqti</div>
          <date-picker :lang="lang" v-model="startTime"
                       :show-second="false" type="datetime" valueType="date"></date-picker>
        </div>
        <div class="main">
          <div class="label">Ro’yxatdan o’tish uchun oxirgi muhlat</div>
          <date-picker :lang="lang" v-model="deadline"
                       :show-second="false" type="datetime" valueType="date"></date-picker>
        </div>
      </div>
      <div class="part">
        <div class="main">
          <div class="label">Tadbir nomi</div>
          <input v-model="eventName" type="text" class="body">
        </div>
        <div class="main">
          <div class="label">Ja’mi o’rinlar soni</div>
          <input v-model.number="maxAmount" type="number" class="body">
        </div>
      </div>
    </div>
    <div class="lastPart">
      <div class="label">Tadbir o’tkazilish manzili</div>
      <div class="lastInput">
        <input v-model="eventAddress" type="text" class="">
        <button type="submit" @click.prevent="createEvent" class="btn">Tasdiqlash</button>
      </div>
    </div>

  </form>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Http from '../common/Http';

export default {
  name: 'AddEvent',
  components: { DatePicker },
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
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  margin-top: 20px;

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
    align-items: flex-end;

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