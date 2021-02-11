<template>
  <div @click='logout' class='wrapperLogoutBtn'>
    Chiqish
  </div>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    logout() {
      this.$router.push('/auth');
    },
  },
};
</script>

<style scoped lang='scss'>
.wrapperLogoutBtn {
  padding: 15px 0;
  text-align: center;
  background-color: #0058BF;
  cursor: pointer;
  color: #ffffff;
  border-radius: 30px;
  font-size: 18px;

  &:hover {
    background-color: #ba2e2e;
  }
}
</style>