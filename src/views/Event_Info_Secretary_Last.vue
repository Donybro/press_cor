<template>
  <div class='wrapper'>
    <div class='title'>{{ event.name }}</div>
    <div class='partsWrapper'>
      <div class='part'>
        <div class='main'>
          <div class='label'>O’tkazilingan sana</div>
          <div class='body'>{{ ((new Date(event.dateTime))).toLocaleString() }}</div>
        </div>
        <div class='main'>
          <div class='label'>O’tkazilingan vaqt</div>
          <div class='body'>{{ ((new Date(event.deadline))).toLocaleString() }}</div>
        </div>
        <div class='main'>
          <div class='label'>Tadbir o’tkazilish manzili</div>
          <div class='body last'>{{ event.address }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Event_Info_Secretary_Last',
  props: ['event'],
};
</script>

<style scoped lang='scss'>

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

      .last {
        width: 100%;
      }
    }
  }
}
</style>