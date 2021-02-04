<template>
  <div class="header container">
    <span class="title">Jurnalistlar ro’yxati</span>
    <SearchInput class="search" @search-text="emitSearchText" />
    <router-link class="addnew" tag="div" to="journalists/addWorker">
      <img src="../assets/icons/add-user.svg" class="user_icon">
      <span>Yangi xodim</span>
    </router-link>
  </div>
</template>

<script>
import SearchInput from './SearchInput';

export default {
  name: 'Journalists_Header',
  components: { SearchInput },
  methods: {
    emitSearchText(val) {
      this.$emit('search-text', val);
    },
  },
};
</script>


<style scoped lang="scss">
.header {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    width: 30%;
    font-size: 24px;
    color: #000000;
  }

  .search {
    width: 40%;
  }

  .addnew {
    font-size: 16px;
    color: #FFFFFF;
    background: #0058BF;
    box-shadow: 0px 2px 6px 2px rgba(16, 73, 139, 0.3);
    border-radius: 30px;
    cursor: pointer;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;

    .user_icon {
      margin-right: 2%;
      width: 25px;
      height: 25px;
    }
  }
}

@media only screen and (max-width: 900px) {
  .addnew {
    .user_icon {
      margin: 0;
    }

    span {
      display: none;
    }
  }
}
</style>