<template>
  <div class='wrapper'>
    <div class='title'>{{ event.name }}</div>
    <div class='partsWrapper'>
      <div class='part'>
        <div class='main'>
          <div class='label'>O’tkazilish kuni</div>
          <div class='body'>{{ new Date(event.dateTime) | date }}</div>
        </div>
        <div class='main'>
          <div class='label'>Ro’yxatdan o’tish uchun oxirgi muhlat</div>
          <div class='body'>{{ new Date(event.deadline) | date('datetime') }}</div>
        </div>
        <div class='main'>
          <div class='label'>Tadbir o’tkazilish manzili</div>
          <div class='body'>{{ event.address }}</div>
        </div>
      </div>
      <div class='part'>
        <div class='main'>
          <div class='label'>O’tkazilish vaqti</div>
          <div class='body'>{{ new Date(event.dateTime) |date('time') }}</div>
        </div>
        <div class='main'>
          <div class='label'>Ja’mi o’rinlar soni</div>
          <div class='body'>{{ event.maxAmount || 'Cheklanmagan' }}</div>
        </div>
        <div class='main'>
          <div class='label'>Ro’yxatdan o’tganlar soni</div>
          <div class='body'>{{ event.joinedCount }}</div>
        </div>
        <button @click='joinEvent' v-if='type==="allAvailable"' :disabled='event.joinedCount===event.maxAmount'
                class='btn'>
          Qatnashish
        </button>
        <button @click='cancelEvent' v-else class='btn cancel'>
          Bekor qilish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '../common/Http';

export default {
  name: 'Event_Info',
  props: ['event', 'type'],
  methods: {
    async joinEvent() {
      let req = await Http.post('api/event/join', {
        journalistId: this.$store.getters['getWorkerID'],
        eventId: this.$route.params.eventId,
      });
      if (req.data.success) {
        this.$router.push('/events');
      }
    },
    async cancelEvent() {
      let req = await Http.post('api/event/cancel', {
        journalistId: this.$store.getters['getWorkerID'],
        eventId: this.$route.params.eventId,
      });
      if (req.data.success) {
        this.$router.push('/events');
      }
    },
  },
  mounted() {
    console.log(this.event);
  },
};
</script>

<style scoped lang='scss'>
.btn {
  background: #0058BF;
  border-radius: 20px;
  font-size: 20px;
  line-height: 23px;
  padding: 14px 40px;
  color: #FFFFFF;
  outline: none;
  border: none;
  cursor: pointer;
}

.cancel {
  background: #EB4848;
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

      .body {
        width: 70%;
        font-size: 20px;
        line-height: 23px;
      }
    }
  }
}
</style>