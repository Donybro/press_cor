<template>
  <div class='wrapper_event_info_new'>
    <div class='title_event_info_new'>{{ event.name }}</div>
    <div class='partsWrapper_event_info_new'>
      <div class='part_event_info_new'>
        <div class='main_event_info_new'>
          <div class='label_event_info_new'>O’tkazilish kuni va vaqti</div>
          <date-picker v-if='editMode' :lang='lang' v-model='dateTime'
                       :placeholder='dateTimeString' :show-second='false' type='datetime'
                       valueType='date'></date-picker>
          <input v-else type='text' :placeholder='dateTimeString' :disabled='!editMode' class='body_event_info_new' />

        </div>
        <div class='main_event_info_new'>
          <div class='label_event_info_new'>Ro’yxatdan o’tish uchun oxirgi muhlat</div>
          <date-picker v-if='editMode' :lang='lang' v-model='deadline'
                       :placeholder='deadlineString' :show-second='false' type='datetime'
                       valueType='date'></date-picker>
          <input v-else type='text' :placeholder='deadlineString' :disabled='!editMode' class='body_event_info_new' />
        </div>
        <div class='label_event_info_new'>Tadbir o’tkazilish manzili</div>
      </div>
      <div class='part_event_info_new'>
        <div class='main_event_info_new'>
          <div class='label_event_info_new'>Ja’mi o’rinlar soni</div>
          <input type='number' v-model.number='maxAmount' :disabled='!editMode' class='body_event_info_new' />
        </div>
        <div class='main'>
          <div class='label_event_info_new'>Ro’yxatdan o’tganlar soni</div>
          <input type='text' v-model='joinedCount' :disabled='!editMode' class='body_event_info_new' />
        </div>
      </div>
    </div>
    <input type='text' v-model='address' :disabled='!editMode' class='body_event_info_new address_event_info_new' />
    <div class='btnsWrapper_event_info_new'>
      <button @click='toggleEditMode' v-if='!editMode' class='btn_event_info_new cancel_event_info_new'>
        O’chirish
      </button>
      <button @click='sendChanges' v-if='editMode' class='btn_event_info_new'>
        Tasdiqlash
      </button>
      <button @click='toggleEditMode' v-else class='btn_event_info_new '>
        Tahrirlash
      </button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Http from '../common/Http';

export default {
  name: 'Events_Info_Secretary_New',
  components: { DatePicker },
  props: ['event', 'eventType', 'eventId'],
  data() {
    return {
      editMode: false,
      dateTime: null,
      deadline: null,
      name: null,
      maxAmount: null,
      joinedCount: null,
      dateTimeString: '',
      deadlineString: '',
      address: '',
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
          monthBeforeYear: true,
        },
      },
    };
  },
  watch: {
    dateTime(val) {
      console.log(val);
      this.dateTimeString = (new Date(val)).toLocaleString();
    },
    deadline(val) {
      console.log(val);
      this.deadlineString = (new Date(val)).toLocaleString();
    },
  },
  mounted() {
    this.name = this.event.name;
    this.maxAmount = this.event.maxAmount;
    this.joinedCount = this.event.joinedCount;
    this.address = this.event.address;
    this.dateTimeString = (new Date(this.event.dateTime)).toLocaleString();
    this.deadlineString = (new Date(this.event.deadline)).toLocaleString();
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    async sendChanges() {
      this.editMode = !this.editMode;
      let req = await Http.patch('api/event', {
        id: this.eventId,
        name: this.name,
        dateTime: this.dateTime,
        deadline: this.deadline,
        address: this.address,
        maxAmount: this.maxAmount,
      });
      console.log(req);
    },
  },
};
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.wrapper_event_info_new {
  transition-duration: 220ms;
}

.mx-datepicker {
  width: 70%;
  height: 39px;

}

.mx-datepicker .mx-input-wrapper {
  height: 100%;
}

.mx-datepicker .mx-input {
  height: 100%;
  border: 1px solid #DADADA;
  color: #000;
  font-size: 16px;
  border-radius: 0;
  cursor: pointer;

}

.btn_event_info_new {
  background: #0058BF;
  border-radius: 20px;
  font-size: 19px;
  line-height: 23px;
  padding: 12px 30px;
  color: #FFFFFF;
  outline: none;
  border: none;
  width: 160px;
  cursor: pointer;
}

.cancel_event_info_new {
  background: #EB4848;
  margin-right: 20px;
}

.title_event_info_new {
  margin-top: 20px;
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}

.partsWrapper_event_info_new {
  display: flex;
  flex-wrap: nowrap;
}

.part_event_info_new {
  width: 50%;
}

.main_event_info_new {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

}

.label_event_info_new {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
}

.body_event_info_new {
  width: 70%;
  font-size: 16px;
  padding-left: 10px;
  padding-top: 9px;
  padding-bottom: 9px;
  border: 1px solid #DADADA;
  transition-duration: 220ms;
}

.btnsWrapper_event_info_new {
  margin-top: 30px;
  width: 85%;
  display: flex;
  justify-content: center;
  transition-duration: 200ms;
}

.address_event_info_new {
  width: 85%;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #6c6f72;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #6c6f72;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #6c6f72;
}
</style>