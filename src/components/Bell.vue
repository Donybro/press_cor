<template>
  <div class='wrapper' @click='$router.push("/notification")'>
    <img v-if='messagesCount' src='../assets/icons/jingle_bell.svg'>
    <img v-else src='../assets/icons/jingle_bell_EMPTY.svg'>
    <div v-if='messagesCount' class='message'>
      {{ messagesCount }}
    </div>
  </div>
</template>

<script>
import Http from '../common/Http';

export default {
  name: 'Bell',
  data() {
    return {
      messagesCount: 0,
    };
  },
  async created() {
    let { journalistCount, organCount } = (await Http.get('api/admin/notification')).data;
    this.messagesCount = journalistCount + organCount;
  },
};
</script>

<style scoped lang='scss'>
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
</style>