<template>
  <div class="wrapper" @click='$router.push("/notification")'>
    <img v-if="getNotificationCount" src="../assets/icons/jingle_bell.svg">
    <img v-else src="../assets/icons/jingle_bell_EMPTY.svg">
    <div v-if="getNotificationCount" class="message">
      {{ getNotificationCount }}
    </div>
  </div>
</template>

<script>


export default {
  name: 'Bell',
  data() {
    return {
      messagesCount: 0,
    };
  },
  computed: {
    getNotificationCount() {
      return this.$store.getters.getNotificationCount;
    },
  },
  async created() {
    await this.$store.dispatch('setAdminInfo');
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  height: 30px;
  width: 30px;
  cursor: pointer;

  img {
    height: 100%;
  }
}

.message {
  justify-self: flex-end;
  position: absolute;
  top: -6px;
  right: 0;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;
  line-height: 18px;
  background: #B71818;
}

@media only screen and (max-width: 1400px) {
  .wrapper {
    height: 27px;
    width: 27px;
  }
  .message {
    width: 18px;
    height: 18px;
    line-height: 18px;
    font-size: 10px;
    top: -6px;
  }

}

@media only screen and (max-width: 1200px) {
  .wrapper {
    height: 25px;
    width: 25px;
  }
  .message {
    width: 15px;
    height: 15px;
    line-height: 15px;
    font-size: 9px;
    top: -5px;
  }

}

@media only screen and (max-width: 1000px) {
  .wrapper {
    height: 21px;
    width: 21px;
  }
  .message {
    width: 13px;
    height: 13px;
    line-height: 13px;
    font-size: 8px;
    top: -5px;
  }

}

@media only screen and (max-width: 768px) {
  .wrapper {
    height: 17px;
    width: 17px;
  }
  .message {
    width: 9px;
    height: 9px;
    line-height: 9px;
    font-size: 5px;
    top: -3px;
    right: 0;
  }

}
</style>