<template>
  <div class='header container'>
    <span class='title'>Tadbirlar ro’yxati</span>
    <SearchInput @search-text='emitSearchText' class='search' />
    <router-link class='addnew' tag='div' to='/addEvent'>
      <img src='../assets/icons/AddEvent.svg' class='addEventIcon'>
      <span>Yangi tadbir</span>
    </router-link>
  </div>
</template>

<script>
import SearchInput from './SearchInput';

export default {
  name: 'Events_Header',
  components: { SearchInput },
  methods: {
    emitSearchText(text) {
      this.$emit('search-text', text);
    },
  },
};
</script>


<style scoped lang='scss'>
.header {
  margin-top: 10px;
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
    width: 20%;

    .addEventIcon {
      margin-right: 2%;
      width: 25px;
      height: 25px;
    }
  }
}

@media only screen and (max-width: 900px) {
  .addnew {
    .addEventIcon {
      margin: 0;
    }

    span {
      display: none;
    }
  }
}
</style>