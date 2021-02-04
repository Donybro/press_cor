<template>
  <div class='main'>
    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIk0iGpJrAmjTpmPT7fWrsMLk-jkeHvwYycg&usqp=CAU'>
    <div class='name'>{{ organization.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'Organization_Card',
  props: ['organization'],
};
</script>

<style scoped lang='scss'>
.main {
  background: #FFFFFF;
  border-radius: 6px;
  padding: 10px;
  transition-duration: 150ms;
  cursor: pointer;
  display: flex;

  &:hover {
    box-shadow: rgba(23, 109, 209, 0.2) 0px 7px 29px 0px;
  }

  img {
    width: 60px;
    height: 60px;
    background-color: #ccc;
    border-radius: 50%;
    border: 1px solid #0058BF;
  }

  .name {
    font-size: 16px;
    line-height: 19px;
    color: #0058BF;
    display: flex;
    align-items: center;
    padding-left: 5px;
  }
}
</style>